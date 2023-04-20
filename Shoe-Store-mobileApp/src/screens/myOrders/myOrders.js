import { Button } from "@/components";
import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";
import { PageNotFound } from "../PageNotFound";
// import "flowbite";

const card = function (obj, deliverd) {
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
                className: "text-sm grow whitespace-nowrap",
                child: `Size = ${obj.size}`,
              }),
              // line break
              ElementGenerator({
                element: "div",
                className: "border-l-2 border-slate-500 h-3",
              }),
              // quantity
              ElementGenerator({
                element: "div",
                className: "text-sm grow whitespace-nowrap",
                child: `Qty = ${obj.quantity}`,
              }),
            ],
          }),
          // delivery status
          ElementGenerator({
            element: "div",
            className: "text-sm rounded-lg bg-[#F3F3F3] w-fit px-2 py-1",
            child: deliverd ? "Completed" : "In Delivery",
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
              // status
              deliverd
                ? ElementGenerator({
                    element: "div",
                    className: "text-white bg-[#0F0F0F] px-4 py-1 rounded-full",
                    child: "Leave Review",
                  })
                : ElementGenerator({
                    element: "div",
                    className: "text-white bg-[#0F0F0F] px-4 py-1 rounded-full",
                    child: "Track Order",
                  }),
            ],
          }),
        ],
      }),
    ],
  });
};

export const myOrders = (id = 1380) => {
  const activeContainer = ElementGenerator({
    element: "div",
    className: "flex flex-col gap-5 h-[70vh] overflow-scroll",
  });
  const completedContainer = ElementGenerator({
    element: "div",
    className: "flex flex-col gap-5 h-[70vh] overflow-scroll",
  });

  axiosInstance.get(`/orders?userID=${id}`).then((res) => {
    res.data.forEach((item) => {
      console.log(item);
      if (item.isActive) {
        activeContainer.append(card(item, false));
      } else {
        completedContainer.append(card(item, true));
      }
    });
    if (activeContainer.childNodes.length === 0) {
      activeContainer.append(PageNotFound({ title: "You have no orders yet" }));
    }
    if (completedContainer.childNodes.length === 0) {
      completedContainer.append(
        PageNotFound({ title: "You have no orders yet" })
      );
    }
  });

  return ElementGenerator({
    element: "div",
    className: "bg-gray-50 w-full h-screen",
    child: [
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
                    child: "My Orders",
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
                  ElementGenerator({
                    element: "button",
                    className: "flex",
                    child: ElementGenerator({
                      element: "ion-icon",
                      name: "ellipsis-horizontal-circle",
                      className: "text-2xl",
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className: "mb-4 border-b border-gray-200",
        child: ElementGenerator({
          element: "ul",
          className:
            "w-full flex justify-evenly -mb-px text-sm font-medium text-center",
          id: "myTab",
          dataTabsToggle: "#myTabContent",
          role: "tablist",
          child: [
            ElementGenerator({
              element: "li",
              className: "",
              role: "presentation",
              child: ElementGenerator({
                element: "button",
                onclick: () => {
                  document.getElementById("active").classList.remove("hidden");
                  document.getElementById("completed").classList.add("hidden");
                  document
                    .getElementById("active-tab")
                    .classList.add("border-black");
                  document
                    .getElementById("completed-tab")
                    .classList.remove("border-black");
                },
                className:
                  "inline-block p-4 border-b-2 border-black rounded-t-lg",
                id: "active-tab",
                dataTabsTarget: "#active",
                type: "button",
                role: "tab",
                ariaControls: "active",
                ariaSelected: "false",
                child: "Active",
              }),
            }),
            ElementGenerator({
              element: "li",
              className: "",
              role: "presentation",
              child: ElementGenerator({
                element: "button",
                onclick: () => {
                  document.getElementById("active").classList.add("hidden");
                  document
                    .getElementById("completed")
                    .classList.remove("hidden");
                  document
                    .getElementById("completed-tab")
                    .classList.add("border-black");
                  document
                    .getElementById("active-tab")
                    .classList.remove("border-black");
                },
                className: "inline-block p-4 border-b-2 rounded-t-lg",
                id: "completed-tab",
                dataTabsTarget: "#completed",
                type: "button",
                role: "tab",
                ariaControls: "completed",
                ariaSelected: "false",
                child: "Completed",
              }),
            }),
          ],
        }),
      }),
      ElementGenerator({
        element: "div",
        id: "myTabContent",
        child: [
          ElementGenerator({
            element: "div",
            className: "p-4 rounded-lg",
            id: "active",
            child: activeContainer,
          }),
          ElementGenerator({
            element: "div",
            className: "hidden p-4 rounded-lg",
            id: "completed",
            child: completedContainer,
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
            // onclick: () => {
            //   Routes().navigate("/my-orders");
            // },
            child: [
              ElementGenerator({
                element: "ion-icon",
                name: "cart",
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
};
