import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard'
import appwriteService from '../appwrite/config'

function Home(){

const[posts,setPosts]=useState([])
useEffect(()=>{
    appwriteService.getPosts().then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
},[])

if(posts.length===0){
return (
    <div className="w-100 py-8 mt-4 text-center ">
        <Container>
            <div className="d-flex"><div className="p-2 w-100"><h1 className="fs-3 fw-bold hover-muted">
                Login to read Posts
                </h1></div></div>
        </Container>
    </div>
)
}

  return (
     <div className='w-100 py-8 m-3 home-container' >
      <Container>
        <div className=" home">
        {posts.map((post)=>(
            <div className=" home-post" key={post.$id}>
                <PostCard {...post}/>
                </div>
        ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
