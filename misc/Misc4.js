"use client"
import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Button } from "@/components/ui/button"
import AvatarPic from '../client/src/components/AvatarPic'
  

const UserNav = function() {


  async function endCookie(e){
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      })
      const json = await response.json();
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
  <Menubar className="w-fit border-none justify-end p-4 bg-none">
  <MenubarMenu>
    <MenubarTrigger className='active:bg-black'><AvatarPic></AvatarPic></MenubarTrigger>
    <MenubarContent>
      <MenubarItem className='cursor-pointer'>
       Change Password
      </MenubarItem>
      <MenubarItem onClick={endCookie} className='cursor-pointer'>
      Log Out
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>

</>

  )
}
export default UserNav;