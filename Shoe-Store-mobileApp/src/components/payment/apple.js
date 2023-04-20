import ElementGenerator from "@/library/ElementGernerator";

const apple = () => {
  return ElementGenerator({
    element: "ion-icon",
    name: "logo-apple",
    className: "text-3xl",
  });
};

export default apple;
