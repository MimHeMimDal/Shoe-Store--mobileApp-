import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const Search = function () {
  return ElementGenerator({
    element: "div",
    id: "searchContainer",
    className:
      "h-[0vh] w-full duration-400 absolute top-14 left-0 bg-white z-10 px-7 py-4 hidden",
    child: [
      ElementGenerator({
        element: "div",
        className: "flex items-center justify-between border-b pb-5",
        child: [
          ElementGenerator({
            element: "div",
            className: "font-bold text-lg",
            child: "Recent",
          }),
          ElementGenerator({
            element: "div",
            onclick: () => {
              localStorage.setItem("lastSearch", JSON.stringify([]));
              document.getElementById("searchResult").innerHTML = "";
            },
            className: "font-bold text-lg cursor-pointer px-3 py-2",
            child: "Clear All",
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className: "h-[70%] py-3",
        id: "searchResult",
      }),
    ],
  });
};

export const SearchResultBtn = function ({ title, id }) {
  return ElementGenerator({
    element: "div",
    id,
    className: "w-full flex items-center justify-between py-3",
    child: [
      ElementGenerator({
        element: "div",
        className: "",
        child: title,
        onclick: () => {
          axiosInstance.get(`/products/${id}`).then((res) => {
            Routes().navigate(`/products/${res.data.brand}/${res.data.id}`);
          });
        },
      }),
      ElementGenerator({
        element: "ion-icon",
        name: "close-circle-outline",
        className: "text-lg",
      }),
    ],
  });
};
