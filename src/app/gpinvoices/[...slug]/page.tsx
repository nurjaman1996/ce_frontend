"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import * as Icon from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

import { uid } from 'uid';

import { addDays, format, subDays, subWeeks, startOfWeek, lastDayOfWeek } from "date-fns"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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

export default function GroupInvoicesPage() {
    const params: any = useParams()
    const id_cust = params.slug[0]
    const id_batch = params.slug[1]

    const [isLoading, setisLoading]: any = useState(true)
    const [dataCustomer, setdataCustomer]: any = useState([])
    const [dataInvoice, setdataInvoice]: any = useState([])

    const [value, setValue]: any = React.useState('');

    async function getDetailsInvoice() {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getdetailsinvoicegp`,
            data: {
                id_cust: id_cust,
                id_batch: id_batch,
            }
        })
            .then(function (response) {
                setdataCustomer(response.data.result.customer)
                setdataInvoice(response.data.result.details)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    React.useEffect(() => {
        getDetailsInvoice()
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const ClientKey = "SB-Mid-client-LSH8eb7-3QZ0sNFm";

        const script = document.createElement("script");
        script.src = snapScript;
        script.setAttribute("data-client-key", ClientKey);
        script.async = true

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [])

    let gp_id_invoice: any = []

    async function payment(ammount: any, customer: any, hp: any, typePayment: any) {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/creategrouppayment`,
            data: {
                id_invoice: gp_id_invoice,
                amount: parseInt(ammount),
                customer: customer,
                hp: hp,
                typePayment: typePayment,
                uuid: format(new Date(), "yyyyMMddHHmmss") + uid(10),
            }
        })
            .then(function (response) {
                setopenPayment(false)
                window.snap.pay(response.data.snap_token)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    var total_ongkir = 0
    var total_berat = 0
    var total_pelunasan = 0
    var sudah_dibayar = 0
    var min_dp = 0
    var min_lunas = 0

    const [openPayment, setopenPayment]: any = useState(false)
    const [nominalPayment, setnominalPayment]: any = useState(0)
    const [e_payment, sete_payment]: any = useState("dp")

    function NominalPayment(e: any) {
        sete_payment(e)

        if (e === "dp") {
            setnominalPayment(min_dp)
        } else {
            setnominalPayment(min_lunas)
        }
    }

    if (isLoading) {
        return (
            <div className='max-w-[700px] w-screen h-screen flex justify-center items-center'>
                <Icon.Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Loading Data...</span>
            </div>
        )
    } else {
        return (
            <div className='flex flex-col gap-2'>
                <div className='max-w-[700px] w-screen h-full p-5 pb-20'>
                    <div className='flex flex-row'>
                        <div className='basis-full text-left'>
                            <span className='font-bold text-3xl'>Invoice</span><br></br>
                            {/* <span className='font-normal text-xs'>#{dataInvoice.id_invoice}</span> */}
                        </div>
                        <div className='grow'>
                            <Image
                                className='aspect-square h-7 w-auto -mt-2'
                                src="/logo.png"
                                width={350}
                                height={350}
                                alt="Picture of the author"
                                style={{ height: 65, width: 65 }}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 mt-2'>
                        <div className='grow text-left border-t border border-r-0 p-2'>
                            <span className='font-bold text-base '>BATCH</span><br></br>
                            <span className='font-medium text-xs'>{id_batch}</span><br></br>
                            <span className='font-bold text-base'>Total Invoice</span><br></br>
                            <span className='font-medium text-xs'>{dataInvoice.length}</span><br></br>
                        </div>
                        <div className='grow text-right border p-2'>
                            <span className='font-bold text-base'>Billed to</span><br></br>
                            <span className='font-medium text-base'>{dataCustomer.customer}</span><br></br>
                            <span className='font-normal text-xs'>{dataCustomer.hp}</span><br></br>
                            <span className='font-normal text-xs'>{dataCustomer.alamat}, {dataCustomer.kota}, {dataCustomer.kel}, {dataCustomer.kec}, {dataCustomer.kodepos}</span><br></br>
                        </div>
                    </div>

                    <div className='flex flex-row gap-2 text-center font-bold text-sm mt-5'>
                        <div className='w-[8%]'>No.</div>
                        <div className='w-[45%]'>ID Invoice</div>
                        <div className='w-[45%]'>Details</div>
                    </div>


                    <Accordion type="single" value={value} onValueChange={setValue}>
                        {dataInvoice.map((data: any, index: number) => {
                            const total_amount = data.sub_total + data.ongkir_per_kg
                            const dp = data.payment >= (data.sub_total * 50 / 100) ? 0 : (data.sub_total * 50 / 100) - data.payment
                            const total_paid = data.payment
                            total_pelunasan = total_pelunasan + data.sub_total
                            sudah_dibayar = sudah_dibayar + total_paid
                            min_dp = min_dp + dp
                            min_lunas = min_lunas + (total_amount - total_paid)
                            total_ongkir = total_ongkir + data.ongkir_per_kg
                            total_berat = total_berat + data.berat
                            gp_id_invoice.push({
                                id_invoice: data.id_invoice,
                                min_dp: dp,
                                min_lunas: total_amount - total_paid,
                            })
                            return (
                                <AccordionItem key={index} value={`item-${index + 1}`}>
                                    <div className='flex flex-row text-left text-xs my-2 items-center gap-1'>
                                        <div className='w-[8%]'>{index + 1}.</div>
                                        <div className='w-[45%] underline text-blue-500 cursor-pointer'
                                            onClick={() => {
                                                setValue(value === `item-${index + 1}` ? "" : `item-${index + 1}`)
                                            }}
                                        >
                                            {data.id_invoice}
                                            <p>{data.tanggal}</p>
                                        </div>
                                        <div className='w-[45%] flex flex-col gap-1 items-start justify-center'>
                                            <div className='w-full flex flex-row gap-2'>
                                                <div className='basis-1/2 text-left'>Sub Total</div>
                                                <div className='basis-1/2 text-right'>{Rupiah.format(data.sub_total)}</div>
                                            </div>
                                            <div className='w-full flex flex-row gap-2'>
                                                <div className='basis-1/2 text-left'>Ongkir ({Numbering.format(data.berat / 1000)}kg)</div>
                                                <div className='basis-1/2 text-right'>{Rupiah.format(data.ongkir_per_kg)}</div>
                                            </div>
                                            <div className='w-full flex flex-row gap-2 border-b pb-2'>
                                                <div className='basis-1/2 text-left'>Grand Total</div>
                                                <div className='basis-1/2 text-right'>{Rupiah.format(total_amount)}</div>
                                            </div>
                                            <div className='w-full flex flex-row gap-2'>
                                                <div className='basis-1/2 text-left'>Min DP 50%</div>
                                                <div className='basis-1/2 text-right'>{Rupiah.format(dp)}</div>
                                            </div>
                                            {/* <div className='w-full flex flex-row gap-2'>
                                                <div className='basis-1/2 text-left'>Pelunasan</div>
                                                <div className='basis-1/2 text-right'>{Rupiah.format(data.sub_total - data.payment)}</div>
                                            </div> */}
                                            <div className='w-full flex flex-row gap-2 font-bold'>
                                                <div className='basis-1/2 text-left'>Dibayar</div>
                                                <div className='basis-1/2 text-right text-lime-600'>{Rupiah.format(total_paid)}</div>
                                            </div>
                                            <div className='w-full flex flex-row gap-2 font-bold'>
                                                <div className='basis-1/2 text-left'>Sisa</div>
                                                <div className='basis-1/2 text-right text-red-600'>{Rupiah.format(total_amount - total_paid)}</div>
                                            </div>

                                        </div>
                                    </div>
                                    <AccordionContent >
                                        {data.details.map((dataDetails: any, index: number) => {
                                            return (
                                                <div key={index} className='grid grid-cols-4'>
                                                    <div className='border-t flex flex-row grow items-center'>
                                                        <div className=''>
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${dataDetails.images}`}
                                                                alt="Photo by Drew Beamer"
                                                                width={300}
                                                                height={300}
                                                                priority={true}
                                                                className="rounded-sm aspect-square p-2"
                                                                style={{ height: "auto", width: "100%" }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='flex flex-col justify-center border-t'>
                                                        <div>
                                                            <div className='text-[14px]'>{dataDetails.produk}</div>
                                                            <div className='text-[9px]'>Variant : {dataDetails.variasi}</div>
                                                            <div className='text-[9px]'>Ukuran : {dataDetails.ukuran}</div>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center border-t justify-center text-xs'>
                                                        {Rupiah.format(dataDetails.harga_jual)} <span className='font-medium'>&nbsp;(x{Numbering.format(dataDetails.qty)})</span>
                                                    </div>

                                                    <div className='flex items-center border-t justify-center text-xs'>
                                                        {Rupiah.format(dataDetails.sub_total)}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>


                    <div className='text-xs my-3'>
                        <div className='w-full flex flex-row gap-2'>
                            <div className='basis-1/2 text-left font-medium'>Total Pelunasan</div>
                            <div className='basis-1/2 text-right font-semibold'>{Rupiah.format(total_pelunasan)}</div>
                        </div>
                        <div className='w-full flex flex-row gap-2 '>
                            <div className='basis-1/2 text-left font-medium'>Total Biaya ongkir ({total_berat / 1000}kg)</div>
                            <div className='basis-1/2 text-right font-semibold'>{Rupiah.format(total_ongkir)}</div>
                        </div>
                        <div className='w-full flex flex-row gap-2  border-b pb-1'>
                            <div className='basis-1/2 text-left font-medium'>Sudah Dibayar</div>
                            <div className='basis-1/2 text-right text-lime-600 font-semibold'>{Rupiah.format(sudah_dibayar)}</div>
                        </div>


                        <div className='w-full flex flex-row gap-2 '>
                            <div className='basis-1/2 text-left font-medium'>Sisa Pelunasan + Biaya ongkir</div>
                            <div className='basis-1/2 text-right text-red-600 font-semibold'>{Rupiah.format(min_lunas)}</div>
                        </div>
                        <div className='w-full flex flex-row gap-2  border-b pb-1'>
                            <div className='basis-1/2 text-left font-medium'>Sisa Minimum Pembayaran DP</div>
                            <div className='basis-1/2 text-right  text-red-600 font-semibold'>{Rupiah.format(min_dp)}</div>
                        </div>
                    </div>

                </div>


                {min_dp != 0 ?
                    <div className='w-full max-w-[700px] fixed bottom-0 px-2 pb-5 pt-2 bg-white'>
                        <AlertDialog open={openPayment} onOpenChange={setopenPayment}>
                            <AlertDialogTrigger asChild>
                                <Button variant="default" size="sm" className="font-bold w-full"
                                    onClick={() => {
                                        setopenPayment(true)
                                        setnominalPayment(min_dp)
                                        sete_payment("dp")
                                    }}
                                >
                                    Lakukan Pembayaran
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='w-[80%] max-w-[700px]'>
                                <AlertDialogHeader className='border-b pb-4'>
                                    <AlertDialogTitle className='text-base'>Pilih Nominal Pembayaran</AlertDialogTitle>
                                </AlertDialogHeader>
                                <div>
                                    <Select value={e_payment} onValueChange={(e) => { NominalPayment(e) }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Nominal..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="dp">Down Payment 50%</SelectItem>
                                                <SelectItem value="lunas">Pembayaran 100% (Lunas)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='flex justify-center mb-5 mt-2'>
                                    Total Pembayaran : {Rupiah.format(nominalPayment)}
                                </div>

                                <AlertDialogFooter>
                                    <AlertDialogCancel className='bg-red-400 font-bold'>Cancel</AlertDialogCancel>
                                    <Button className='font-bold'
                                        onClick={() => {
                                            payment(nominalPayment, dataCustomer.customer, dataCustomer.hp, e_payment)
                                        }}
                                    >
                                        Pay
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    :
                    min_lunas != 0 ?
                        <div className='w-full max-w-[700px] fixed bottom-0 px-2 pb-5 pt-2 bg-white'>
                            <AlertDialog open={openPayment} onOpenChange={setopenPayment}>
                                <AlertDialogTrigger asChild>
                                    <Button variant="default" size="sm" className="font-bold w-full"
                                        onClick={() => {
                                            setopenPayment(true)
                                            setnominalPayment(min_lunas)
                                        }}
                                    >
                                        Lakukan Pembayaran
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='w-[80%] max-w-[700px]'>
                                    <AlertDialogHeader className='border-b pb-4'>
                                        <AlertDialogTitle className='text-base'>Nominal Pelunasan</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    {/* <div>
                                        <Select value={e_payment} onValueChange={(e) => { NominalPayment(e) }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih Nominal..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="dp">Down Payment 50%</SelectItem>
                                                    <SelectItem value="lunas">Pembayaran 100% (Lunas)</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div> */}

                                    <div className='flex justify-center mb-5 mt-2'>
                                        Total Pelunasan : {Rupiah.format(nominalPayment)}
                                    </div>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel className='bg-red-400 font-bold'>Cancel</AlertDialogCancel>
                                        <Button className='font-bold'
                                            onClick={() => {
                                                payment(nominalPayment, dataCustomer.customer, dataCustomer.hp, "lunas")
                                            }}
                                        >
                                            Pay
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        :
                        <div className='w-full max-w-[700px] text-center pb-20'>
                            Pembayaran Telah Dilunasi
                        </div>
                }
            </div>
        )
    }
}
