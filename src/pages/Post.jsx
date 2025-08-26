import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'

export default function Post() {

    const [post,setPost]=useState(null)
    const navigate=useNavigate()
const {slug}=useParams()
const userData=useSelector((state)=>state.auth.userData)
// console.log("userData from Redux:", userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

useEffect(()=>{
    if(slug){
        appwriteService.getPost(slug).then((post)=>{
              //  console.log("Fetched post:", post); 
         if (post) {
                setPost(post);
                // console.log("Post User ID:", post.userId);
                // console.log("Logged in user ID:", userData?.$id);
            } else {
                navigate("/");
            } 
        })
    }
     else navigate("/")
},[slug,navigate])

const deletePost=()=>{
    appwriteService.deletePost(post.$id).then((status)=>{
        if(status){
            appwriteService.deleteFile(post.featuredImage);
            navigate("/")
 

        }
    })
}


  return post? (
    <div className='py-8'>
      <Container>
        <div className="w-100 d-flex mb-4 justify-content-center border rounded p-2 position-relative">
            <img  src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded post-img'/>
{isAuthor && (
  // <> {console.log("Rendering buttons - user is author")}
    <div className="position">
        <Link to={`/edit-post/${post.$id}`}>
        <Button style={{backgroundColor:"green"}}>
Edit
        </Button>
        </Link>
        <Button style={{backgroundColor:"red"}} onClick={deletePost}>
Delete
        </Button>
    </div>

)}
        </div>
        <div className="w-100 mb-6">
            <h1 className="fs-3 fw-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ):null;
}

