"use client";
import * as React from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
const datapurchaseorder = [
  {
    no: "OHAYO JACKET",
  },
  {
    no: "IVANKA DRESS",
  },
  {
    no: "LILIAN SWEATER",
  },
  {
    no: "ESTER CARGIDAN",
  },
]

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

const combobox = [
  {
    value: "Gudang A",
    label: "Gudang A",
  },
  {
    value: "Gudang B",
    label: "Gudang B",
  },
]

export default function Order() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <main className="">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl text-red-500">
          Orders/ #CR14214
        </div>
      </div>

      <div className="flex flex-nowrap mt-4 gap-2">
        <div className="basis-3/6 text-4xl">
          <Input type="text" className='w-full shadow-md text-black rounded-2xl' placeholder="Search Products.." />
        </div>
        <div className="basis-1/6 text-4xl">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full  bg-red-400 font-bold text-white align-top rounded-2xl"
              >
                {value
                  ? combobox.find((framework) => framework.value === value)?.label
                  : "Select Reseller..."}
                <Icon.Accessibility className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {combobox.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {framework.label}
                      <Icon.Accessibility
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="basis-2/6 ">
          <Input type="text" className='w-full shadow-md text-black rounded-2xl' placeholder="Scan Barcode" />
        </div>
      </div>

      <div className='flex flex-row mt-2 gap-2 text-white'>

        <div className='basis-4/6 flex flex-row rounded-3xl border-2 border-black-500 h-[472px] bg-white shadow-xl'>

          {datapurchaseorder.map((dataisi) => (
            < div className='basis-1/3' >
              < div className='mt-8' >
                <Image
                  className='aspect-square ml-8 rounded-xl'
                  src="/image.jpeg"
                  width={165}
                  height={165}
                  alt="Picture of the author"
                />
                <div className='text-center text-black font-medium'><a key={dataisi.no}>{dataisi.no}</a></div>
              </div>
              < div className='mt-8 ' >
                <Image
                  className='aspect-square ml-8 rounded-xl '
                  src="/image.jpeg"
                  width={165}
                  height={165}
                  alt="Picture of the author"
                />
                <div className='text-center  text-black font-medium'><a key={dataisi.no}>{dataisi.no}</a></div>
              </div>
            </div>
          ))}
        </div>



        <div className='basis-2/6 rounded-3xl h-[475px]'>
          <div className='flex flex-row rounded-3xl  border-2 border-black-500 h-[50px] bg-white shadow-xl'>
            <span className='basis-1/2 text-xl font-bold mt-2 ml-5 text-left text-black'>Order #CR00001</span>
            <span className='basis-1/6 text-4xl font-bold mr-5 text-center text-black'>|</span>
            <span className='basis-1/4 text-xl font-bold mt-2 mr-5 text-right text-black'>Invoiced</span>
          </div>
          <div className='rounded-3xl border-2 border-black-500 h-[416px] bg-white text-center mt-2 shadow-xl'>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
            <div className="py-5 px-5">
              <hr />
            </div>
          </div>
          <div className='rounded-3xl  border-2 border-black-500 h-[171px] bg-white text-center mt-2 shadow-xl'>
            <div className="py-5 px-5">
              <Button className='bg-red-400 font-extrabold shadow-md w-full bottom-auto mb-2 mt-5' >Cancel</Button>
              <Button className='bg-green-400 font-extrabold shadow-md w-full bottom-auto' >Pay (Rp 0)</Button>
            </div>
          </div>
        </div>
      </div >

      <div className='flex flex-row mt-2 text-white mr-2'>
        <div className='basis-4/6 rounded-3xl  border-2 border-black-500 h-[170px] bg-white shadow-xl'>
          <div className="flex flex-row">
            <div className="basis-full text-black mt-3 ml-5 text-center text-xl">
              <span className="font-bold">Ship to :</span><br />
              <span>Fernando</span><br />
              <span>Hp : 08594646834</span><br />
              <span>Address : Ki. Nanas No. 46, Garuda, Andir, Bandung, 40124</span><br />
              <span className="font-bold text-blue-700">Jasa Kirim : JNE REG</span>
            </div>

            {/* <div className="basis-1/2 text-black mt-5 ml-5 text-center">
              <span className="font-bold text-center">SUB TOTAL : Fernando</span><br />
              <span>Hp : 08594646834</span><br />
              <span>Address : Ki. Nanas No. 46, Garuda, Andir, Bandung, 40124</span>
            </div> */}
          </div>
        </div>
      </div>

    </main >
  )
}
