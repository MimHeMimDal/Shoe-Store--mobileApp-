import { svgIcons } from "@/data";
import ElementGenerator from "@/library/ElementGernerator";

export const PageNotFound = function ({ msg, title, className }) {
  return ElementGenerator({
    element: "div",
    className: `${className} flex flex-col m-auto items-center justify-center`,
    child: [
      ElementGenerator({ element: "div", innerHTML: svgIcons.pageNotFound }),
      ElementGenerator({
        element: "h1",
        child: title,
        className: "font-bold text-[30px] w-full text-center",
      }),
      ElementGenerator({
        element: "div",
        child: msg,
        className: "text-[20px] text-center",
      }),
    ],
  });
};
