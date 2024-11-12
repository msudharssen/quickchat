"use client";
import Image from "next/image";
import Login from "@/components/Login"
import Signup from "@/components/Signup";
import { useState } from "react";
import { useContext } from "react";
import Intro from "@/components/Intro";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {

  const track = useState([])

  return (
    <div className="">
    <Intro/>
    {/* <Login></Login> */}
    {/* <Signup></Signup> */}
    {/* <Dashboard></Dashboard> */}
    </div>
  );
}
