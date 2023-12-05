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
      url: 'http://139.180.130.182:4000/supplier',
      data: {
        supplier: v_supplier,
        contact: v_contact,
        alamat: v_address
      }
    })
      .then(function (response) {
        // handle success
        loadatasupplier()
        setopen(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  async function loadatasupplier() {
    await axios({
      method: 'get',
      url: 'http://139.180.130.182:4000/supplier',
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
      <div className="font-bold text-4xl">
        Supplier
      </div>
      <div className="flex flex-nowrap mt-4">
        {/*  */}
        <div className="font-bold text-4xl">
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Supplier.." />
        </div>

        <div className="absolute right-5">
          <AlertDialog open={open} onOpenChange={setopen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className='bg-black text-white font-bold hover:bg-gray-200'>Add New</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[600px]'>
              <AlertDialogHeader className='border-b pb-4'>
                <AlertDialogTitle >Add New Supplier</AlertDialogTitle>
              </AlertDialogHeader>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-center'>
                  Supplier :
                </div>
                <div className='basis-3/4'>
                  <Input type="text" value={v_supplier} onChange={(e) => { setv_supplier(e.currentTarget.value) }} placeholder="Supplier.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-center'>
                  Contact :
                </div>
                <div className='basis-3/4'>
                  <Input type="text" value={v_contact} onChange={(e) => { setv_contact(e.currentTarget.value) }} placeholder="Contact.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-top'>
                <div className='basis-1/4 font-bold text-center'>
                  Address :
                </div>
                <div className='basis-3/4'>
                  <Textarea className='border w-full' value={v_address} onChange={(e) => { setv_address(e.currentTarget.value) }} placeholder="Address.." />
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
      {JSON.stringify(datasupplier)}
      <div className="mt-5 shadow-md">
        <Table className='border border-black-500'>
          <TableHeader className='bg-gray-700'>
            <TableRow>
              <TableHead className="border text-center font-bold text-white w-[50px]">No</TableHead>
              <TableHead className="border text-center font-bold text-white w-[150px]">ID Supplier</TableHead>
              <TableHead className='border text-left font-bold text-white'>Name</TableHead>
              <TableHead className='border text-left font-bold text-white'>Contact</TableHead>
              <TableHead className="border text-left font-bold text-white">Address</TableHead>
              <TableHead className="border  w-[100px] font-bold text-white">Act</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {datasupplier.map((dataisi: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="border text-center w-[50px] font-bold">{index + 1}</TableCell>
                <TableCell className="border text-center w-[50px]">{dataisi.id_sup}</TableCell>
                <TableCell className="border text-center w-[50px]">{dataisi.supplier}</TableCell>
                <TableCell className="border text-center w-[50px]">{dataisi.contact}</TableCell>
                <TableCell className="border text-center w-[50px]">{dataisi.alamat}</TableCell>
                <TableCell className="border w-[50px]">

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Edit Supplier</AlertDialogTitle>
                      </AlertDialogHeader>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-center'>
                          Supplier :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Supplier.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-center'>
                          Contact :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Contact.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-top'>
                        <div className='basis-1/4 font-bold text-center'>
                          Address :
                        </div>
                        <div className='basis-3/4'>
                          <Textarea className='border w-full' placeholder="Address.." />
                        </div>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                        <Button >Save</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle color="#ff0000" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Delet Supplier</AlertDialogTitle>
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
