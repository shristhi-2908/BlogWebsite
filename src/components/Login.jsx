import React,{useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import  Button from '../components/Button'
import  Input from '../components/Input'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"

function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("")
  const login = async(data) => {
        setError("")
        try {
           const { email, password, name }=data
            const session = await authService.login( { email, password, name })
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
                console.log("userData:",userData);
                
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='d-flex align-items-center justify-content-center w-100'>
     <div className="mx-auto w-100" style={{maxWidth: "32rem", backgroundColor:" #f3f4f6",
       borderRdius: "1rem", padding: "2.5rem", border: "1px solid rgba(0, 0, 0, 0.1)"}}>
         <div className="logo">Logo</div>

         <h2 className="text-center fw-bold lh-sm" style={{fontSize: "1.5rem"}}>Sign in to your account</h2>
         <p className="mt-2 text-center" style={{fontSize: "1rem", color: "rgba(0, 0, 0, 0.6)"}}>
        Don&apos;t have any account?&nbsp;
        <Link to="/signup" className="fw-medium text-primary text-decoration-none transition" style={{transitionDuration: "200ms"}}>
        Sign Up
        </Link>
</p>
{error && <p className="text-center text-danger mt-5">{error}</p>}
<form onSubmit={handleSubmit(login)} className='mt-5'>
  <div className='mt-4'>
    <Input 
     label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
        }
    })}
    />

    <Input
    label="Password: "
    type="password"
    placeholder="Enter your password"
    {...register("password",{
      required:true,
    })}
    />

    <Button 
    type='submit'
    className='w-100 mt-4'
    >Sign in</Button>
  </div>
</form>
</div>

    </div>
  )
}

export default Login
