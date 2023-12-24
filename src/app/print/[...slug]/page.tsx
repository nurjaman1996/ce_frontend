"use client"
import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation'
import axios from 'axios'
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
let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

export default function PrintPage() {
  const params: any = useParams()
  const id_cust = params.slug[0]
  const id_batch = params.slug[1]

  const [isLoading, setisLoading]: any = useState(true)
  const [dataCustomer, setdataCustomer]: any = useState([])
  const [dataInvoice, setdataInvoice]: any = useState([])
  const [dataProduk, setdataProduk]: any = useState([])

  const componentRef: any = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function getDataPrint() {
    await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/printresi`,
      data: {
        id_cust: id_cust,
        id_batch: id_batch,
      }
    })
      .then(function (response) {
        setdataCustomer(response.data.result.customer)
        setdataInvoice(response.data.result.details)
        setdataProduk(response.data.result.data_produk)
        setisLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    getDataPrint()
  }, [])

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center m-auto'>
        <Icon.Loader2 className="mr-2 h-5 w-5 animate-spin" />
        <span>Loading Data...</span>
      </div>
    )
  } else {
    const qtys = dataInvoice.reduce((total: any, currentItem: any) => total = total + currentItem.qty, 0)
    const weight = dataInvoice.reduce((total: any, currentItem: any) => total = total + currentItem.berat, 0)

    return (
      <div>
        <div className='flex flex-row justify-center m-5' >
          <div className='flex justify-end basis-6/12'>
            <Button className='bg-red-600 shadow-lg' onClick={handlePrint}><Icon.Printer size={20} />Cetak Dokumen</Button>
          </div>
        </div>
        <div className='mx-5 my-5' ref={componentRef}>
          <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col'>
            {/* ini konten print */}
            <div className="grow">
              {/* isi konten */}
              <div className='border-b-2 border-black p-2'>
                <Image
                  className='aspect-square h-7 w-auto'
                  src="/logo.png"
                  width={300}
                  height={300}
                  alt="Picture of the author"
                  style={{ height: 50, width: 50 }}
                  priority
                />
              </div>

              <div className='border-b-2 border-black '>
                <div className='flex flex-row'>
                  <div className='basis-full flex flex-row p-2 text-sm'>
                    <div className='basis-1/4'>
                      <p className='font-bold'>Penerima</p>
                    </div>
                    <div className='basis-full'>
                      <p className='font-medium'>: {dataCustomer.customer}</p>
                    </div>
                  </div>
                  <div className='basis-1/2 flex flex-row p-2 text-sm'>
                    <div className='basis-full'>
                      <p className='font-bold'>Pengirim</p>
                    </div>
                    <div className='basis-full'>
                      <p className='font-medium'>: CE Homeware</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div className='basis-full flex flex-row p-2 text-sm'>
                    <div className='basis-1/4'>
                      <p className='font-bold'>HP / Tlp</p>
                    </div>
                    <div className='basis-full'>
                      <p className='font-medium'>: {dataCustomer.hp}</p>
                    </div>
                  </div>
                  <div className='basis-1/2 flex flex-row p-2 text-sm'>
                    <div className='basis-full'>
                      <p className='font-bold'>HP / Tlp</p>
                    </div>
                    <div className='basis-full'>
                      <p className='font-medium'>: 0856484354654</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div className='basis-full flex flex-row p-2 text-sm'>
                    <div className='basis-1/4'>
                      <p className='font-bold'>Alamat</p>
                    </div>
                    <div className='basis-full'>
                      <p className='font-medium'>: {dataCustomer.alamat}</p>
                    </div>
                  </div>
                  <div className='basis-1/2 flex flex-row p-2 text-sm'>
                  </div>
                </div>
              </div>

              <div className='flex flex-row'>
                <div className='basis-1/7 p-2'>
                  <p className='font-bold  text-lg'>Invoice</p>
                </div>
                <div className='basis-full p-2'>
                  <p className='font-bold text-lg'>: {dataInvoice.length}</p>
                  <div className='flex gap-2 flex-wrap'>
                    {dataInvoice.map((data: any, index: any) => {
                      return (
                        <span key={index} className='text-xs'>{index + 1}. {data.id_invoice}</span>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>
            {/* ini akhir konten print */}
            <div className='flex flex-row border-t-2 border-black'>
              <div className='basis-full flex flex-row p-2 text-sm'>
                <div className='basis-1/4'>
                  <p className='font-bold'>Produk</p>
                </div>
                <div className='basis-full'>
                  <p className='font-medium'>: {Numbering.format(qtys)} Qty</p>
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
                  <p className='font-medium'>: {Numbering.format(weight / 1000)} Kg</p>
                </div>
              </div>
              <div className='basis-1/2 flex flex-row p-2 text-sm'>
              </div>
            </div>
          </div >

          <div className='flex flex-row justify-center m-auto max-w-[800px] ' >
            <div className='flex justify-end basis-0.5 mr-2'>
              <Icon.ScissorsIcon size={20} className='-mb-2 -mt-2 text-gray-400' />
            </div>
            <div className='flex justify-end grow border-dashed border-b-2 border-gray-400 -ml-3'>
            </div>
          </div>

          <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col'>
            <Table>
              <TableCaption className='font-bold text-xs mb-2'>List Pesanan Customer {dataCustomer.customer} - {id_batch}</TableCaption>
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
                {dataProduk.map((data_produk: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold">{index + 1}</TableCell>
                    <TableCell >{data_produk.produk}</TableCell>
                    <TableCell className='text-center'>{data_produk.variasi}</TableCell>
                    <TableCell className='text-center'>{data_produk.ukuran}</TableCell>
                    <TableCell className='text-center'>{data_produk.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div >
        </div>
      </div >
    );
  }
};
