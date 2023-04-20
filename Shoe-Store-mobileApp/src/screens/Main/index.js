import { Button, Card, Header } from "@/components";
import { svgIcons } from "@/data";
import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";
import { Search, SearchResultBtn } from "../search";
import { debounce } from "lodash";
import { PageNotFound } from "../PageNotFound";

export const Main = function (obj) {
  const productsCardsContainer = ElementGenerator({
    element: "main",
    id: "cardsContainer",
    className:
      "overflow-scroll h-[80vh] grid grid-cols-1 s:grid-cols-2 gap-6 pb-14",
  });
  const productsBrands = ElementGenerator({
    element: "div",
    id: "productsBrands",
    className:
      "flex items-center h-[30vh] overflow-scroll justify-center flex-wrap gap-x-10 gap-y-7",
  });
  const productsNames = ElementGenerator({
    element: "div",
    id: "filterByName",
    className: "flex gap-3 overflow-scroll mb-4",
    onclick: (e) => {
      // console.log(e.target);
      // console.log(e.currentTarget.childNodes);
      Array.from(e.currentTarget.childNodes).forEach((item, i) => {
        if (item !== e.target) {
          item.classList.remove("text-white");
          item.classList.remove("bg-[#343A40]");
          item.dataset.active = "false";
        } else {
          item.dataset.active = "true";
          item.classList.add("text-white");
          item.classList.add("bg-[#343A40]");
        }
      });
      Array.from(e.currentTarget.childNodes).forEach((item) => {
        if (item.dataset.active === "true") {
          document.getElementById("cardsContainer").innerHTML = "";
          if (item.textContent === "ALL") {
            axiosInstance.get("/products").then((res) => {
              res.data.forEach((item) =>
                document.getElementById("cardsContainer").append(Card(item))
              );
            });
          } else {
            axiosInstance
              .get(`/products?brand=${item.textContent}`)
              .then((res) => {
                res.data.forEach((item) =>
                  document.getElementById("cardsContainer").append(Card(item))
                );
              });
          }
        }
      });
    },
  });

  axiosInstance.get("/products").then((res) => {
    // console.log(data);
    res.data.forEach((item) => {
      productsCardsContainer.append(Card(item));
    });
  });
  axiosInstance.get("/brands").then((res) => {
    productsNames.append(
      Button({
        child: "ALL",
        dataSet: { action: "all" },
        className:
          "font-semibold rounded-full border-2 border-black px-4 whitespace-nowrap h-[35px]",
      })
    );
    res.data.map((item) => {
      return productsNames.append(
        Button({
          child: item.name,
          dataSet: { action: item.name },
          data: { name: "active", value: false },
          className:
            "font-semibold rounded-full border-2 border-black px-4 whitespace-nowrap h-[35px]",
        })
      );
    });
    res.data.map((item) => {
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
    className: "p-5 flex flex-col",
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
                onclick: () => {
                  document
                    .getElementById("search-box")
                    .classList.remove("scale-110");
                  document
                    .getElementById("searchContainer")
                    .classList.add("h-[0vh]");
                  document
                    .getElementById("searchContainer")
                    .classList.remove("h-[100vh]");
                  document
                    .getElementById("searchContainer")
                    .classList.add("hidden");
                },
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
                    onclick: () => {
                      Routes().navigate("/my-wishlist");
                    },
                    innerHTML: svgIcons.heart,
                  }),
                ],
              }),
            ],
          }),
          // Search Box
          ElementGenerator({
            element: "div",
            id: "search-box",
            className:
              "flex relative items-center justify-between w-full bg-[#6C757D] bg-opacity-[3%] duration-300 rounded px-3 py-2",
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
                onfocus: (e) => {
                  document
                    .getElementById("search-box")
                    .classList.add("scale-110");
                  document
                    .getElementById("searchContainer")
                    .classList.remove("hidden");
                  document
                    .getElementById("searchContainer")
                    .classList.remove("h-[0vh]");

                  document
                    .getElementById("searchContainer")
                    .classList.add("h-[100vh]");
                  JSON.parse(localStorage.getItem("lastSearch")).forEach(
                    (item) => {
                      document.getElementById("searchResult").append(
                        SearchResultBtn({
                          title: item,
                          id: "",
                        })
                      );
                    }
                  );
                },
                onkeyup: debounce((e) => {
                  if (e.target.value.length === 0) {
                    document.getElementById("searchResult").innerHTML = "";
                  }
                  if (e.target.value.length > 2) {
                    if (e.key === "Enter") {
                      const last = JSON.parse(
                        localStorage.getItem("lastSearch")
                      );
                      localStorage.setItem(
                        "lastSearch",
                        JSON.stringify([...last, e.target.value])
                      );
                    }
                    axiosInstance
                      .get(`/products?title_like=${e.target.value}`)
                      .then((res) => {
                        document.getElementById("searchResult").innerHTML = "";
                        if (res.data.length > 0) {
                          res.data.forEach((item) => {
                            document.getElementById("searchResult").append(
                              SearchResultBtn({
                                title: item.shortName,
                                id: item.id,
                              })
                            );
                          });
                        } else {
                          document
                            .getElementById("searchResult")
                            .append(PageNotFound({ title: "Not Found" }));
                        }
                      });
                  }
                }, 700),
                id: "searchProducts",
                type: "text",
                placeholder: "Search",
                className:
                  "h-full px-1 font-medium border-none grow placeholder:text-[#BAB8BC] placeholder:text-[14px] placeholder:font-regular bg-transparent outline-none focus:border-none active:border-none active:outline-none focus:outline-none",
              }),
              Search(),
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
          // home
          Button({
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "home",
                className: "text-3xl",
              }),
              ElementGenerator({ element: "div", child: "Home" }),
            ],
          }),
          // Cart
          Button({
            onclick: () => {
              Routes().navigate("/my-cart");
            },
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "bag-outline",
                className: "text-3xl",
              }),
              ElementGenerator({ element: "div", child: "Cart" }),
            ],
          }),
          // Orders
          Button({
            onclick: () => {
              Routes().navigate("/my-orders");
            },
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "cart-outline",
                className: "text-3xl",
              }),
              ElementGenerator({ element: "div", child: "Orders" }),
            ],
          }),
          // Wallet
          Button({
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "wallet-outline",
                className: "text-3xl",
              }),
              ElementGenerator({ element: "div", child: "Wallet" }),
            ],
          }),
          // Profile
          Button({
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "person-outline",
                className: "text-3xl",
              }),
              ElementGenerator({ element: "div", child: "Profile" }),
            ],
          }),
        ],
      }),
    ],
  });
  return main;
};
