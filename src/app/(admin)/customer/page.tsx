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

  async function loadCustomer() {
    await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/customer`,
    })
      .then(function (response) {
        setdataCustomer(response.data.data)
        setisLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const [searchcustomer, setsearchcustomer]: any = useState('');

  const filtercustomer: any = dataCustomer.filter((data: any) => {
    return (
      data.customer.toLocaleLowerCase().includes(searchcustomer.toLocaleLowerCase())
    );
  });

  useEffect(() => {
    loadCustomer()
  }, [])

  const [open, setopen]: any = useState(false);
  const [v_customer, setv_customer]: any = useState('');
  const [v_hp, setv_hp]: any = useState('');
  const [v_alamat, setv_alamat]: any = useState('');
  const [v_kel, setv_kel]: any = useState('');
  const [v_kec, setv_kec]: any = useState('');
  const [v_kota, setv_kota]: any = useState('');
  const [v_kodepos, setv_kodepos]: any = useState('');

  async function saveCustomer() {
    if (v_customer === "" || v_hp === "" || v_alamat === "" || v_kel === "" || v_kec === "" || v_kota === "" || v_kodepos === "") {
      alert("Mohon lengkapi Formulir")
    } else {
      // console.log(v_customer)
      // console.log(v_hp)
      // console.log(v_alamat)
      // console.log(v_kel)
      // console.log(v_kec)
      // console.log(v_kota)
      // console.log(v_kodepos)

      await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/addcustomer`,
        data: {
          customer: v_customer,
          hp: v_hp,
          alamat: v_alamat,
          kel: v_kel,
          kec: v_kec,
          kota: v_kota,
          kodepos: v_kodepos,
        }
      })
        .then(function (response) {
          loadCustomer()
          setv_customer("")
          setv_hp("")
          setv_alamat("")
          setv_kel("")
          setv_kec("")
          setv_kota("")
          setv_kodepos("")
          setopen(false)
        })
        .catch(function (error) {
          console.log(error);
        })
    }

  }

  const [openEdit, setopenEdit]: any = useState(false);
  const [e_id_cust, sete_id_cust]: any = useState('');
  const [e_customer, sete_customer]: any = useState('');
  const [e_hp, sete_hp]: any = useState('');
  const [e_alamat, sete_alamat]: any = useState('');
  const [e_kel, sete_kel]: any = useState('');
  const [e_kec, sete_kec]: any = useState('');
  const [e_kota, sete_kota]: any = useState('');
  const [e_kodepos, sete_kodepos]: any = useState('');

  async function editCustomer() {
    // console.log(e_id_cust)
    // console.log(e_customer)
    // console.log(e_hp)
    // console.log(e_alamat)
    // console.log(e_kel)
    // console.log(e_kec)
    // console.log(e_kota)
    // console.log(e_kodepos)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/editcustomer`,
      data: {
        id_cust: e_id_cust,
        customer: e_customer,
        hp: e_hp,
        alamat: e_alamat,
        kel: e_kel,
        kec: e_kec,
        kota: e_kota,
        kodepos: e_kodepos
      }
    })
      .then(function (response) {
        loadCustomer()
        sete_id_cust("")
        sete_customer("")
        sete_hp("")
        sete_alamat("")
        sete_kel("")
        sete_kec("")
        sete_kota("")
        sete_kodepos("")
        setopenEdit(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function deleteCustomer(id_cust: any) {
    console.log(id_cust)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/deletecustomer`,
      data: {
        id_cust: id_cust
      }
    })
      .then(function (response) {
        loadCustomer()
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  if (isLoading) {
    return (
      <div>
        Loading Data...
      </div>
    )
  } else {

    return (
      <div>
        <div className="font-bold text-4xl">
          Customer
        </div>
        <div className="flex flex-nowrap mt-4">
          {/*  */}
          <div className="font-bold text-4xl">
            <Input type="text" className='w-[400px] shadow-md' placeholder="Search Customer.." value={searchcustomer} onChange={(e) => { setsearchcustomer(e.currentTarget.value) }} />
          </div>
          <div className="absolute right-5">
            <AlertDialog open={open} onOpenChange={setopen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className='bg-gray-900 text-white font-bold hover:bg-gray-200'>Add New</Button>
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
                    <Input type="text" placeholder="Supplier.." value={v_customer} onChange={(e) => { setv_customer(e.currentTarget.value) }} />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Contact :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Contact.." value={v_hp} onChange={(e) => { setv_hp(e.currentTarget.value) }} />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-top'>
                  <div className='basis-1/4 font-bold text-left'>
                    Address :
                  </div>
                  <div className='basis-3/4'>
                    <Textarea className='border w-full' placeholder="Address.." value={v_alamat} onChange={(e) => { setv_alamat(e.currentTarget.value) }} />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kelurahan :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Kelurahan.." value={v_kel} onChange={(e) => { setv_kel(e.currentTarget.value) }} />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kecamatan :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Kecamatan.." value={v_kec} onChange={(e) => { setv_kec(e.currentTarget.value) }} />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kota :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Kota.." value={v_kota} onChange={(e) => { setv_kota(e.currentTarget.value) }} />
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kode Pos :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="number" placeholder="Kode Pos.." value={v_kodepos} onChange={(e) => { setv_kodepos(e.currentTarget.value) }} />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className='bg-red-400 font-bold text-white'>Cancel</AlertDialogCancel>
                  <Button onClick={() => { saveCustomer() }}>Save</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* {JSON.stringify(dataCustomer.data)} */}

        <div className="mt-5 shadow-md">
          <Table className='border'>
            <TableHeader className='bg-gray-900'>
              <TableRow>
                <TableHead className="bg-gray-900 border w-[50px] text-center font-bold text-white">No</TableHead>
                <TableHead className="bg-gray-900 border w-[120px] text-center font-bold text-white">ID Customer</TableHead>
                <TableHead className="bg-gray-900 border w-[300px] text-left font-bold text-white">Name</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">HP</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Address</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Kel</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Kec</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Kota</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Kode Pos</TableHead>
                <TableHead className="bg-gray-900 border w-[150px] text-center font-bold text-white">Act</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white'>
              {filtercustomer.map((dataisi: any, index: number) => (
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
                  <TableCell className="border w-[150px]">
                    <AlertDialog open={openEdit} onOpenChange={setopenEdit}>
                      <AlertDialogTrigger asChild>
                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'
                          onClick={() => {
                            setopenEdit(true)
                            sete_id_cust(dataisi.id_cust)
                            sete_customer(dataisi.customer)
                            sete_hp(dataisi.hp)
                            sete_alamat(dataisi.alamat)
                            sete_kel(dataisi.kel)
                            sete_kec(dataisi.kec)
                            sete_kota(dataisi.kota)
                            sete_kodepos(dataisi.kodepos)
                          }}>
                          <Icon.FileEdit color="#000000" /></Button>
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
                            <Input type="text" placeholder="Supplier.." value={e_customer} onChange={(e) => { sete_customer(e.currentTarget.value) }} />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Contact :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Contact.." value={e_hp} onChange={(e) => { sete_hp(e.currentTarget.value) }} />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-top'>
                          <div className='basis-1/4 font-bold text-left'>
                            Address :
                          </div>
                          <div className='basis-3/4'>
                            <Textarea className='border w-full' placeholder="Address.." value={e_alamat} onChange={(e) => { sete_alamat(e.currentTarget.value) }} />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kelurahan :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Kelurahan.." value={e_kel} onChange={(e) => { sete_kel(e.currentTarget.value) }} />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kecamatan :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Kecamatan.." value={e_kec} onChange={(e) => { sete_kec(e.currentTarget.value) }} />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kota :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Kota.." value={e_kota} onChange={(e) => { sete_kota(e.currentTarget.value) }} />
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kode Pos :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="number" placeholder="Kode Pos.." value={e_kodepos} onChange={(e) => { sete_kodepos(e.currentTarget.value) }} />
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                          <Button
                            onClick={() => {
                              editCustomer()
                            }}
                          >Save</Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle color="#000000" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='w-[600px]'>
                        <AlertDialogHeader className='border-b pb-4'>
                          <AlertDialogTitle >Delete Customer</AlertDialogTitle>
                          <AlertDialogDescription>Data Customer {dataisi.customer} akan dihapus?</AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel >Cancel</AlertDialogCancel>
                          <Button className='bg-red-400 font-bold' onClick={() => { deleteCustomer(dataisi.id_cust) }}>Delete</Button>
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
