import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";
import addressCart from "./address/addressCart";
import editButton from "./address/editButton";

const card = function (obj) {
  return ElementGenerator({
    element: "div",
    id: obj.id,
    className: "flex gap-4 rounded-[35px] bg-white px-5 py-4",
    child: [
      // picture
      ElementGenerator({
        element: "div",
        className:
          "flex items-center p-4 justify-center rounded-3xl bg-[#F3F3F3]",
        child: [
          ElementGenerator({
            element: "img",
            src: obj.image,
            className: "w-[95px] h-[95px]",
          }),
        ],
      }),
      // body
      ElementGenerator({
        element: "div",
        className: "flex flex-col grow justify-between",
        child: [
          // header
          ElementGenerator({
            element: "div",
            className: "flex justify-between items-start",
            child: [
              // title
              ElementGenerator({
                element: "div",
                className: "font-bold text-xl line-clamp-1",
                child: obj.shortName,
              }),
            ],
          }),
          // size and color
          ElementGenerator({
            element: "div",
            className: "flex gap-3 items-center text-sm text-slate-500",
            child: [
              // color
              ElementGenerator({
                element: "div",
                className: "flex items-center gap-2",
                child: [
                  ElementGenerator({
                    element: "div",
                    className: `w-4 h-4 rounded-full bg-[${obj.color.hex}]`,
                  }),
                  ElementGenerator({ element: "div", child: obj.color.name }),
                ],
              }),
              // line break
              ElementGenerator({
                element: "div",
                className: "border-l-2 border-slate-500 h-3",
              }),
              // size
              ElementGenerator({
                element: "div",
                child: `Size = ${obj.size}`,
              }),
            ],
          }),
          // total price and quantity
          ElementGenerator({
            element: "div",
            className: "flex items-center justify-between",
            child: [
              // total price
              ElementGenerator({
                element: "div",
                className: "font-bold",
                child: `$${(obj.price * obj.quantity).toLocaleString()}`,
                id: obj.productID,
              }),
              // quantity
              ElementGenerator({
                element: "div",
                className:
                  "flex items-center justify-center w-8 h-8 rounded-full bg-[#F3F3F3]",
                child: obj.quantity,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const checkout = (token = 1380) => {
  const container = ElementGenerator({
    element: "div",
    id: "checkoutContainer",
    className: "flex flex-col gap-4 px-5 h-[50vh] overflow-scroll",
  });
  const totalPrice = ElementGenerator({
    element: "span",
    className: "text-gray-700 text-lg",
  });

  axiosInstance.get(`/orders?userId=${token}`).then((res) => {
    let total = 0;
    res.data.forEach((element) => {
      if (element.isActive) {
        total += element.price * element.quantity;
        container.append(card(element));
      }
    });
    totalPrice.append(total);
  });

  return ElementGenerator({
    element: "div",
    className: "items-center bg-gray-50",
    child: [
      ElementGenerator({
        element: "div",
        className: "p-4 flex items-center justify-between pt-8 px-6",
        child: [
          ElementGenerator({
            element: "div",
            className: "flex items-center gap-3",
            child: [
              ElementGenerator({
                element: "button",
                className: "flex",
                onclick: () => {
                  Routes().navigate("/home");
                },
                child: ElementGenerator({
                  element: "ion-icon",
                  name: "arrow-back-outline",
                  className: "text-2xl",
                }),
              }),
              ElementGenerator({
                element: "h1",
                child: "Checkout",
                className: "text-2xl font-bold",
              }),
            ],
          }),
          ElementGenerator({
            element: "ion-icon",
            name: "ellipsis-horizontal-circle",
            className: "text-2xl",
          }),
        ],
      }),
      ElementGenerator({
        element: "h2",
        child: "Shipping Address",
        className: "text-xl font-bold text-left p-6",
      }),
      addressCart("Home", "", editButton(), token),
      ElementGenerator({
        element: "hr",
        className: "text-gray-500 mx-4",
      }),
      ElementGenerator({
        element: "h2",
        child: "Order List",
        className: "text-xl font-bold text-left p-6",
      }),
      ElementGenerator({
        element: "div",
        child: container,
        className: "mb-4",
      }),
      ElementGenerator({
        element: "hr",
        className: "text-gray-500 mx-4",
      }),
      ElementGenerator({
        element: "h2",
        child: "Choose Shipping",
        className: "text-xl font-bold text-left p-6",
      }),
      ElementGenerator({
        element: "button",
        className: "w-full",
        child: ElementGenerator({
          element: "div",
          onclick: () => {
            Routes().navigate("/shippingType");
          },
          className:
            "flex items-center justify-between text-left p-4 rounded-2xl mx-4 bg-white",
          child: [
            ElementGenerator({
              element: "div",
              className: "flex items-center gap-3",
              child: [
                ElementGenerator({
                  element: "ion-icon",
                  name: "car",
                  className: "text-3xl",
                }),
                ElementGenerator({
                  element: "p",
                  child: "Choose Shipping Type",
                  className: "font-bold",
                }),
              ],
            }),
            ElementGenerator({
              element: "ion-icon",
              name: "chevron-forward",
              className: "text-2xl",
            }),
          ],
        }),
      }),
      ElementGenerator({
        element: "h2",
        child: "Promo Code",
        className: "text-xl font-bold text-left p-6",
      }),
      ElementGenerator({
        element: "div",
        className: "flex justify-between items-center gap-2 mx-4 mb-8",
        child: [
          ElementGenerator({
            element: "input",
            id: "promoCode",
            placeholder: "Enter Promo Code",
            className:
              "bg-gray-100 text-slate-500 font-light py-4 pl-4 rounded-2xl outline-none w-full",
          }),
          ElementGenerator({
            element: "button",
            onclick: () => {
              const promoCode = document.getElementById("promoCode");
              axiosInstance
                .get(`/discounts?value=${promoCode.value.toLocaleLowerCase()}`)
                .then((res) => {
                  if (res.data.length > 0) {
                    console.log(res.data[0].fee);
                    document.getElementById("total").textContent = `$${(
                      res.data[0].fee * +totalPrice.childNodes[0].textContent
                    ).toLocaleString()}`;
                  }
                });
            },
            className: "flex",
            child: ElementGenerator({
              element: "ion-icon",
              name: "add-circle",
              className: "text-5xl",
            }),
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className: "rounded-2xl mb-10 bg-white mx-4",
        child: [
          ElementGenerator({
            element: "div",
            className: "flex justify-between p-4",
            child: [
              ElementGenerator({
                element: "p",
                child: "Amount",
                className: "text-gray-600 text-lg",
              }),
              totalPrice,
            ],
          }),
          ElementGenerator({
            element: "div",
            className: "flex justify-between p-4",
            child: [
              ElementGenerator({
                element: "p",
                child: "Shipping",
                className: "text-gray-600 text-lg font-normal",
              }),
              ElementGenerator({
                element: "span",
                child: "-",
                className: "text-gray-700 font-bold text-lg",
              }),
            ],
          }),
          ElementGenerator({
            element: "hr",
            className: "text-gray-500 mx-4",
          }),
          ElementGenerator({
            element: "div",
            className: "flex justify-between p-4",
            child: [
              ElementGenerator({
                element: "p",
                child: "Total",
                className: "text-gray-600 text-lg font-normal",
              }),
              ElementGenerator({
                element: "span",
                id: "total",
                child: "-",
                className: "text-gray-700 font-bold text-lg",
              }),
            ],
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className:
          "w-full flex justify-center items-center py-4 bg-white rounded-tl-2xl rounded-tr-2xl shadow-2xl",
        child: ElementGenerator({
          element: "button",
          onclick: () => {
            Routes().navigate("/paymentMethod");
          },
          className:
            " bg-black text-white flex justify-center items-center gap-x-4 rounded-full w-11/12 py-4",
          child: [
            ElementGenerator({
              element: "span",
              className: "self-center text-sm font-semibold",
              child: "Continue to Payment",
              onclick: () => {
                console.log(
                  document.getElementById("checkoutContainer").childNodes
                );
                const tempArr = [];
                document
                  .getElementById("checkoutContainer")
                  .childNodes.forEach((item) => tempArr.push(item.id));
                localStorage.setItem("toPayOrders", JSON.stringify(tempArr));
              },
            }),
            ElementGenerator({
              element: "ion-icon",
              name: "arrow-forward",
              className: "text-lg font-bold",
            }),
          ],
        }),
      }),
    ],
  });
};
export default checkout;
