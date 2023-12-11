"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { Input } from "@/components/ui/input"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import Datepicker from "react-tailwindcss-datepicker";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { addDays, format, subDays, subWeeks, startOfWeek, lastDayOfWeek } from "date-fns"
import axios from 'axios'

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

export default function PurchaseOrder() {

  const [open, setOpen] = useState(false)
  const [dataBatch, setdataBatch]: any = useState([])
  const [valueBatch, setValueBatch]: any = useState("")

  const [value, setValue]: any = useState({
    startDate: "2020-01-01",
    endDate: new Date()
  });

  const handleValueChange = (newValue: any) => {
    if (newValue.startDate != null && newValue.endDate != null) {
      setValue(newValue);
      loaddataOrders(newValue.startDate, newValue.endDate, valueBatch, searchInvoices)
    }
  }

  const [isLoading, setisLoading]: any = useState(true)
  const [dataOrders, setdataOrders]: any = useState([])
  const [dataOrdersdetails, setdataOrdersdetails]: any = useState([])

  async function loaddataOrders(start: any, end: any, batch: any, query: any) {
    setisLoading(true)
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getsales`,
      data: {
        id_batch: batch,
        start: format(new Date(start), "yyyy-MM-dd"),
        end: format(new Date(end), "yyyy-MM-dd"),
        search_query: query
      }
    })
      .then(function (response) {
        setdataOrders(response.data)
        setdataOrdersdetails(response.data.result)
        setisLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function loadDataBatch() {
    await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_HOST}/purchaseorder/getbatch`,
    })
      .then(function (response) {
        if (valueBatch === "") {
          setdataBatch(response.data.data)
          setValueBatch(response.data.data[0].id_batch)
          loaddataOrders(value.startDate, value.endDate, response.data.data[0].id_batch, searchInvoices)
        } else {
          loaddataOrders(value.startDate, value.endDate, valueBatch, searchInvoices)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    loadDataBatch()
  }, [])

  const [searchInvoices, setsearchInvoices]: any = useState('');
  const [openEditKurir, setopenEditKurir]: any = useState(false);
  const [openCancelOrder, setopenCancelOrder]: any = useState(false);

  const [e_resi, sete_resi]: any = useState('');
  const [e_kurir, sete_kurir]: any = useState('');
  const [e_id_invoice, sete_id_invoice]: any = useState('');

  async function updateKurir() {
    // console.log(e_resi)
    // console.log(e_kurir)
    // console.log(e_id_invoice)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/editOrder`,
      data: {
        id_invoice: e_id_invoice,
        resi: e_resi,
        jasa_kirim: e_kurir
      }
    })
      .then(function (response) {
        loaddataOrders(value.startDate, value.endDate, valueBatch, searchInvoices)
        setopenEditKurir(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function deleteOrder(id_invoice: any) {
    // console.log(id_invoice)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/deleteorder`,
      data: {
        id_invoice: id_invoice
      }
    })
      .then(function (response) {
        loaddataOrders(value.startDate, value.endDate, valueBatch, searchInvoices)
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
      <main className="">
        <div className="flex flex-nowrap mt-4">
          <div className="font-bold text-4xl">
            Report List Orders
          </div>
        </div>

        <div className="flex flex-nowrap mt-4">
          {/*  */}
          <div className="font-bold text-4xl flex flex-row">
            <Input type="text" className='w-[400px] shadow-md rounded-r-none' placeholder="Search Orders.." value={searchInvoices}
              onChange={(e) => {
                setsearchInvoices(e.currentTarget.value)
                if (e.currentTarget.value === "") {
                  loaddataOrders(value.startDate, value.endDate, valueBatch, "")
                }
              }}
            />
            <Button
              variant="default"
              role="combobox"
              className="w-[auto] rounded-l-none shadow-md"
              onClick={() => {
                loaddataOrders(value.startDate, value.endDate, valueBatch, searchInvoices)

              }}
            >
              <Icon.Search />
            </Button>
          </div>
          <div className="ml-auto w-auto mr-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {valueBatch
                    ? dataBatch.find((batch: any) => batch.id_batch == valueBatch)?.id_batch
                    : "SELECT BATCH..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search batch..." />
                  <CommandEmpty>No batch found.</CommandEmpty>
                  <CommandGroup>
                    {dataBatch.map((batch: any) => (

                      <CommandItem
                        key={batch.id}
                        value={batch.id_batch}
                        onSelect={(currentValue) => {
                          loaddataOrders(value.startDate, value.endDate, currentValue.toUpperCase(), searchInvoices)
                          setValueBatch(currentValue.toUpperCase() === valueBatch ? "" : currentValue.toUpperCase())
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueBatch === batch.id_batch ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {batch.id_batch}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="basis-1/6 border rounded-md font-medium">
            <Datepicker
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
              separator={"s/d"}
              showFooter={true}
              popoverDirection="down"
              configs={{
                shortcuts: {
                  today: "Hari Ini",
                  yesterday: "Kemarin",
                  mingguini: {
                    text: "Minggu Ini",
                    period: {
                      start: format(startOfWeek(new Date()), "yyyy-MM-dd"),
                      end: format(lastDayOfWeek(new Date()), "yyyy-MM-dd")
                    },
                  },
                  minggukemarin: {
                    text: "Minggu Kemarin",
                    period: {
                      start: format(subDays(startOfWeek(new Date()), 7), "yyyy-MM-dd"),
                      end: format(subDays(lastDayOfWeek(new Date()), 7), "yyyy-MM-dd")
                    },
                  },
                  currentMonth: "Bulan Ini",
                  pastMonth: 'Bulan Kemarin',
                  alltime: {
                    text: "Semua",
                    period: {
                      start: "2023-01-01",
                      end: format(new Date(), "yyyy-MM-dd")
                    },
                  },
                }
              }}
            />
          </div>
        </div>

        {/* {JSON.stringify(dataOrders.result)} */}

        <div className="mt-5">
          <Table className='border bg-white text-xs '>
            <TableHeader>
              <TableRow className='bg-gray-900 font-bold'>
                <TableHead className="bg-gray-900 border font-bold w-[3%] text-center text-white">No</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[21.5%] text-left text-white">NAME</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[3.5%] text-center text-white">VARIATION</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[5%] text-center text-white">SIZE</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[5.5%] text-center text-white">WEIGHT</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[4%] text-center text-white">QTY</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[8%] text-center text-white">PRICE</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[10%] text-center text-white">SUB TOTAL</TableHead>
                <TableHead className="bg-gray-900 border font-bold w-[10%] text-center text-white">ACT</TableHead>
              </TableRow >
            </TableHeader >
          </Table >
          {dataOrdersdetails.length < 1 ?
            <div className='border mb-5 bg-white flex justify-center items-center h-[300px]'>
              Tidak Ada Data ditemukan
            </div>
            :
            dataOrdersdetails.map((dataisi: any, index: number) => (
              <div className='border mb-5' key={dataisi.id_invoice + dataisi.id_batch}>
                <Table className='text-xs bg-white'>
                  <TableHeader>
                    <TableRow>
                      <TableCell colSpan={3} className='text-lg font-bold p-0 '>
                        <span className='ml-4'>{Numbering.format(index + 1)}) #{dataisi.tanggal} - {dataisi.id_invoice}</span>
                        <span>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.Printer size={18} color="#00b3ff" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='w-[600px]'>
                              <AlertDialogHeader className='border-b pb-4'>
                                <AlertDialogTitle >Print Resi</AlertDialogTitle>
                              </AlertDialogHeader>
                              <div className='flex flex-row text-center mt-2 items-center'>
                                <div className='basis-1/4 font-bold text-left'>
                                  Product :
                                </div>
                                <div className='basis-3/4'>
                                  <Input type="text" placeholder="Product.." />
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

                              <Button variant="link" disabled={dataisi.status_pesanan === "UNPAID" ? false : true} className='text-white font-bold hover:bg-gray-200 -ml-3'><Icon.XCircle size={18} color="#ff0000" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='w-[600px]'>
                              <AlertDialogHeader className='border-b pb-4'>
                                <AlertDialogTitle >Delete This Orders</AlertDialogTitle>
                                <AlertDialogDescription>Data Order dengan ID {dataisi.id_invoice} akan dihapus?</AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel >Cancel</AlertDialogCancel>
                                <Button className='bg-red-400 font-bold' onClick={() => { deleteOrder(dataisi.id_invoice) }}>Delete</Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </span><br></br>
                        <span className='text-sm ml-8'>{dataisi.customer[0].customer}</span>
                        {/* <span className='text-xs text-red-600 ml-4'>ADMIN : ADMIN</span><br></br> */}
                      </TableCell>
                      <TableCell className="text-right text-md font-bold">

                        <Button className='bg-green-700 mx-2 font-bold text-[10px] rounded-2xl'
                          onClick={() => {
                            window.open(`/invoice/${dataisi.id_invoice}`)
                          }}
                        >
                          OPEN INVOICE PAGE <Icon.BadgeDollarSign className='ml-1' size={18} color="#ffffff" />
                        </Button>

                        {/* <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button disabled={dataisi.payment >= dataisi.sub_total ? true : false} className='bg-green-700 mx-2 font-bold text-[10px] rounded-2xl'>CREATE PAYMENT LINK <Icon.BadgeDollarSign className='ml-1' size={18} color="#ffffff" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className='w-[20%]'>
                            <AlertDialogHeader className='border-b pb-4'>
                              <AlertDialogTitle>Create Payment</AlertDialogTitle>
                            </AlertDialogHeader>
                            <RadioGroup defaultValue="50">
                              <div className="flex space-x-2">
                                <Label className='text-center font-medium text-xl'>Total Payment</Label>
                              </div>
                              <div className="flex space-x-2">
                                <Label className='text-center font-bold text-2xl text-green-800 -mt-2'>Rp 2.531.656</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="25" id="25" />
                                <Label>25%</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="50" id="50" />
                                <Label>50%</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="75" id="75" />
                                <Label>75%</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="100" id="100" />
                                <Label>100%</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="custom" />
                                <Label>Custom Amount..</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Input type='number' className='mt-1 shadow-sm' placeholder='0' />
                              </div>
                            </RadioGroup>
                            <AlertDialogFooter className='flex flex-row  mt-2 border-t pt-4'>
                              <AlertDialogCancel className='bg-red-400 font-bold'>Cancel</AlertDialogCancel>
                              <Button className='bg-green-700 font-bold'> Pay Now</Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog> */}

                        <AlertDialog open={openEditKurir} onOpenChange={setopenEditKurir}>
                          <AlertDialogTrigger asChild>

                            <Button disabled={dataisi.status_pesanan === "PROGRESS" ? false : true} className='bg-gray-600 mx-2 font-bold text-[10px] rounded-2xl'
                              onClick={() => {
                                setopenEditKurir(true)
                                sete_id_invoice(dataisi.id_invoice)
                                sete_kurir("")
                                sete_resi("")
                              }}>DELIVERY STATUS <Icon.Truck className='ml-1' size={18} color="#ffffff" /></Button>

                          </AlertDialogTrigger>
                          <AlertDialogContent className='w-[600px]'>
                            <AlertDialogHeader className='border-b pb-4'>
                              <AlertDialogTitle >Update Delivery Status</AlertDialogTitle>
                            </AlertDialogHeader>
                            {/* <RadioGroup defaultValue="international_shipping">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="international_shipping" id="r1" />
                                <Label htmlFor="r1">International Shipping</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="local_shipping" id="r2" />
                                <Label htmlFor="r2">Local Shippping</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Label className='w-[375px] mt-2 text-md'>International Shipping Status</Label>
                                <Select defaultValue="china_to_indonesia">
                                  <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="International Shipping" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="china_to_indonesia">China To Indonesia</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                             
                            </RadioGroup> */}

                            <div className="flex flex-row items-center space-x-2">
                              <Label className='basis-1/3 text-md text-left'>Lokal Kurir</Label>
                              <div className='grow'>
                                <Select defaultValue="null" value={e_kurir} onValueChange={(e) => { sete_kurir(e) }}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Local Shipping" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="null">Pilih Kurir...</SelectItem>
                                      <SelectItem value="JNE_REG">JNE REG</SelectItem>
                                      <SelectItem value="JNE_YES">JNE YES</SelectItem>
                                      <SelectItem value="J&T_REG">J&T REG</SelectItem>
                                      <SelectItem value="SICEPAT_REG">SICEPAT REG</SelectItem>
                                      <SelectItem value="SICEPAT_BEST">SICEPAT BEST</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="flex flex-row items-center space-x-2">
                              <Label className='basis-1/3 text-md text-left'>No Resi</Label>
                              <div className='grow'>
                                <Input type="text" placeholder="No Resi.." value={e_resi} onChange={(e) => { sete_resi(e.currentTarget.value) }} />
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                              <Button onClick={() => {
                                updateKurir()
                              }}>Update</Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </TableCell>
                    </TableRow>
                  </TableHeader>
                </Table>
                <Table className='bg-white text-xs '>
                  <TableBody>
                    {dataisi.details.map((details: any, index: number) => (
                      <TableRow key={details.id}>

                        <TableCell className="border w-[3%] text-center font-bold">{Numbering.format(index + 1)}</TableCell>
                        <TableCell className="border w-[21.5%] text-left">
                          <div className='flex flex-row gap-3'>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${details.images}`}
                              alt="Photo by Drew Beamer"
                              width={500}
                              height={500}
                              priority={true}
                              className="rounded-sm shadow-md w-[70px] aspect-square"
                            />
                            <div>
                              <span className='text-lg'>{details.produk}</span><br></br>
                              <span className='text-xs text-red-700'>{details.id_produk}</span>&nbsp;/&nbsp;
                              {details.id_batch}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="border w-[6%] text-center">{details.variasi}</TableCell>
                        <TableCell className="border w-[5%] text-center">{details.ukuran}</TableCell>
                        <TableCell className="border w-[6%] text-center">{Numbering.format(details.berat)}</TableCell>
                        <TableCell className="border w-[4%] text-center">{Numbering.format(details.qty)}</TableCell>
                        <TableCell className="border w-[8%] text-center">{Rupiah.format(details.harga_jual)}</TableCell>
                        <TableCell className="border w-[10%] text-center">{Rupiah.format(details.sub_total)}</TableCell>
                        <TableCell className="border w-[10%] text-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className='bg-red-600 font-bold text-[10px] rounded-2xl'>REFUND <Icon.RotateCcw className='ml-1' size={18} color="#ffffff" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='w-[50%]'>
                              <AlertDialogHeader className='border-b pb-4'>
                                <AlertDialogTitle >Refund This Order</AlertDialogTitle>
                              </AlertDialogHeader>
                              <RadioGroup defaultValue="international_shipping">
                                <div className='flex flex-row'>
                                  <div className='grow'>
                                    <Label className='text-md font-medium p-4 -ml-3'>Product</Label>
                                    {/* <Input className='h-8 mt-2' /> */}
                                  </div>
                                  <div className='basis-1/5 text-center'>
                                    <Label className='text-md font-medium p-4'>Qty</Label>
                                  </div>
                                  <div className='basis-1/8 text-center'>
                                    <Label className='text-md font-medium p-4 -mr-1'>Act</Label>
                                  </div>
                                </div>
                                <div className='flex flex-row'>
                                  <div className='grow'>
                                    <Input className='mt-1 shadow-sm' />
                                  </div>
                                  <div className='basis-1/5 text-center flex flex-row mt-1 ml-2 mr-2'>
                                    <Button className='basis-full p-0 '><Icon.Minus className='ml-1' size={18} color="#ffffff" /></Button>
                                    <Input className='grow ml-2 mr-2 shadow-sm text-center text-base' placeholder='0' />
                                    <Button className='basis-full p-0'><Icon.Plus className='ml-1' size={18} color="#ffffff" /></Button>
                                  </div>
                                  <div className='basis-1/8 text-center bg-cyan-200 mt-1 mb-4'>
                                    <Button className='p-3 bg-red-500'><Icon.Plus className='ml-1' size={18} color="#ffffff" /></Button>
                                  </div>
                                </div>
                              </RadioGroup>
                              <AlertDialogFooter>
                                <AlertDialogCancel className='bg-red-400 font-bold'>Cancel</AlertDialogCancel>
                                <Button className='font-bold'> Save</Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4} className='text-right bg-white font-bold'></TableCell>
                      <TableCell className="text-center bg-white  border font-bold">{Numbering.format(dataisi.berat)}</TableCell>
                      <TableCell className="text-center bg-white  border font-bold">{Numbering.format(dataisi.qty)}</TableCell>
                      <TableCell className="text-center bg-gray-100 border font-bold">GRAND TOTAL :</TableCell>
                      <TableCell className="text-center bg-white  border font-bold">{Rupiah.format(dataisi.sub_total)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6} className='text-right bg-white font-bold'></TableCell>
                      <TableCell className="text-center bg-gray-100  border font-bold">DONE PAYMENT :</TableCell>
                      <TableCell className="text-center bg-white  border font-bold">{Rupiah.format(dataisi.payment)} ( {Math.round((dataisi.payment / dataisi.sub_total) * 100)}% )</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6} className='text-right bg-white font-bold'></TableCell>
                      <TableCell className="text-center bg-gray-100  border font-bold">SISA PAYMENT :</TableCell>
                      <TableCell className="text-center bg-white  text-red-800 border font-bold">{Rupiah.format(dataisi.sub_total - dataisi.payment)}</TableCell>
                    </TableRow>
                  </TableFooter>

                </Table>
                <Table className='bg-white '>
                  <TableFooter className=' bg-white'>
                    <TableRow>
                      <TableCell className="text-left font-bold">
                        <div className='-mt-7'>USER : {dataisi.user}</div>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                      </TableCell>
                      <TableCell className="text-right font-bold">
                      </TableCell>
                      <TableCell className="text-right font-bold">
                      </TableCell>
                      <TableCell colSpan={4} className="text-right font-bold">
                        <div className='flex flex-row'>
                          <div className='basis-1/2'>
                            <span className='text-red-800'>ORDER STATUS :</span><br></br>
                            <span>NO RECEIPT :</span><br></br>
                            <span>DELIVERY SERVICE :</span>
                          </div>
                          <div className='basis-1/2'>
                            <span className='text-red-800'>{dataisi.status_pesanan}</span><br></br>
                            <span>{dataisi.resi}</span><br></br>
                            <span>{dataisi.jasa_kirim}</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            ))
          }
        </div >
      </main >
    )
  }
}
