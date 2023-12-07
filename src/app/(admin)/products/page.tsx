"use client";
import Image from 'next/image'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { Input } from "@/components/ui/input"
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

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

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

export default function Products() {
  const [open, setOpen] = useState(false)
  const [dataBatch, setdataBatch]: any = useState([])
  const [valueBatch, setValueBatch]: any = useState("")

  const [isLoading, setisLoading]: any = useState(true)
  const [dataProducts, setdataProducts]: any = useState([])

  async function loadProducts(batch: any) {
    setisLoading(true)
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/products`,
      data: {
        id_batch: batch
      }
    })
      .then(function (response) {
        setdataProducts(response.data)
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
          loadProducts(response.data.data[0].id_batch)
        } else {
          loadProducts(valueBatch)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    loadDataBatch()
  }, [])

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
          <div className="font-bold text-4xl text-red-500">
            Products
          </div>
          {/* <div className="ml-auto">
            <Button className='bg-amber-200 shadow-md text-black font-bold'>STOCK OPNAME&nbsp;<Icon.RefreshCcw color="#000000" /></Button>
          </div> */}
        </div>

        {/* {JSON.stringify(dataProducts.result)} */}

        <div className='flex flex-row mt-4 gap-8 '>
          <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[125px]  bg-red-400 text-white'>
            <div className='text-xl font-semibold py-4 px-5'>
              Items
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-4xl font-semibold'>
                {Numbering.format(dataProducts.result.items)}
              </div>
              <div className=' basis-1/2 flex justify-end'>
                <Icon.ShoppingCart size={45} color="#ffffff" />
              </div>
            </div>
          </div>
          <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[125px] bg-red-400 text-white'>
            <div className='text-xl font-semibold py-4 px-5'>
              Qty
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-4xl font-semibold'>
                {Numbering.format(dataProducts.result.qty)}
              </div>
              <div className=' basis-1/2 flex justify-end'>
                <Icon.DollarSign size={45} color="#ffffff" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-nowrap mt-4">
          {/*  */}
          <div className="font-bold text-4xl">
            <Input type="text" className='w-[400px] shadow-md text-black' placeholder="Search Products.." />
          </div>
          <div className="ml-auto">
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
                          loadProducts(currentValue.toUpperCase())
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
        </div>

        <div className="mt-5 shadow-md">
          <Table className='border text-xs'>
            <TableHeader>
              <TableRow className='bg-red-400 font-bold'>
                <TableHead className="border  text-white w-[3%] text-center">No</TableHead>
                <TableHead className="border  text-white w-[12%] text-center">Image</TableHead>
                <TableHead className="border  text-white w-[30%] text-left">Name</TableHead>
                <TableHead className="border  text-white w-[2.5%] text-center">Weight</TableHead>
                <TableHead className="border  text-white w-[2.5%] text-center">Stock</TableHead>
                <TableHead className="border  text-white w-[3%] text-center">Varian</TableHead>
                <TableHead className="border  text-white w-[6%] text-center">Kurs</TableHead>
                <TableHead className="border  text-white w-[5%] text-center">Overhead</TableHead>
                <TableHead className="border  text-white w-[6%] text-center">Margin</TableHead>
                <TableHead className="border  text-white w-[6%] text-center">Cost</TableHead>
                <TableHead className="border  text-white w-[15%] text-center">Selling Price</TableHead>
                <TableHead className="border  text-white w-[5%] text-center">ACT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white'>
              {dataProducts.result.data_iventory_details.map((dataisi: any, index: number) => (
                <TableRow key={dataisi.id}>
                  <TableCell className="border text-center w-[3.5%] font-bold">{Numbering.format(index + 1)}</TableCell>

                  <TableCell className="border text-center w-[12%]  font-bold">
                    {(function () {
                      if (dataisi.images != null) {
                        return (
                          <Image
                            className='aspect-square rounded-xl mx-auto'
                            src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${dataisi.images}`}
                            width={300}
                            height={300}
                            alt="Picture of the author"
                            style={{ height: 100, width: 100 }}
                            priority
                          />
                        );
                      } else {
                        return (
                          <Image
                            className='aspect-square rounded-xl mx-auto'
                            src="/produk.png"
                            alt="Photo by Drew Beamer"
                            width={300}
                            height={300}
                            style={{ height: 100, width: 100 }}
                            priority
                          />
                        );
                      }
                    })()}

                  </TableCell>

                  <TableCell className="border text-left w-[30%]">
                    <span className='capitalize'>{dataisi.produk}</span><br></br>
                    <span>{dataisi.id_produk}</span>
                  </TableCell>

                  <TableCell className="border w-[5.5%] text-center">{Numbering.format(dataisi.berat_produk)} gr</TableCell>
                  <TableCell className="border w-[5.5%] text-center">{Numbering.format(dataisi.total_stok)}</TableCell>
                  <TableCell className="border w-[3%] text-center ">{Numbering.format(dataisi.total_variasi)}</TableCell>
                  <TableCell className="border w-[5%] text-center bg-orange-100">{Rupiah.format(dataisi.kurs)}</TableCell>
                  <TableCell className="border w-[5%] text-center  bg-orange-100">{Rupiah.format(dataisi.overhead)}</TableCell>
                  <TableCell className="border w-[6%] text-center font-bold text-red-600  bg-orange-100">{dataisi.margin}%</TableCell>
                  <TableCell className="border w-[10%] text-center  bg-orange-100">{Rupiah.format(dataisi.total_modal_produk)}</TableCell>
                  <TableCell className="border w-[15%] text-center ">{Rupiah.format(dataisi.harga_jual)}</TableCell>
                  <TableCell className="border w-[5%]">

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='w-[600px]'>
                        <AlertDialogHeader className='border-b pb-4'>
                          <AlertDialogTitle >Edit Product</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className='flex flex-row text-center mt-2 items-center'>
                          <div className='basis-1/4 font-bold text-left'>
                            Image :
                          </div>
                          <div className='basis-3/4'>
                            <Input type="text" />
                          </div>
                        </div>
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
                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle color="#ff0000" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='w-[600px]'>
                        <AlertDialogHeader className='border-b pb-4'>
                          <AlertDialogTitle >Delete Product</AlertDialogTitle>
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
      </main >
    )
  }


}
