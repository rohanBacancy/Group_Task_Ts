import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, CardText, CardTitle, Col, Container, Row } from 'reactstrap'
import {Post} from '../Interfaces/interfaces'
import Loader from './Loader/Loader';

interface PostCardProps
{
    post:Post,
    setForceRenderPosts: React.Dispatch<React.SetStateAction<number>>
}


const PostCard:React.FC<PostCardProps> = ({post,setForceRenderPosts}) => {

    const [liked,setLiked] = useState(false);
    const [disliked,setDisliked] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleLike = () => {
        setLoading(true);
        if(liked){
            setLiked(false)
            let payload = {likes:post.likes-1}
            axios.put(`https://6094e51894009e00176b5f56.mockapi.io/posts/${post.id}`,payload)
            .then(res => {setForceRenderPosts(prevState => prevState+1); setLoading(false);})
            .catch(err => {alert(err); setLoading(false);})


        } else{
            setLiked(true)
            let payload = {likes:post.likes+1}
            axios.put(`https://6094e51894009e00176b5f56.mockapi.io/posts/${post.id}`,payload)
            .then(res => {setForceRenderPosts(prevState => prevState+1); setLoading(false);})
            .catch(err => {alert(err); setLoading(false); })
        }
    }
    const handleDisLike = () => {
        setLoading(true);
        if(disliked){
            setDisliked(false)
            let payload = {dislikes:post.dislikes-1}
            axios.put(`https://6094e51894009e00176b5f56.mockapi.io/posts/${post.id}`,payload)
            .then(res => {setForceRenderPosts(prevState => prevState+1); setLoading(false);})
            .catch(err => {alert(err); setLoading(false);})
        } else{
            setDisliked(true)
            let payload = {dislikes:post.dislikes+1}
            axios.put(`https://6094e51894009e00176b5f56.mockapi.io/posts/${post.id}`,payload)
            .then(res => {setForceRenderPosts(prevState => prevState+1); setLoading(false);})
            .catch(err => {alert(err); setLoading(false);})
        }
    }

    return (
        <Col sm="12" >

            <Card body>
                { loading ? <Loader/> :
                <>
            <CardTitle tag="h5">{post.title}</CardTitle>
            <CardText>{post.description}</CardText>
            <Container>
                <Row>
                    <Button color={liked ? "primary" : "secondary"} onClick={handleLike}>Like {post.likes}</Button>
                    <Button color={disliked ? "danger ml-3" : "secondary ml-3"} onClick={handleDisLike}>Dislike {post.dislikes}</Button>
                </Row>
            </Container>
            </>
                }
            </Card>

        </Col>
    )
}

export default PostCard
