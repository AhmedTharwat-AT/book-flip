import { PageFlip } from "page-flip";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfFile from "./10-page-sample.pdf";

import HTMLFlipOptional from "./HTMLFlipOptional";
import ThumbnailWrapper from "./ThumbnailWrapper";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// type HTMLFlipType = Partial<typeof HTMLFlipBook>;

const PDFViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(false);

  const bookRef = useRef<{ pageFlip: () => PageFlip } | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
  };

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handleGoToPage = ({ pageIndex }: { pageIndex: number }) => {
    if (bookRef.current) {
      console.log("go to : ", pageIndex);
      bookRef.current.pageFlip().turnToPage(pageIndex);
      setShowThumbnail(false);
    }
  };

  return (
    <div className="pdf-viewer flex h-full min-h-screen flex-col items-center justify-center overflow-hidden overflow-y-auto bg-gray-100 p-4 pb-16">
      <div className="relative h-[400px] w-full max-[380px]:h-[360px]">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          onItemClick={handleGoToPage}
          loading={<div className="h-40 text-center">Loading page...</div>}
          error={
            <div className="text-center text-red-500">
              Error loading page. Please try again.
            </div>
          }
          className="flex size-full flex-col items-center justify-center"
        >
          <HTMLFlipOptional
            ref={bookRef}
            className="flip-book max-[380px]:!scale-90"
            width={300}
            height={400}
            size="fixed"
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            autoSize={true}
            onFlip={(e) => setPageIndex(e.data)}
            flippingTime={1000}
            usePortrait={true}
            drawShadow={true}
            clickEventForward={true}
            startPage={0}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className={`page ${index === 0 && "page-cover"} `}
              >
                <Page
                  pageIndex={index}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className={"shadow-xl"}
                  loading={null}
                />
              </div>
            ))}
          </HTMLFlipOptional>

          <ThumbnailWrapper
            pagesNumber={numPages || 0}
            pageIndex={pageIndex}
            showThumbnail={showThumbnail}
            setShowThumbnail={setShowThumbnail}
          />
        </Document>
      </div>

      {numPages && (
        <p className="mt-4">
          Page {pageIndex + 1} of {numPages}
        </p>
      )}

      <div className="fixed bottom-0 z-10 flex min-w-[100vw] justify-center gap-2 bg-gray-700 p-2 text-sm">
        <button className="btn" onClick={() => setShowThumbnail((p) => !p)}>
          Thumbnail
        </button>

        <button
          onClick={handlePrevPage}
          className="btn"
          disabled={pageIndex <= 0}
        >
          Previous
        </button>

        <button
          onClick={handleNextPage}
          className="btn"
          disabled={pageIndex + 1 >= (numPages || 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
