import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFViewer=({ base64Data })=>{
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  console.log("jhb",base64Data);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  let blob = null;
  const convertPdf = () => {
    // Convert the Base64 data to a Uint8Array
    const binaryData = base64Data.data;
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData[i];
    }

    // Create a Blob from the Uint8Array
    blob = new Blob([uint8Array], { type: "application/pdf" });
    console.log(blob);
  };
 convertPdf();
  return (
    <div>
        {console.log(blob)}
      <Document file={blob} onLoadSuccess={onDocumentLoadSuccess}>
        {
            Array.apply(null,Array(numPages)).map((x,i)=>i+1).map((page)=>{
                return <Page
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />;
            })
        }
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PDFViewer;
