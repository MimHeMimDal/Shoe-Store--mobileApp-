// import { svgIcons } from "@/data";
import { Button, Counter } from "@/components";
import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const Cart = function (token = 1380) {
  const cardsContainer = ElementGenerator({
    element: "div",
    id: "cardsContainer",
    className: "h-[70%] mt-10 flex flex-col gap-6",
  });
  const cart = ElementGenerator({
    element: "div",
    className: "bg-[#F3F3F3] h-screen px-5 py-10",
    child: [
      // header
      ElementGenerator({
        element: "div",
        className: "flex items-center justify-between",
        child: [
          // left section
          ElementGenerator({
            element: "div",
            className: "flex items-center gap-5",
            child: [
              // logo
              ElementGenerator({
                element: "img",
                src: "http://localhost:5173/src/assets/logo/logo.png",
                className: "w-5",
              }),
              ElementGenerator({
                element: "div",
                className: "font-semibold text-3xl",
                child: "My Cart",
              }),
            ],
          }),
          // right section
          ElementGenerator({
            element: "img",
            className: "w-8",
            src: "http://localhost:5173/src/assets/icons/search.svg",
          }),
        ],
      }),
      cardsContainer,
      // fixed bottom nav
      ElementGenerator({
        element: "div",
        id: "pageBtns",
        className:
          "flex justify-center justify-between w-full h-[70px] px-10 fixed z-10 bg-white bottom-0 left-0",
        child: [
          Button({
            child: "Home",
            onclick: () => {
              Routes().navigate("/home");
            },
          }),
          Button({
            child: "Cart",
            // onclick: (e) => {
            //   Routes().navigate("/my-cart");
            // },
          }),
          Button({ child: "order" }),
          Button({ child: "wallet" }),
          Button({ child: "profile" }),
        ],
      }),
      // drawer
      ElementGenerator({
        element: "div",
        id: "drawer",
        onclick: (e) => {
          console.log(e.currentTarget.childNodes[0].id);
          document
            .getElementById("cardsContainer")
            .childNodes.forEach((item) => {
              if (item.id === e.currentTarget.childNodes[0].id) {
                axiosInstance.get(`/orders/${item.id}`).then((res) => {
                  console.log(res.data);
                  item.querySelector("#quantityNumber").textContent =
                    res.data.quantity;
                });
              }
            });
        },
        child: [
          ElementGenerator({
            element: "div",
            className: "font-bold text-2xl text-center py-5",
            child: "Remove From Cart?",
          }),
          ElementGenerator({
            element: "div",
            className: "border-t border-b py-10 grow",
            id: "drawerCard",
          }),
          ElementGenerator({ element: "div" }),
        ],
        className:
          "flex flex-col justify-center justify-between w-full h-[0px] py-5 px-6 duration-300 absolute bottom-0 left-0 z-30 bg-white rounded-t-[70px] hidden",
      }),
      // drawer background
      ElementGenerator({
        element: "div",
        id: "background",
        onclick: () => {
          document.getElementById("background").classList.add("hidden");
          document.getElementById("drawer").classList.remove("h-[50vh]");
          document.getElementById("drawer").classList.add("h-[0px]");
          setTimeout(() => {
            document.getElementById("drawerCard").innerHTML = "";
            document.getElementById("drawer").classList.add("hidden");
          }, 100);
        },
        className:
          "h-screen w-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20 hidden",
      }),
    ],
  });
  const card = function (obj, hasDelete = true) {
    return ElementGenerator({
      element: "div",
      id: obj.id,
      onclick: (e) => {
        if (e.target.dataset.action === "delete") {
          // console.log(e.target.dataset.action);
          // console.log(e.currentTarget.id);
          document.getElementById("background").classList.remove("hidden");
          document.getElementById("drawer").classList.remove("hidden");
          document.getElementById("drawer").classList.add("h-[50vh]");
          document.getElementById("drawer").classList.remove("h-[0px]");
          // const clone = e.currentTarget.cloneNode(true);
          // document.getElementById("drawer").append(clone);
          // console.log(clone);
          axiosInstance.get(`/orders/${e.currentTarget.id}`).then((res) => {
            document.getElementById("drawerCard").append(card(res.data, false));
          });
        }
        if (e.target.dataset.action === "count") {
          // axiosInstance
          //   .get(`/orders?userID=${token}`)
          //   .then((res) => console.log(res.data));
          axiosInstance.patch(`/orders/${e.currentTarget.id}`, {
            quantity: +Array.from(e.target.closest("div").childNodes)[1]
              .textContent,
          });

          // console.log(
          //   Array.from(e.target.closest("div").childNodes)[1].textContent
          // );
        }
      },
      className: "flex gap-4 rounded-[35px] bg-white px-5 py-4",
      child: [
        // picture
        ElementGenerator({
          element: "div",
          className:
            "flex items-center justify-center rounded-3xl bg-[#F3F3F3]",
          child: [ElementGenerator({ element: "img", src: obj.image })],
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
                // trash and edit
                hasDelete
                  ? ElementGenerator({
                      element: "img",
                      data: { name: "action", value: "delete" },
                      className: "w-8",
                      src: "http://localhost:5173/src/assets/icons/trash.svg",
                    })
                  : "",
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
                  child: `$${(obj.price * obj.quantity).toLocaleString()}`,
                  id: obj.productID,
                }),
                // counter
                Counter({
                  totalPriceId: obj.productID,
                  firstNumber: obj.quantity,
                  price: obj.price,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };

  axiosInstance.get(`/orders?userID=${token}`).then((res) => {
    res.data.forEach((order) => {
      if (order.isActive) {
        cardsContainer.append(card(order));
        // axiosInstance.get(`/products/${order.productID}`).then((res) => {
        //   cardsContainer.append(card(res.data));
        // });
      }
    });
  });

  return cart;
};
