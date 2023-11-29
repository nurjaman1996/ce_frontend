"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { getToken } from "@/helpers/GetToken"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
