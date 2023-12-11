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
            <div className='max-w-[600px] w-full border h-full flex justify-center items-center'>
                <Icon.Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Loading Data...</span>
            </div>
        )
    } else {
        return (
            <>
                <div className='max-w-[600px] w-full border h-full p-5'>
                    <span className='font-bold text-lg'>Details Invoice</span>

                    <div className='py-3 mb-2 text-sm'>
                        <div className='flex flex-row gap-2'>
                            <div>Invoice</div>
                            <div>:</div>
                            <div>{dataInvoice.id_invoice}</div>
                        </div>

                        <div className='flex flex-row gap-2'>
                            <div>Customer</div>
                            <div>:</div>
                            <div>{dataInvoice.customer[0].customer}</div>
                        </div>

                        <div className='flex flex-row gap-2'>
                            <div>No HP</div>
                            <div>:</div>
                            <div>{dataInvoice.customer[0].hp}</div>
                        </div>

                        <div className='flex flex-row gap-2'>
                            <div>Alamat</div>
                            <div>:</div>
                            <div>{dataInvoice.customer[0].alamat}, {dataInvoice.customer[0].kota}, {dataInvoice.customer[0].kel}, {dataInvoice.customer[0].kec}, {dataInvoice.customer[0].kodepos}</div>
                        </div>
                    </div>

                    <hr />
                    <br />

                    <div className='flex flex-col px-2'>
                        <div className='grid grid-cols-5 text-center'>
                            <div className='border'>Image</div>
                            <div className='border'>Details</div>
                            <div className='border'>Harga</div>
                            <div className='border'>Quantity</div>
                            <div className='border'>Subtotal</div>
                        </div>
                        {dataInvoice.details.map((dataDetails: any, index: number) => {
                            return (
                                <div key={index} className='grid grid-cols-5'>
                                    <div className='border'>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${dataDetails.images}`}
                                            alt="Photo by Drew Beamer"
                                            width={500}
                                            height={500}
                                            priority={true}
                                            className="rounded-sm w-[100%] aspect-square mx-auto p-2"
                                        />
                                    </div>

                                    <div className='flex flex-col gap-1 border px-2 justify-center'>
                                        <div>{dataDetails.produk}</div>
                                        <div className='text-xs'>Variant : {dataDetails.variasi}</div>
                                        <div className='text-xs'>Ukuran : {dataDetails.ukuran}</div>
                                    </div>

                                    <div className='flex items-center border justify-center'>
                                        {Rupiah.format(dataDetails.harga_jual)}
                                    </div>

                                    <div className='flex items-center border justify-center'>
                                        {Numbering.format(dataDetails.qty)}
                                    </div>

                                    <div className='flex items-center border justify-center'>
                                        {Rupiah.format(dataDetails.sub_total)}
                                    </div>

                                </div>
                            )
                        })}
                        <div className='grid grid-cols-5 text-center'>
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
                        </div>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className='flex flex-col gap-1'>
                        <div>Status Pesanan : {dataInvoice.status_pesanan}</div>
                        <div>Kurir : {dataInvoice.jasa_kirim}</div>
                        <div>Resi : {dataInvoice.resi}</div>
                        {dataInvoice.payment === 0 ? `Minimum Pembayaran 50% senilai ${Rupiah.format(dataInvoice.sub_total / 2)}` : `Pembayaran Pelunasan senilai ${Rupiah.format(dataInvoice.sub_total - dataInvoice.payment)}`}
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
                </div>


            </>

        )
    }
}
