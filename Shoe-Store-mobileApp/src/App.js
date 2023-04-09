import ElementGenerator from "@/library/ElementGernerator";
import { LoginPage } from "./screens/Auth";
// import { LandingPage } from "./screens/LandingPage";

// import { Slider } from "./components";
// import { IsLoading } from "./components";
function App() {
  return ElementGenerator({
    element: "div",
    id: "container",
    className: "h-full overflow-hidden scroll-smooth",
    // child: IsLoading(),
    // child: [LandingPage(), Slider()],
    child: LoginPage(),
  });
}

export default App;
