import { Card } from "@/components";
import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const Wishlist = function (token = 1380) {
  const container = ElementGenerator({
    element: "div",
    className: "h-full px-5 py-3 grid grid-cols-2 gap-5",
  });
  axiosInstance.get(`/users/${token}`).then((response) => {
    console.log(response.data.wishlist);
    response.data.wishlist.forEach((item) => {
      axiosInstance.get(`/products/${item}`).then((res) => {
        container.append(Card(res.data));
      });
    });
  });
  return ElementGenerator({
    element: "div",
    className: "h-screen",
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
                child: "My Wishlist",
                className: "text-2xl font-bold",
              }),
            ],
          }),
          ElementGenerator({
            element: "ion-icon",
            name: "search",
            className: "text-2xl",
          }),
        ],
      }),
      container,
    ],
  });
};
