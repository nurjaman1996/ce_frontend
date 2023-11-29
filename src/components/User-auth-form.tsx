"use client"

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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [statusLogin, setstatusLogin] = useState("Welcome Back, Please Login")

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [token, settoken] = useState("")

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        axios.post(`${process.env.NEXT_PUBLIC_HOST}/auth/login`, {
            username: username,
            password: password
        }).then(function (response) {
            setTimeout(() => {
                settoken(response.data.accessToken)
                const decode: any = jwtDecode(response.data.accessToken)
                setIsLoading(false)
                router.push('/dashboard')
            }, 1000)
        }).catch(function (error) {
            setTimeout(() => {
                console.log(error.response.data.message);
                setstatusLogin(error.response.data.message);
                setIsLoading(false)
            }, 1000)
        });
    }

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">

                <h1 className="text-2xl font-semibold tracking-tight">
                    CE CORP
                </h1>
                <p className="text-sm text-muted-foreground">
                    {statusLogin}
                </p>
            </div>

            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-3">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="username">
                                Email
                            </Label>
                            <Input
                                id="username"
                                value={username}
                                placeholder="Username or Email"
                                type="text"
                                autoComplete="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => {
                                    setusername(e.currentTarget.value)
                                }}
                            />
                        </div>

                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                                Email
                            </Label>
                            <Input
                                id="password"
                                value={password}
                                placeholder="Password"
                                type="password"
                                autoComplete="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => {
                                    setpassword(e.currentTarget.value)
                                }}
                            />
                        </div>
                        <Button
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <Icons.CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}