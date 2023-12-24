"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
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
let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");
import { getWaybill } from "../../../helpers/getOngkir";

export default function Share() {
  const [data_resi, setdata_resi]: any = useState([])

  async function getsWaybill(data_resis: any) {
    const data: any = await getWaybill(data_resis)

    if (data) {
      setdata_resi(data)
      setisLoading(false)
    }
  }

  const params: any = useParams()
  const id_cust = params.slug[0]
  const id_batch = params.slug[1]

  const [isLoading, setisLoading]: any = useState(true)
  const [dataCustomer, setdataCustomer]: any = useState([])
  const [dataInvoice, setdataInvoice]: any = useState([])
  const [dataProduk, setdataProduk]: any = useState([])

  async function getDataPrint() {
    await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/share`,
      data: {
        id_cust: id_cust,
        id_batch: id_batch,
      }
    })
      .then(function (response) {
        setdataCustomer(response.data.result.customer)
        setdataInvoice(response.data.result.details)
        setdataProduk(response.data.result.data_produk)
        getsWaybill(response.data.result.data_resi)
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  function openInvoice() {
    window.open(`/gpinvoices/${id_cust}/${id_batch}`)
  }

  useEffect(() => {
    return () => {
      getDataPrint()
    }
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
    const subtotal = dataInvoice.reduce((total: any, currentItem: any) => total = total + currentItem.sub_total, 0)
    const ongkir = dataInvoice.reduce((total: any, currentItem: any) => total = total + currentItem.ongkir_per_kg, 0)

    return (
      <div>
        {/* <div className='flex flex-row justify-center mt-5 -mx-5' >
          <div className='justify-end basis-6/12 flex flex-row gap-2'>
            <div className='basis-full bg-white border-2 border-black rounded-lg shadow-md'>
              <div className='text-2xl text-lime-700 basis-full text-center font-semibold py-2'>
                ON PROGRESS
              </div>
            </div>
          </div>
        </div> */}

        <div className='my-5'>
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
                      <p className='font-medium'>: {dataCustomer.customer}</p>
                    </div>
                  </div>
                  <div className='basis-1/2 flex flex-row p-2 text-sm'>
                    <div className='basis-full text-right'>
                      <p className='font-bold'>Batch ({id_batch})</p>
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
                    <div className='basis-full text-right'>
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


            </div>
            {/* ini akhir konten print */}
            <div className='flex flex-row border-black'>
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

          <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col rounded-lg'>
            <div className='flex flex-row'>
              <div className='border-b-2 border-black p-2 grow'>
                <div className='text-2xl font-bold text-left pl-2'>Informasi Pengiriman</div>
              </div>

            </div>
            <div className='flex flex-row p-5'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead className='text-center'>Resi</TableHead>
                    <TableHead className='text-center'>Jasa Kirim</TableHead>
                    <TableHead className='text-center'>Status Pengiriman</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='text-[10px]'>
                  {data_resi.map((dataresi: any, index: any) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-bold">{index + 1}</TableCell>
                        <TableCell className='text-center'>{dataresi.resi}</TableCell>
                        <TableCell className='text-center'>{dataresi.jasa_kirim}</TableCell>
                        <TableCell className='text-center'>
                          <div>
                            {/* {dataresi.manifest.map((dataM: any, index: any) => {
                              return (
                                <div key={index}>
                                  <div>{dataM.manifest_description}</div>
                                  <div>{dataM.manifest_date}</div>
                                  <div>{dataM.manifest_time}</div>
                                  <div>{dataM.city_name}</div>
                                </div>
                              )
                            })} */}

                            <div>{dataresi.manifest[0].manifest_description}</div>
                            <div>{dataresi.manifest[0].manifest_date}</div>
                            <div>{dataresi.manifest[0].manifest_time}</div>
                            <div>{dataresi.manifest[0].city_name}</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {/* <RadioGroup defaultValue="1">
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
              </RadioGroup> */}
            </div >
          </div >

          <div className='max-w-[100vh] flex flex-row justify-center m-auto' >
            <div className='justify-end grow flex flex-row gap-2'>
              <div className='basis-full bg-white border-2 border-black h-[70px] rounded-lg shadow-md'>
                <div className='flex flex-row text-left mt-2'>
                  <div className='basis-full text-md font-semibold py-0 px-5'>
                    Total Pembayaran : <span className='font-normal'>{Rupiah.format(subtotal)}</span>
                  </div>
                </div>
                <div className='flex flex-row text-left'>
                  <div className='basis-full text-md font-semibold py-0 px-5'>
                    Total Biaya Ongkir : <span className='font-normal'>{Rupiah.format(ongkir)}</span>
                  </div>
                </div>
              </div>
              <div className='grow bg-blue-300 border-2 border-black h-[70px] rounded-lg shadow-md justify-center'>
                <button onClick={() => { openInvoice() }} className='text-md font-semibold py-4 px-5 -mt-2'>
                  Detail <Icon.ArrowBigRight className="h-6 w-6 ml-2 text-black" />
                </button>
              </div>
            </div>
          </div>

          <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col rounded-lg'>
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
