import { Button, Counter } from "@/components";
import { svgIcons } from "@/data";
import { axiosInstance } from "@/functions/axiosinstance";
import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

export const Product = function (id) {
  const product = ElementGenerator({
    element: "div",
    id,
    className: "[&_>_*]:px-6 h-screen overflow-scroll",
  });

  const checkmark = ElementGenerator({
    element: "ion-icon",
    name: "checkmark",
  });
  axiosInstance.get(`/products/${id}/`).then((res) => {
    const color = ElementGenerator({
      element: "div",
      id: "color",
      onclick: (e) => {
        Array.from(e.currentTarget.childNodes).forEach((node) => {
          if (e.target === node) {
            node.append(checkmark);
            node.dataset.active = "true";
          } else {
            node.dataset.active = "false";
          }
        });
      },
      className: "flex gap-2",
    });

    const wish = ElementGenerator({
      element: "ion-icon",
      className: "text-[30px]",
    });
    axiosInstance.get("/users/1380").then((res) => {
      console.log(res.data.wishlist.find((item) => item === +id));
      console.log(wish);
      if (res.data.wishlist.find((item) => item === +id)) {
        wish.name = "heart";
      } else {
        wish.name = "heart-outline";
      }
    });

    res.data.color.forEach((item) => {
      color.append(
        Button({
          dataSet: { name: item.name },
          data: { name: "hex", value: item.hex },
          className: `bg-[#${item.hex}] border w-[35px] aspect-square rounded-full`,
        })
      );
    });

    product.append(
      // back arrow
      ElementGenerator({
        element: "div",
        className: "bg-[#F3F3F3] pt-6",
        innerHTML: svgIcons.leftArrow,
        onclick: () => {
          Routes().navigate("/home");
          // Routes().navigate("/back");
        },
      }),
      // main picture
      ElementGenerator({
        element: "div",
        className: "flex items-center justify-center bg-[#F3F3F3]",
        child: ElementGenerator({
          element: "img",
          id: "main-picture",
          className: "w-full aspect-square object-cover",
          src: res.data.images_urls[0],
        }),
      }),
      // header
      ElementGenerator({
        element: "div",
        className: "flex flex-col gap-4 py-5 border-b",
        child: [
          ElementGenerator({
            element: "div",
            className: "flex items-center justify-between",
            child: [
              // title
              ElementGenerator({
                element: "div",
                className: "font-bold text-3xl",
                child: res.data.shortName,
              }),
              // Wishlist
              wish,
            ],
          }),
          // status
          ElementGenerator({
            element: "div",
            className: "flex items-center gap-3",
            child: [
              // sold
              ElementGenerator({
                element: "div",
                className: "bg-[#ECECED] text-sm rounded-lg px-3 py-2",
                child: `${res.data.sold.toLocaleString()} sold`,
              }),
              // rating
              ElementGenerator({
                element: "div",
                className: "flex gap-2",
                child: [
                  ElementGenerator({
                    element: "div",
                    className: "",
                    child: "star",
                  }),
                  ElementGenerator({
                    element: "div",
                    className: "",
                    child: res.data.rating,
                  }),
                  ElementGenerator({
                    element: "div",
                    className: "",
                    child: `(${res.data.reviews.toLocaleString()} reviews)`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Description
      ElementGenerator({
        element: "div",
        className: "py-3 flex flex-col gap-2",
        child: [
          ElementGenerator({
            element: "h3",
            className: "font-bold text-xl",
            child: "Description",
          }),
          // Description text
          ElementGenerator({
            element: "p",
            onclick: (e) => {
              e.target.classList.toggle("line-clamp-2");
            },
            className: "line-clamp-2 duration-500",
            child: res.data.description,
          }),
        ],
      }),
      // Size and Color
      ElementGenerator({
        element: "div",
        className: "flex items-center gap-10",
        child: [
          // Size
          ElementGenerator({
            element: "div",
            className: "flex flex-col gap-2",
            child: [
              ElementGenerator({
                element: "h3",
                className: "font-bold text-lg",
                child: "Size",
              }),
              ElementGenerator({
                element: "div",
                id: "size",
                onclick: (e) => {
                  Array.from(e.currentTarget.childNodes).forEach((node) => {
                    if (e.target === node) {
                      node.classList.add("text-white");
                      node.classList.add("bg-black");
                      node.dataset.active = "true";
                    } else {
                      node.classList.remove("text-white");
                      node.classList.remove("bg-black");
                      node.dataset.active = "false";
                    }
                  });
                },
                className: "flex gap-2",
                child: [
                  ...res.data.size.map((item) =>
                    Button({
                      child: item,
                      className:
                        "w-[35px] aspect-square rounded-full border border-black",
                    })
                  ),
                ],
              }),
            ],
          }),
          // Color
          ElementGenerator({
            element: "div",
            className: "flex flex-col gap-2",
            child: [
              ElementGenerator({
                element: "h3",
                className: "font-bold text-lg",
                child: "Color",
              }),
              color,
              // ElementGenerator({
              //   element: "div",
              //   id: "color",
              //   className: "flex gap-2",
              //   // child: [
              //   //   ...res.data.color.map((item) =>
              //   //     Button({
              //   //       className: `bg-[${item}] border w-[35px] aspect-square rounded-full`,
              //   //       // className: `bg-${item}-700 w-[35px] aspect-square rounded-full`,
              //   //     })
              //   //   ),
              //   // ],
              // }),
            ],
          }),
        ],
      }),
      // Quantity
      ElementGenerator({
        element: "div",
        className: "flex items-center gap-5 py-5  border-b",
        child: [
          ElementGenerator({
            element: "h3",
            className: "font-bold text-lg",
            child: "Quantinty",
          }),
          // Quantity Numbers
          // ElementGenerator({
          //   element: "div",
          //   className: "flex gap-3 bg-[#ECECED] px-4 py-2 rounded-full",
          //   child: [
          //     Button({
          //       child: "-",
          //       className: "font-bold ml-2",
          //       onclick: (e) => {
          //         if (e.target.nextElementSibling.textContent > 1) {
          //           e.target.nextElementSibling.textContent--;
          //           document.getElementById("totalPrice").textContent = `$${(
          //             res.data.price *
          //             document.getElementById("quantityNumber").textContent
          //           ).toLocaleString()}`;
          //         }
          //       },
          //     }),
          //     ElementGenerator({
          //       element: "span",
          //       id: "quantityNumber",
          //       child: "1",
          //       className: "font-bold ml-2",
          //     }),
          //     Button({
          //       child: "+",
          //       className: "font-bold ml-2",
          //       onclick: (e) => {
          //         if (e.target.previousElementSibling.textContent > 0) {
          //           e.target.previousElementSibling.textContent++;
          //           document.getElementById("totalPrice").textContent = `$${(
          //             res.data.price *
          //             document.getElementById("quantityNumber").textContent
          //           ).toLocaleString()}`;
          //         }
          //       },
          //     }),
          //   ],
          // }),
          Counter({ price: res.data.price, totalPriceId: "totalPrice" }),
        ],
      }),
      // Total Price and Add to cart
      ElementGenerator({
        element: "div",
        className: "flex gap-5 items-center",
        child: [
          // Total price Div
          ElementGenerator({
            element: "div",
            className: "flex flex-col gap-1 mt-5",
            child: [
              ElementGenerator({
                element: "h3",
                className: "text-xs",
                child: "Total price",
              }),
              // total price number
              ElementGenerator({
                element: "div",
                id: "totalPrice",
                className: "font-bold text-2xl",
                child: `$${res.data.price.toLocaleString()}`,
              }),
            ],
          }),
          // Add to cart
          Button({
            child: "Add to Cart",
            onclick: () => {
              const order = {
                id: crypto.randomUUID(),
                price: res.data.price,
                productID: res.data.id,
                shortName: res.data.shortName,
                userID: 1380,
                image: res.data.images_urls[0],
                isActive: true,
                quantity:
                  +document.getElementById("totalPriceNumber").textContent,
              };
              // size
              document.getElementById("size").childNodes.forEach((item) => {
                if (item.dataset.active === "true") {
                  order.size = +item.textContent;
                }
              });
              // color
              document.getElementById("color").childNodes.forEach((item) => {
                if (item.dataset.active === "true") {
                  order.color = {
                    name: item.dataset.name,
                    hex: item.dataset.hex,
                  };
                }
              });
              console.log(order);
              axiosInstance.post("/orders", order).then(() => {
                Routes().navigate("/my-cart");
              });
            },
            className: "grow bg-black text-white h-14 rounded-full mt-auto",
          }),
        ],
      })
    );
  });
  return product;
};
