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
        // Emit the message only if user is online/exists
        sock.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
    }
  };

  

  useEffect(() => {
    if (!sock) {
      console.log("NO SOCKET FOUND");
      return;
    }
  
    //get previous message upon login
    sock.on("receive_message", (message) =>{
      console.log("Recieved Message:" , message)
      if(message.target === myName){
        setMessageList((prevMessages) => [...prevMessages, message]);
      }
    });
  
  
    return () => {
      sock.off("receive_message");
    };
  }, [sock, username]);




  return (
    <>
   
     <div className="flex flex-col h-[500px] w-[400px] max-w-md border border-gray-300 rounded-lg shadow-lg bg-gray-800 text-white">
      <div className="bg-gray-700 p-4 rounded-t-lg text-center text-lg font-semibold">
        {username}
      </div>

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
