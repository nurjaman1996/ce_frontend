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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import axios from 'axios'

import { getdatakecamatan, getdatakota, getProvinsi } from "../../../helpers/getOngkir";

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

  const [provinsiLoading, setprovinsiLoading]: any = useState(true);
  const [kotaLoading, setkotaLoading]: any = useState(true);
  const [kecamatanLoading, setkecamatanLoading]: any = useState(true);

  const [dataProvinsi, setdataProvinsi]: any = useState([]);
  const [dataKota, setdataKota]: any = useState([]);
  const [dataKecamatan, setdataKecamatan]: any = useState([]);

  async function openAddCustomer() {
    setv_customer("")
    setv_hp("")
    setv_alamat("")
    setv_provinsi("")
    setv_kota("")
    setv_kecamatan("")
    setv_kodepos("")
    setopen(true)
    getProv()
  }

  async function getProv() {
    setprovinsiLoading(true)
    setkotaLoading(true)
    setkecamatanLoading(true)
    setdataProvinsi([])
    setdataKota([])
    setdataKecamatan([])

    const data = await getProvinsi()

    if (data) {
      setdataProvinsi(data)
      setprovinsiLoading(false)
    }
  }

  async function getkota(province: any) {
    setkotaLoading(true)
    setkecamatanLoading(true)
    setv_kota("")
    setv_kecamatan("")
    const data = await getdatakota(province)

    if (data) {
      setdataKota(data)
      setkotaLoading(false)
    }
  }

  async function getKecamatan(city: any) {
    setv_kecamatan("")
    setkecamatanLoading(true)
    const data = await getdatakecamatan(city)

    if (data) {
      setdataKecamatan(data)
      setkecamatanLoading(false)
    }
  }

  const [open, setopen]: any = useState(false);
  const [v_customer, setv_customer]: any = useState('');
  const [v_hp, setv_hp]: any = useState('');
  const [v_alamat, setv_alamat]: any = useState('');
  const [v_provinsi, setv_provinsi]: any = useState('');
  const [v_kota, setv_kota]: any = useState('');
  const [v_kecamatan, setv_kecamatan]: any = useState('');
  const [v_kelurahan, setv_kelurahan]: any = useState('');
  const [v_kodepos, setv_kodepos]: any = useState('');

  async function saveCustomer() {
    if (v_customer === "" || v_hp === "" || v_alamat === "" || v_provinsi === "" || v_kecamatan === "" || v_kota === "" || v_kelurahan === "" || v_kodepos === "") {
      alert("Mohon lengkapi Formulir")
    } else {
      // console.log(v_customer)
      // console.log(v_hp)
      // console.log(v_alamat)
      // console.log(v_provinsi)
      // console.log(v_kota)
      // console.log(v_kecamatan)
      // console.log(v_kelurahan)
      // console.log(v_kodepos)

      await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/addcustomer`,
        data: {
          customer: v_customer,
          hp: v_hp,
          alamat: v_alamat,
          provinsi: v_provinsi,
          kota: v_kota,
          kecamatan: v_kecamatan,
          kelurahan: v_kelurahan,
          kodepos: v_kodepos,
        }
      })
        .then(function (response) {
          loadCustomer()
          setv_customer("")
          setv_hp("")
          setv_alamat("")
          setv_provinsi("")
          setv_kota("")
          setv_kecamatan("")
          setv_kelurahan("")
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
  const [e_provinsi, sete_provinsi]: any = useState('');
  const [e_kota, sete_kota]: any = useState('');
  const [e_kecamatan, sete_kecamatan]: any = useState('');
  const [e_kelurahan, sete_kelurahan]: any = useState('');
  const [e_kodepos, sete_kodepos]: any = useState('');

  async function editCustomer() {
    // console.log(e_id_cust)
    // console.log(e_customer)
    // console.log(e_hp)
    // console.log(e_alamat)
    // console.log(e_provinsi)
    // console.log(e_kota)
    // console.log(e_kecamatan)
    // console.log(e_kelurahan)
    // console.log(e_kodepos)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/editcustomer`,
      data: {
        id_cust: e_id_cust,
        customer: e_customer,
        hp: e_hp,
        alamat: e_alamat,
        provinsi: e_provinsi,
        kota: e_kota,
        kecamatan: e_kecamatan,
        kelurahan: e_kelurahan,
        kodepos: e_kodepos,
      }
    })
      .then(function (response) {
        loadCustomer()
        sete_id_cust("")
        sete_customer("")
        sete_hp("")
        sete_alamat("")
        sete_provinsi("")
        sete_kecamatan("")
        sete_kota("")
        sete_kelurahan("")
        sete_kodepos("")
        setopenEdit(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function deleteCustomer(id_cust: any) {
    // console.log(id_cust)

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
              <Button variant="outline" className='bg-gray-900 text-white font-bold hover:bg-gray-200' onClick={() => { openAddCustomer() }}>Add New</Button>
              <AlertDialogContent className='w-[600px]'>
                <AlertDialogHeader className='border-b pb-4'>
                  <AlertDialogTitle >Add New Customer</AlertDialogTitle>
                </AlertDialogHeader>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Customer :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Customer.." value={v_customer} onChange={(e) => { setv_customer(e.currentTarget.value) }} />
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
                    Provinsi :
                  </div>
                  <div className='basis-3/4'>
                    <Select value={v_provinsi} onValueChange={(e) => { setv_provinsi(e), getkota(e.split("#")[0]) }} disabled={provinsiLoading}>
                      <SelectTrigger className="w-full">
                        {provinsiLoading ? <SelectValue placeholder="Loading Data.." /> : <SelectValue placeholder="Pilih Provinsi.." />}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {dataProvinsi.map((data_provinsi: any, index: number) => {
                            return (
                              <SelectItem key={index} value={data_provinsi.province_id + "#" + data_provinsi.province}>{data_provinsi.province}</SelectItem>
                            )
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kota :
                  </div>
                  <div className='basis-3/4'>
                    <Select value={v_kota} onValueChange={(e) => { setv_kota(e), getKecamatan(e.split("#")[0]) }} disabled={kotaLoading}>
                      <SelectTrigger className="w-full">
                        {kotaLoading ? <SelectValue placeholder="Loading Data.." /> : <SelectValue placeholder="Pilih Kota.." />}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {dataKota.map((data_kota: any, index: number) => {
                            return (
                              <SelectItem key={index} value={data_kota.city_id + "#" + data_kota.type + " " + data_kota.city_name}>{data_kota.type} {data_kota.city_name}</SelectItem>
                            )
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kecamatan :
                  </div>
                  <div className='basis-3/4'>
                    <Select value={v_kecamatan} onValueChange={(e) => { setv_kecamatan(e) }} disabled={kecamatanLoading}>
                      <SelectTrigger className="w-full">
                        {kecamatanLoading ? <SelectValue placeholder="Loading Data.." /> : <SelectValue placeholder="Pilih Kecamatan.." />}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {dataKecamatan.map((data_kecamatan: any, index: number) => {
                            return (
                              <SelectItem key={index} value={data_kecamatan.subdistrict_id + "#" + data_kecamatan.subdistrict_name}>{data_kecamatan.subdistrict_name}</SelectItem>
                            )
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='flex flex-row text-center mt-2 items-center'>
                  <div className='basis-1/4 font-bold text-left'>
                    Kelurahan :
                  </div>
                  <div className='basis-3/4'>
                    <Input type="text" placeholder="Kelurahan.." value={v_kelurahan} onChange={(e) => { setv_kelurahan(e.currentTarget.value) }} />
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
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Provinsi</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Kota</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Kecamatan</TableHead>
                <TableHead className="bg-gray-900 border text-center font-bold text-white">Kelurahan</TableHead>
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
                  <TableCell className="border text-center">{dataisi.province}</TableCell>
                  <TableCell className="border text-center">{dataisi.city_name}</TableCell>
                  <TableCell className="border text-center">{dataisi.subdistrict_name}</TableCell>
                  <TableCell className="border text-center">{dataisi.kelurahan}</TableCell>
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
                            sete_provinsi(dataisi.province_id + "#" + dataisi.province)
                            sete_kota(dataisi.city_id + "#" + dataisi.city_name)
                            sete_kecamatan(dataisi.subdistrict_id + "#" + dataisi.subdistrict_name)
                            sete_kelurahan(dataisi.kelurahan)
                            sete_kodepos(dataisi.kodepos)
                            getProv()
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
                            Provinsi :
                          </div>
                          <div className='basis-3/4'>
                            <Select value={e_provinsi} onValueChange={(e) => { sete_provinsi(e), getkota(e.split("#")[0]) }} disabled={provinsiLoading}>
                              <SelectTrigger className="w-full">
                                {provinsiLoading ? <SelectValue placeholder="Loading Data.." /> : <SelectValue placeholder="Pilih Provinsi.." />}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {dataProvinsi.map((data_provinsi: any, index: number) => {
                                    return (
                                      <SelectItem key={index} value={data_provinsi.province_id + "#" + data_provinsi.province}>{data_provinsi.province}</SelectItem>
                                    )
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kota :
                          </div>
                          <div className='basis-3/4'>
                            <Select value={e_kota} onValueChange={(e) => { sete_kota(e), getKecamatan(e.split("#")[0]) }} disabled={kotaLoading}>
                              <SelectTrigger className="w-full">
                                {kotaLoading ? <SelectValue placeholder="Loading Data.." /> : <SelectValue placeholder="Pilih Kota.." />}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {
                                    dataKota.map((data_kota: any, index: number) => {
                                      return (
                                        <SelectItem key={index} value={data_kota.city_id + "#" + data_kota.type + " " + data_kota.city_name}>{data_kota.type} {data_kota.city_name}</SelectItem>
                                      )
                                    })
                                  }
                                  {kotaLoading ? <SelectItem value={e_kota}>{e_kota.split("#")[1]}</SelectItem> : null}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kecamatan :
                          </div>
                          <div className='basis-3/4'>
                            <Select value={e_kecamatan} onValueChange={(e) => { sete_kecamatan(e) }} disabled={kecamatanLoading}>
                              <SelectTrigger className="w-full">
                                {kecamatanLoading ? <SelectValue placeholder="Loading Data.." /> : <SelectValue placeholder="Pilih Kecamatan.." />}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {
                                    dataKecamatan.map((data_kecamatan: any, index: number) => {
                                      return (
                                        <SelectItem key={index} value={data_kecamatan.subdistrict_id + "#" + data_kecamatan.subdistrict_name}>{data_kecamatan.subdistrict_name}</SelectItem>
                                      )
                                    })
                                  }
                                  {kecamatanLoading ? <SelectItem value={e_kecamatan}>{e_kecamatan.split("#")[1]}</SelectItem> : null}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Kelurahan :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" placeholder="Kelurahan.." value={e_kelurahan} onChange={(e) => { sete_kelurahan(e.currentTarget.value) }} />
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
