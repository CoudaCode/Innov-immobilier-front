import { fetchSliders } from "./api.js";
const fetchData = async () => {
  try {
    const sliders = await fetchSliders();
    console.log(sliders);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");

  await fetchData();
});
