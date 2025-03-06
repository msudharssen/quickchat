import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'
import AvatarPic from './AvatarPic'
import {Search} from "lucide-react"
import { Input } from "@/components/ui/input"
import { redirect, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Toaster } from './ui/sonner'

export default function NavbarUser() {
    const [friend, setFriend] = useState("");
    const myName = localStorage.getItem('name')
    const router = useRouter();
    const[friends, setFriends] = useState([])
    const[req, setReq] = useState("")

    function getInfo(word){
        setFriend(word)
        console.log("Username to Search: ", friend)
    }

    async function search(){
          try {
            if (!myName || !friend) {
              console.log("Current user or friend to find is missing");
              return;
          }
            const response = await fetch('http://localhost:3002/api/findfriends', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({currentUser: myName, find: friend}),
              credentials: "include"
            })
            let result = await response.json()
            console.log(result)
            if(result.result == 200){
              setReq(friend)
            }
          } catch (err) {
            console.log(err)
          }
      }
     

  
    async function logOut(e){
    e.preventDefault()
      try {
        const response = await fetch('http://localhost:3002/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({myName}),
          credentials: "include"
        })
        localStorage.removeItem('name')
        router.push('/')
      } catch (err) {
        console.log(err)
      }
  }

  return (
    <>
    <div>
    
    </div>
    <div className="relative ml-auto flex flow-row ">
            <Input
              type="search"
              placeholder="Search For Users"
              onChange ={(e)=>{getInfo(e.target.value)}}
              className="w-10 mr-2 items-center rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              ></Input>
              <button onClick={search}><svg  className="w-8 h-8 text-white mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
</svg></button>
            
    <DropdownMenu>
            <DropdownMenuTrigger>
            <AvatarPic size="w-10 h-10"></AvatarPic>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className='cursor-pointer'>Change Password</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={logOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
    </DropdownMenu>
    </div>
    </>
  )
}
