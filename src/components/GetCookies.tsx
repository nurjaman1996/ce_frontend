"use server"
import * as React from "react"
import axios from "axios"
axios.defaults.withCredentials = true

import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation'

import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { cookies } from 'next/headers'

export async function getLogin(username: any, password: any) {
    const data: any = []
    const login: any = []

    await axios.post(`${process.env.NEXT_PUBLIC_HOST}/auth/login`, {
        username: username,
        password: password
    }).then(function (response) {
        data.push(response.data.accessToken)
        cookies().set('refreshToken', response.data.accessToken)
        login.push(true)
    }).catch(function (error) {
        data.push(error.response.data.message);
        login.push(false)
    })

    // cookies().set({
    //     name: 'refreshToken',
    //     value: data,
    //     httpOnly: true,
    //     sameSite: 'none'
    // })

    return { data, login }
}

export async function getLogout() {
    cookies().delete('refreshToken')
}