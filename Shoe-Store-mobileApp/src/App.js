import ElementGenerator from "@/library/ElementGernerator";
// import { Main } from "./screens/Main";
// import { LoginPage } from "./screens/Auth";
// import { PageNotFound } from "./screens/PageNotFound";
// import { LandingPage } from "./screens/LandingPage";

// import { Slider } from "./components";
// import { IsLoading } from "./components";
function App() {
  return ElementGenerator({
    element: "div",
    id: "container",
    className: "h-screen overflow-hidden scroll-smooth",
    // child: Main(),
    // child: IsLoading(),
    // child: [LandingPage(), Slider()],
    // child: LoginPage(),
    // child: PageNotFound({
    //   title: "Error 404:",
    //   msg: `Page Not Found`,
    // }),
  });
}

export default App;
