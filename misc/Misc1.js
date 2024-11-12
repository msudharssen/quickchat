'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AvatarPic from "../client/src/components/AvatarPic"
import { TextBox } from './Misc3'
import { Button } from '../client/src/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"





export default function Misc1({mess, username}) {
    const [target, setTarget] = useState("");
    const [message, setMessage] = useState("");
    const [incoming, setIncoming] = useState("");
    const user = localStorage.getItem('name');
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);




    function gatherMessage(mess){
        let row = document.getElementById('friendId')
        let name = row.innerText
        setTarget(name)
        setMessage(mess)
        console.log(mess)
        setCurrentMessage(mess)

    }
      
     const sendMessage = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/sendmessages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, message, user }),
          credentials: "include"
        })
        const json = await response.json();
        console.log(json)
      } catch (err) {
        console.log(err)
      }
      if (currentMessage !== "") {
        const messageData = {
          author: user,
          message: currentMessage,
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    };
  


      

    


  return (
    <div className="border-none mt-10">
    <Card className="overflow-scroll bg-black border border-green-500">
      <CardHeader className="px-7 items-center text-lg">
        <div className="flex items-center gap-5 justify-between">
          <CardTitle id="friendId" className="group flex items-center text-lg text-white">
            {username}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm overflow-scroll">
        {mess && mess.length > 0 ? mess.map((content) => {
          if(content.from === username){
            return (<><div className="flex gap-1 justify-end text-yellow-100">
            {content.message}<AvatarPic size="size-5"></AvatarPic>
          </div>
          <Separator className="my-4" /></>)
          }
        }) : <p className='text-green-400'>NO MESSAGES</p>}
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t px-6 py-3 gap-2">
        <Input className="border-lime-500 bg-slate-400 text-black" onChange={e => gatherMessage(e.target.value)}></Input>
        <Button onClick={sendMessage}>Send</Button>
      </CardFooter>
    </Card>
    </div>
    
  )
}
