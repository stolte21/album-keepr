import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { List as ImmutableList } from 'immutable';
import { AutoSizer, List } from 'react-virtualized';
import {
    CircularProgress,
    Typography,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const styles = (theme) => ({
    primaryText: {
        fontSize: '0.8rem'
    },
    secondaryText: {
        fontSize: '0.75rem'
    },
    noRowsContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const emptyList = ImmutableList();

class VirtualizedList extends React.PureComponent {

    rowRenderer = ({
        key,
        index,
        style
     }) => {

        const { classes } = this.props;
        const album = this.props.rows.get(index);
        const { name, artist, images, rating } = album;
        const image = images[images.length-1].url;

        return (
            <ListItem
                key={key}
                style={style}
                button
                onClick={() => this.props.onAlbumClick(album)}             
            >
                <ListItemAvatar>
                    <Avatar
                        variant="square"
                        alt={name}
                        src={image}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={`by ${artist}`}
                    primaryTypographyProps={{
                        className: classes.primaryText
                    }}
                    secondaryTypographyProps={{
                        className: classes.secondaryText
                    }}
                />
                <Rating
                    readOnly
                    value={rating}
                    precision={0.5}
                    size="small"
                />
            </ListItem>
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
    
    render() {

        const { rows, sortBy, sortDirection } = this.props;
        const listRows = rows || emptyList;

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        width={width}
                        rowCount={listRows.size}
                        rowHeight={100}
                        rowRenderer={this.rowRenderer}
                        noRowsRenderer={this.noRowsRenderer}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                    />
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

export default connect(mapStateToProps)(withStyles(styles)(VirtualizedList));