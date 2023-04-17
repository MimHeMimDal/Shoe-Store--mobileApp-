import ElementGenerator from "@/library/ElementGernerator";

const btnVariant = {
  normal: "bg-[#205295] rounded text-white py-1 px-5 hover:bg-[#005270]",
};

export const Button = function ({ dataSet, className, variant, ...rest }) {
  const btn = ElementGenerator({
    element: "button",
    className: `${variant ? btnVariant[variant] : ""} ${className}`,
    ...rest,
  });
  if (dataSet) {
    for (const key in dataSet) {
      btn.dataset[key] = dataSet[key];
    }
  }
  return btn;
};
