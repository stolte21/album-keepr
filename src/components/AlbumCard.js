import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardMedia,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Divider,
    IconButton
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { Skeleton } from '@material-ui/lab';
import blankImage from '../assets/blank.png';
import { mergeSpotifyAndRatedAlbums } from '../selectors';
import { openFormDialog } from '../actions/uiActions';

const useStyles = makeStyles(theme =>({
    header: {
        padding: 12
    },
    headerText: {
        fontSize: '1rem',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    root: {
        '&:last-child': {
            paddingBottom: 0
        }
    },
    savedIcon: {
        color: theme.palette.primary.main
    }
}));

const AlbumCard = ({
    // props
    loading,
    album,
    savedAlbums,

    // action creators
    openFormDialog
}) => {

    const classes = useStyles();
    const { id, name, release_date, total_tracks, images } = album

    const getAlbumImage = () => {
        return images.length === 0 ? blankImage : images[0].url;
    };

    const handleOpenDialog = () => {

        const savedAlbum = savedAlbums.get(id);

        if (savedAlbum) {
            const initialValues = {
                rating: savedAlbum.rating,
                notes: savedAlbum.notes
            };

            openFormDialog(album, initialValues);
        } else {
            openFormDialog(album);
        }
    };

    return (
        <Card>
            <CardMedia 
                component="img"
                image={getAlbumImage()}
            />
            <CardHeader
                className={classes.header}
                title={loading ? <Skeleton variant="text" /> : name}
                titleTypographyProps={{
                    className: classes.headerText
                }}
                subheader={
                    <CardContent 
                        className={classes.content}
                        classes={{
                            root: classes.root
                        }}
                    >
                        <Typography color="textSecondary">
                            {loading ? (
                                <Skeleton width={100} variant="text" />
                            ) : (
                                `${total_tracks} tracks`
                            )}
                        </Typography>
        
                        <Typography color="textSecondary">
                            {loading ? (
                                <Skeleton width={100} variant="text" />
                            ) : (
                                release_date
                            )}
                        </Typography>
                    </CardContent>
                }
            />
            <Divider />
            <CardActions disableSpacing>
                <IconButton
                    className={clsx({
                        [classes.savedIcon]: savedAlbums.has(id)
                    })}
                    onClick={handleOpenDialog}
                >
                    <StarIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        savedAlbums: mergeSpotifyAndRatedAlbums(state)
    };
};

export default connect(mapStateToProps, { openFormDialog })(AlbumCard);