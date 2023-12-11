"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import * as Icon from "lucide-react"
import Image from 'next/image'
let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

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

import { Label } from "@/components/ui/label"

export default function InvoicesPage() {
    const params: any = useParams()
    const id_invoice = params.data[0]

    const [isLoading, setisLoading]: any = useState(true)
    const [dataInvoice, setdataInvoice]: any = useState(null)


    async function getDetailsInvoice() {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getdetailsinvoice`,
            data: {
                id_invoice: id_invoice
            }
        })
            .then(function (response) {
                setdataInvoice(response.data.result)
                setnominalPayment(response.data.result.sub_total / 2)
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

    async function payment(ammount: any, typepayment: any, customer: any, hp: any) {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/createpayment`,
            data: {
                id_invoice: id_invoice,
                amount: parseInt(ammount),
                customer: customer,
                hp: hp,
                typepayment: typepayment,
            }
        })
            .then(function (response) {
                window.snap.pay(response.data.snap_token)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const [e_payment, sete_payment]: any = useState("dp")
    const [nominalPayment, setnominalPayment]: any = useState(0)
    const [descPayment, setdescPayment]: any = useState("")
    const [openPayment, setopenPayment]: any = useState(false)

    function NominalPayment(e: any, subtotal: any, id_invoice: any) {
        sete_payment(e)

        if (e === "dp") {
            setnominalPayment(subtotal / 2)
            setdescPayment(`DP 50% INV:${id_invoice}`)
        } else {
            setnominalPayment(subtotal)
            setdescPayment(`Pelunasan INV:${id_invoice}`)
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
            <>
                <div className='max-w-[700px] w-full h-full p-5'>
                    <div className='flex flex-row'>
                        <div className='basis-full text-left'>
                            <span className='font-bold text-4xl'>Invoice</span><br></br>
                            <span className='font-normal text-xs'>#{dataInvoice.id_invoice}</span>
                        </div>
                        <div className='grow'>
                            <Image
                                className='aspect-square h-7 w-auto -mt-2'
                                src="/logo.png"
                                width={350}
                                height={350}
                                alt="Picture of the author"
                                style={{ height: 75, width: 75 }}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 mt-2'>
                        <div className='grow text-left border-t border border-r-0 p-2'>
                            <span className='font-bold text-base'>Issued</span><br></br>
                            <span className='font-medium text-xs'>11 Dec 2023</span><br></br>
                            <span className='font-bold text-base '>Due</span><br></br>
                            <span className='font-medium text-xs'>12 Dec 2023</span><br></br>
                        </div>
                        <div className='grow text-left border p-2'>
                            <span className='font-bold text-base'>Billed to</span><br></br>
                            <span className='font-medium text-base'>{dataInvoice.customer[0].customer}</span><br></br>
                            <span className='font-normal text-xs'>{dataInvoice.customer[0].hp}</span><br></br>
                            <span className='font-normal text-xs'>{dataInvoice.customer[0].alamat}, {dataInvoice.customer[0].kota}, {dataInvoice.customer[0].kel}, {dataInvoice.customer[0].kec}, {dataInvoice.customer[0].kodepos}</span><br></br>
                        </div>
                    </div>


                    <br />

                    <div className='mt-2'>
                        <div className='flex flex-row text-center '>
                            <div className='grow text-left font-medium'>Product</div>
                            <div className='basis-1/5 font-medium'>Price</div>
                            <div className='basis-1/5 font-medium'>Subtotal</div>
                        </div>
                        {dataInvoice.details.map((dataDetails: any, index: number) => {
                            return (
                                <div key={index} className='grid grid-cols-4'>
                                    <div className='border-b flex flex-row grow items-center'>
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

                                    <div className='flex flex-col justify-center border-b'>
                                        <div>
                                            <div className='text-[14px]'>{dataDetails.produk}</div>
                                            <div className='text-[9px]'>Variant : {dataDetails.variasi}</div>
                                            <div className='text-[9px]'>Ukuran : {dataDetails.ukuran}</div>
                                        </div>
                                    </div>

                                    <div className='flex items-center border-b justify-center text-xs'>
                                        {Rupiah.format(dataDetails.harga_jual)} <span className='font-medium'>&nbsp;(x{Numbering.format(dataDetails.qty)})</span>
                                    </div>

                                    <div className='flex items-center border-b justify-center text-xs'>
                                        {Rupiah.format(dataDetails.sub_total)}
                                    </div>
                                </div>
                            )
                        })}

                        <div className='flex flex-row my-1'>
                            <div className='flex flex-row justify-end font-medium text-[14px]  mr-10 ml-auto'>
                                Total Qty :
                            </div>
                            <div className='flex items-center justify-end font-medium basis-1/5 '>
                                <div className='text-[14px]'>
                                    {Numbering.format(dataInvoice.qty)}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row my-1'>
                            <div className='flex flex-row justify-end font-medium text-[14px] mr-10 ml-auto'>
                                Subtotal :
                            </div>
                            <div className='flex items-center justify-end font-medium basis-1/5'>
                                <div className='text-[14px]'>
                                    {Rupiah.format(dataInvoice.sub_total)}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row my-1'>
                            <div className='flex flex-row justify-end font-medium text-[14px] mr-10 ml-auto'>
                                Payment Received :
                            </div>
                            <div className='flex items-center justify-end font-medium basis-1/5'>
                                <div className='text-[14px]'>
                                    {Rupiah.format(dataInvoice.payment)}
                                </div>
                            </div>
                        </div>

                        {dataInvoice.sub_total != dataInvoice.payment ?
                            <div className='flex flex-row my-1'>
                                <div className='flex flex-row justify-end font-medium text-[14px] mr-10 ml-auto'>
                                    Reimaining Payment :
                                </div>
                                <div className='flex items-center justify-end font-medium basis-1/5'>
                                    <div className='text-[14px]'>
                                        {Rupiah.format(dataInvoice.sub_total - dataInvoice.payment)}
                                    </div>
                                </div>
                            </div>
                            : null}

                        {/* <div className='grid grid-cols-5 text-center'>
                            <div className='border col-span-3'>Total</div>
                            <div className='border'>{Numbering.format(dataInvoice.qty)}</div>
                            <div className='border'>{Rupiah.format(dataInvoice.sub_total)}</div>
                        </div>
                        <div className='grid grid-cols-5 text-center'>
                            <div className='border col-span-4'>Pembayaran Diterima</div>
                            <div className='border'>{Rupiah.format(dataInvoice.payment)}</div>
                        </div>
                        <div className='grid grid-cols-5 text-center'>
                            <div className='border col-span-4'>Sisa Payment</div>
                            <div className='border'>{Rupiah.format(dataInvoice.sub_total - dataInvoice.payment)}</div>
                        </div> */}
                    </div >

                    <br />
                    <hr />
                    <br />

                    {dataInvoice.sub_total === dataInvoice.payment ?
                        <div className='flex flex-col gap-1 text-sm text-center'>
                            <div>Order Status : {dataInvoice.status_pesanan}</div>
                            <div>Delivery Service : {dataInvoice.jasa_kirim}</div>
                            <div>Delivery Receipt : {dataInvoice.resi}</div>
                            <div className='font-medium text-green-700'>Status Pembayaran : LUNAS</div>
                        </div>
                        :
                        <>
                            <div className='flex flex-col gap-1 text-sm text-center'>
                                <div>Order Status : {dataInvoice.status_pesanan}</div>
                                <div>Delivery Service : {dataInvoice.jasa_kirim}</div>
                                <div>Delivery Receipt : {dataInvoice.resi}</div>
                                <div className='font-medium text-red-700'>{dataInvoice.payment === 0 ? `Minimum Pembayaran 50% senilai ${Rupiah.format(dataInvoice.sub_total / 2)}` : `Pembayaran Pelunasan senilai ${Rupiah.format(dataInvoice.sub_total - dataInvoice.payment)}`}</div>
                            </div>

                            <div className='mt-5'>
                                {dataInvoice.payment === 0 ?
                                    <AlertDialog open={openPayment} onOpenChange={setopenPayment}>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="default" size="sm" className="font-bold w-full"
                                                onClick={() => {
                                                    setdescPayment(`DP 50% INV:${dataInvoice.id_invoice}`)
                                                    setopenPayment(true)
                                                }}
                                            >
                                                Lakukan Pembayaran
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='w-[80%] max-w-[700px]'>
                                            <AlertDialogHeader className='border-b pb-4'>
                                                <AlertDialogTitle className='text-base'>Pilih Nominal Pembayaran</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <div className=''>
                                                <Select value={e_payment} onValueChange={(e) => { NominalPayment(e, dataInvoice.sub_total, dataInvoice.id_invoice) }}>
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
                                                        setopenPayment(false)
                                                        payment(nominalPayment, descPayment, dataInvoice.customer[0].customer, dataInvoice.customer[0].hp)
                                                    }}
                                                >
                                                    Pay
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    :
                                    <Button variant="default" size="sm" className="font-bold w-full"
                                        onClick={() => {
                                            const typePayment = `Pelunasan INV:${dataInvoice.id_invoice}`
                                            const amount = dataInvoice.sub_total - dataInvoice.payment
                                            payment(amount, typePayment, dataInvoice.customer[0].customer, dataInvoice.customer[0].hp)
                                        }}
                                    >
                                        Lakukan Pembayaran
                                    </Button>
                                }



                            </div>
                        </>
                    }


                </div >


            </>

        )
    }
}
