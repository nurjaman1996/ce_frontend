"use client"
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from "@/components/ui/button"
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
      <div className='flex flex-row justify-center m-5' >
        <div className='flex justify-end basis-6/12'>
          <Button className='bg-red-600 shadow-lg' onClick={handlePrint}><Icon.Printer size={20} />&nbsp;Cetak Dokumen</Button>
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
                src="/sicepat.png"
                width={300}
                height={300}
                alt="Picture of the author"
                style={{ height: 50, width: 200 }}
              />
            </div>

            <div className='border-b-2 border-black '>
              <div className='flex flex-row'>
                <div className='basis-full flex flex-row p-2 text-sm'>
                  <div className='basis-1/4'>
                    <p className='font-bold'>Penerima</p>
                  </div>
                  <div className='basis-full'>
                    <p className='font-medium'>:&nbsp;rico</p>
                  </div>
                </div>
                <div className='basis-1/2 flex flex-row p-2 text-sm'>
                  <div className='basis-1/4'>
                    <p className='font-bold'>Pengirim</p>
                  </div>
                  <div className='basis-full'>
                    <p className='font-medium'>:&nbsp;CE Homeware</p>
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
                  <div className='basis-1/3'>
                    <p className='font-bold'>HP / Tlp</p>
                  </div>
                  <div className='basis-full'>
                    <p className='font-medium'>:&nbsp;0856484354654</p>
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

            <div className='flex flex-row'>
              <div className='basis-1/7 p-2'>
                <p className='font-bold  text-lg'>Invoice</p>
              </div>
              <div className='basis-full p-2'>
                <p className='font-bold text-lg'>:&nbsp;12 Invoices,</p>
                <div className='font-medium text-xs'>[&nbsp;1) 2023121818070732cde157c8&nbsp;],[&nbsp;2) 2023121818070732cde157c8&nbsp;],[&nbsp;3) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],[&nbsp;4) 2023121818070732cde157c8&nbsp;],</div>
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

        <div className='flex flex-row justify-center m-5' >
          <div className='flex justify-end basis-0.5'>
            <Icon.ScissorsIcon size={20} className='-mb-2 -mt-2' />
          </div>
          <div className='flex justify-end basis-full border-dashed border-b-2 border-black -ml-3'>
          </div>
        </div>

        <div className='max-w-[100vh] h-auto m-5 mx-auto border-2 border-black overflow-auto flex flex-col'>
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
