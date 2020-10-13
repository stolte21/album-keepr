import React from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

const ArtistRow = ({ artist }) => {

    const history = useHistory();
    const { id, followers, images, name } = artist;
    const { total } = followers;

    const handleArtistClick = () => {
        history.push(`/artist/${id}`);
    };

    const renderImageAvatar = () => {
        const imagesCount = images.length;

        if (imagesCount === 0) {
            return (
                <SupervisedUserCircleIcon fontSize="large" />
            );
        }

        // it looks like spotify orders their images descending
        // size order. we want the smallest image for the list avatar
        const image = images[imagesCount-1];

        return (
            <Avatar alt={name} src={image.url} />
        );
    };

    return (
        <ListItem 
            button
            onClick={handleArtistClick}
        >
            <ListItemIcon>
                {renderImageAvatar()}
            </ListItemIcon>
            <ListItemText 
                primary={name}
                secondary={`${total} followers`}
            />
        </ListItem>
    );
};

export default ArtistRow;