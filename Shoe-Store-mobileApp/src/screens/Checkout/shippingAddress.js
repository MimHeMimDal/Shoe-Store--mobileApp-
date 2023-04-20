import { Routes } from "@/routes";
import "flowbite";
import addressCart from "./address/addressCart";
import defaultSpan from "./address/defaultSpan";
import radioButton from "./address/radioButton";
import ElementGenerator from "@/library/ElementGernerator";

const shippingAddress = () => {
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
                child: "Shipping Address",
                className: "text-2xl font-medium",
              }),
            ],
          }),
        ],
      }),
      addressCart("Home", defaultSpan(), radioButton(true)),
      addressCart("Office", "", radioButton()),
      addressCart("Apartment", "", radioButton()),
      addressCart("Parent's House", "", radioButton()),

      ElementGenerator({
        element: "button",
        className:
          " bg-gray-100 text-slate-600 flex justify-center items-center gap-x-4 rounded-full w-11/12 py-4 mx-auto mt-8",
        child: [
          ElementGenerator({
            element: "span",
            className: "self-center text-sm font-semibold",
            child: "Add New Address",
          }),
        ],
      }),
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
export default shippingAddress;
