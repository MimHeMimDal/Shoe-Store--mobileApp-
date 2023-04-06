import ElementGenerator from "@/library/ElementGernerator";

export const Form = function ({ id, child, ...rest }) {
  return ElementGenerator({ element: "form", id, child, ...rest });
};
