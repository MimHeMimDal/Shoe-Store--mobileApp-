import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";
import "flowbite";
import addressCart from "./address/addressCart";
import radioButton from "./address/radioButton";

const shippingType = () => {
  return ElementGenerator({
    element: "div",
    className: "items-center bg-gray-50 h-screen",
    child: [
      ElementGenerator({
        element: "div",
        className: "flex justify-between px-7 py-8",
        child: [
          ElementGenerator({
            element: "div",
            className: "flex items-center gap-3",
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "arrow-back",
                className: "text-xl",
                onclick: () => {
                  Routes().navigate("/checkout");
                },
              }),
              ElementGenerator({
                element: "h1",
                child: "Choose Shipping",
                className: "text-2xl font-medium",
              }),
            ],
          }),
        ],
      }),
      addressCart("Economy", "", radioButton(), "bicycle", "$10"),
      addressCart("Regular", "", radioButton(true), "bus", "$15"),
      addressCart("Cargo", "", radioButton(), "train", "$20"),
      addressCart("Express", "", radioButton(), "airplane", "$30"),

      ElementGenerator({
        element: "div",
        className:
          "w-full fixed bottom-0 flex justify-center items-center py-4 bg-white rounded-tl-2xl rounded-tr-2xl shadow-2xl",
        child: ElementGenerator({
          element: "button",
          className:
            " bg-black text-white flex justify-center items-center gap-x-4 rounded-full w-11/12 py-4",
          child: [
            ElementGenerator({
              element: "span",
              className: "self-center text-sm font-semibold",
              child: "Apply",
            }),
          ],
        }),
      }),
    ],
  });
};
export default shippingType;
