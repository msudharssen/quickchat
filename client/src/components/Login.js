'use client'
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
import {useState, useEffect} from 'react' 
import { redirect, useRouter } from 'next/navigation'
import { Redirect } from "next"


 const Login = function() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    


    async function sendInfo(e) {
      e.preventDefault()
      try {
        const response = await fetch('http://localhost:3002/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          credentials: "include"
        })
        const json = await response.json();
        if(json.userExists){
          console.log(json)
          localStorage.setItem('name', json.name);
          router.push('/chatbox')
        }
        else{
          console.log(json)
          alert('Incorrect Login Credentials')
        }
      } catch (err) {
        console.log(err)
      }
    }




  return (
    <Card className="mx-auto max-w-sm bg-stone-950 border-green-600">
      <CardHeader>
        <CardTitle className="text-2xl self-center text-gray-100">Login</CardTitle>
        <CardDescription className="text-slate-100">
          Enter Your Username and Password to Login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username" className="text-slate-100">Username</Label>
            <Input
              id="username"
              type="text"
              required
              autocomplete="off"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-slate-100">Password</Label>
              <Link href="/signup" className="ml-auto inline-block text-sm underline text-slate-100">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required autocomplete="off" onChange={e => setPassword(e.target.value)}/>
          </div>
          <Button type="submit" onClick={sendInfo}className="w-full">Log In</Button>
          <Button type="submit" className="w-full">Continue with Google</Button>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
