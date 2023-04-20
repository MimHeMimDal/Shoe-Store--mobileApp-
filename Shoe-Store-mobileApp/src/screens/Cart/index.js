// import { svgIcons } from "@/data";
import { Button, Counter } from "@/components";
import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

const calcAllPrices = ({ userID, cart, allPriceContainer }) => {
  axiosInstance.get(`/orders?userID=${userID}`).then((res) => {
    let allPrice = 0;
    res.data.forEach((order) => {
      if (order.isActive) {
        allPrice += order.price * order.quantity;
      }
    });
    return (cart.querySelector(
      `#${allPriceContainer}`
    ).textContent = `$${allPrice.toLocaleString()}`);
  });
};

const card = function (obj, hasDelete = true) {
  return ElementGenerator({
    element: "div",
    id: obj.id,
    onclick: (e) => {
      if (e.target.dataset.action === "delete") {
        document.getElementById("background").classList.remove("hidden");
        document.getElementById("drawer").classList.remove("hidden");
        document.getElementById("drawer").classList.add("h-[50vh]");
        document.getElementById("drawer").classList.remove("h-[0px]");
        axiosInstance.get(`/orders/${e.currentTarget.id}`).then((res) => {
          document.getElementById("drawerCard").append(card(res.data, false));
        });
      }
      if (e.target.dataset.action === "count") {
        axiosInstance.patch(`/orders/${e.currentTarget.id}`, {
          quantity: +Array.from(e.target.closest("div").childNodes)[1]
            .textContent,
        });
      }
    },
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
            className: "w-[80px] aspect-square",
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
                className: "font-bold",
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

export const Cart = function (token = 1380) {
  const cardsContainer = ElementGenerator({
    element: "div",
    id: "cardsContainer",
    onclick: () => {
      calcAllPrices({
        userID: token,
        cart,
        allPriceContainer: "totalPriceOfAll",
      });
    },
    className: "h-[80%] overflow-scroll mt-5 pb-20 px-2 flex flex-col gap-6",
  });
  const cart = ElementGenerator({
    element: "div",
    className: "bg-[#F3F3F3] h-screen px-2 py-3",
    child: [
      // header
      ElementGenerator({
        element: "div",
        className: "flex justify-between items-center p-6",
        child: [
          ElementGenerator({
            element: "div",
            className: "flex justify-between items-center w-full",
            child: [
              ElementGenerator({
                element: "div",
                className: "flex justify-center items-center gap-x-5",
                child: [
                  ElementGenerator({
                    element: "img",
                    src: "http://localhost:5173/src/assets/logo/logo.png",
                    className: "w-4",
                  }),
                  ElementGenerator({
                    element: "h1",
                    child: "My Cart",
                    className: "text-2xl font-semibold",
                  }),
                ],
              }),
              ElementGenerator({
                element: "div",
                className: "flex items-center gap-x-4",
                child: [
                  ElementGenerator({
                    element: "button",
                    className: "flex",
                    child: ElementGenerator({
                      element: "ion-icon",
                      name: "search-outline",
                      className: "text-3xl align-text-top",
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      cardsContainer,
      // fixed bottom checkout section
      ElementGenerator({
        element: "div",
        className:
          "flex items-center justify-between w-full h-[90px] gap-6 px-5 pb-4 pt-5 rounded-t-[35px] fixed z-10 bg-white bottom-16 left-0",
        child: [
          // total price of all products
          ElementGenerator({
            element: "div",
            className: "flex flex-col",
            child: [
              ElementGenerator({
                element: "div",
                className: "text-xs",
                child: "Total price",
              }),
              ElementGenerator({
                element: "div",
                id: "totalPriceOfAll",
                className: "font-bold text-2xl",
              }),
            ],
          }),
          // checkout btn
          Button({
            child: "Checkout",
            className:
              "grow w-full h-full rounded-full bg-black text-white text-xl shadow-xl",
            onclick: () => {
              Routes().navigate("/checkout");
            },
          }),
        ],
      }),
      // fixed bottom nav
      ElementGenerator({
        element: "div",
        id: "pageBtns",
        className:
          "flex justify-center justify-between w-full h-[70px] px-10 fixed z-20 bg-white bottom-0 left-0",
        child: [
          // home
          Button({
            onclick: () => {
              Routes().navigate("/home");
            },
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "home-outline",
                className: "text-3xl",
              }),
              ElementGenerator({ element: "div", child: "Home" }),
            ],
          }),
          // Cart
          Button({
            // onclick: () => {
            //   Routes().navigate("/my-cart");
            // },
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "bag",
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
      // drawer
      ElementGenerator({
        element: "div",
        id: "drawer",
        onclick: () => {
          calcAllPrices({
            userID: token,
            cart,
            allPriceContainer: "totalPriceOfAll",
          });
        },
        child: [
          ElementGenerator({
            // title
            element: "div",
            className: "font-bold text-2xl text-center py-5",
            child: "Remove From Cart?",
          }),
          // card container
          ElementGenerator({
            element: "div",
            onclick: (e) => {
              // console.log(e.currentTarget.childNodes[0].id);
              document
                .getElementById("cardsContainer")
                .childNodes.forEach((item) => {
                  if (item.id === e.currentTarget.childNodes[0].id) {
                    axiosInstance.get(`/orders/${item.id}`).then((res) => {
                      // console.log(res.data);
                      // console.log(item);
                      document.getElementById(
                        `${res.data.productID}Number`
                      ).textContent = res.data.quantity;
                      document.getElementById(
                        `${res.data.productID}`
                      ).textContent = `$${(
                        res.data.quantity * res.data.price
                      ).toLocaleString()}`;
                    });
                  }
                });
            },
            className:
              "border-t border-b py-10 w-full grow [&_>_*]:w-full [&_>_*]:grow",
            id: "drawerCard",
          }),
          // buttons
          ElementGenerator({
            element: "div",
            className: "h-[30%] w-full gap-2 flex items-center px-5",
            child: [
              Button({
                child: "Cancel",
                onclick: () => {
                  document.getElementById("background").classList.add("hidden");
                  document
                    .getElementById("drawer")
                    .classList.remove("h-[50vh]");
                  document.getElementById("drawer").classList.add("h-[0px]");
                  setTimeout(() => {
                    document.getElementById("drawerCard").innerHTML = "";
                    document.getElementById("drawer").classList.add("hidden");
                  }, 100);
                },
                className: "px-5 w-1/2 py-4 rounded-full bg-[#E7E7E7]",
              }),
              Button({
                onclick: () => {
                  cardsContainer.innerHTML = "";
                  axiosInstance
                    .delete(
                      `/orders/${
                        document.getElementById("drawerCard").childNodes[0].id
                      }`
                    )
                    .then(() => {
                      document
                        .getElementById("background")
                        .classList.add("hidden");
                      document
                        .getElementById("drawer")
                        .classList.remove("h-[50vh]");
                      document
                        .getElementById("drawer")
                        .classList.add("h-[0px]");
                      setTimeout(() => {
                        document.getElementById("drawerCard").innerHTML = "";
                        document
                          .getElementById("drawer")
                          .classList.add("hidden");
                      }, 100);
                      axiosInstance
                        .get(`/orders?userID=${token}`)
                        .then((res) => {
                          let allPrice = 0;
                          res.data.forEach((order) => {
                            if (order.isActive) {
                              cardsContainer.append(card(order));
                              allPrice += order.price * order.quantity;
                            }
                          });
                          cart.querySelector(
                            `#totalPriceOfAll`
                          ).textContent = `$${allPrice.toLocaleString()}`;
                        });
                    });
                },
                child: "Yes, Remove",
                className: "px-5 w-1/2 py-4 rounded-full text-white bg-black",
              }),
            ],
          }),
        ],
        className:
          "flex flex-col items-center justify-between w-full h-[0px] py-5 px-3 duration-300 fixed bottom-0 left-0 z-30 bg-[#FBFBFB] rounded-t-[50px] hidden",
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
          "h-screen w-screen bg-black bg-opacity-40 absolute top-0 left-0 z-20 hidden",
      }),
    ],
  });

  axiosInstance.get(`/orders?userID=${token}`).then((res) => {
    let allPrice = 0;
    res.data.forEach((order) => {
      if (order.isActive) {
        cardsContainer.append(card(order));
        allPrice += order.price * order.quantity;
      }
    });
    cart.querySelector(
      `#totalPriceOfAll`
    ).textContent = `$${allPrice.toLocaleString()}`;
  });

  return cart;
};
