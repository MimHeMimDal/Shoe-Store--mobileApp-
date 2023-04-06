import ElementGenerator from "@/library/ElementGernerator";

export const TextField = function ({
  id,
  parentClass,
  labelChild,
  // name,
  ...rest
}) {
  return ElementGenerator({
    element: "div",
    className: `flex flex-col gap-1 ${parentClass}`,
    child: [
      ElementGenerator({
        element: "label",
        className: "flex items-center",
        for: id,
        name: id,
        child: labelChild,
      }),
      ElementGenerator({
        element: "input",
        className: "w-full rounded border-2",
        id,
        name: id,
        ...rest,
      }),
      ElementGenerator({
        element: "p",
        className: "w-full h-4 text-red-400",
      }),
    ],
  });
};
