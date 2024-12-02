import { PageFlip } from "page-flip";
import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

import pdfFile from "../asdasd.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

enum Orientation {
  PORTRAIT = "portrait",
  LANDSCAPE = "landscape",
}

const Pages = React.forwardRef(
  (
    props: { children: React.ReactNode; number: number },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <div className="demoPage relative" ref={ref}>
        {props.children}
      </div>
    );
  },
);

Pages.displayName = "Pages";

function App() {
  const ref = useRef<{ pageFlip: () => PageFlip } | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // [&_>_.--landscape]:!pb-0

  return (
    <div className="flex h-screen min-h-[400px] items-center justify-center overflow-hidden px-7 py-20 md:py-40">
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        className="h-full min-h-[300px] w-full max-w-[800px] border border-black"
      >
        <HTMLFlipBook
          ref={(element) => (ref.current = element)}
          width={400}
          height={600}
          className={"border border-red-900 shadow-md"}
          style={{}}
          startPage={0}
          size={"fixed"}
          minWidth={250}
          maxWidth={600}
          minHeight={300}
          maxHeight={800}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={1}
          showCover={false}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={1000}
          showPageCorners={true}
          disableFlipByClick={true}
        >
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={pNum + 1}>
              <Page
                pageNumber={pNum + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className={"border border-green-300"}
              />
            </Pages>
          ))}
        </HTMLFlipBook>
      </Document>
    </div>
  );
}

export default App;
