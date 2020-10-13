import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    SvgIcon
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ReactComponent as Spotify } from '../assets/SpotifyIcon.svg';
import blankImage from '../assets/blank.png';

const IMAGE_SIZE = 250;

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
        padding: 8
    },
    coverImage: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE
    },
    contentRow: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

const emptyArtist = {
    name: '',
    images: [],
    followers: {
        total: 0
    },
    external_urls: {
        spotify: ''
    }
};

const ArtistCard = ({
    loading,
    artist
}) => {

    const classes = useStyles();

    const { name, images, followers, external_urls } = loading ? emptyArtist : artist.toJS();
    const { total } = followers;
    const { spotify } = external_urls;

    const getArtistImage = () => {
        return images.length === 0 ? blankImage : images[0].url;
    };

    return (
        <Card className={classes.root}>
            {loading ? (
                <Skeleton variant="rect" width={IMAGE_SIZE} height={IMAGE_SIZE} />
            ) : (
                <CardMedia
                    className={classes.coverImage}
                    image={getArtistImage()}
                    title={name}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h4" align="center">
                    {loading ? (
                        <Skeleton style={{ margin: 'auto' }} width="50%" /> 
                    ) : (
                        name
                    )}
                </Typography>

                <div className={classes.contentRow}>
                    {loading ? (
                        <Button disabled><Skeleton width={200} /></Button>
                    ) : (
                        <Button
                            startIcon={(
                                <SvgIcon
                                    component={Spotify}
                                    viewBox="0 0 168 168"
                                />
                            )}
                            href={spotify}
                        >
                            Open on Spotify
                        </Button>
                    )}

                    {loading ? (
                        <Button disabled><Skeleton width={200} /></Button>
                    ) : (
                        <Button style={{ color: 'black' }} disabled>
                            {`${total} followers`}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ArtistCard;