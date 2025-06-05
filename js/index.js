let slider = document.getElementById("slider-owners");

import { fetchSliders } from "./api.js";
const fetchData = async () => {
  try {
    const sliders = await fetchSliders();
    return sliders;
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");

  const data = (await fetchData()).data;
  const images = data.map(
    (item) => "http://localhost:8000/storage/" + item.image
  );
  console.log(images);

  slider.innerHTML = images.map((image, index) => {});
});
