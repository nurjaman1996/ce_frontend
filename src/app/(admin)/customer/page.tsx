"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { useEffect, useState } from 'react'
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

import axios from 'axios'

export default function Customer() {

  const [isLoading, setisLoading]: any = useState(true)
  const [dataCustomer, setdataCustomer]: any = useState([])

  async function lodaDashboard() {
    await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/customer`,
    })
      .then(function (response) {
        setdataCustomer(response.data)
        setisLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    lodaDashboard()
  }, [])

  if (isLoading) {
    return (
      <div>
        Loading Data...
      </div>
    )
  } else {

    return (
      <div>
        <div className="font-bold text-4xl text-red-500">
          Customer
        </div>
        <div className="flex flex-nowrap mt-4">
          {/*  */}
          <div className="font-bold text-4xl">
            <Input type="text" className='w-[400px] shadow-md' placeholder="Search Customer.." />
          </div>
          <div className="absolute right-5">
            <AlertDialog >
              <AlertDialogTrigger asChild>
                <Button variant="outline" className='bg-black text-white font-bold hover:bg-gray-200'>Add New</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='w-[600px]'>
                <AlertDialogHeader className='border-b pb-4'>
                  <AlertDialogTitle >Add New Customer</AlertDialogTitle>
                </AlertDialogHeader>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Customer :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Supplier.." />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Contact :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Contact.." />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-top'>
                  <div className='basis-1/4 font-bold text-left'>
                    Address :
                  </div>
                  <div className='basis-3/4'>
                    <Textarea className='border w-full' placeholder="Address.." />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kelurahan :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Kelurahan.." />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kecamatan :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Kecamatan.." />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kota :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Kota.." />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kode Pos :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="number" placeholder="Kode Pos.." />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className='bg-red-400 font-bold text-white'>Cancel</AlertDialogCancel>
                  <Button>Save</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* {JSON.stringify(dataCustomer.data)} */}

        <div className="mt-5 shadow-md">
          <Table className='border'>
            <TableHeader className='bg-red-400 '>
              <TableRow>
                <TableHead className="border w-[50px] text-center font-bold text-white">No</TableHead>
                <TableHead className="border w-[120px] text-center font-bold text-white">ID Customer</TableHead>
                <TableHead className="border w-[300px] text-left font-bold text-white">Name</TableHead>
                <TableHead className="border text-center font-bold text-white">HP</TableHead>
                <TableHead className="border text-center font-bold text-white">Address</TableHead>
                <TableHead className="border text-center font-bold text-white">Kel</TableHead>
                <TableHead className="border text-center font-bold text-white">Kec</TableHead>
                <TableHead className="border text-center font-bold text-white">Kota</TableHead>
                <TableHead className="border text-center font-bold text-white">Kode Pos</TableHead>
                <TableHead className="border w-[100px] text-center font-bold text-white">Act</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white'>
              {dataCustomer.data.map((dataisi: any, index: number) => (
                <TableRow key={dataisi.id}>
                  <TableCell className="border w-[50px] text-center font-bold">{index + 1}</TableCell>
                  <TableCell className="border w-[120px] text-center font-medium">{dataisi.id_cust}</TableCell>
                  <TableCell className="border font-medium text-left">{dataisi.customer}</TableCell>
                  <TableCell className="border text-center">{dataisi.hp}</TableCell>
                  <TableCell className="border text-center">{dataisi.alamat}</TableCell>
                  <TableCell className="border text-center">{dataisi.kel}</TableCell>
                  <TableCell className="border text-center">{dataisi.kec}</TableCell>
                  <TableCell className="border text-center">{dataisi.kota}</TableCell>
                  <TableCell className="border text-center">{dataisi.kodepos}</TableCell>
                  <TableCell className="border w-[100px]">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='w-[600px]'>
                        <AlertDialogHeader className='border-b pb-4'>
                          <AlertDialogTitle >Edit Customer</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Customer :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Supplier.." />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Contact :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Contact.." />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-top'>
                          <div className='basis-1/4 font-bold text-left'>
                            Address :
                          </div>
                          <div className='basis-3/4'>
                            <Textarea className='border w-full' placeholder="Address.." />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kelurahan :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Kelurahan.." />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kecamatan :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Kecamatan.." />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kota :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Kota.." />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kode Pos :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="number" placeholder="Kode Pos.." />
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
                          <AlertDialogTitle >Delete Customer</AlertDialogTitle>
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
        </div>
      </div>
    )
  }
}
