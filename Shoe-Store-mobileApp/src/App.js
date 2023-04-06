import ElementGenerator from "@/library/ElementGernerator";
function App() {
  return ElementGenerator({
    element: "div",
    id: "containaer",
    className: "h-full",
  });
}

export default App;
