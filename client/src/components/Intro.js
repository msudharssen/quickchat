import React from 'react'
import { Button } from "@/components/ui/button"
import LogMeIn from './LogMeIn'
import SignMeUp from './SignMeUp'


export default function Intro() {
  return (
    <div className="items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className='text-white text-4xl font-sans'>Welcome To Swoosh</p>
        <br></br>
        <div className='flex space-x-2'>
        <Button className='container mx-auto rounded-xl font-sans text-xl'>
        <LogMeIn/>
        </Button>
        <Button className='container mx-auto rounded-xl font-sans text-xl bg-sky-500 hover:bg-sky-600'>
        <SignMeUp/>
        </Button>
        </div>
    </div>
  )
}
