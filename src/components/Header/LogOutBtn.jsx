import React from 'react'
 import {useDispatch} from 'react-redux'
 import authService from '../../appwrite/auth'
 import {logout} from '../../store/authSlice'



function LogOutBtn() {
const dispatch = useDispatch()

const handlerLogout=()=>{
    authService.logout().then(()=>{
        dispatch(logout())
    })
}
  return (
  <button className='nav-btn' onClick={handlerLogout}>Logout</button>
  )
}

export default LogOutBtn
