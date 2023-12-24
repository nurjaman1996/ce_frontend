import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CE Dashboard App',
  description: 'Generated by PT Inovasi Media Kreatif',
}

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  const cookieStore: any = cookies();
  const isLogin = cookieStore.get("refreshToken");
  const dataLogin: any = isLogin.value != '' ? jwtDecode(isLogin.value) : null
  // const dataLogin: any = "Data"

  return (
    <div className='flex flex-col h-full'>
      <Navbar data={dataLogin} />

      <div className='flex h-full overflow-x-hidden overflow-y-hidden'>
        <div className="border-r">
          <Sidebar data={dataLogin} />
        </div>
        <div className='grow h-full overflow-x-hidden overflow-y-auto bg-[#F4F4F4] p-5'>
          {children}
        </div>
      </div>
    </div>
  )
}