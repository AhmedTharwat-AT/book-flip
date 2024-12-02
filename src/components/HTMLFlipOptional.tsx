import { ComponentProps, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";

type HTMLFlipType = ComponentProps<typeof HTMLFlipBook>;

const HTMLFlipOptional = forwardRef(function (
  props: Partial<HTMLFlipType>,
  ref,
) {
  return (
    <HTMLFlipBook
      {...(props as ComponentProps<typeof HTMLFlipBook>)}
      ref={ref}
    />
  );
});

export default HTMLFlipOptional;
