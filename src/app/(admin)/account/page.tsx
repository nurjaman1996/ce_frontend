'use client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as Icon from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function account() {

    const [isLoading, setisLoading]: any = useState(true);

    const [dataaccount, setdataaccount]: any = useState([]);
    const [open, setopen]: any = useState(false);

    const [v_name, setv_name]: any = useState('');
    const [v_role, setv_role]: any = useState('');

    async function saveaccount() {
        // console.log(v_name)
        // console.log(v_password)
        // console.log(v_role)

        if (v_name === "" || v_role === "") {
            alert("Mohon Lengkapi Data")
        } else {
            await axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_HOST}/auth/register`,
                data: {
                    name: v_name,
                    password: "123456789",
                    role: v_role
                }
            })
                .then(function (response) {
                    loadataaccount()
                    setopen(false)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
    }

    const [searchaccount, setsearchaccount]: any = useState('');

    const filteraccount: any = dataaccount.filter((dataaccount: any) => {
        return (
            dataaccount.name.toLocaleLowerCase().includes(searchaccount.toLocaleLowerCase()) ||
            dataaccount.username.toLocaleLowerCase().includes(searchaccount.toLocaleLowerCase())
        );
    });

    const [openEdit, setopenEdit]: any = useState(false);

    const [e_id, sete_id]: any = useState('');
    const [e_name, sete_name]: any = useState('');
    const [e_role, sete_role]: any = useState('');

    async function editaccount() {
        // console.log(e_id)
        // console.log(e_name)
        // console.log(e_role)

        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/auth/edit`,
            data: {
                id: e_id,
                name: e_name,
                role: e_role,
            }
        })
            .then(function (response) {
                loadataaccount()
                setopenEdit(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async function deleteaccount(id: any) {
        // console.log(id)

        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/auth/delete`,
            data: {
                id: id
            }
        })
            .then(function (response) {
                loadataaccount()
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async function loadataaccount() {
        setisLoading(true)
        await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getuser`,
        })
            .then(function (response) {
                setdataaccount(response.data.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        loadataaccount()
    }, [])


    if (isLoading) {
        <>
            Loading...
        </>
    } else {
        return (
            <div>
                <div className="font-bold text-2xl">
                    Account
                </div>
                <div className="flex flex-nowrap mt-4">
                    {/*  */}
                    <div className="font-bold text-4xl">
                        <Input type="text" className='w-[400px] shadow-md' placeholder="Search User Account.." value={searchaccount} onChange={(e) => { setsearchaccount(e.currentTarget.value) }} />
                    </div>

                    <div className="absolute right-5">
                        <AlertDialog open={open} onOpenChange={setopen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className='bg-gray-900 text-white font-bold hover:bg-gray-400'>Add New</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='w-[600px]'>
                                <AlertDialogHeader className='border-b pb-4'>
                                    <AlertDialogTitle >Add New Account</AlertDialogTitle>
                                </AlertDialogHeader>
                                <div className='flex flex-row text-center mt-2 items-center'>
                                    <div className='basis-1/4 font-bold text-right'>
                                        Name :&nbsp;
                                    </div>
                                    <div className='basis-3/4'>
                                        <Input type="text" placeholder="Name.." value={v_name} onChange={(e) => { setv_name(e.currentTarget.value) }} autoComplete="new-password" />
                                    </div>
                                </div>
                                {/* <div className='flex flex-row text-center mt-2 items-center'>
                                <div className='basis-1/4 font-bold text-right'>
                                    Password :&nbsp;
                                </div>
                                <div className='basis-3/4'>
                                    <Input type="password" placeholder="Password.." value={v_password} onChange={(e) => { setv_password(e.currentTarget.value) }} autoComplete="new-password" />
                                </div>
                            </div> */}
                                <div className='flex flex-row text-center mt-2 items-center'>
                                    <div className='basis-1/4 font-bold text-right'>
                                        Roles :&nbsp;
                                    </div>
                                    <div className='basis-3/4'>
                                        <Select value={v_role} onValueChange={(e) => { setv_role(e) }} >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select Roles" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="SUPER_ADMIN">SUPER ADMIN</SelectItem>
                                                    <SelectItem value="ADMIN_CUSTOMER">ADMIN CUSTOMER</SelectItem>
                                                    <SelectItem value="HEAD_WAREHOUSE">HEAD WAREHOUSE</SelectItem>
                                                    <SelectItem value="FINANCE">FINANCE</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                                    <Button onClick={() => { saveaccount() }}>Save</Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                {/* {JSON.stringify(dataaccount)} */}
                <div className="mt-5 shadow-md">
                    <Table className='border border-black-500'>
                        <TableHeader className='bg-gray-900'>
                            <TableRow>
                                <TableHead className="bg-gray-900 border text-center font-bold text-white w-[2%]">No</TableHead>
                                <TableHead className="bg-gray-900 border text-center font-bold text-white w-[10%]">Username</TableHead>
                                <TableHead className='bg-gray-900 border text-center font-bold text-white w-[20%]'>Name</TableHead>
                                <TableHead className='bg-gray-900 border text-center font-bold text-white w-[10%]'>Role</TableHead>
                                {/* <TableHead className="bg-gray-900 border text-center font-bold text-white w-[5%]">Status Account</TableHead> */}
                                <TableHead className="bg-gray-900 border text-center w-[5%] font-bold text-white">Act</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-white'>
                            {filteraccount.map((dataisi: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell className="border text-center w-[2%] font-bold">{index + 1}</TableCell>
                                    <TableCell className="border text-center w-[10%]">{dataisi.username}</TableCell>
                                    <TableCell className="border text-center w-[20%]">{dataisi.name}</TableCell>
                                    <TableCell className="border text-center w-[10%]">{dataisi.role}</TableCell>
                                    {/* <TableCell className="border text-center w-[5%]">
                                        {dataisi.login_status === "ACTIVED" ? <span className='font-bold text-lime-600'>{dataisi.login_status}</span> : <span className='font-bold text-red-600'>{dataisi.login_status}</span>}
                                    </TableCell> */}
                                    <TableCell className="border text-center w-[5%]">
                                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'
                                            onClick={() => {
                                                setopenEdit(true)
                                                sete_id(dataisi.id)
                                                sete_name(dataisi.name)
                                                sete_role(dataisi.role)
                                            }}>
                                            <Icon.FileEdit color="#000000" />
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle color="#000000" /></Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className='w-[600px]'>
                                                <AlertDialogHeader className='border-b pb-4'>
                                                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                                                    <AlertDialogDescription>Data Account {dataisi.account} akan dihapus?</AlertDialogDescription>
                                                </AlertDialogHeader>

                                                <AlertDialogFooter>
                                                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                                                    <Button onClick={() => { deleteaccount(dataisi.id) }} className='bg-red-400 font-bold'>Delete</Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <AlertDialog open={openEdit} onOpenChange={setopenEdit}>
                        <AlertDialogContent className='w-[600px]'>
                            <AlertDialogHeader className='border-b pb-4'>
                                <AlertDialogTitle >Add New Account</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className='flex flex-row text-center mt-2 items-center'>
                                <div className='basis-1/4 font-bold text-right'>
                                    Name :&nbsp;
                                </div>
                                <div className='basis-3/4'>
                                    <Input type="text" placeholder="Name.." value={e_name} onChange={(e) => { sete_name(e.currentTarget.value) }} autoComplete="new-password" />
                                </div>
                            </div>
                            <div className='flex flex-row text-center mt-2 items-center'>
                                <div className='basis-1/4 font-bold text-right'>
                                    Roles :&nbsp;
                                </div>
                                <div className='basis-3/4'>
                                    <Select defaultValue={`${e_role}`} value={e_role} onValueChange={(e) => { sete_role(e) }} >
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select Roles" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="SUPER_ADMIN">SUPER ADMIN</SelectItem>
                                                <SelectItem value="ADMIN_CUSTOMER">ADMIN CUSTOMER</SelectItem>
                                                <SelectItem value="HEAD_WAREHOUSE">HEAD WAREHOUSE</SelectItem>
                                                <SelectItem value="FINANCE">FINANCE</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                                <Button onClick={() => { editaccount() }}>Save</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div >
            </div >
        )
    }

}
