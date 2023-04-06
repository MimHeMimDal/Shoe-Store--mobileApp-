function ElementGenerator({ element, data, child, ...rest }) {
  const elem = document.createElement(element);
  for (const key in rest) {
    elem[key] = rest[key];
  }
  if (data) elem.dataset[data.name] = data.value;

  Array.isArray(child) ? elem.append(...child) : child && elem.append(child);

  return elem;
}

export default ElementGenerator;
