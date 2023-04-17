import { Button, Card, Header } from "@/components";
import { svgIcons } from "@/data";
// import { data, GetFromLocal, SetToLocal } from "@/data";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";
// import { GetData } from "@/library/GetData";
// import { CloseSearch, HandleLastSearch } from "@/library/HandleLastSearch";
// import { Logout } from "@/library/Logout";
// import { debounce } from "lodash";

export const Main = function (obj) {
  const productsBrands = ElementGenerator({
    element: "div",
    id: "productsBrands",
    className: "flex items-center justify-center flex-wrap gap-x-10 gap-y-7",
  });
  const productsNames = ElementGenerator({
    element: "div",
    id: "filterByName",
    className: "w-screen flex gap-3 overflow-scroll pr-9 mb-4",
    onclick: (e) => {
      // console.log(e.target);
      if (e.target.dataset.action !== "all") {
        e.target.closest("div").childNodes[0].classList =
          "font-semibold rounded-full border-2 border-black px-4 whitespace-nowrap h-[35px] bg-white text-black";
        e.target.classList.toggle("text-white");
        e.target.classList.toggle("bg-[#343A40]");
        e.target.classList.toggle("text-black");
        e.target.classList.toggle("bg-white");
      }
      if (e.target.dataset.action === "all") {
        e.target.closest("div").childNodes.forEach((node, i) => {
          if (i > 0) {
            node.className =
              "font-semibold rounded-full border-2 border-black px-4 whitespace-nowrap h-[35px] bg-white text-black";
          }
        });
        e.target.classList.toggle("text-white");
        e.target.classList.toggle("bg-[#343A40]");
        e.target.classList.toggle("text-black");
        e.target.classList.toggle("bg-white");
      }
    },
  });
  const productsCardsContainer = ElementGenerator({
    element: "main",
    id: "cardsContainer",
    className: "overflow-scroll grid grid-cols-1 s:grid-cols-2 gap-6 pb-14",
  });
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      data.forEach((item) => {
        productsCardsContainer.append(Card(item));
      });
    });
  fetch("http://localhost:3000/products?brand=Nike&&brand=Addidas")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
    });
  fetch("http://localhost:3000/brands")
    .then((res) => res.json())
    .then((data) => {
      productsNames.append(
        Button({
          child: "ALL",
          dataSet: { action: "all" },
          className:
            "font-semibold rounded-full border-2 border-black px-4 whitespace-nowrap h-[35px] bg-white text-black",
        })
      );
      data.map((item) => {
        return productsNames.append(
          Button({
            child: item.name,
            dataSet: { action: item.name },
            className:
              "font-semibold rounded-full border-2 border-black px-4 whitespace-nowrap h-[35px] bg-white text-black",
          })
        );
      });
      data.map((item) => {
        // return productsBrands.append(
        //   ElementGenerator({
        //     element: "div",
        //     className: "flex flex-col gap-5 w-[60px]",
        //     child: [
        //       ElementGenerator({
        //         element: "img",
        //         className:
        //           "rounded-full h-[60px] rounded-full bg-[#ECECEC] flex items-center justify-center",
        //         src: item.source,
        //       }),
        //       ElementGenerator({
        //         element: "div",
        //         className: "text-center font-semibold text-[14px]",
        //         child: item.name,
        //       }),
        //     ],
        //   })
        // );
        return productsBrands.append(
          ElementGenerator({
            element: "div",
            onclick: () => {
              // console.log("hi");
              // console.log(item.name);
              Routes().navigate(`/products/${item.name}`);
            },
            className: "flex flex-col gap-5 w-[60px]",
            child: [
              ElementGenerator({
                element: "div",
                className:
                  "h-[60px] rounded-full bg-[#ECECEC] flex items-center justify-center",
                child: ElementGenerator({
                  element: "img",
                  className: "rounded-full",
                  src: item.source,
                }),
              }),
              ElementGenerator({
                element: "div",
                className: "text-center font-semibold text-[14px]",
                child: item.name,
              }),
            ],
          })
        );
      });
      productsBrands.append(
        ElementGenerator({
          element: "div",
          className: "flex flex-col gap-5 w-[60px]",
          child: [
            ElementGenerator({
              element: "div",
              className:
                "h-[60px] rounded-full bg-[#ECECEC] flex items-center justify-center",
              child: ElementGenerator({
                element: "img",
                className: "rounded-full",
                src: "http://localhost:5173/src/assets/Icons/more.svg",
              }),
            }),
            ElementGenerator({
              element: "div",
              className: "text-center font-semibold text-[14px]",
              child: "More",
            }),
          ],
        })
      );
    });
  const main = ElementGenerator({
    element: "div",
    className: "h-screen p-5 flex flex-col",
    child: [
      ElementGenerator({
        element: "section",
        id: "topSection",
        className: "flex flex-col gap-5",
        child: [
          Header({
            className: "flex items-center justify-between",
            child: [
              // Profile Box
              ElementGenerator({
                element: "div",
                className: "",
                child: [
                  ElementGenerator({
                    element: "div",
                    className: "flex items-center justify-center gap-4",
                    child: [
                      ElementGenerator({
                        element: "div",
                        className: "",
                        child:
                          // Profile picture
                          ElementGenerator({
                            element: "img",
                            id: "pp",
                            className: "h-[48px] w-[48px] rounded-full",
                            src: obj
                              ? obj.img
                              : "http://localhost:5173/src/assets/Profile/image.png",
                          }),
                      }),
                      ElementGenerator({
                        element: "div",
                        className: "flex flex-col justify-between",
                        child: [
                          ElementGenerator({
                            element: "div",
                            className: "font-medium text-[#757475] text-[16px]",
                            child: "Good Morning 👋",
                          }),
                          ElementGenerator({
                            element: "div",
                            className: "font-bold text-black text-[16px]",
                            child: obj ? obj.name : "Mohammad Mottaghi",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              ElementGenerator({
                element: "div",
                className: "flex items-center justify-between gap-4",
                child: [
                  ElementGenerator({
                    element: "div",
                    className: "",
                    innerHTML: svgIcons.bell,
                  }),
                  ElementGenerator({
                    element: "div",
                    className: "",
                    innerHTML: svgIcons.heart,
                  }),
                ],
              }),
            ],
          }),
          // Search Box
          ElementGenerator({
            element: "div",
            className:
              "flex items-center justify-between w-full bg-[#6C757D] bg-opacity-[3%] rounded px-3 py-2",
            child: [
              ElementGenerator({
                element: "label",
                for: "searchProducts",
                id: "searchProductsLabel",
                className: "flex items-center justify-center",
                innerHTML: svgIcons.search,
              }),
              ElementGenerator({
                element: "input",
                id: "searchProducts",
                type: "password",
                placeholder: "Search",
                className:
                  "h-full px-1 font-medium border-none grow placeholder:text-[#BAB8BC] placeholder:text-[14px] placeholder:font-regular bg-transparent outline-none focus:border-none active:border-none active:outline-none focus:outline-none",
              }),
            ],
          }),
          productsBrands,
          ElementGenerator({
            element: "div",
            className: "flex flex-col gap-5",
            child: [
              ElementGenerator({
                element: "div",
                className: "flex items-center justify-between",
                child: [
                  ElementGenerator({
                    element: "div",
                    className:
                      "flex items-center justify-between font-semibold text-[20px]",
                    child: "Most Popular",
                  }),
                  ElementGenerator({
                    element: "div",
                    className:
                      "flex items-center justify-between font-semibold",
                    child: "See All",
                  }),
                ],
              }),
              productsNames,
            ],
          }),
        ],
      }),
      productsCardsContainer,
      // fixed bottom nav
      ElementGenerator({
        element: "div",
        id: "pageBtns",
        className:
          "flex justify-center justify-between w-full h-[70px] px-10 fixed z-20 bg-white bottom-0 left-0",
        child: [
          Button({
            child: "Home",
            // onclick: () => {
            //   Routes().navigate("/home");
            // },
          }),
          Button({
            child: "Cart",
            onclick: () => {
              Routes().navigate("/my-cart");
            },
          }),
          Button({ child: "order" }),
          Button({ child: "wallet" }),
          Button({ child: "profile" }),
        ],
      }),
    ],
  });
  return main;
};
