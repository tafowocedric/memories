import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import moment from 'moment';

import useStyles from './style';
import { deletePost, likePost } from '../../../store/actions/post';

const Post = ({ post, setPostId }) => {
    const style = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
                <>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize='small' />
                    &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize='small' />
                &nbsp;Like
            </>
        );
    };

    return (
        <Card className={style.card}>
            <CardMedia className={style.media} image={post.selectedFile} title={post.title} />
            <div className={style.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.googleId === post?.creator || user?._id === post?.creator) && (
                <div className={style.overlay2}>
                    <Button style={{ color: 'white' }} size='small' onClick={() => setPostId(post._id)}>
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </div>
            )}
            <div className={style.details}>
                <Typography variant='body2' color='textSecondary'>
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <Typography className={style.title} variant='h5' gutterBottom>
                {post.title}
            </Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={style.cardActions}>
                <Button size='small' color='primary' disabled={!user} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>

                {(user?.googleId === post?.creator || user?._id === post?.creator) && (
                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;
