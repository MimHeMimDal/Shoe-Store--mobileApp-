import ElementGenerator from "@/library/ElementGernerator";

export const Header = function ({ child, className }) {
  return ElementGenerator({
    element: "header",
    className: `flex gap-2 ${className}`,
    child,
  });
};
