import axios from 'axios'
import React,{FC, useEffect, useState} from 'react'
import { Container, Row} from 'reactstrap';
import PostCard from '../Components/PostCard';
import {Post} from '../Interfaces/interfaces';
import ReactPaginate from 'react-paginate';
import BackDrop from '../Components/Backdrop/Backdrop';
import Spinner from '../Components/Spinner/Spinner';
import './Dashboard.css';
import AddPost from '../Components/AddPost/AddPost';

const Dashboard:FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [forceRenderPosts,setForceRenderPosts] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const usersPerPage:number = 3;
    const pagesVisited:number = pageNumber * usersPerPage;
    const pageCount:number = Math.ceil(posts.length / usersPerPage);
    const [isLoading, setIsLoading] = useState<boolean>(true)



    useEffect(() => {
        console.log("Posts ReFetched")
        axios.get("https://6094e51894009e00176b5f56.mockapi.io/posts")
        .then(res => {setPosts(res.data); console.log(res.data); setIsLoading(false)})
        .catch(err => console.log(err))
    }, [forceRenderPosts])

    const displayUsers:any = posts
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((post:any) => {
      return (
         <PostCard key={post.id} post={post} setForceRenderPosts={setForceRenderPosts}/>
      );
    });

    return (
        <React.Fragment>
        <BackDrop show={isLoading}><Spinner /></BackDrop>
        <AddPost/>
        <Container>
            <Row>
               {displayUsers}
                <div className="mx-auto pt-5">
                <ReactPaginate
                       previousLabel={'Previous'}
                       nextLabel={'Next'}
                       breakLabel={'...'}
                       breakClassName={'break-me'}
                       pageCount={pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={(data)=>{setPageNumber(data.selected)}}
                       containerClassName={'pagination'}
                       disabledClassName={"paginationDisabled"}
                       activeClassName={'paginationActive'}
                 />
                </div>
            </Row>

        </Container>
        </React.Fragment>
    )
}

export default Dashboard
