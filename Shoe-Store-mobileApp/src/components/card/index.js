import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const Card = function (item) {
  return ElementGenerator({
    element: "div",
    id: item.id,
    onclick: (e) => {
      e.stopPropagation();
      Routes().navigate(`/products/${item.brand}/${item.id}`);
    },
    className: "flex s:flex-col gap-4",
    child: [
      ElementGenerator({
        element: "div",
        className:
          "bg-[#F3F3F3] w-full aspect-square rounded-3xl flex items-center justify-center",
        child: ElementGenerator({
          element: "img",
          className: "h-[80%] w-[80%] object-cover",
          src: item.images_urls[0],
        }),
      }),
      ElementGenerator({
        element: "div",
        className: "flex flex-col justify-between",
        child: [
          ElementGenerator({
            element: "div",
            className: "font-bold text-[20px] line-clamp-2 s:line-clamp-1",
            child: item.title,
          }),
          ElementGenerator({
            element: "div",
            className: "font-semibold text-[16px]",
            child: `$ ${item.price.toLocaleString()}`,
          }),
        ],
      }),
    ],
  });
};
