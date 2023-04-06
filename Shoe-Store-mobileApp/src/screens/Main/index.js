import { Button, Card, Header, IsLoading } from "@/components";
import { data, GetFromLocal, SetToLocal } from "@/data";
import ElementGenerator from "@/library/ElementGernerator";
import { GetData } from "@/library/GetData";
import { CloseSearch, HandleLastSearch } from "@/library/HandleLastSearch";
import { Logout } from "@/library/Logout";
import { debounce } from "lodash";

export const Main = function () {
  return ElementGenerator({
    element: "div",
    className: "h-screen",
    child: [
      Header({
        className: "flex items-center justify-between px-10 py-5",
        child: [
          ElementGenerator({
            element: "div",
            className: "relative",
            child: [
              ElementGenerator({
                element: "input",
                id: "lastSearchInput",
                placeholder: "Enter your city...",
                className: "px-2 py-1 rounded",
                onkeyup: debounce((e) => {
                  document.getElementById("cardsContainer").innerHTML = "";
                  if (e.target.value.trim() !== "") {
                    document
                      .getElementById("cardsContainer")
                      .append(IsLoading());
                    GetData(data.weatherApiUrl + `&q=${e.target.value}`).then(
                      (data) => {
                        document.getElementById("isLoading").remove();
                        if (!data.error) {
                          document
                            .getElementById("cardsContainer")
                            .append(Card(data));
                          const tempArr = GetFromLocal();
                          tempArr.push(data.location.name);
                          SetToLocal(tempArr);
                          e.target.value = "";
                          document
                            .getElementById("lastSearch")
                            .classList.remove("h-48");
                          document
                            .getElementById("lastSearch")
                            .classList.add("h-0");
                          document.getElementById("lastSearch").innerHTML = "";
                        } else {
                          document
                            .getElementById("cardsContainer")
                            .append(data.error.message);
                        }
                      }
                    );
                  }
                }, 800),
                onfocus: (e) => {
                  // console.log(e.target);
                  document.getElementById("lastSearch").classList.remove("h-0");
                  document.getElementById("lastSearch").classList.add("h-48");
                  document
                    .getElementById("lastSearch")
                    .append(HandleLastSearch());
                  document.body.addEventListener("click", CloseSearch);
                },
                onchange: (e) => {
                  console.log("hello");
                  const cardContainer =
                    document.getElementById("cardsContainer");
                  cardContainer.innerHTML = "";
                  cardContainer.append(IsLoading());
                  GetData(data.weatherApiUrl + `&q=${e.target.value}`).then(
                    (data) => {
                      document.getElementById("isLoading").remove();
                      cardContainer.append(Card(data));
                      const tempArr = GetFromLocal();
                      tempArr.push(data.location.name);
                      SetToLocal(tempArr);
                      e.target.value = "";
                      document
                        .getElementById("lastSearch")
                        .classList.remove("h-48");
                      document
                        .getElementById("lastSearch")
                        .classList.add("h-0");
                      document.getElementById("lastSearch").innerHTML = "";
                    }
                  );
                },
              }),
              ElementGenerator({
                element: "div",
                id: "lastSearch",
                className:
                  "absolute top-9 left-0 duration-300 h-0 w-full bg-[#144272] text-white",
                // child: HandleLastSearch(),
              }),
            ],
          }),
          ElementGenerator({
            element: "div",
            className: "h-16 w-16 flex items-center justify-center",
            child: ElementGenerator({
              element: "img",
              className: "h-full w-full flex items-center justify-center",
              src: "./src/assets/logo/Circle-icons-weather.svg.png",
            }),
          }),
          Button({
            variant: "normal",
            child: "Logout",
            onclick: Logout,
            className: "h-10",
          }),
        ],
      }),
      ElementGenerator({
        element: "main",
        id: "cardsContainer",
        className: "flex justify-center items-center h-2/3",
        // child: IsLoading(),
      }),
    ],
  });
};
