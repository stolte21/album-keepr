import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableSortLabel, CircularProgress, Typography } from '@material-ui/core';
import { AutoSizer, Table, Column, SortDirection } from 'react-virtualized';
import { Rating, Skeleton } from '@material-ui/lab';
import { List } from 'immutable';
import clsx from 'clsx';
import { updateTableSort } from '../actions/uiActions';

const emptyList = List();
const HEADER_HEIGHT = 50;
const ROW_HEIGHT = 70;      // TODO: make dynamic

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
            cursor: 'pointer'
        }
    },
    tableCell: {
        flex: 1,
        height: ROW_HEIGHT
    },
    headerCell: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        height: HEADER_HEIGHT
    },
    noRowsContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        padding: 2,
        marginLeft: 4,
    }
});

const gridStyle = {
    direction: 'inherit'
};

class VirtualizedTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.table = React.createRef();
    }

    sort = ({ sortBy, sortDirection }) => {
        this.props.updateTableSort(sortBy, sortDirection);
    };

    getRowClassName = () => {
        const { classes } = this.props;
        return clsx(classes.flexContainer, classes.tableRowHover);
    };

    handleRowClick = ({ rowData }) => {
        this.props.onAlbumClick(rowData);
    };

    headerRenderer = ({ label, dataKey, sortBy, sortDirection }) => {
        const { classes } = this.props;

        return (
            <TableCell
                className={clsx(
                    classes.tableCell,
                    classes.flexContainer,
                    classes.headerCell
                )}
                component="div"
                variant="head" 
            >
                {dataKey !== 'images' &&
                <TableSortLabel
                    active={sortBy === dataKey}
                    direction={sortBy === dataKey ? sortDirection.toLowerCase() : SortDirection.ASC.toLowerCase()}
                >
                    {label}
                </TableSortLabel>}
            </TableCell>
        );
    };

    cellRenderer = ({ dataKey, cellData, rowData, isScrolling }) => {

        const { classes } = this.props;
        let cellContent;

        switch (dataKey) {
            case 'notes':
                const notes = cellData.length > 150 ? (
                    cellData.substring(0, 150) + '...'
                ) : cellData;
                cellContent = <p title={cellData}>{notes}</p>;
                break;
            case 'images':
                const alt = rowData['name'];
                const image = cellData[cellData.length-1].url;
                return (
                    <img
                        className={classes.imgStyle}
                        alt={alt}
                        src={image}
                        height={64}
                        width={64}
                    />
                );
            case 'rating':
                cellContent = false ? (
                    <Skeleton
                        width="100%"
                        variant="rect"
                        animation={false}
                    />
                ) : (
                    <Rating 
                        readOnly
                        value={cellData}
                        precision={0.5}
                        size="small"
                    />
                );
                break;
            default:
                cellContent = cellData;
        }

        return (
            <TableCell
                className={clsx(classes.tableCell, classes.flexContainer)}
                component="div"
                variant="body"
            >
                {cellContent}
            </TableCell>
        );
    };

    noRowsRenderer = () => {
        const { classes, loading } = this.props;

        return (
            <div className={classes.noRowsContainer}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Typography variant="h5">Save albums to view them here.</Typography>
                )}
            </div>
        );
    };

    /*
    rowHeight = ({ index }) => {
        const notesDiv = document.getElementById(`notes-${index}`);

        if (notesDiv) {
            const pElement = notesDiv.children[0];

            if (pElement) {
                return Math.max(pElement.clientHeight+16, 70);
            }
        }

        return 70;
    };*/

    render() {
        const { 
            classes,
            rows,
            columns,
            sortBy,
            sortDirection,
            ...tableProps
        } = this.props;

        const tableRows = rows || emptyList;

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        ref={this.table}
                        className={classes.table}
                        height={height}
                        width={width}
                        rowCount={tableRows.size}
                        rowGetter={({ index }) => tableRows.get(index)}
                        rowHeight={ROW_HEIGHT}
                        gridStyle={gridStyle}
                        headerHeight={HEADER_HEIGHT}
                        rowClassName={this.getRowClassName}
                        noRowsRenderer={this.noRowsRenderer}
                        sort={this.sort}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onRowClick={this.handleRowClick}
                        {...tableProps}
                    >
                        {columns.map(({ dataKey, cellRenderer, ...other }) => (
                            <Column
                                key={dataKey}
                                dataKey={dataKey}
                                className={classes.flexContainer}
                                headerRenderer={this.headerRenderer}
                                cellRenderer={this.cellRenderer}
                                {...other}
                            />
                        ))}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

const mapStateToProps = ({ sort }) => {

    const { sortBy, sortDirection } = sort;

    return {
        sortBy, sortDirection
    };
};

export default connect(
    mapStateToProps,
    { updateTableSort }
)(withStyles(styles)(VirtualizedTable));