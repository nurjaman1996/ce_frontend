"use client";
import { useState, useEffect } from "react"
import Image from 'next/image';
import Router from 'next/router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Check, ChevronsUpDown } from "lucide-react"
import * as Icon from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog"

import { addDays, format, subDays, subWeeks, startOfWeek, lastDayOfWeek } from "date-fns"
import axios from 'axios'

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { uid } from 'uid';
import { getOngkirApi } from "./getOngkir";

export default function Order() {
  const [isLoading, setisLoading]: any = useState(true)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [id_invoice, setid_invoice] = useState(format(new Date(), "yyyyMMddHHmmss") + uid(10))

  const [openCustomer, setopenCustomer] = useState(false)
  const [dataCustomer, setdataCustomer]: any = useState([])
  const [valueCustomer, setvalueCustomer]: any = useState("")

  const [openBatch, setopenBatch] = useState(false)
  const [dataBatch, setdataBatch]: any = useState([])
  const [valueBatch, setvalueBatch]: any = useState("")


  async function loadDataCustomer() {
    await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/customer`,
    })
      .then(function (response) {
        setdataCustomer(response.data.data)
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
        setdataBatch(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    loadDataBatch()
    loadDataCustomer()
  }, [])

  const [data_produk, setdata_produk]: any = useState([])

  async function loadProduct(id_batch: any) {
    setdata_produk_search("")
    setdisabled_input(true)
    setRowsData([])
    setloading_produk("loaded")
    settotalQty(0)
    settotalAmount(0)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/products_sales`,
      data: {
        id_batch: id_batch
      }
    })
      .then(function (response) {
        setdata_produk(response.data.result)
        setloading_produk("success")
        setdisabled_input(false)
      })
      .catch(function (error) {
        console.log(error);
        setdata_produk([])
        setloading_produk("")
      })
  }

  const [loading_produk, setloading_produk] = useState("")

  const [disabled_input, setdisabled_input] = useState(true)
  const [data_produk_search, setdata_produk_search] = useState("")
  const produk: any = []
  const [rowsData, setRowsData]: any = useState([]);
  const [totalQty, settotalQty] = useState(0);
  const [totalAmount, settotalAmount] = useState(0);
  const [openModalAddProduk, setopenModalAddProduk]: any = useState(false);

  const filteredItems = data_produk.filter((data_produk: any) => {
    return (
      data_produk.produk.toLocaleLowerCase().includes(data_produk_search.toLocaleLowerCase()) ||
      data_produk.id_produk.toLocaleLowerCase().includes(data_produk_search.toLocaleLowerCase())
    );
  });


  const [datavariant, setdatavariant]: any = useState([]);

  const [produks, setproduks]: any = useState(null);
  const [idproduk, setidproduk]: any = useState(null);
  const [addmodal_qty, setaddmodal_qty]: any = useState(1);
  const [addmodal_submit, setaddmodal_submit]: any = useState(true);
  const [img, setimg]: any = useState(null);
  const [variantSelect, setvariantSelect]: any = useState(null);
  const [hargaJual, sethargaJual]: any = useState(0);
  const [v_idBatch, setv_idBatch]: any = useState("");
  const [v_idPo, setv_idPo]: any = useState("");
  const [v_berat, setv_berat]: any = useState("");
  const [v_subtotal, setv_subtotal]: any = useState(0);
  const [v_totalModal, setv_totalModal]: any = useState(0);

  async function openaddproduk(produk: any, id_produk: any, images: any, id_batch: any, id_po: any, harga_jual: any, berat: any, totalModal: any) {
    setvariantSelect(null)
    setaddmodal_submit(true)
    setaddmodal_qty(1)
    setproduks(produk)
    setidproduk(id_produk)
    setimg(images)
    sethargaJual(harga_jual)
    setv_idBatch(id_batch)
    setv_idPo(id_po)
    setv_berat(berat)
    setv_totalModal(totalModal)
    setv_subtotal(harga_jual)


    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getvariant`,
      data: {
        id_batch: id_batch,
        id_po: id_po,
        id_produk: id_produk
      }
    })
      .then(function (response) {
        setdatavariant(response.data.result)
        setopenModalAddProduk(true);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  const list_variant: any = []

  for (let index = 0; index < datavariant.length; index++) {
    list_variant.push(
      <div
        onClick={() => {
          setvariantSelect(datavariant[index].warna + "#" + datavariant[index].ukuran);
          setv_subtotal(hargaJual)
          setaddmodal_submit(false);
          setaddmodal_qty(1);
        }}
        key={index}
        className={`${variantSelect === datavariant[index].warna + "#" + datavariant[index].ukuran ? "bg-black text-white" : "text-black"} font-medium py-2 text-center rounded-lg border border-black cursor-pointer`}>
        {datavariant[index].warna} = {datavariant[index].ukuran}
      </div>
    )
  }

  const deleteTableRows = (index: number, qty: any, amount: any) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    settotalQty(totalQty - qty);
    settotalAmount(totalAmount - amount);
    setdataOngkir([])
    setSelectongkir("")
  }

  function setQty(type: any) {
    if (type === "plus") {
      setaddmodal_qty(addmodal_qty + 1)
      setv_subtotal(hargaJual * (addmodal_qty + 1))
    } else if (type === "min") {
      if (addmodal_qty > 1) {
        setaddmodal_qty(addmodal_qty - 1)
        setv_subtotal(hargaJual * (addmodal_qty - 1))
      }
    }
  }

  function setQttable(type: any, index: any) {
    if (type === "plus") {
      const rowsInput = [...rowsData];
      rowsData[index].sub_total = rowsData[index].harga_jual * (rowsData[index].qty + 1);
      rowsData[index].qty = rowsData[index].qty + 1;
      setRowsData(rowsInput);
      settotalQty(totalQty + 1);
      settotalAmount(totalAmount + rowsData[index].harga_jual);
      setdataOngkir([])
      setSelectongkir("")
    } else if (type === "min") {
      if (rowsData[index].qty > 1) {
        const rowsInput = [...rowsData];
        rowsData[index].sub_total = rowsData[index].harga_jual * (rowsData[index].qty - 1);
        rowsData[index].qty = rowsData[index].qty - 1;
        setRowsData(rowsInput);
        settotalQty(totalQty - 1);
        settotalAmount(totalAmount - rowsData[index].harga_jual);
        setdataOngkir([])
        setSelectongkir("")
      }
    }
  }

  const rincian: any = []

  for (let index = 0; index < rowsData.length; index++) {
    rincian.push(
      <div key={index} className='h-[auto] flex gap-3 border-b p-2 hover:bg-gray-100 items-center'>
        <div className='text-xs w-8 text-center'>
          {index + 1 + "."}
        </div>

        {(function () {
          if (rowsData[index].images != null) {
            return (
              <Image
                src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${rowsData[index].images}`}
                alt="Photo by Drew Beamer"
                width={200}
                height={200}
                priority={true}
                className="rounded-md border h-[60px] w-auto aspect-square"
              />
            );
          } else {
            return (
              <Image
                src="/produk.png"
                alt="Photo by Drew Beamer"
                width={200}
                height={200}
                className="rounded-md border h-[60px] w-auto aspect-square"
              />
            );
          }
        })()}

        <div className='flex flex-col gap-1 text-xs justify-center items-start basis-11/12'>
          <div className='font-bold line-clamp-1'>{rowsData[index].produk}</div>
          <div>Variant : <b>{rowsData[index].variasi} {rowsData[index].ukuran}</b></div>
          <div>Harga Satuan : <b>{Rupiah.format(rowsData[index].harga_jual)}</b></div>
          <div>Subtotal : <b>{Rupiah.format(rowsData[index].sub_total)}</b></div>

          <div className='flex gap-2 items-center'>
            <Button variant="outline" className='h-7 w-7' size="icon" onClick={() => { setQttable("min", index) }}>
              <Icon.Minus className="h-3 w-3" />
            </Button>

            {/* <span className='font-bold'>{Numbering.format(rowsData[index].qty)}</span> */}
            <input
              type="text"
              className="h-7 outline-none text-center border rounded-md"
              min={0}
              pattern="[0-9]*"
              value={rowsData[index].qty}
              autoFocus={false}
              onChange={(e) => {
                const val = isNaN(parseInt(e.currentTarget.value)) ? 1 : parseInt(e.currentTarget.value)
                settotalQty((totalQty - rowsData[index].qty) + val);
                settotalAmount((totalAmount - rowsData[index].sub_total) + (rowsData[index].harga_jual * val));
                setdataOngkir([])
                setSelectongkir("")

                rowsData[index].sub_total = rowsData[index].harga_jual * val;
                rowsData[index].qty = val;
              }}
            />

            <Button variant="outline" className='h-7 w-7' size="icon" onClick={() => { setQttable("plus", index) }}>
              <Icon.Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className='flex items-center px-2 basis-1/12'>
          <button
            onClick={() => {
              deleteTableRows(index, rowsData[index].qty, rowsData[index].sub_total);
            }}
          >
            <Icon.Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
    )
  }

  if (loading_produk === "") {
    produk.push(
      <div key={0} className='m-auto md:col-span-5 lg:col-span-6 flex flex-col justify-center items-center text-xs gap-2'>
        <Image
          src={`/open-box.png`}
          alt="Photo by Drew Beamer"
          width={100}
          height={100}
          className="rounded-md"
          priority={true}
        />

        <span>Silahkan Pilih Batch dahulu...</span>
      </div>
    )
  } if (loading_produk === "loaded") {
    produk.push(
      <div key={0} className='m-auto md:col-span-5 lg:col-span-6 flex flex-col justify-center items-center text-xs gap-2'>
        <span>Loading...</span>
      </div>
    )
  } else {
    if (filteredItems.length === 0 && loading_produk != "") {
      produk.push(
        <div key={0} className='m-auto md:col-span-5 lg:col-span-6 flex flex-col justify-center items-center text-xs gap-2'>
          <span>Produk tidak ditemukan...</span>
        </div>
      )
    } else {
      filteredItems.map((data: any, index: number) => {
        return (
          produk.push(
            <Card key={index}
              onDoubleClick={() => {
                openaddproduk(data.produk, data.id_produk, data.images === "" ? "/produk.png" : data.images, data.id_batch, data.id_po, data.harga_jual, data.berat_produk, data.total_modal_produk)
              }}
              className='aspect-square rounded-md hover:shadow-md cursor-pointer'>
              <CardContent className='w-full h-full p-0 overflow-hidden'>
                {(function () {
                  if (data.images != null) {
                    return (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${data.images}`}
                        alt="Photo by Drew Beamer"
                        width={500}
                        height={500}
                        priority={true}
                      />
                    );
                  } else {
                    return (
                      <div className="p-5">
                        <Image
                          src="/produk.png"
                          alt="Photo by Drew Beamer"
                          width={500}
                          height={500}
                        />
                      </div>
                    );
                  }
                })()}
              </CardContent>
              <CardFooter className="flex flex-col h-12 gap-1 items-start justify-start border-t px-2 pt-1 pb-3">
                <div className='text-xs text-center h-auto w-full line-clamp-2 font-bold'>
                  {data.produk}
                </div>
                <div className='text-[8px] text-center mb-0 text-red-600 w-full'>
                  {data.id_produk}
                </div>
                {/* <div className='flex w-full'>
                  <div className='text-xs basis-1/2'>
                    Variant : {Numbering.format(data.total_variasi)}
                  </div>
                  <div className='text-xs ml-auto font-bold basis-1/2'>
                    {Rupiah.format(data.harga_jual)}
                  </div>
                </div> */}
              </CardFooter>
            </Card>
          )
        )
      })

    }
  }

  function addproduk(id_batch: any, id_po: any, id_produk: any, produk: any, variasi: any, ukuran: any, qty: any, berat: any, total_modal: any, harga_jual: any, sub_total: any, img: any) {
    // console.log(id_batch)
    // console.log(id_po)
    // console.log(id_produk)
    // console.log(produk)
    // console.log(variasi)
    // console.log(ukuran)
    // console.log(qty)
    // console.log(berat)
    // console.log(total_modal)
    // console.log(harga_jual)
    // console.log(sub_total)

    if (!rowsData.find((item: { id_batch: any, id_po: any, id_produk: any, produk: any, variasi: any, ukuran: any, qty: any, berat: any, total_modal: any, harga_jual: any, sub_total: any, img: any }) => item.id_produk === id_produk && item.id_batch === id_batch && item.variasi === variasi && item.ukuran === ukuran)) {
      const rowsInput = {
        id_batch: id_batch,
        id_po: id_po,
        id_produk: id_produk,
        produk: produk,
        variasi: variasi,
        ukuran: ukuran,
        qty: qty,
        berat: berat,
        total_modal: total_modal,
        harga_jual: harga_jual,
        sub_total: sub_total,
        images: img,
      }
      setRowsData([...rowsData, rowsInput]);
      settotalQty(totalQty + qty);
      settotalAmount(totalAmount + sub_total);
      setopenModalAddProduk(false);
      setdataOngkir([])
      setSelectongkir("")
      // alert("Produk Berhasil ditambahkan");
    } else {
      const edit_array = rowsData.findIndex((item: { id_batch: any, id_po: any, id_produk: any, produk: any, variasi: any, ukuran: any, qty: any, berat: any, total_modal: any, harga_jual: any, sub_total: any, img: any }) => item.id_produk === id_produk && item.id_batch === id_batch && item.variasi === variasi && item.ukuran === ukuran)

      const rowsInput = [...rowsData];
      rowsData[edit_array].qty = rowsData[edit_array].qty + qty;
      rowsData[edit_array].sub_total = rowsData[edit_array].sub_total + sub_total;
      setRowsData(rowsInput);
      settotalQty(totalQty + qty);
      settotalAmount(totalAmount + sub_total);
      setopenModalAddProduk(false);
      setdataOngkir([])
      setSelectongkir("")
      // alert("Quantity Produk dengan size yang sama telah diupdate");
    }

  }

  const [dataOngkir, setdataOngkir]: any = useState([]);
  const [loadingOngkir, setloadingOngkir]: any = useState(false);
  const [AlamatCustomer, setAlamatCustomer]: any = useState("");

  async function getOngkir() {
    if (AlamatCustomer === "" || weight === 0) {
      alert("Mohon Pilih Customer dan Isi Keranjang belanja")
    } else {
      setloadingOngkir(true)
      const data_ongkir = await getOngkirApi("344", AlamatCustomer.subdistrict_id, weight)
      setdataOngkir(data_ongkir)
      if (data_ongkir) {
        setloadingOngkir(false)
      }
    }
  }

  const [inProgress, setinProgress]: any = useState(false);
  const [Selectongkir, setSelectongkir]: any = useState("");

  const [tanggal, settanggal] = useState(format(new Date(), "yyyy-MM-dd"))

  async function saveSales() {
    // console.log(tanggal)
    // console.log(id_invoice)
    // console.log(valueCustomer)
    // console.log(valueBatch)
    // console.log(rowsData)

    if (valueCustomer === "" || valueBatch === "") {
      alert("Mohon Lengkapi Form")
    } else {
      if (rowsData.length < 1) {
        alert("Belum ada Produk di tambahkan")
      } else {
        setinProgress(true)

        await axios({
          method: 'post',
          url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/savesales`,
          data: {
            tanggal: tanggal,
            id_invoice: id_invoice,
            id_cust: valueCustomer,
            id_batch: valueBatch,
            user: "ADMIN",
            cart: rowsData,
            ongkir: Selectongkir
          }
        })
          .then(function (response) {
            window.location.href = "/order"
          })
          .catch(function (error) {
            console.log(error)
            setinProgress(false)
          })
      }
    }
  }

  const weight = rowsData.reduce((total: any, currentItem: any) => total = total + (currentItem.berat * currentItem.qty), 0)

  if (isLoading) {
    return (
      <div>
        Loading Data...
      </div>
    )
  } else {
    return (
      <main className="">
        {/* <div className="flex flex-nowrap mt-4 mb-4">
          <div className="font-bold text-4xl">
            Add Orders
          </div>
        </div> */}

        {/* {JSON.stringify(rowsData)} */}

        <Dialog open={openModalAddProduk}>
          <DialogContent style={{ width: "auto", maxWidth: "none" }}>
            <div className='h-[300px] flex items-start rounded-sm'>
              <div className='aspect-square h-full p-5'>
                {(function () {
                  if (img != null) {
                    return (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${img}`}
                        alt="Photo by Drew Beamer"
                        width={500}
                        height={500}
                        priority={true}
                        className="rounded-2xl shadow-md"
                      />
                    );
                  } else {
                    return (
                      <div className="p-5">
                        <Image
                          src="/produk.png"
                          alt="Photo by Drew Beamer"
                          width={500}
                          height={500}
                        />
                      </div>
                    );
                  }
                })()}
              </div>

              <div className='flex flex-col'>
                <div className='border-b w-[50vh] flex flex-col gap-1 pl-3 py-2 text-sm text-start'>
                  <span className='font-bold text-xl pr-3'>{String(produks)}</span>
                  <span className='text-xs text-red-700'>{String(idproduk)}</span>
                </div>

                <div className="mt-1 px-3 pt-2 flex flex-col text-xs gap-2">
                  <label className='font-bold'>Size:</label>
                  <div className={`${list_variant.length < 1 ? "" : "grid grid-cols-5 gap-2"} text-xs content-start`}>
                    {list_variant.length < 1 ? "Belum ada Variasi, Silahkan tambah Variant" : list_variant}
                  </div>
                </div>

                <div className='mt-1 px-3 pt-2 flex flex-col text-xs gap-2 '>
                  <label className='font-bold'>Qty:</label>
                  <div className='flex gap-2 items-center'>
                    <Button variant="outline" disabled={addmodal_submit} className='h-7 w-7' size="icon" onClick={() => { setQty("min") }}>
                      <Icon.Minus className="h-3 w-3" />
                    </Button>

                    {/* <span className='font-bold'>{addmodal_qty}</span> */}
                    <input
                      type="text"
                      className="h-7 outline-none text-center border rounded-md"
                      min={0}
                      pattern="[0-9]*"
                      value={addmodal_qty}
                      autoFocus={false}
                      readOnly={addmodal_submit}
                      onChange={(e) => {
                        const val = isNaN(parseInt(e.currentTarget.value)) ? 1 : parseInt(e.currentTarget.value)
                        setaddmodal_qty(val)
                        setv_subtotal(hargaJual * val)
                      }}
                    />

                    <Button variant="outline" disabled={addmodal_submit} className='h-7 w-7' size="icon" onClick={() => { setQty("plus") }}>
                      <Icon.Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="mt-1 px-3 pt-2 flex flex-col text-xs gap-2 border-b pb-3">
                  <label className='font-bold'>Amount:</label>
                  <div className='text-lg font-bold'>
                    {Rupiah.format(v_subtotal)}
                  </div>
                </div>

              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setopenModalAddProduk(false),
                  setaddmodal_submit(true);
              }}>Close</Button>
              <Button type="button" disabled={addmodal_submit}
                onClick={() => {
                  const variant = variantSelect.split("#")
                  const variasi = variant[0]
                  const ukuran = variant[1]
                  addproduk(v_idBatch, v_idPo, idproduk, produks, variasi, ukuran, addmodal_qty, v_berat, v_totalModal, hargaJual, v_subtotal, img)
                }}
              >
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card>
          <CardContent className='p-4 flex flex-col gap-5'>
            <div className="w-full items-center gap-2 grid grid-cols-4">
              <div className="grid gap-2">
                <Label><span className='text-red-500'>*</span> Date Order</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[auto] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd MMMM Y") : <span>Pilih Tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(e) => {
                        e ? setDate(e) : null
                        e ? settanggal(format(e, "yyyy-MM-dd")) : null
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label><span className='text-red-500'>*</span> ID Invoice <span className='text-muted-foreground'>(Automatically Filled)</span></Label>
                <Input type="text" placeholder="" value={id_invoice} readOnly />
              </div>

              <div className="grid gap-2">
                <Label><span className='text-red-500'>*</span> Customer</Label>
                <Popover open={openCustomer} onOpenChange={setopenCustomer}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCustomer}
                      className="justify-between"
                    >
                      {valueCustomer
                        ? dataCustomer.find((dataCustomer: any) => dataCustomer.id_cust === valueCustomer)?.customer
                        : "Select Customer..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search Customer..." />
                      <CommandEmpty>No data Customer found.</CommandEmpty>
                      <CommandGroup className='overflow-auto scrollbar-none'>
                        {dataCustomer.map((dataCustomer: any) => (
                          <CommandItem
                            key={dataCustomer.id_cust}
                            onSelect={() => {
                              setvalueCustomer(dataCustomer.id_cust === valueCustomer ? "" : dataCustomer.id_cust)
                              setAlamatCustomer(dataCustomer.id_cust === valueCustomer ? "" : dataCustomer)
                              setopenCustomer(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                valueCustomer === dataCustomer.id_cust ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {dataCustomer.customer}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label><span className='text-red-500'>*</span> Batch</Label>
                <Popover open={openBatch} onOpenChange={setopenBatch}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openBatch}
                      className="justify-between"
                    >
                      {valueBatch
                        ? dataBatch.find((batch: any) => batch.id_batch == valueBatch)?.id_batch
                        : "Select Batch..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search Batch..." />
                      <CommandEmpty>No Batch found.</CommandEmpty>
                      <CommandGroup>
                        {dataBatch.map((batch: any) => (

                          <CommandItem
                            key={batch.id}
                            value={batch.id_batch}
                            onSelect={(currentValue) => {
                              if (currentValue.toUpperCase() === valueBatch) {
                                setdata_produk([])
                                setRowsData([])
                                setloading_produk("")
                                settotalQty(0)
                                settotalAmount(0)
                              } else {
                                loadProduct(currentValue.toUpperCase())
                              }
                              setvalueBatch(currentValue.toUpperCase() === valueBatch ? "" : currentValue.toUpperCase())
                              setopenBatch(false)
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

            <div className='flex gap-2'>
              <div className='flex flex-col gap-2 p-2 rounded-md h-[652px] w-[60%] border '>
                <div className='flex items-center border rounded-md bg-white'>
                  <div className='pl-3 border-none '><Icon.Search className='h-5 w-5' /></div>
                  <Input disabled={disabled_input} onChange={(e) => { setdata_produk_search(e.currentTarget.value) }} value={data_produk_search} className='border-none' type="text" placeholder="Cari Produk..." />
                  <button onClick={() => setdata_produk_search("")} className={`${data_produk_search === "" ? "hidden" : ""} px-3 border-none bg-gray-100 h-full flex items-center`}><Icon.X className='h-5 w-5' /></button>
                </div>

                <div className='grid md:grid-cols-5 lg:grid-cols-5 gap-2 pb-0 h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-sm'>
                  {produk}
                </div>
              </div>

              <div className='border rounded-md p-2 flex flex-col w-[40%] h-[652px]'>

                <div className='grow overflow-y-auto scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-sm'>
                  {rincian}
                </div>

                <div className='h-[auto] pt-2 text-xs flex items-center gap-2 border-t justify-center'>
                  <div className='grid grid-rows-2 w-full'>
                    <div className='flex border py-1 px-2'>
                      <div className='w-24'>Total Items</div>
                      <div className='ml-5'>:</div>
                      <div className='ml-auto font-bold'>{Numbering.format(rowsData.length)}</div>
                    </div>

                    <div className='flex border py-1 px-2'>
                      <div className='w-24'>Total Quantity</div>
                      <div className='ml-5'>:</div>
                      <div className='ml-auto font-bold'>{Numbering.format(totalQty)} Pcs</div>
                    </div>

                    <div className='flex border py-1 px-2'>
                      <div className='w-24'>Berat Produk</div>
                      <div className='ml-5'>:</div>
                      <div className='ml-auto font-bold'>{Numbering.format(weight)} Gr / {weight / 1000} Kg</div>
                    </div>

                    <div className='flex border py-1 px-2'>
                      <div className='w-24'>Total Amount</div>
                      <div className='ml-5'>:</div>
                      <div className='ml-auto font-bold'>{Rupiah.format(totalAmount)}</div>
                    </div>

                    <div className='flex border py-1 px-2'>
                      <div className='w-24'>Biaya Ongkir</div>
                      <div className='ml-5'>:</div>
                      <div className='ml-auto font-bold'>{Rupiah.format(Selectongkir.split("#")[0])}</div>
                    </div>

                    <div className='flex border py-1 px-2'>
                      <div className='w-24'>Grand Total</div>
                      <div className='ml-5'>:</div>
                      <div className='ml-auto font-bold'>{Rupiah.format(totalAmount + parseInt(Selectongkir.split("#")[0] === "" ? 0 : Selectongkir.split("#")[0]))}</div>
                    </div>
                  </div>
                </div>

                {dataOngkir.length > 0 ?
                  <RadioGroup className="grid grid-cols-4 text-center mt-2"
                    onValueChange={(e) => {
                      setSelectongkir(e)
                    }}
                  >
                    {dataOngkir.map((data: any, index: number) => {
                      return (
                        <div key={index} className="p-2 rounded-md border">
                          <div className="border-b pb-2 text-xs ">
                            {data.name}
                          </div>
                          {data.costs.map((data_cost: any, indexs: number) => {
                            return (
                              <div key={indexs}>
                                <RadioGroupItem className="hidden" value={`${data_cost.cost[0].value}#${data.name}`} id={`${data.name}${data_cost.service}`} />
                                <Label
                                  className={`${Selectongkir === data_cost.cost[0].value + "#" + data.name ? "border-blue-500" : ""} flex items-center space-x-2 my-2 p-2 border rounded-md cursor-pointer`} htmlFor={`${data.name}${data_cost.service}`}>{data_cost.service} : {Rupiah.format(data_cost.cost[0].value)}</Label>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </RadioGroup>
                  :
                  null
                }

                <div className="mt-2 text-right">
                  {(function () {
                    if (dataOngkir.length === 0) {
                      if (loadingOngkir === true) {
                        return (
                          <Button size="sm" className='ml-auto' disabled>
                            <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </Button>
                        )
                      } else {
                        return (
                          <Button
                            onClick={() => {
                              getOngkir();
                            }}
                            variant="default" size="sm" className='ml-auto'>
                            <Icon.Truck className="mr-2 h-4 w-4" /> Get Ongkir
                          </Button>
                        )
                      }

                    } else {
                      if (inProgress === false) {
                        return (
                          <Button
                            disabled={Selectongkir === "" ? true : false}
                            onClick={() => {
                              saveSales();
                            }}
                            variant="default" size="sm" className='ml-auto'>
                            <Icon.ShoppingBag className="mr-2 h-4 w-4" /> Checkout
                          </Button>
                        );
                      } else {
                        return (
                          <Button size="sm" className='ml-auto' disabled>
                            <Icon.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </Button>
                        );
                      }
                    }
                  })()}
                </div>

              </div>



            </div>


          </CardContent>
        </Card>

      </main >
    )
  }
}
