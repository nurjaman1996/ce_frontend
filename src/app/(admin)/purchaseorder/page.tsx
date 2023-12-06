"use client"
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

import { useEffect, useState } from 'react'
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

  const [isLoading, setisLoading]: any = useState(true)
  const [dataPO, setdataPO]: any = useState([])

  async function loadDatapo(batch: any) {
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getpo`,
      data: {
        id_batch: batch
      }
    })
      .then(function (response) {
        setdataPO(response.data.result)
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
        setdataBatch(response.data.data)
        loadDatapo(valueBatch)
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
            Purchase Order
          </div>
        </div>

        <div className="flex flex-nowrap mt-4">
          {/*  */}
          <div className="font-bold text-4xl">
            <Input type="text" className='w-[400px] shadow-md' placeholder="Search Purchase Order.." />
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
                          loadDatapo(currentValue.toUpperCase())
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

        {/* {JSON.stringify(dataPO)} */}

        <div className="mt-5 shadow-md">
          <Table className='border bg-white text-xs'>
            <TableHeader>
              <TableRow className='bg-red-400 font-bold'>
                <TableHead className="border w-[3%] text-center text-white">No</TableHead>
                <TableHead className="border w-[21.5%] text-left text-white">ID PO</TableHead>
                <TableHead className="border w-[5%] text-center text-white">BATCH</TableHead>
                <TableHead className="border w-[6%] text-center text-white">Start Date</TableHead>
                <TableHead className="border w-[5%] text-center text-white">End Date</TableHead>
                <TableHead className="border w-[6%] text-center text-white">Kurs</TableHead>
                <TableHead className="border w-[5%] text-center text-white">Overhead</TableHead>
                <TableHead className="border w-[10%] text-center text-white">Margin</TableHead>
                <TableHead className="border w-[10%] text-center text-white">Act</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            </TableBody>
          </Table>

          <Table className='bg-white text-xs '>
            <TableBody>
              {dataPO.map((dataisi: any, index: number) => (
                <TableRow key={dataisi.id}>
                  <TableCell className="border w-[3%] text-center">{Numbering.format(index + 1)}</TableCell>
                  <TableCell className="border w-[21.5%] text-left">{dataisi.id_po}</TableCell>
                  <TableCell className="border w-[5%] text-center">{dataisi.id_batch}</TableCell>
                  <TableCell className="border w-[6%] text-center">{dataisi.tanggal_startpo}</TableCell>
                  <TableCell className="border w-[5%] text-center">{dataisi.tanggal_endpo}</TableCell>
                  <TableCell className="border w-[6%] text-center">{Rupiah.format(dataisi.kurs)}</TableCell>
                  <TableCell className="border w-[5%] text-center">{Rupiah.format(dataisi.overhead_gr)}</TableCell>
                  <TableCell className="border w-[10%] text-center">{dataisi.margin}%</TableCell>
                  <TableCell className="border w-[10%]">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='w-[600px]'>
                        <AlertDialogHeader className='border-b pb-4'>
                          <AlertDialogTitle >Edit Purchase Order</AlertDialogTitle>
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
                          <AlertDialogTitle >Delete Purchase Order</AlertDialogTitle>
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
