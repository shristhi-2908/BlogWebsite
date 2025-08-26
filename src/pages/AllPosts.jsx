import React ,{use, useEffect,useState} from 'react'
import appwriteService from  "../appwrite/config"
import PostCard from '../components/PostCard'
import Container from '../components/Container/Container'



function AllPosts() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{},[])
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
        setPosts(posts.documents)
    }
    })
  return (
    <div className='w-100 py-8 m-3 home-container'>
      <Container>
        <div className=" allpost home">
        {posts.map((post)=>(
            <div className="home-post" key={post.$id}>
                <PostCard {...post}/>
                </div>
        ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
