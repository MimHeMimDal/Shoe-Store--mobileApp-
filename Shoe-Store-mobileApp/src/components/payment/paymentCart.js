import ElementGenerator from "@/library/ElementGernerator";
import radioButton from "@/screens/Checkout/address/radioButton";

const paymentCart = (
  paymentLogo,
  paymentName,
  paymentPrice,
  paymentDefault
) => {
  return ElementGenerator({
    element: "div",
    className:
      "flex items-center justify-between px-4 py-6 rounded-xl mb-4 bg-white mx-4",
    child: [
      ElementGenerator({
        element: "div",
        className: "flex items-center gap-3",
        child: [
          paymentLogo,
          ElementGenerator({
            element: "span",
            child: paymentName,
            className: "font-bold",
          }),
        ],
      }),
      ElementGenerator({
        element: "div",
        className: "flex items-center gap-3",
        child: [
          ElementGenerator({
            element: "span",
            className: "font-medium text-sm",
            child: paymentPrice,
          }),
          radioButton(paymentDefault),
        ],
      }),
    ],
  });
};

export default paymentCart;
