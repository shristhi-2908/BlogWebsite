import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import  Button from '../components/Button'
import  Input from '../components/Input'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function SignUp() {
    const navigate=useNavigate()
    const dispatch =useDispatch()
    const [error,setError]=useState("")
    const{register,handleSubmit}=useForm()

    const create = async(data) => {
        setError("")
        try {
              const { email, password, name } = data; 
            const userData = await authService.createAccount( { email, password, name })
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
     <div className="mx-auto w-100" style={{maxWidth: "32rem", backgroundColor:" #f3f4f6",
       borderRadius: "1rem", padding: "2.5rem", border: "1px solid rgba(0, 0, 0, 0.1)"}}>
              <h1 className="logo">Logo</h1>
     
              <h2 className="text-center fw-bold lh-sm" style={{fontSize: "1.5rem"}}>Sign up to create an account</h2>
              <p className="mt-2 text-center" style={{fontSize: "1rem", color: "rgba(0, 0, 0, 0.6)"}}>
            Already have an account?&nbsp;
             <Link to="/login" className="fw-medium text-primary text-decoration-none transition" style={{transitionDuration: "200ms"}}>
             Sign In
             </Link>
     </p>
     {error && <p className="text-center text-danger mt-5">{error}</p>}
     <form onSubmit={handleSubmit(create)} className='mt-5'>
  <div className='mt-4'>
    <Input 
    label="FullName: "
    placeholder="Enter your full name"
    {...register("name",{
        required:true,
    })}        
    />

     <Input 
     label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
        },
    })}
    />

    <Input
    label="Password"
    type="password"
    placeholder="Enter your password"
    {...register("password",{
        required:true
    })}
    />
    <Button 
    type='submit'
    className='w-100 mt-4'
    >Create Account</Button>
    </div>
    </form>
    </div>
    </div>
  )
}

export default SignUp
