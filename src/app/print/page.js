
"use client"
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from "@/components/ui/button"
import * as Icon from "lucide-react"

const ReactPdfPrint = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: () => alert('Print Success')
    });

    return (
        <>
            <div refs="{componentRef}" >
                <h1>awdawd</h1>
            </div>
            <Button onClick={handlePrint} className='text-white font-bold hover:bg-gray-200'> <Icon.Printer size={18} color="#00b3ff" /></Button>
        </>
    );
};

export default ReactPdfPrint;