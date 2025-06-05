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

  slider.innerHTML = images.map((image, index) => {
    return `<div class="item" data-index="${index}" key="${index}">
                    <div
                      class="hover overflow-hidden relative text-light text-center"
                    >
                      <div class="overflow-hidden">
                        <img
                          src=${image}
                          class="hover-scale-1-1 w-100"
                          alt=""
                        />
                      </div>
                      <div
                        class="abs w-100 px-4 hover-op-1 z-4 hover-mt-40 abs-centered"
                      >
                        <a
                          class="btn-main btn-line fx-slide"
                          href="https://africabooking.app/"
                          ><span> Details</span></a
                        >
                      </div>
                      <div
                        class="abs bg-blur z-2 top-0 w-100 h-100 hover-op-1"
                      ></div>
                      <div
                        class="abs z-2 bottom-0 p-30 w-100 text-center hover-op-0"
                      >
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <!--  <h3 class="mb-0">KIA ORA VERT</h3> -->
                          <div></div>
                        </div>
                      </div>
                      <div
                        class="gradient-edge-bottom abs w-100 h-40 bottom-0"
                      ></div>
                    </div>
                  </div>`;
  });
});
