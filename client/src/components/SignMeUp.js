import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Login from './Login'
import { useUser } from '@auth0/nextjs-auth0/client';
import Signup from './Signup';

  

export default function StartChatting() {
  const { user, isLoading } = useUser();

  return (
    <>
<Dialog className='forsignin'>
<DialogTrigger className=''>Sign Up</DialogTrigger>
<DialogTitle>
  <DialogContent className='bg-black border-none'>
    <Signup/>
  </DialogContent>
  </DialogTitle>
  </Dialog>
  {/* {!user ? <a href="/api/auth/login" className="text-yellow-50">Login</a> : <></>}
  {user ? <a href="/api/auth/logout" className="text-yellow-50">Logout</a> : <></>} */}
  </>
  )
}