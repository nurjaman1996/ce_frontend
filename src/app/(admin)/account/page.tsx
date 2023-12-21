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

export default function Supplier() {

    const [datasupplier, setdatasupplier]: any = useState([]);
    const [open, setopen]: any = useState(false);
    const [v_supplier, setv_supplier]: any = useState('');
    const [v_contact, setv_contact]: any = useState('');
    const [v_address, setv_address]: any = useState('');

    async function savesupplier() {
        console.log(v_supplier)
        console.log(v_contact)
        console.log(v_address)

        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/supplier`,
            data: {
                supplier: v_supplier,
                contact: v_contact,
                alamat: v_address
            }
        })
            .then(function (response) {
                // handle success
                loadatasupplier()
                setv_supplier("")
                setv_contact("")
                setv_address("")
                setopen(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const [searchSupplier, setsearchSupplier]: any = useState('');

    const filterSupplier: any = datasupplier.filter((dataSupplier: any) => {
        return (
            dataSupplier.supplier.toLocaleLowerCase().includes(searchSupplier.toLocaleLowerCase())
        );
    });

    const [openEdit, setopenEdit]: any = useState(false);
    const [e_id_sup, sete_id_sup]: any = useState('');
    const [e_supplier, sete_supplier]: any = useState('');
    const [e_contact, sete_contact]: any = useState('');
    const [e_address, sete_address]: any = useState('');

    async function editsupplier() {
        // console.log(e_id_sup)
        // console.log(e_supplier)
        // console.log(e_contact)
        // console.log(e_address)

        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/editSupplier`,
            data: {
                id_sup: e_id_sup,
                supplier: e_supplier,
                contact: e_contact,
                alamat: e_address
            }
        })
            .then(function (response) {
                loadatasupplier()
                setopenEdit(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async function deletesupplier(id_sup: any) {
        // console.log(id_sup)

        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/deleteSupplier`,
            data: {
                id_sup: id_sup
            }
        })
            .then(function (response) {
                loadatasupplier()
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async function loadatasupplier() {
        await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_HOST}/supplier`,
        })
            .then(function (response) {
                // handle success
                setdatasupplier(response.data.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    useEffect(() => {
        loadatasupplier()
    }, [])



    return (
        <div>
            <div className="font-bold text-2xl">
                Account
            </div>
            <div className="flex flex-nowrap mt-4">
                {/*  */}
                <div className="font-bold text-4xl">
                    <Input type="text" className='w-[400px] shadow-md' placeholder="Search User Account.." value={searchSupplier} onChange={(e) => { setsearchSupplier(e.currentTarget.value) }} />
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
                                    <Input type="text" placeholder="Name.." />
                                </div>
                            </div>
                            <div className='flex flex-row text-center mt-2 items-center'>
                                <div className='basis-1/4 font-bold text-right'>
                                    Warehouse :&nbsp;
                                </div>
                                <div className='basis-3/4'>
                                    <Select>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select Warehouse" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select Warehouse</SelectLabel>
                                                <SelectItem value="GUDANG-BATUNUNGGAL">GUDANG BATUNUNGGAL</SelectItem>
                                                <SelectItem value="GUDANG-DAGO">GUDANG DAGO</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='flex flex-row text-center mt-2 items-center'>
                                <div className='basis-1/4 font-bold text-right'>
                                    Roles :&nbsp;
                                </div>
                                <div className='basis-3/4'>
                                    <Select>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select Roles" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select Roles</SelectLabel>
                                                <SelectItem value="SUPER-ADMIN">SUPER ADMIN</SelectItem>
                                                <SelectItem value="CASHIER">CASHIER</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                                <Button onClick={() => { savesupplier() }}>Save</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            {/* {JSON.stringify(datasupplier)} */}
            <div className="mt-5 shadow-md">
                <Table className='border border-black-500'>
                    <TableHeader className='bg-gray-900'>
                        <TableRow>
                            <TableHead className="bg-gray-900 border text-center font-bold text-white w-[2%]">No</TableHead>
                            <TableHead className="bg-gray-900 border text-center font-bold text-white w-[10%]">Username</TableHead>
                            <TableHead className='bg-gray-900 border text-center font-bold text-white w-[20%]'>Name</TableHead>
                            <TableHead className='bg-gray-900 border text-center font-bold text-white w-[10%]'>Role</TableHead>
                            <TableHead className="bg-gray-900 border text-center font-bold text-white w-[10%]">Warehouse</TableHead>
                            <TableHead className="bg-gray-900 border text-center font-bold text-white w-[5%]">Status Account</TableHead>
                            <TableHead className="bg-gray-900 border text-center w-[5%] font-bold text-white">Act</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='bg-white'>
                        {filterSupplier.map((dataisi: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell className="border text-center w-[2%] font-bold">{index + 1}</TableCell>
                                <TableCell className="border text-center w-[10%]">Rico</TableCell>
                                <TableCell className="border text-center w-[20%]">Rico</TableCell>
                                <TableCell className="border text-center w-[10%]">SUPER-ADMIN</TableCell>
                                <TableCell className="border text-center w-[10%]">GUDANG BATUNUNGGAL</TableCell>
                                <TableCell className="border text-center w-[5%]"><span className='font-bold text-lime-600'>ACTIVE</span></TableCell>
                                <TableCell className="border text-center w-[5%]">

                                    <AlertDialog open={openEdit} onOpenChange={setopenEdit}>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="link" className=' text-white font-bold hover:bg-gray-200'
                                                onClick={() => {
                                                    setopenEdit(true)
                                                    sete_id_sup(dataisi.id_sup)
                                                    sete_supplier(dataisi.supplier)
                                                    sete_contact(dataisi.contact)
                                                    sete_address(dataisi.alamat)
                                                }}>
                                                <Icon.FileEdit color="#000000" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='w-[600px]'>
                                            <AlertDialogHeader className='border-b pb-4'>
                                                <AlertDialogTitle >Edit Account</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <div className='flex flex-row text-center mt-2 items-center'>
                                                <div className='basis-1/4 font-bold text-right'>
                                                    Name :&nbsp;
                                                </div>
                                                <div className='basis-3/4'>
                                                    <Input type="text" placeholder="Name.." />
                                                </div>
                                            </div>
                                            <div className='flex flex-row text-center mt-2 items-center'>
                                                <div className='basis-1/4 font-bold text-right'>
                                                    Warehouse :&nbsp;
                                                </div>
                                                <div className='basis-3/4'>
                                                    <Select>
                                                        <SelectTrigger className="">
                                                            <SelectValue placeholder="Select Warehouse" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Select Warehouse</SelectLabel>
                                                                <SelectItem value="GUDANG-BATUNUNGGAL">GUDANG BATUNUNGGAL</SelectItem>
                                                                <SelectItem value="GUDANG-DAGO">GUDANG DAGO</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className='flex flex-row text-center mt-2 items-center'>
                                                <div className='basis-1/4 font-bold text-right'>
                                                    Roles :&nbsp;
                                                </div>
                                                <div className='basis-3/4'>
                                                    <Select>
                                                        <SelectTrigger className="">
                                                            <SelectValue placeholder="Select Roles" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Select Roles</SelectLabel>
                                                                <SelectItem value="SUPER-ADMIN">SUPER ADMIN</SelectItem>
                                                                <SelectItem value="CASHIER">CASHIER</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                                                <Button onClick={() => {
                                                    editsupplier()
                                                }}>Update</Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle color="#000000" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='w-[600px]'>
                                            <AlertDialogHeader className='border-b pb-4'>
                                                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                                                <AlertDialogDescription>Data Account {dataisi.supplier} akan dihapus?</AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel >Cancel</AlertDialogCancel>
                                                <Button className='bg-red-400 font-bold'>Delete</Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >
        </div >
    )
}
