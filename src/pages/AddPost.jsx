import React from 'react'
import PostForm from '../components/Post-form/PostForm'
import Container from '../components/Container/Container'

function AddPost() {
  return (
    <div className='py-8'>
      <Container>
                <h1 className="mb-6 text-xl font-bold">Create New Post</h1>
        <PostForm/>
      </Container>
    </div>
  )
}

export default AddPost;
