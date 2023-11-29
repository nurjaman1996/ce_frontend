"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { getToken } from "@/helpers/GetToken"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [Token, setToken]: any = useState("")

  useEffect(() => {
    refreshToken()
  }, [])

  async function refreshToken() {
    const dataToken = await getToken()
    setToken(dataToken)
    // console.log(jwtDecode(dataToken.accessToken))
  }


  return (
    <div className="w-full">
      test edit
    </div>
  )
}
