// import ElementGenerator from "./library/ElementGernerator";
// import Auth from "./screens/Auth";
// import { Routes } from "@/routes";

import ElementGenerator from "@/library/ElementGernerator";
function App() {
  return ElementGenerator({
    element: "div",
    id: "containaer",
    className: "h-full",
  });
}

export default App;
