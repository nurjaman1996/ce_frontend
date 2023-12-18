"use client"
import { useEffect, useState } from 'react'
// import { jwtDecode } from "jwt-decode";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Datepicker from "react-tailwindcss-datepicker";
import { BarChart4, Boxes, Check, ChevronsUpDown, Coffee, Coins, Container, DollarSign, Dumbbell, FileStack, Package } from "lucide-react"
import { BeakerIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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



export default function Home() {
  // const [Token, setToken]: any = useState("")

  // async function refreshToken() {
  //   const dataToken = await getToken()
  //   setToken(dataToken)
  //   // console.log(jwtDecode(dataToken.accessToken))
  // }

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
      lodaDashboard(newValue.startDate, newValue.endDate, valueBatch)
    }
  }

  const [isLoading, setisLoading]: any = useState(true)
  const [dataDashboard, setdataDashboard]: any = useState([])

  async function lodaDashboard(start: any, end: any, batch: any) {
    setisLoading(true)
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/dashboard`,
      data: {
        id_batch: batch,
        start: format(new Date(start), "yyyy-MM-dd"),
        end: format(new Date(end), "yyyy-MM-dd")
      }
    })
      .then(function (response) {
        setdataDashboard(response.data)
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
          lodaDashboard(value.startDate, value.endDate, response.data.data[0].id_batch)
        } else {
          lodaDashboard(value.startDate, value.endDate, valueBatch)
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
      <div className="w-full">
        <div className="flex flex-nowrap mt-4">
          <div className="font-bold text-2xl">
            Dashboard
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
                          lodaDashboard(value.startDate, value.endDate, currentValue.toUpperCase())
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
          <div className="basis-1/6 border font-medium">
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

        {/* {JSON.stringify(dataDashboard.result)} */}

        <div className='flex flex-row mt-4 gap-4 text-black'>
          <div className='basis-1/4 bg-white border border-gray-300 h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Sales Summary
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Rupiah.format(dataDashboard.result.ringkasan)}
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <BarChart4 className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border border-gray-300 h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Total Product
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Numbering.format(dataDashboard.result.total_product)}
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Package className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border border-gray-300 h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Available Stock
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Numbering.format(dataDashboard.result.stok_tersedia)}
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Coffee className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border border-gray-300 h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Unfilled Stock
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Numbering.format(dataDashboard.result.belum_terpenuhi)}

              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Container className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-row mt-4 gap-4 text-black'>
          <div className='basis-3/4 bg-white border border-gray-300 h-[448px] rounded-lg shadow-md flex flex-col gap-1'>
            <div className='text-xl font-bold py-3 px-5'>
              Penjualan 30 Hari Terakhir
            </div>

            <ResponsiveContainer width="100%" height="100%" className="px-5">
              <BarChart
                data={dataDashboard.result.data_weeks}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <Tooltip content={
                  function CustomTooltip({ payload, label, active }: any) {
                    if (active) {
                      return (
                        <div className="bg-white p-2 rounded-md">
                          <p className="label">Tanggal {label}</p>
                          <p className="intro">Invoices : {payload[0].payload.invoices}</p>
                          <p className="desc">Gross Sale : {Rupiah.format(payload[0].payload.grosssale)}</p>
                        </div>
                      );
                    }

                    return null;
                  }
                } />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" className='text-xs' />
                <YAxis className='text-xs' width={80}
                  tickFormatter={(value) =>
                    Rupiah.format(value)
                  } />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="grosssale" fill="#430f1f " activeBar={<Rectangle fill="#62001F" />} />
              </BarChart>
            </ResponsiveContainer>

          </div>
          <div className='grow'>
            <div className='text-md font-bold bg-white border border-gray-300 h-[100px] rounded-lg shadow-md mb-4'>
              <div className='text-md font-semibold py-4 px-5'>
                Invoices
              </div>
              <div className='flex flex-row text-left'>
                <div className='basis-full text-lg font-semibold py-0 px-5'>
                  <p>{Numbering.format(dataDashboard.result.total_pesanan)}</p>
                </div>
                <div className=' basis-auto mt-1 mx-5'>
                  <FileStack className="h-6 w-6 text-black text-right" />
                </div>
              </div>
            </div>

            <div className='text-md font-bold bg-white border border-gray-300 h-[100px] rounded-lg shadow-md mb-4'>
              <div className='text-md font-semibold py-4 px-5'>
                Qty
              </div>
              <div className='flex flex-row text-left'>
                <div className='basis-full text-lg font-semibold py-0 px-5'>
                  <p>{Numbering.format(dataDashboard.result.qty)}</p>

                </div>
                <div className=' basis-auto mt-1 mx-5'>
                  <Boxes className="h-6 w-6 text-black text-right" />
                </div>
              </div>
            </div>

            <div className='text-md font-bold bg-white border border-gray-300 h-[100px] rounded-lg shadow-md mb-4'>
              <div className='text-md font-semibold py-4 px-5'>
                Estimated Weight
              </div>
              <div className='flex flex-row text-left'>
                <div className='basis-full text-lg font-semibold py-0 px-5'>
                  <p>{Numbering.format(dataDashboard.result.weight)} GR | {Numbering.format(dataDashboard.result.weight / 1000)} KG</p>
                </div>
                <div className=' basis-auto mt-1 mx-5'>
                  <Dumbbell className="h-6 w-6 text-black text-right" />
                </div>
              </div>
            </div>

            <div className='text-md font-bold bg-white border border-gray-300 h-[100px] rounded-lg shadow-md mb-4'>
              <div className='text-md font-semibold py-4 px-5'>
                Estimated Overhead
              </div>
              <div className='flex flex-row text-left'>
                <div className='basis-full text-lg font-semibold py-0 px-5'>
                  <p>{Rupiah.format(dataDashboard.result.overhead)}</p>
                </div>
                <div className=' basis-auto mt-1 mx-5'>
                  <Coins className="h-6 w-6 text-black text-right" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }


}
