import axios from 'axios'
import React,{FC, useEffect, useState} from 'react'
import { Container, Row } from 'reactstrap';
import Loader from '../Components/Loader/Loader';
import PostCard from '../Components/PostCard';
import {Post} from '../Interfaces/interfaces'

const Dashboard:FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [forceRenderPosts,setForceRenderPosts] = useState<number>(0);

    useEffect(() => {
        console.log("Posts ReFetched")
        axios.get("https://6094e51894009e00176b5f56.mockapi.io/posts")
        .then(res => {setPosts(res.data); console.log(res.data)})
        .catch(err => console.log(err))
    }, [forceRenderPosts])

    return (
        <Container>
            <Row>
                {
                    posts 
                    ? posts.map(post => <PostCard key={post.id} post={post} setForceRenderPosts={setForceRenderPosts}/>)
                    : <Loader/>
                }
                <div>Put Pagination Here</div>
            </Row>
        </Container>
    )
}

export default Dashboard
