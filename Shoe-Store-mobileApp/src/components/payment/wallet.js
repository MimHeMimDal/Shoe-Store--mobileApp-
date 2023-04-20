import ElementGenerator from "@/library/ElementGernerator";

const wallet = () => {
  return ElementGenerator({
    element: "ion-icon",
    name: "wallet",
    className: "text-2xl",
  });
};

export default wallet;
