import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { UserAuthForm } from "@/components/User-auth-form"

export const metadata: Metadata = {
  title: "CE Login App",
}

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AuthenticationPage() {


  const cookieStore: any = cookies();
  const isLogin = cookieStore.has("refreshToken");

  if (!isLogin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="lg:p-8">
          <div className="flex items-center">
            <Image
              className='mx-auto aspect-square h-20 w-auto'
              src="/logo.png"
              width={500}
              height={500}
              alt="Picture of the author"
              priority={true}
            />
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              © Copyright - Ce Corp 2023
            </p>
          </div>
        </div>
      </div>
    )
  } else {
    redirect('/dashboard')
  }


}