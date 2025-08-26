import React ,{use, useEffect,useState} from 'react'
import PostForm from '../components/Post-form/PostForm'
import appwriteService from  "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../components/Container/Container'



function EditPost() {
    const [post,setPost]=useState(null)
    const {id}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
      console.log("slug inside useEffect:", id);
try{
        if(id){
            appwriteService.getPost(id).then((post)=>{
                if(post){
                setPost(post)
            //    console.log("Fetched post:", post); 
                
                }
            })
        }else{
            navigate("/")
        }
    }catch(error){
    console.error("Error fetching post:", error);
    }
    },[id,navigate])


  return post?(
     <div className='py-8'>
        <Container>
            <PostForm post= {post}/>
        </Container>
    </div>
  ):null
  
}

export default EditPost
