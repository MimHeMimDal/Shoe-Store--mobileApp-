import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

const paymentModal = () => {
  return ElementGenerator({
    element: "div",
    className:
      "absolute inset-0 bg-gray-300 bg-opacity-80 flex items-center justify-center z-10",
    child: [
      ElementGenerator({
        element: "div",
        className:
          "rounded-3xl pt-4 flex flex-col justify-center items-center w-3/4 bg-white relative",
        child: [
          ElementGenerator({
            element: "img",
            src: "http://localhost:5173/src/assets/images/payment.png",
            className: "w-44",
          }),
          ElementGenerator({
            element: "h1",
            child: "Order Successful!",
            className: "text-xl font-semibold mb-5",
          }),
          ElementGenerator({
            element: "p",
            child: "You have successfully made order",
            className: "text-sm font-light mb-5",
          }),
          ElementGenerator({
            element: "div",
            onclick: () => {
              Routes().navigate("/my-orders");
            },
            className: "px-4 mb-5",
            child: [
              ElementGenerator({
                element: "button",
                className: "bg-black rounded-full w-full px-16 py-4",
                child: [
                  ElementGenerator({
                    element: "div",
                    className: "flex items-center text-white justify-center",
                    child: [
                      ElementGenerator({
                        element: "p",
                        className: "self-center text-md font-medium",
                        child: "View Order",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          ElementGenerator({
            element: "div",
            onclick: () => {
              Routes().navigate("/checkout");
            },
            className: "px-4 mb-5",
            child: [
              ElementGenerator({
                element: "button",
                className: "bg-gray-100 rounded-full w-full px-14 py-4",
                child: [
                  ElementGenerator({
                    element: "div",
                    className:
                      "flex items-center text-slate-800 justify-center",
                    child: [
                      ElementGenerator({
                        element: "p",
                        className: "self-center text-md font-medium",
                        child: "View E-Receipt",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default paymentModal;
