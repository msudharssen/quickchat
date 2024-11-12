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

  

export default function StartChatting() {
  const { user, isLoading } = useUser();

  return (
    <>
<Dialog className='forlogin'>
<DialogTrigger className=''>Login</DialogTrigger>
<DialogTitle>
  <DialogContent className='bg-black border-none'>
    <Login/>
  </DialogContent>
  </DialogTitle>
  </Dialog>
  </>
  )
}
