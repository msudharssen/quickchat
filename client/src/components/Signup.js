import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { send } from "process"
import { useState, useEffect } from "react"

 const Signup = function() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    async function sendInfo() {
      const userInfo = {username: `${username}`, email: `${email}`, password: `${password}` }
      try {
        const response = await fetch('http://localhost:3002/call/routereg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userInfo),
          credentials: "include"
        })
        const json = await response.json();
        if(json.userExists){
          console.log(json)
          router.push('/')
        }
        else{
          console.log(json)
          alert(json.message)
        }
      } catch (err) {
        console.log(err)
      }
    }

  

  return (
    <Card className="mx-auto max-w-sm bg-stone-950 border-sky-500">
      <CardHeader>
        <CardTitle className="text-2xl self-center text-gray-100">Create Account</CardTitle>
        <CardDescription className="text-slate-100">
          Choose an Username, Email and Password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="Username" className="text-slate-100">Username</Label>
            <Input onChange={e => setUsername(e.target.value)}
              id="username"
              type="text"
              required
              autocomplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-100">Email</Label>
            <Input onChange={e => setEmail(e.target.value)}
              id="email"
              type="text"
              required
              autocomplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-100">Password</Label>
            <Input onChange={e =>setPassword(e.target.value)}
              id="password"
              type="password"
              required
              autocomplete="off"
            />
          </div>
          <Button onClick={sendInfo} type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
            Sign Up
          </Button>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default Signup;