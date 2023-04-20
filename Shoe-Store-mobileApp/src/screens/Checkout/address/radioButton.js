import ElementGenerator from "@/library/ElementGernerator";

const radioButton = (checked) => {
  return ElementGenerator({
    element: "input",
    type: "radio",
    id: "black-radio",
    value: "",
    name: "colored-radio",
    checked,
    className:
      "w-4 h-4 text-black bg-white border-2 border-black focus:ring-black focus:ring-2",
  });
};

export default radioButton;
