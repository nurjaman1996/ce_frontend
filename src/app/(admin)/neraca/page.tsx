"use client";
import Image from 'next/image'
import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { useEffect, useState } from 'react'
import { addDays, format, subDays, subWeeks, startOfWeek, lastDayOfWeek } from "date-fns"
import axios from 'axios'

import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BarChart4, Boxes, Check, ChevronsUpDown, Coffee, Coins, Container, DollarSign, Dumbbell, FileStack, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

export default function Neraca() {
  const [isLoading, setisLoading]: any = useState(true)

  const [open, setOpen] = useState(false)
  const [dataBatch, setdataBatch]: any = useState([])
  const [valueBatch, setValueBatch]: any = useState("")

  const [dataNeraca, setdataNeraca]: any = useState([])

  async function loadNeraca(data_batch: any) {
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/neraca`,
      data: {
        id_batch: data_batch
      }
    })
      .then(function (response) {
        setdataNeraca(response.data.result)
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
          loadNeraca(response.data.data[0].id_batch)
        } else {
          loadNeraca(valueBatch)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    loadDataBatch()
  }, [])

  const data = [
    { name: 'Revenue', value: dataNeraca.margin },
    { name: 'Cost', value: dataNeraca.cost },
  ];

  const data2 = [
    { name: 'Paid', value: dataNeraca.paid_revenue },
    { name: 'Pending', value: dataNeraca.pending_revenue },
  ];

  const COLORS = ['#4ADE80', '#FFAC28'];
  const COLORS2 = ['#60A5FA', '#F87171'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
          <div className="font-bold text-4xl text-gray-500">
            Neraca
          </div>
          <div className="ml-auto w-auto">
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
                          setValueBatch(currentValue.toUpperCase() === valueBatch ? "" : currentValue.toUpperCase())
                          loadNeraca(currentValue.toUpperCase())
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

        <div className='flex flex-row mt-4 gap-4 '>
          <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px]  bg-gray-400 text-white'>
            <div className='text-xl font-semibold py-5 px-5'>
              Sales
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-2xl font-semibold'>
                {Numbering.format(dataNeraca.sales)}
              </div>
              <div className=' basis-1/2 flex justify-end'>
                <Icon.ShoppingCart size={45} color="#ffffff" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px] bg-gray-400 text-white'>
            <div className='text-xl font-semibold py-5 px-5'>
              Gross Sales
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-4/6 text-2xl font-semibold'>
                {Rupiah.format(dataNeraca.grosssale)}
              </div>
              <div className=' basis-1/3 flex justify-end'>
                <Icon.TrendingUp size={45} color="#ffffff" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px] bg-gray-400 text-white'>
            <div className='text-xl font-semibold py-5 px-5'>
              Costs
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-4/6 text-2xl font-semibold'>
                {Rupiah.format(dataNeraca.cost)}
              </div>
              <div className=' basis-1/3 flex justify-end'>
                <Icon.DollarSign size={45} color="#ffffff" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px] bg-gray-400 text-white'>
            <div className='text-xl font-semibold py-5 px-5'>
              Margin
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-4/6 text-2xl font-semibold'>
                {Rupiah.format(dataNeraca.margin)}
              </div>
              <div className=' basis-1/3 flex justify-end'>
                <Icon.FishSymbol size={45} color="#ffffff" />
              </div>
            </div>
          </div>

        </div>

        <div className='flex flex-row mt-4 gap-4 '>
          <div className='basis-1/3 bg-white-50 border-2 border-black-500 h-[125px]  bg-red-400 text-white'>
            <div className='text-xl font-semibold py-5 px-5'>
              Pending Revenue
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-2xl font-semibold'>
                {Rupiah.format(dataNeraca.pending_revenue)}
              </div>
              <div className=' basis-1/2 flex justify-end'>
                <Icon.CircleDashedIcon size={45} color="#ffffff" />
              </div>
            </div>
          </div>
          <div className='basis-1/3 bg-white-50 border-2 border-black-500 h-[125px]  bg-blue-400 text-white'>
            <div className='text-xl font-semibold py-5 px-5'>
              Paid Revenue
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-2xl font-semibold'>
                {Rupiah.format(dataNeraca.paid_revenue)}
              </div>
              <div className=' basis-1/2 flex justify-end'>
                <Icon.CheckSquare size={45} color="#ffffff" />
              </div>
            </div>
          </div>
          <div className='basis-1/3 bg-white-50 border-2 border-black-500 h-[125px]  bg-green-400 text-white'>
            <div className='text-xl font-semibold py-5 px-5'>
              Profit
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-2xl font-semibold'>
                {Rupiah.format(dataNeraca.profit)}
              </div>
              <div className=' basis-1/2 flex justify-end'>
                <Icon.DollarSignIcon size={45} color="#ffffff" />
              </div>
            </div>
          </div>
        </div>


        <div className='flex flex-row mt-4 gap-4 '>
          <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black flex flex-col'>
            <div className='text-xl font-semibold pt-3 px-5'>
              Revenue VS Costs
            </div>
            <div className='grow'>
              <ResponsiveContainer width="100%" height="100%" className="flex items-center justify-center p-0">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    // outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={
                      function CustomTooltip({ payload, label, active }: any) {
                        if (active) {
                          return (
                            <div className="bg-white p-2 rounded-md">
                              <p>{payload[0].payload.name} : {Rupiah.format(payload[0].payload.value)}</p>
                            </div>
                          );
                        }

                        return null;
                      }
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black flex flex-col'>
            <div className='text-xl font-semibold pt-3 px-5'>
              Pending VS Paid
            </div>
            <div className='grow'>
              <ResponsiveContainer width="100%" height="100%" className="flex items-center justify-center p-0">
                <PieChart>
                  <Pie
                    data={data2}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    // outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={
                      function CustomTooltip({ payload, label, active }: any) {
                        if (active) {
                          return (
                            <div className="bg-white p-2 rounded-md">
                              <p>{payload[0].payload.name} : {Rupiah.format(payload[0].payload.value)}</p>
                            </div>
                          );
                        }

                        return null;
                      }
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        <div className='flex flex-row mt-4 gap-4 '>
          <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black'>
            <div className='text-xl font-semibold py-5 px-5'>
              Products Top Sales
            </div>
            {dataNeraca.producttopsales.map((data: any, index: number) => {
              return (
                <div key={index} className='flex flex-row text-left px-5'>
                  <div className='basis-4/6 text-xl font-semibold'>
                    {data.produk}
                  </div>
                  <div className=' basis-1/3 flex justify-end text-xl'>
                    {data.qty} Pcs
                  </div>
                </div>
              )
            })}
          </div>

          <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black'>
            <div className='text-xl font-semibold py-5 px-5'>
              Customer Top Sales
            </div>
            {dataNeraca.customertopsales.map((data: any, index: number) => {
              return (
                <div key={index} className='flex flex-row text-left px-5'>
                  <div className='basis-4/6 text-xl font-semibold'>
                    {data.customer}
                  </div>
                  <div className=' basis-1/3 flex justify-end text-xl'>
                    {data.qty} Pcs
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main >
    )
  }
}
