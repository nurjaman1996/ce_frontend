"use client"
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from "@/components/ui/button"
import { BeakerIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import { BarChart4, Boxes, Check, ChevronsUpDown, Coffee, Coins, Container, DollarSign, Dumbbell, FileStack, Package } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import * as Icon from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const invoices = [
  {
    no: "1",
    produk: "Celana Cargo",
    variasi: "Merah",
    ukuran: "L",
    qty: "5",
  },
  {
    no: "",
    produk: "Celana Cargo",
    variasi: "Biru",
    ukuran: "XL",
    qty: "10",
  },
  {
    no: "2",
    produk: "Baju Jersey Liga Prindavan",
    variasi: "Hitam",
    ukuran: "XS",
    qty: "32",
  },
  {
    no: "",
    produk: "Baju Jersey Liga Prindavan",
    variasi: "Pink",
    ukuran: "M",
    qty: "25",
  },
]

export default function asd() {
  const componentRef: any = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className='flex flex-row justify-center mt-5 -mx-5' >
        <div className='justify-end basis-6/12 flex flex-row gap-2'>
          <div className='basis-full bg-white border-2 border-black rounded-lg shadow-md'>
            <div className='text-2xl text-lime-700 basis-full text-center font-semibold py-2'>
              ON PROGRESS
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-center mt-5 -mx-5' >
        <div className='justify-end basis-6/12 flex flex-row gap-2'>
          <div className='basis-1/4 bg-white border-2 border-black h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Pesanan
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                24 Pesanan
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Container className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border-2 border-black h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Qty
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                33
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Container className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border-2 border-black h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Terbayarkan
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                Rp 7.550.000
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Container className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border-2 border-black h-[110px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Belum Di Bayar
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                Rp 3.443.000
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Container className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='my-5' ref={componentRef}>
        <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col rounded-lg'>
          {/* ini konten print */}
          <div className="grow">
            {/* isi konten */}
            <div className='flex flex-row'>
              <div className='border-b-2 border-black p-2 basis-1/2'>
                <Image
                  className='aspect-square h-7 w-auto '
                  src="/logo.png"
                  width={300}
                  height={300}
                  alt="Picture of the author"
                  style={{ height: 50, width: 50 }}
                />
              </div>
              <div className='border-b-2 border-black p-2 basis-1/2'>
                <div className='text-4xl font-bold text-right mt-1'>INVOICE</div>
              </div>
            </div>

            <div className='border-b-2 border-black '>
              <div className='flex flex-row'>
                <div className='basis-full flex flex-row p-2 text-sm'>
                  <div className='basis-1/4'>
                    <p className='font-bold'>Customer</p>
                  </div>
                  <div className='basis-full'>
                    <p className='font-medium'>:&nbsp;rico</p>
                  </div>
                </div>
                <div className='basis-1/2 flex flex-row p-2 text-sm'>
                  <div className='basis-full text-right'>
                    <p className='font-bold'>Jastip to China (BATCH-0001)</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='basis-full flex flex-row p-2 text-sm'>
                  <div className='basis-1/4'>
                    <p className='font-bold'>HP / Tlp</p>
                  </div>
                  <div className='basis-full'>
                    <p className='font-medium'>:&nbsp;0856484354654</p>
                  </div>
                </div>
                <div className='basis-1/2 flex flex-row p-2 text-sm'>
                  <div className='basis-full text-right'>
                    <p className='font-medium italic'>01-01-2024 s/d 20-01/2024</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='basis-full flex flex-row p-2 text-sm'>
                  <div className='basis-1/4'>
                    <p className='font-bold'>Alamat</p>
                  </div>
                  <div className='basis-full'>
                    <p className='font-medium'>:&nbsp;batununggal VI, DKI Jakarta, Kota Jakarta Pusat, Gambir, batunggal, 21435</p>
                  </div>
                </div>
                <div className='basis-1/2 flex flex-row p-2 text-sm'>
                </div>
              </div>
            </div>


          </div>
          {/* ini akhir konten print */}
          <div className='flex flex-row border-black'>
            <div className='basis-full flex flex-row p-2 text-sm'>
              <div className='basis-1/4'>
                <p className='font-bold'>Produk</p>
              </div>
              <div className='basis-full'>
                <p className='font-medium'>:&nbsp;(52 Qty)</p>
              </div>
            </div>
            <div className='basis-1/2 flex flex-row p-2 text-sm'>
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='basis-full flex flex-row p-2 text-sm'>
              <div className='basis-1/4'>
                <p className='font-bold'>Berat</p>
              </div>
              <div className='basis-full'>
                <p className='font-medium'>:&nbsp;(37.6kg)</p>
              </div>
            </div>
            <div className='basis-1/2 flex flex-row p-2 text-sm'>
            </div>
          </div>
        </div >

        <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col rounded-lg'>
          <div className='flex flex-row'>
            <div className='border-b-2 border-black p-2 basis-1/2'>
              <div className='text-2xl font-bold text-left pl-2'>Informasi Pengiriman</div>
            </div>
            <div className='border-b-2 border-black p-2 basis-1/2'>
              <div className='text-2xl font-medium italic text-right'>SICEPAT : #004265152778</div>
            </div>
          </div>
          <div className='flex flex-row p-5'>

            <RadioGroup defaultValue="1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" />
                <Label htmlFor="r1">Pesanan sedang diantar ke alamat tujuan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" className='bg-gray-300 border-gray-300' />
                <Label htmlFor="r2">
                  Pesananmu sedang diproses di pusat penyortiran Karanganyar.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" className='bg-gray-300 border-gray-300' />
                <Label htmlFor="r3">
                  Penjual telah mengatur pengiriman. Menunggu pesanan diserahkan ke pihak jasa kirim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" className='bg-gray-300 border-gray-300' />
                <Label htmlFor="r3">
                  Pesanan telah sampai di gudang pelabuhan tanjung priok</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" className='bg-gray-300 border-gray-300' />
                <Label htmlFor="r4">
                  Pesanan dalam perjalanan menuju indonesia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6" className='bg-gray-300 border-gray-300' />
                <Label htmlFor="r5">
                  Pesanan telah diterima cargo internasional</Label>
              </div>
            </RadioGroup>
          </div >
        </div >

        <div className='flex flex-row justify-center mt-5 -mx-5' >
          <div className='justify-end basis-6/12 flex flex-row gap-2'>
            <div className='basis-full bg-white border-2 border-black h-[70px] rounded-lg shadow-md'>
              <div className='flex flex-row text-left mt-2'>
                <div className='basis-full text-md font-semibold py-0 px-5'>
                  Total Pembayaran : <span className='font-normal'>Rp 12.000.000</span>
                </div>
              </div>
              <div className='flex flex-row text-left'>
                <div className='basis-full text-md font-semibold py-0 px-5'>
                  Total Biaya Ongkir : <span className='font-normal'>Rp 350.000</span>
                </div>
              </div>
            </div>
            <div className='grow bg-blue-300 border-2 border-black h-[70px] rounded-lg shadow-md justify-center'>
              <div className='text-md font-semibold py-4 px-5 -mt-2'>
                Detail <Icon.ArrowBigRight className="h-6 w-6 ml-2 text-black" />
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col rounded-lg'>
          <Table>
            <TableCaption className='font-bold'>List Pesanan Customer Rico - Batch-0003</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead className="w-[55%] text-left">Produk</TableHead>
                <TableHead className='text-center'>Variasi</TableHead>
                <TableHead className='text-center'>Ukuran</TableHead>
                <TableHead className='text-center'>Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='text-[10px]'>
              {invoices.map((invoice) => (
                <TableRow key={invoice.no}>
                  <TableCell className="font-bold">{invoice.no}</TableCell>
                  <TableCell >{invoice.produk}</TableCell>
                  <TableCell className='text-center'>{invoice.variasi}</TableCell>
                  <TableCell className='text-center'>{invoice.ukuran}</TableCell>
                  <TableCell className='text-center'>{invoice.qty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div >
      </div>
    </div >
  );
};
