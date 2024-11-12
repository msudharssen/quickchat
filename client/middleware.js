import React from 'react'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default function middleware(request) {
  console.log("Middleware Running")
  const cookieStore = cookies()
  let values = cookieStore.get('userLoggedIn')


  const currentPath = request.nextUrl.pathname

  // Prevent redirect loops by checking if the user is already on the target page
  if (!values && currentPath !== '/') {
    return NextResponse.redirect('http://localhost:3000')
  }

  if (values && currentPath !== '/chatbox') {
    return NextResponse.redirect('http://localhost:3000/chatbox')
  }

  // Allow the request to proceed without redirection if on the correct page
  return NextResponse.next()
}


export const config = {
    matcher: ['/chatbox', '/']
}