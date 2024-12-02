import { Thumbnail } from "react-pdf";

function ThumbnailWrapper({
  pagesNumber,
  pageIndex,
  showThumbnail,
  setShowThumbnail,
}: {
  pagesNumber: number;
  pageIndex: number;
  showThumbnail: boolean;
  setShowThumbnail: (show: boolean) => void;
}) {
  return (
    <>
      <div
        className={`thumbnail fixed left-0 top-0 z-30 flex h-full max-h-screen w-40 flex-col gap-2 overflow-y-auto overflow-x-hidden overscroll-none border-r border-gray-500 bg-gray-200 px-4 py-4 shadow-2xl ${showThumbnail ? "" : "hidden"}`}
      >
        {Array.from(new Array(pagesNumber), (_, index) => {
          return (
            <div key={index}>
              <Thumbnail
                pageIndex={index}
                className={`block w-full border border-red-400 ${
                  index === pageIndex && "border-4"
                }`}
                inputRef={(e) => {
                  if (pageIndex === index) {
                    e?.scrollIntoView({ behavior: "instant" });
                  }
                }}
              />

              <p className="text-center text-sm">{index + 1}</p>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => setShowThumbnail(false)}
        className={`"overlay fixed inset-0 z-20 bg-gray-900 opacity-50 ${showThumbnail ? "" : "hidden"}`}
      ></div>
    </>
  );
}

export default ThumbnailWrapper;
