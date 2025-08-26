import React from 'react'
import appwriteService  from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id ,title ,content, featuredImage}) {
  
  return (
    <Link to={`/post/${$id}`} className='link-box'>
     <div class=" card-container">
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-4 postcard-img'/>
       <div class="card-body">
    <h5 class="card-title text">{title}</h5>
</div>
       </div>
    </Link>
  )
}

export default PostCard
