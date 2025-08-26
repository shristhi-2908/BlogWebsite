import React ,{useCallback, useEffect}from 'react'
import { useForm } from 'react-hook-form'
import  Button from '../Button'
import  Input from '../Input'
import  Select from '../Select'
import  RTE from '../RTE'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/config'

function PostForm({post}) {
  const{register,handleSubmit,watch ,setValue,control,getValues} = useForm({
    defaultValues:{
        title:post?.title||'',
        slug:post?.$id||'',
        content:post?.content||'',
        status:post?.status||'active',
    }
  });

const navigate=useNavigate()
const userData=useSelector((state)=>state.auth.userData)

const submit= async (data)=>{
  try{
  console.log(data);
  
    if(post){
     const file= data.image[0]? await appwriteService.uploadFile(data.image[0]):null
    
    if(file){
        appwriteService.deleteFile(post.featuredImage)
    }
 const dbPost=await appwriteService.updatePost
 (post.$id,{
    ...data,
    featuredImage:file?file.$id:undefined,
 })
    if(dbPost){
 navigate(`/post/${dbPost.$id}`);
    }
   } else{
const file=await appwriteService.uploadFile(data.image[0]);

if(file){
  const fileId=file.$id;
  data.featuredImage=fileId;
  console.log(data.featuredImage);
  
  const dbPost=await appwriteService.createPost({
    ...data,
    userId:userData.$id,
  })
if(dbPost){
navigate(`/post/${dbPost.$id}`);
}
}
    }
  }catch (error) {
    console.error('Submit error:', error);
  }
  }
    

const slugTransform = useCallback((value)=>{
if(value && typeof value ==='string')
    return value
.trim() .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')  // remove invalid chars
    .substring(0, 36)               // limit length
    .replace(/^[^a-z0-9]+/, '');  
 
return ''
},[])

useEffect(()=>{
const subscription=watch((value,{name})=>{
if(name==='title'){
    setValue('slug',slugTransform(value.title,{shouldValidate:true}))
}
});


return ()=> subscription.unsubscribe()

},[watch,slugTransform,setValue])

  return (
  <form onSubmit={handleSubmit(submit)} className='post-form'>
    <div className="left-div">
        <Input
        label="Title : "
        placeholder="Title"
        className="mb-4"
        {...register("title",{required:true})}
        />

         <Input
        label="Slug : "
        placeholder="Slug"
        className="mb-4"
        {...register("slug",{required:true})}
        
onInput={(e)=>{
    setValue("slug",slugTransform(e.currentTarget.value),{
        shouldValidate:true
    });
}}
/>

<RTE label="Content :" name="content" control={control}
defaultValues={getValues("content")}
/>
    </div>
    <div className="right-div">
          <Input
        label="Featured Image : "
        type='file'
        className="mb-4"
        accept="image/png , image/jpg , image/jpeg ,image/gif"
        {...register("image",{required:!post})}
        />
    {post && (
        <div className="img-container">
            <img className='edit-img'
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title} />
        </div>
    )}
    <Select
    options={["active" ,"inactive"]}
    label="Status"
    className="mb-4"
    {...register("status",{required:true})}
    />
<Button type="submit"
  className={`w-100 btn ${post ? "btn-success" : "btn-secondary"}`}>
    {post?"Update":"Submit"}
    </Button>
</div>
  </form>
  )
}

export default PostForm
