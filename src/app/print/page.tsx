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

export default function asd() {
  const componentRef: any = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className='max-w-[80vh] mx-auto border h-screen overflow-auto flex flex-col'>
        {/* ini konten print */}
        <div ref={componentRef} className="p-3 grow">
          {/* isi konten */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* end isi konten */}
        </div>
        {/* ini akhir konten print */}
        <div className='flex justify-end p-5'>
          <Button onClick={handlePrint}>Print this out!</Button>
        </div>
      </div>
    </div>
  );
};
