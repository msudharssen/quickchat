import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import { Button } from './ui/button'
import {
  Card,
  CardBody,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar } from '@radix-ui/react-avatar';
import AvatarPic from "./AvatarPic"





export default function Messagebox({sock, username, list}) {
  // const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState("")
  let myName = localStorage.getItem('name')
  console.log("LIST IS", list)


  useEffect(() => {
    setMessageList(list);
  }, [list]);

  function send(word){
    setCurrentMessage(word)
  }

  const sendMessage = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/sendmessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: myName, target: username, message: currentMessage, number: 1}),
        credentials: "include"
      })
      const json = await response.json();
      console.log(json)
    } catch (err) {
      console.log(err)
    }
    if (currentMessage !== "") {
      const messageData = {
        target: username,
        message: currentMessage,
        user: myName
      };
        // Emit the message only if the socket exists
        sock.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
    }
  };

  // useEffect(() => {
  //   if(!sock){
  //     console.log("NO SOCKET FOUND")
  //   };

  //   // async function getIt(){
  //   //     try {
  //   //         const response = await fetch('http://localhost:3002/api/retrievemessage', {
  //   //           method: 'POST',
  //   //           headers: { 'Content-Type': 'application/json' },
  //   //           body: JSON.stringify({ rec, user }),
  //   //           credentials: "include"
  //   //         })
  //   //         const json = await response.json();
  //   //         console.log(json)
  //   //         setMessageList((list) => [...list, json.Message])
  //   //       } catch (err) {
  //   //         console.log(err)
  //   //       }
  //   //   }
  //   //   getIt();
   
  //   // Listen for new messages in real-time
  //   const handleReceiveMessage = (message) => {
  //     if (message.target === username) {
  //       setMessageList((prevMessages) => [...prevMessages, message]);
  //       console.log(messageList)
  //     }
  //   };

  //   sock.on("receive_message", (data) => {
  //     if (data.target === myName) {
  //       setMessageList((prevMessages) => [...prevMessages, data]);
  //       console.log(data);
  //     }
  //   });
    

  //   // Clean up the listener on unmount
  //   return () => {
  //     sock.off('recieve_message', handleReceiveMessage);
  //   };
    
  // }, [sock, username]);

  useEffect(() => {
    if (!sock) {
      console.log("NO SOCKET FOUND");
      return;
    }
  
    // const handleReceiveMessage = (message) => {
    //   console.log("Received message:", message); // Log the received message
    //   if (message.target === myName) {
    //     setMessageList((prevMessages) => [...prevMessages, message]);
    //   }
    // };
  
    // Listen for new messages in real-time
    sock.on("receive_message", (message) =>{
      console.log("Recieved Message:" , message)
      if(message.target === myName){
        setMessageList((prevMessages) => [...prevMessages, message]);
      }
    });
  
  
    // Clean up the listener on unmount
    return () => {
      sock.off("receive_message");
    };
  }, [sock, username]);




  return (
    <>
    {/* <Card>
    <CardTitle>
      <h2>Chat with {username}</h2>
      </CardTitle>
      <CardBody>
        <CardContent>
        <ScrollToBottom className='bg-gray-600'>
        {messageList.map((msg, index) => {
          return(
          <div key={index} className={msg.target === username ? 'text-yellow-100' : 'text-green-400'}>
            <p>{msg.message}</p>
          </div>
        )})}
        </ScrollToBottom>
        </CardContent>
        </CardBody>
      <CardFooter>
      <input
        type="text"
        placeholder="Type a message..."
        onChange ={(e)=>{send(e.target.value)}}
      />
      <Button onClick={sendMessage}></Button>
      </CardFooter>
    </Card> */}
    {/* <div className="overflow-scroll bg-black border border-green-500">
      <div className="px-7 items-center text-lg">
        <div className="flex items-center justify-between">
          <div id="friendId" className="group flex items-center text-lg text-white">
            {username}
          </div>
        </div>
      </div>
      <div className="p-6 text-sm overflow-scroll">
      <div className='bg-gray-600'>
        {messageList.map((msg) => {
          return(
          <div className={msg.target === username ? 'text-yellow-500' : 'text-green-400'}>
            <p>{msg.message}</p>
            <Separator></Separator>
          </div>
        )})}
        </div>
      </div>
      <div className="flex flex-row items-center border-t px-6 py-3 gap-2">
        <Input className="border-lime-500 bg-slate-400 text-black" value={currentMessage}onChange={e => send(e.target.value)} onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}></Input>
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div> */}
     <div className="flex flex-col h-[500px] w-[400px] max-w-md border border-gray-300 rounded-lg shadow-lg bg-gray-800 text-white">
      {/* Chat Header */}
      <div className="bg-gray-700 p-4 rounded-t-lg text-center text-lg font-semibold">
        {username}
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        <div className="flex flex-col gap-2">
          {messageList.map((msg) => (
            <div
              className={`p-2 rounded-md max-w-xs ${
                msg.target === username ? 'bg-blue-600 self-end' : 'bg-yellow-600 self-start'
              }`}
            >
              <p className="text-sm">
                <span className="font-bold"></span> {msg.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 p-4 bg-gray-700 rounded-b-lg">
        <Input
          type="text"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 bg-black-600 text-black p-2 rounded-md"
        />
        <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md">
          Send
        </Button>
      </div>
    </div>
    </>
  );
}
