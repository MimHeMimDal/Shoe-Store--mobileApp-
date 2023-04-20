import ElementGenerator from "@/library/ElementGernerator";
import { Routes } from "@/routes";

const editButton = () => {
  return ElementGenerator({
    element: "button",
    className: "flex",
    onclick: () => {
      Routes().navigate("/shippingAddress");
    },
    child: ElementGenerator({
      element: "ion-icon",
      name: "create",
      className: "text-3xl",
    }),
  });
};

export default editButton;
