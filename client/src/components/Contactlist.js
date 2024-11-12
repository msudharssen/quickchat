'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import AvatarPic from "./AvatarPic"
import { Input } from "@/components/ui/input"
import { BellIcon, ChatIcon } from '@heroicons/react/outline';




import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Tabs,
    TabsContent,
  } from "@/components/ui/tabs"
import { Button } from './ui/button'
import Messagebox from './Messagebox'

export default function Contactlist({socket}) {




    const[chatName, setChatName] = useState("")
    const[friends, setFriends] = useState([])
    const[status, setStatus] = useState([])
    const[msgFrom, setMsgFrom] = useState("")
    const [messageList, setMessageList] = useState([])
    const [showChat, setShowChat] = useState(false);
    const [myMap, setMyMap] = useState(new Map())
    let myName = localStorage.getItem('name')



     function handleClick(val){
        getContact(val); 
        setShowChat(!showChat)
    };
  

    async function getContact(val){
        setShowChat(!showChat)
        let row = document.getElementById(val)
        let username = row.querySelector("#username"); 
        const selectedChatName = username.innerText; 
        setChatName(selectedChatName); 
        console.log("Chatname is: ", selectedChatName)
        setMsgFrom("")

         try {
          const response = await fetch('http://localhost:3002/api/retrievemessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: myName, rec: selectedChatName }),
            credentials: "include"
          });
          const json = await response.json();
          console.log(json)
          let data = await json.Message
          console.log(data)
          const messages = data.messages[0].map((msg) => ({
            target: msg.receiver_id === data.user ? myName : selectedChatName,
            message: msg.message,
            user: msg.sender_id === data.user ? myName : selectedChatName

        }));
         setMessageList(messages);
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(() => {
      async function bonjour(){
        try {
          const response = await fetch('http://localhost:3002/api/friendslist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: myName }),
            credentials: "include"
          });
          const json = await response.json();
          console.log(json);
          setFriends(json.friends);
          setStatus(json.stat)
        } catch (err) {
          console.log(err);
        }
      };
      bonjour();

      socket.on("receive_message", (data) => {
        setMsgFrom(data.user)
      })

    }, [socket]);


  return (
    <>
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            </div>
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card className="bg-black border border-green-400" x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7 items-center">
                    <CardTitle className="text-yellow-300">My Contacts</CardTitle>
                    <CardDescription className="text-yellow-300">
                      Find All Contacts Here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table  className="overflow-scroll bg-slate-800 text-white">
                      <TableHeader >
                        <TableRow className="border border-black ">
                          <TableHead className="text-orange-300">Username</TableHead>
                          <TableHead className="hidden sm:table-cell text-orange-300">
                            Status
                          </TableHead>
                          <TableHead className="hidden sm:table-cell text-center text-orange-300">
                            Inbox
                         </TableHead>
                         <TableHead className="hidden sm:table-cell text-center">
                         </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="cursor-default">
                      {friends && friends.length > 0 ? (friends.map((element, index) =>  ( 
                            <TableRow id={index} className="bg-accent bg-slate-800 border border-black">
                            <TableCell id="username">
                              {element}
                            </TableCell>
                            <TableCell id="status" className="hidden sm:table-cell">
                                {status[index]}
                            </TableCell>
                            <TableCell id="messages" className="hidden md:table-cell text-center">
                            {element === msgFrom ? <svg className="w-6 h-6 text-green-500  justify-self-end mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
               <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
           </svg> : <svg className="w-6 h-6 text-white-800 dark:text-white mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
  </svg>}
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-center">
                            <Button onClick={() => getContact(`${index}`)} className="size-1 bg-sky-400 text-black  hover:bg-green-500 hover:text-black">chat</Button>
                            </TableCell>
                          </TableRow>
                        ))):(<p>No friends available</p>) }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {showChat ? <Messagebox sock={socket} username={chatName} list={messageList}/>
 : <p>No friends available</p>}
          </>
  )
}


