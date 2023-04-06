export const GetData = async function (url) {
  try {
    const req = await fetch(url);

    if (req.status === 200) {
      const data = await req.json();
      return data;
    } else {
      throw new Error(`Error: ${req.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};
