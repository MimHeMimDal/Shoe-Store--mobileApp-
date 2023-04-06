export const PostData = async function ({ obj, endPoint }) {
  await fetch(`http://localhost:3000/${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
};

// await fetch("http://localhost:3000/all")
//   .then((response) => response.json())
//   .then((data) => RenderTable(data));
