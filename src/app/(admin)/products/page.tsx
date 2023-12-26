"use client";
import * as React from "react"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { Input } from "@/components/ui/input"
import { Check, ChevronsUpDown } from "lucide-react"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

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

export default function Products(Props: any): JSX.Element {
  // console.log(Props.params.datalogin);

  const [datalogin, setdatalogin]: any = useState("")

  const [open, setOpen] = useState(false)
  const [dataBatch, setdataBatch]: any = useState([])
  const [valueBatch, setValueBatch]: any = useState("")

  const [isLoading, setisLoading]: any = useState(true)
  const [dataProducts, setdataProducts]: any = useState([])
  const [detailsProduks, setdetailsProduks]: any = useState([])

  const [isOpen, setIsOpen] = React.useState(false)

  async function loadProducts(batch: any) {
    setisLoading(true)
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/products`,
      data: {
        id_batch: batch
      }
    })
      .then(function (response) {
        setdataProducts(response.data)
        setdetailsProduks(response.data.result.data_iventory_details)
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
        if (valueBatch === "") {
          setdataBatch(response.data.data)
          setValueBatch(response.data.data[0].id_batch)
          loadProducts(response.data.data[0].id_batch)
        } else {
          loadProducts(valueBatch)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    setdatalogin(Props.params.datalogin)
    loadDataBatch()
  }, [])

  const [searchProduks, setsearchProduks]: any = useState('');

  const filterProduks: any = detailsProduks.filter((data: any) => {
    return (
      data.produk.toLocaleLowerCase().includes(searchProduks.toLocaleLowerCase())
    );
  });


  const [selectedCover, setselectedCover]: any = useState([])
  const [selectedImages, setselectedImages]: any = useState([])

  const [openEditImage, setopenEditImage]: any = useState("")
  const [openEditImageDetails, setopenEditImageDetails]: any = useState([])

  const [e_imageCover, sete_imageCover]: any = useState([])
  const [e_imageDetails, sete_imageDetails]: any = useState([])

  const onSelectCover = (event: any) => {
    const selectedFile = event.target.files
    const selectedFileArray = Array.from(selectedFile)
    sete_imageCover(selectedFile[0])
    const imagesArray = selectedFileArray.map((file: any) => {
      return URL.createObjectURL(file)
    })

    setselectedCover(imagesArray)
  }

  const onSelectFile = (event: any) => {
    const selectedFile = event.target.files
    const selectedFileArray = Array.from(selectedFile)

    const valImage = selectedImages.length

    const imagesArray: any = []
    const dataImages: any = []

    selectedFileArray.map((file: any, index: number) => {
      const jumlahImg = valImage + index
      if (jumlahImg < 5) {
        dataImages.push(file)
        imagesArray.push({
          img: URL.createObjectURL(file),
          name: null
        })
      }
    })

    sete_imageDetails(dataImages)
    setselectedImages((previousImage: any) => previousImage.concat(imagesArray))

    if (selectedFileArray.length > 5) {
      alert("Maksimal 5 Image")
    }
  }

  const [e_deleteImages, sete_deleteImages]: any = useState([])

  const deleteDetailsImg = (index: number, name: any) => {
    const rows = [...selectedImages];
    rows.splice(index, 1);
    setselectedImages(rows);

    if (name != null) {
      sete_deleteImages([...e_deleteImages, name])
    }
  }

  const [openEdit, setopenEdit]: any = useState(false);

  const [e_produk, sete_produk]: any = useState("")
  const [e_berat_produk, sete_berat_produk]: any = useState("")
  const [e_modal_asing, sete_modal_asing]: any = useState("")
  const [e_margin, sete_margin]: any = useState("")
  const [e_overhead, sete_overhead]: any = useState("")
  const [e_kurs, sete_kurs]: any = useState("")
  const [e_id_po, sete_id_po]: any = useState("")
  const [e_id_batch, sete_id_batch]: any = useState("")
  const [e_id_produk, sete_id_produk]: any = useState("")

  async function editProduk() {
    // console.log(e_produk)
    // console.log(e_berat_produk)
    // console.log(e_modal_asing)
    // console.log(e_margin)
    // console.log(e_overhead)
    // console.log(e_kurs)
    // console.log(e_id_po)
    // console.log(e_id_batch)
    // console.log(e_id_produk)
    // console.log(e_imageCover)
    // console.log(e_imageDetails)

    let formData: any = new FormData();
    formData.append("id_produk", e_id_produk);
    formData.append("id_batch", e_id_batch);
    formData.append("id_po", e_id_po);
    formData.append("kurs", e_kurs);
    formData.append("overhead", e_overhead);
    formData.append("margin", e_margin);
    formData.append("modal_asing", e_modal_asing);
    formData.append("berat_produk", e_berat_produk);
    formData.append("produk", e_produk);
    formData.append("deleteimage", e_deleteImages);
    formData.append("file", e_imageCover);

    for (let index = 0; index < e_imageDetails.length; index++) {
      formData.append("fileDetails", e_imageDetails[index]);
    }

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/editproduk`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData
    })
      .then(function (response) {
        loadProducts(valueBatch)
        setopenEdit(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function deleteProduk(id_produk: any, id_po: any, id_batch: any) {
    // console.log(id_produk)
    // console.log(id_po)
    // console.log(id_batch)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/deleteproduk`,
      data: {
        id_produk: id_produk,
        id_po: id_po,
        id_batch: id_batch
      }
    })
      .then(function (response) {
        loadProducts(valueBatch)
      })
      .catch(function (error) {
        console.log(error);
      })
  }



  if (isLoading) {
    return (
      <div>
        Loading Data...
      </div>
    )
  } else {
    return (
      <main className="">
        <div className="flex flex-nowrap mt-4">
          <div className="font-bold text-2xl">
            Products
          </div>
          {/* <div className="ml-auto">
            <Button className='bg-amber-200 shadow-md text-black font-bold'>STOCK OPNAME&nbsp;<Icon.RefreshCcw color="#000000" /></Button>
          </div> */}
        </div>

        {/* {JSON.stringify(dataProducts.result)} */}

        <div className='flex flex-row mt-4 gap-8 '>
          <div className='basis-1/2 bg-white border border-gray-300 h-[110px] text-black rounded-2xl shadow-md'>
            <div className='text-lg font-semibold py-4 px-5'>
              Items
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-2xl font-semibold'>
                {Numbering.format(dataProducts.result.items)}
              </div>
              <div className=' basis-1/2 flex justify-end -mt-3'>
                <Icon.ShoppingCart size={45} color="#000000" />
              </div>
            </div>
          </div>
          <div className='basis-1/2  bg-white border border-gray-300 h-[110px] text-black rounded-2xl shadow-md'>
            <div className='text-lg font-semibold py-4 px-5'>
              Qty
            </div>
            <div className='flex flex-row text-left px-5'>
              <div className='basis-1/2 text-2xl font-semibold'>
                {Numbering.format(dataProducts.result.qty)}
              </div>
              <div className=' basis-1/2 flex justify-end -mt-3'>
                <Icon.DollarSign size={45} color="#000000" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-nowrap mt-4">
          {/*  */}
          <div className="font-bold text-4xl">
            <Input type="text" className='w-[400px] shadow-md text-black' placeholder="Search Products.." value={searchProduks} onChange={(e) => { setsearchProduks(e.currentTarget.value) }} />
          </div>
          <div className="ml-auto">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {valueBatch
                    ? dataBatch.find((batch: any) => batch.id_batch == valueBatch)?.id_batch
                    : "SELECT BATCH..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search batch..." />
                  <CommandEmpty>No batch found.</CommandEmpty>
                  <CommandGroup>
                    {dataBatch.map((batch: any) => (

                      <CommandItem
                        key={batch.id}
                        value={batch.id_batch}
                        onSelect={(currentValue) => {
                          loadProducts(currentValue.toUpperCase())
                          setValueBatch(currentValue.toUpperCase() === valueBatch ? "" : currentValue.toUpperCase())
                          setOpen(false)
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

        <div className="mt-5 shadow-md">
          <Table className='border text-xs'>
            <TableHeader>
              <TableRow className='bg-gray-900 font-bold '>
                <TableHead className="border  text-white w-[3%] text-center bg-gray-900">No</TableHead>
                <TableHead className="border  text-white w-[12%] text-center bg-gray-900">Image</TableHead>
                <TableHead className="border  text-white w-[30%] text-left bg-gray-900">Name</TableHead>
                <TableHead className="border  text-white w-[10%] text-center bg-gray-900">Stock</TableHead>
                <TableHead className="border  text-white w-[3%] text-center bg-gray-900">Varian</TableHead>

                {datalogin.datarole === "SUPER_ADMIN" || datalogin.datarole === "FINANCE" ?
                  <>
                    <TableHead className="border  text-white w-[6%] text-center bg-gray-900">Kurs</TableHead>
                    <TableHead className="border  text-white w-[5%] text-center bg-gray-900">Overhead</TableHead>
                    <TableHead className="border  text-white w-[6%] text-center bg-gray-900">Margin</TableHead>
                    <TableHead className="border  text-white w-[6%] text-center bg-gray-900">Cost</TableHead>
                  </>
                  : null}

                <TableHead className="border  text-white w-[15%] text-center bg-gray-900">Selling Price</TableHead>
                {datalogin.datarole === "SUPER_ADMIN" ?
                  <>
                    <TableHead className="border  text-white w-[5%] text-center bg-gray-900">ACT</TableHead>
                  </>
                  : null}
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white'>
              {filterProduks.map((dataisi: any, index: number) => (
                <TableRow key={dataisi.id}>
                  <TableCell className="border text-center w-[3.5%] font-bold">{Numbering.format(index + 1)}</TableCell>

                  <TableCell className="border text-center w-[12%]  font-bold">
                    {(function () {
                      if (dataisi.images != null) {
                        return (
                          <Image
                            className='aspect-square rounded-xl mx-auto'
                            src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${dataisi.images}`}
                            width={300}
                            height={300}
                            alt="Picture of the author"
                            style={{ height: 100, width: 100 }}
                            priority
                          />
                        );
                      } else {
                        return (
                          <Image
                            className='aspect-square rounded-xl mx-auto'
                            src="/produk.png"
                            alt="Photo by Drew Beamer"
                            width={300}
                            height={300}
                            style={{ height: 100, width: 100 }}
                            priority
                          />
                        );
                      }
                    })()}

                    {/* <button className='mt-2 text-xs font-normal hover:text-blue-500'>View Details Image</button> */}

                  </TableCell>

                  <TableCell className="border text-left w-[30%]">
                    <span className='capitalize text-base'>{dataisi.produk}</span><br></br>
                    <span className='text-red-600 text-[11px]'>{dataisi.id_produk}</span><br></br>
                    <span>{Numbering.format(dataisi.berat_produk)} gr</span>
                  </TableCell>

                  <TableCell className="border w-[15%] text-center p-2">
                    <div className='flex flex-col'>
                      {/* {dataisi.variasi.map((data_var: any, indexes: number) => (
                        <div key={indexes} className="border rounded-sm py-1">
                          {data_var.warna} : {data_var.stok_ready} Pcs
                        </div>
                      ))} */}

                      <div>
                        <Collapsible
                          className="w-[100%] space-y-2"
                        >
                          <div className="flex items-center justify-between space-x-4 px-4">
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="w-full p-0  font-bold text-green-700">
                                <ChevronsUpDown className="h-4 w-4" />
                                {Numbering.format(dataisi.total_stok)}
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                          <CollapsibleContent className="space-y-2">
                            <div className="rounded-xl bg-gray-100 ">
                              <Table className="">
                                <TableHeader>
                                  <TableRow >
                                    <TableHead className="text-center text-xs font-bold">Variant</TableHead>
                                    <TableHead className="text-center text-xs font-bold">Ukuran</TableHead>
                                    <TableHead className="text-center text-xs  font-bold">Stock</TableHead>
                                    <TableHead className="text-center text-xs  font-bold">Permintaan</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {dataisi.variasi.map((data_var: any, indexes: number) => (
                                    <TableRow key={indexes}>
                                      <TableCell className="text-xs"> {data_var.warna}</TableCell>
                                      <TableCell className="text-xs"> {data_var.ukuran}</TableCell>
                                      <TableCell className="text-xs"> {data_var.stok_ready}</TableCell>
                                      <TableCell className="text-xs"> {data_var.stok_dipesan}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>

                      </div>
                    </div>
                  </TableCell>


                  <TableCell className="border w-[3%] text-center ">{Numbering.format(dataisi.total_variasi)}</TableCell>

                  {datalogin.datarole === "SUPER_ADMIN" || datalogin.datarole === "FINANCE" ?
                    <>
                      <TableCell className="border w-[5%] text-center bg-orange-100">{Rupiah.format(dataisi.kurs)}</TableCell>
                      <TableCell className="border w-[5%] text-center  bg-orange-100">{Rupiah.format(dataisi.overhead)}</TableCell>
                      <TableCell className="border w-[6%] text-center font-bold text-red-600  bg-orange-100">{dataisi.margin}%</TableCell>
                      <TableCell className="border w-[10%] text-center  bg-orange-100">{Rupiah.format(dataisi.total_modal_produk)}</TableCell>
                    </>
                    : null}

                  <TableCell className="border w-[15%] text-center ">{Rupiah.format(dataisi.harga_jual)}</TableCell>

                  {datalogin.datarole === "SUPER_ADMIN" ?
                    <>
                      <TableCell className="border w-[5%]">

                        <AlertDialog open={openEdit} onOpenChange={setopenEdit}>
                          <AlertDialogTrigger asChild>
                            <Button variant="link" className=' text-white font-bold hover:bg-gray-200'
                              onClick={() => {
                                setopenEdit(true)
                                setselectedCover([])
                                sete_imageCover([])
                                sete_imageDetails([])
                                sete_deleteImages([])
                                setopenEditImage(dataisi.images)

                                sete_produk(dataisi.produk)
                                sete_berat_produk(dataisi.berat_produk)
                                sete_modal_asing(dataisi.modal_asing)
                                sete_margin(dataisi.margin)
                                sete_overhead(dataisi.overhead)
                                sete_kurs(dataisi.kurs)
                                sete_id_po(dataisi.id_po)
                                sete_id_batch(dataisi.id_batch)
                                sete_id_produk(dataisi.id_produk)

                                const imageDetails: any = []
                                dataisi.details_img.map((datas: any, index: number) => {
                                  imageDetails.push({
                                    img: `${process.env.NEXT_PUBLIC_HOST}/assets/img/${datas.images}`,
                                    name: datas.images
                                  })
                                }
                                )

                                setselectedImages(imageDetails)
                              }}>
                              <Icon.FileEdit color="#000000" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className='w-[60%]'>
                            <AlertDialogHeader className='border-b pb-4'>
                              <AlertDialogTitle >Edit Product</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className='flex flex-row'>
                              <div className='basis-1/3'>
                                {/* <div className='text-base font-medium text-center'>Cover Image</div> */}
                                <div className='items-start gap-2  h-[auto]  mb-2'>
                                  {selectedCover.length < 1 ?
                                    <div className=" h-auto pb-2 rounded-md text-center">
                                      <Image
                                        className='aspect-square rounded-md -mb-6'
                                        src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${openEditImage}`}
                                        width={300}
                                        height={300}
                                        alt="Picture of the author"
                                        // style={{ height: 300, width: 300 }}
                                        priority
                                      />
                                      <label className='cursor-pointer text-xs text-black p-1 rounded-md'>
                                        <Input
                                          className=' -mb-10 w-[95%]'
                                          type="file"
                                          onChange={onSelectCover}
                                          accept='image/png, image/jpeg'
                                        />
                                      </label>
                                    </div>
                                    :
                                    selectedCover &&
                                    selectedCover.map((image: any, index: number) => {
                                      return (
                                        <div key={index} className=" pb-2 rounded-md text-center ">
                                          <Image
                                            className='aspect-square rounded-md -mb-6'
                                            // src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${dataisi.images}`}
                                            src={image}
                                            width={300}
                                            height={300}
                                            alt="Picture of the author"
                                            // style={{ height: "auto", width: "100%" }}
                                            priority
                                          />
                                          <label className='cursor-pointer text-xs text-black p-1 rounded-md'>
                                            <Input
                                              className=' -mb-10 w-[95%]'
                                              type="file"
                                              onChange={onSelectCover}
                                              accept='image/png, image/jpeg'
                                            />
                                          </label>
                                        </div>
                                      )
                                    })
                                  }


                                </div>

                                {/* <div className='text-base font-medium mt-4 text-center'>Details Image</div>
                            <div className='items-start gap-2 mt-2 h-[auto]'>
                              {selectedImages.length < 1 ?
                                <div className="border rounded-md">
                                  <label className='cursor-pointer text-xs border rounded-md h-[50px] flex justify-center items-center'>
                                    <Icon.Plus />
                                    <Input
                                      className='hidden'
                                      type="file"
                                      onChange={onSelectFile}
                                      multiple
                                      accept='image/png, image/jpeg'
                                    />
                                  </label>
                                </div>
                                :
                                selectedImages &&
                                selectedImages.map((image: any, index: number) => {
                                  return (
                                    <div key={index} className="border h-[140px] pb-2 rounded-md text-center ">
                                      <Image
                                        className='aspect-square rounded-md mx-auto'
                                        // src={`${process.env.NEXT_PUBLIC_HOST}/assets/img/${dataisi.images}`}
                                        src={image.img}
                                        width={300}
                                        height={300}
                                        alt="Picture of the author"
                                        style={{ height: "auto", width: "100%" }}
                                        priority
                                      />
                                      <button className='w-[90%] mt-2 text-xs py-1 bg-red-500 rounded-md text-white'
                                        onClick={() => { deleteDetailsImg(index, image.name) }}
                                      >
                                        Delete Image
                                      </button>
                                    </div>
                                  )
                                })
                              }

                              {selectedImages.length > 0 && selectedImages.length < 5 ?
                                <label className='cursor-pointer h-[140px] text-xs border rounded-md flex justify-center items-center'>
                                  <Icon.Plus />
                                  <Input
                                    className='hidden'
                                    type="file"
                                    onChange={onSelectFile}
                                    multiple
                                    accept='image/png, image/jpeg'
                                  />
                                </label>
                                : null}
                            </div> */}

                              </div>

                              <div className='grow flex flex-col gap-2'>
                                <div className='flex flex-row text-center mt-2 items-center'>
                                  <div className='basis-1/3 font-bold text-left'>
                                    Nama Produk :
                                  </div>
                                  <div className='grow'>
                                    <Input type="text" placeholder="Product.." value={e_produk} onChange={(e) => { sete_produk(e.currentTarget.value) }} />
                                  </div>
                                </div>

                                <div className='flex flex-row text-center mt-2 items-center'>
                                  <div className='basis-1/3 font-bold text-left'>
                                    Berat Produk :
                                  </div>
                                  <div className='grow'>
                                    <Input type="text" placeholder="Product.." value={e_berat_produk} onChange={(e) => { sete_berat_produk(e.currentTarget.value) }} />
                                  </div>
                                </div>

                                <div className='flex flex-row text-center mt-2 items-center'>
                                  <div className='basis-1/3 font-bold text-left'>
                                    Modal Produk (Asing) :
                                  </div>
                                  <div className='grow'>
                                    <Input type="text" placeholder="Product.." value={e_modal_asing} onChange={(e) => { sete_modal_asing(e.currentTarget.value) }} />
                                  </div>
                                </div>

                                <div className='flex flex-row text-center mt-2 items-center'>
                                  <div className='basis-1/3 font-bold text-left'>
                                    Kurs :
                                  </div>
                                  <div className='grow'>
                                    <Input type="text" placeholder="Product.." value={e_kurs} onChange={(e) => { sete_kurs(e.currentTarget.value) }} />
                                  </div>
                                </div>

                                <div className='flex flex-row text-center mt-2 items-center'>
                                  <div className='basis-1/3 font-bold text-left'>
                                    Overhead :
                                  </div>
                                  <div className='grow'>
                                    <Input type="text" placeholder="Product.." value={e_overhead} onChange={(e) => { sete_overhead(e.currentTarget.value) }} />
                                  </div>
                                </div>

                                <div className='flex flex-row text-center mt-2 items-center'>
                                  <div className='basis-1/3 font-bold text-left'>
                                    Margin :
                                  </div>
                                  <div className='grow'>
                                    <Input type="text" placeholder="Product.." value={e_margin} onChange={(e) => { sete_margin(e.currentTarget.value) }} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                              <Button onClick={() => {
                                editProduk()
                              }}>Update</Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle color="#ff0000" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className='w-[600px]'>
                            <AlertDialogHeader className='border-b pb-4'>
                              <AlertDialogTitle >Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>Data Supplier {dataisi.supplier} akan dihapus?</AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel >Cancel</AlertDialogCancel>
                              <Button className='bg-red-400 font-bold' onClick={() => { deleteProduk(dataisi.id_produk, dataisi.id_po, dataisi.id_batch) }}>Delete</Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </TableCell>
                    </>
                    : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div >
      </main >
    )
  }


}
