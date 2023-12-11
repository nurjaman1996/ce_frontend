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


    async function payment(ammount: any, typepayment: any) {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/createpayment`,
            data: {
                id_invoice: id_invoice,
                amount: parseInt(ammount),
                customer: "Nama Cust",
                hp: "08212151",
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

    if (isLoading) {
        return (
            <div className='max-w-[700px] w-full border h-full flex justify-center items-center'>
                <Icon.Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Loading Data...</span>
            </div>
        )
    } else {
        return (
            <>
                <div className='max-w-[700px] w-full border h-full p-5 '>
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

                    <div className='flex flex-row mt-2'>
                        <div className='basis-1/6 text-left border-t border-b p-1'>
                            <span className='font-bold text-base'>Issued</span><br></br>
                            <span className='font-medium text-xs'>11 Dec 2023</span><br></br>
                            <span className='font-bold text-base '>Due</span><br></br>
                            <span className='font-medium text-xs'>12 Dec 2023</span><br></br>
                        </div>
                        <div className='grow text-left border p-1'>
                            <span className='font-bold text-base'>Billed to</span><br></br>
                            <span className='font-medium text-base'>{dataInvoice.customer[0].customer}</span><br></br>
                            <span className='font-normal text-xs'>{dataInvoice.customer[0].hp}</span><br></br>
                            <span className='font-normal text-xs'>{dataInvoice.customer[0].alamat}, {dataInvoice.customer[0].kota}, {dataInvoice.customer[0].kel}, {dataInvoice.customer[0].kec}, {dataInvoice.customer[0].kodepos}</span><br></br>
                        </div>
                        <div className='grow text-left border-t border-b p-1'>
                            <span className='font-bold text-base'>From</span><br></br>
                            <span className='font-medium text-base'>Ce Corp</span><br></br>
                            <span className='font-normal text-xs'>{dataInvoice.customer[0].hp}</span><br></br>
                            <span className='font-normal text-xs'>{dataInvoice.customer[0].alamat}, {dataInvoice.customer[0].kota}, {dataInvoice.customer[0].kel}, {dataInvoice.customer[0].kec}, {dataInvoice.customer[0].kodepos}</span><br></br>
                        </div>
                    </div>


                    <br />

                    <div className='px-2 mt-2'>
                        <div className='flex flex-row text-center '>
                            <div className='grow text-left font-medium'>Product</div>
                            {/* <div className=''>Details</div> */}
                            <div className='basis-1/5 font-medium'>Price</div>
                            <div className='basis-1/5 font-medium'>Subtotal</div>
                        </div>
                        {dataInvoice.details.map((dataDetails: any, index: number) => {
                            return (
                                <div key={index} className='flex flex-row'>
                                    <div className='border-b flex flex-row grow items-center'>
                                        <div className='basis-1/5'>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${dataDetails.images}`}
                                                alt="Photo by Drew Beamer"
                                                width={300}
                                                height={300}
                                                priority={true}
                                                className="rounded-sm  aspect-square  p-2"
                                                style={{ height: 75, width: 75 }}
                                            />
                                        </div>
                                        <div className='grow text-left'>
                                            <div className='text-[14px]'>{dataDetails.produk}</div>
                                            <div className='text-[9px]'>Variant : {dataDetails.variasi}</div>
                                            <div className='text-[9px]'>Ukuran : {dataDetails.ukuran}</div>
                                        </div>
                                    </div>

                                    <div className='flex items-center border-b justify-center basis-1/5 text-xs'>
                                        {Rupiah.format(dataDetails.harga_jual)} <span className='font-medium'>&nbsp;(x{Numbering.format(dataDetails.qty)})</span>
                                    </div>

                                    <div className='flex items-center border-b justify-center basis-1/5 text-xs'>
                                        {Rupiah.format(dataDetails.sub_total)}
                                    </div>
                                </div>
                            )
                        })}

                        <div className='flex flex-row my-4'>
                            <div className='flex flex-row basis-full'>
                            </div>
                            <div className='flex flex-row basis-1/2 justify-end font-medium text-[14px]  mr-10'>
                                Total Qty :
                            </div>
                            <div className='flex items-center justify-end basis-1/3 font-medium '>
                                <div className=' mr-6 text-[14px]'>
                                    {Numbering.format(dataInvoice.qty)}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row my-4'>
                            <div className='flex flex-row basis-full'>
                            </div>
                            <div className='flex flex-row basis-1/2 justify-end font-medium text-[14px] mr-10'>
                                Subtotal :
                            </div>
                            <div className='flex items-center justify-end basis-1/3 font-medium'>
                                <div className=' mr-6 text-[14px]'>
                                    {Rupiah.format(dataInvoice.sub_total)}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row my-4'>
                            <div className='flex flex-row basis-full'>
                            </div>
                            <div className='flex flex-row basis-1/2 justify-end font-medium text-[14px] mr-10'>
                                Payment Received :
                            </div>
                            <div className='flex items-center justify-end basis-1/3 font-medium'>
                                <div className='mr-6  text-[14px]'>
                                    {Rupiah.format(dataInvoice.payment)}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row my-4'>
                            <div className='flex flex-row basis-full'>
                            </div>
                            <div className='flex flex-row basis-1/2 justify-end font-medium text-[14px] mr-10  text-red-700'>
                                Reimaining Payment :
                            </div>
                            <div className='flex items-center justify-end basis-1/4 font-medium'>
                                <div className='mr-6  text-[14px] text-red-700'>
                                    {Rupiah.format(dataInvoice.sub_total - dataInvoice.payment)}
                                </div>
                            </div>
                        </div>

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

                    <div className='flex flex-col gap-1'>
                        <div>Order Status : {dataInvoice.status_pesanan}</div>
                        <div>Delivery Service : {dataInvoice.jasa_kirim}</div>
                        <div>Delivery Receipt : {dataInvoice.resi}</div>
                        <div className='font-medium text-red-700'>{dataInvoice.payment === 0 ? `Minimum Pembayaran 50% senilai ${Rupiah.format(dataInvoice.sub_total / 2)}` : `Pembayaran Pelunasan senilai ${Rupiah.format(dataInvoice.sub_total - dataInvoice.payment)}`}</div>
                    </div>

                    <div className='mt-5'>
                        <Button variant="default" size="sm" className="font-bold w-full"
                            onClick={() => {
                                const typePayment = dataInvoice.payment === 0 ? `DP 50% INV:${dataInvoice.id_invoice}` : `Pelunasan INV:${dataInvoice.id_invoice}`
                                const amount = dataInvoice.payment === 0 ? dataInvoice.sub_total / 2 : dataInvoice.sub_total - dataInvoice.payment
                                payment(amount, typePayment)
                            }}
                        >
                            Lakukan Pembayaran
                        </Button>
                    </div>
                </div >


            </>

        )
    }
}
