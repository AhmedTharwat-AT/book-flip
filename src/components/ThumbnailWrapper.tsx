import { Thumbnail } from "react-pdf";

function ThumbnailWrapper({
  pagesNumber,
  pageIndex,
  showThumbnail,
}: {
  pagesNumber: number;
  pageIndex: number;
  showThumbnail: boolean;
}) {
  return (
    <div
      className={`thumbnail fixed left-0 top-0 z-10 flex h-full max-h-screen w-40 flex-col gap-2 overflow-y-auto overflow-x-hidden border-r border-gray-500 bg-gray-200 px-4 py-4 shadow-2xl ${showThumbnail ? "" : "hidden"}`}
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
  );
}

export default ThumbnailWrapper;
