import { Card, IsLoading } from "@/components";
import { data, GetFromLocal, SetToLocal } from "@/data";
import ElementGenerator from "./ElementGernerator";
import { GetData } from "./GetData";

export const HandleLastSearch = function (e) {
  //   console.log(e.target);
  const ul = ElementGenerator({
    element: "ul",
    className: "h-full text-center flex flex-col rounded",
    child: ElementGenerator({
      element: "li",
      child: "Delete History",
      className:
        "hover:bg-slate-400 bg-[#2C74B3] text-red-600 py-1 mt-auto rounded",
      onclick: () => {
        // console.log("test");
        document.getElementById("lastSearchInput").value = "";
        SetToLocal([]);
      },
    }),
  });
  GetFromLocal().map((item) =>
    ul.prepend(
      ElementGenerator({
        element: "li",
        className:
          "h-[14%] py-1 hover:bg-slate-400 rounded flex items-center justify-center",
        onclick: (e) => {
          document.getElementById("lastSearchInput").value =
            e.target.textContent;
          const cardContainer = document.getElementById("cardsContainer");
          cardContainer.innerHTML = "";
          cardContainer.append(IsLoading());
          GetData(data.weatherApiUrl + `&q=${e.target.textContent}`).then(
            (data) => {
              document.getElementById("isLoading").remove();
              cardContainer.append(Card(data));
              const tempArr = GetFromLocal();
              tempArr.push(data.location.name);
              SetToLocal(tempArr);
              document.getElementById("lastSearchInput").value = "";
              document.getElementById("lastSearch").classList.remove("h-48");
              document.getElementById("lastSearch").classList.add("h-0");
              document.getElementById("lastSearch").innerHTML = "";
            }
          );
        },
        child: item,
      })
    )
  );
  return ul;
};

export const CloseSearch = function (e) {
  // console.log(e.target);
  if (e.target.tagName !== "INPUT") {
    document.getElementById("lastSearch").classList.remove("h-48");
    document.getElementById("lastSearch").classList.add("h-0");
    document.getElementById("lastSearch").innerHTML = "";
    document.body.removeEventListener("click", CloseSearch);
  }
};
