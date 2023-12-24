"use client"
import * as React from "react"

import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation'

import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import { getLogin } from "./GetCookies";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [statusLogin, setstatusLogin] = useState("Welcome Back, Please Login")

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        const data_login = await getLogin(username, password)

        if (data_login) {
            router.push('/dashboard')
        }
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