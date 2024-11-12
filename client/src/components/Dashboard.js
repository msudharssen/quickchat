'use client'
import { useState, useEffect } from "react"
import Contactlist from "./Contactlist"
import NavbarUser from "./NavbarUser"


import {socket} from "./Socket"


export function Dashboard() {
  let myName = localStorage.getItem('name')
  const[friends, setFriends] = useState([])
  const[status, setStatus] = useState([])
  

  useEffect(() => {
    socket.on("connect", () => {
      console.log("My Id is", socket.id);
      socket.emit("join_room", myName);
    });

    return () => {
      socket.off("connect"); // Remove the listener when component unmounts
    };
  }, [myName]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-zinc-950">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="relative top-0 z-30 w-full flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <NavbarUser></NavbarUser>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <Contactlist socket={socket}></Contactlist>
        </main>
      </div>
    </div>
  )
}
