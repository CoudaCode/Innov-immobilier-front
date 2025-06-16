import {
  fetchBannerIndex,
  fetchFeaturesData,
  fetchSlidersData,
} from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Bannière
    const banners = await fetchBannerIndex();
    let imagesBaner = banners.map(
      (item) => "http://localhost:8000/storage/" + item
    );

    while (imagesBaner.length > 0 && imagesBaner.length < 3) {
      imagesBaner = imagesBaner.concat(imagesBaner);
    }
    imagesBaner = imagesBaner.slice(0, 3);
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    if (swiperWrapper && imagesBaner.length > 0) {
      const slidesHTML = imagesBaner
        .map(
          (imgUrl) => `
            <div class="swiper-slide">
              <div class="swiper-inner" style="background-image:url('${imgUrl}');">
                <div class="sw-overlay op-4"></div>
              </div>
            </div>
          `
        )
        .join("");
      swiperWrapper.innerHTML = slidesHTML;

      if (window.mySwiperInstance) {
        window.mySwiperInstance.destroy();
      }

      window.mySwiperInstance = new Swiper(".swiper", {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        effect: "slide",
        slidesPerView: 1,
        loop: true,
        speed: 1200,
        mousewheel: false,
        watchSlidesProgress: true,
        parallax: true,
        spaceBetween: -1,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    // Feature
    const feacturesData = await fetchFeaturesData();

    const featuresContainer = document.getElementById("features-container");

    if (
      featuresContainer &&
      Array.isArray(feacturesData) &&
      feacturesData.length > 0
    ) {
      featuresContainer.innerHTML = "";

      feacturesData.forEach((feature) => {
        const card = `
      <div class="col-lg-4 col-md-6">
        <div class="overflow-hidden relative rounded-1 text-light text-center wow zoomIn" data-wow-delay=".0s">
          <div class="wow scaleIn overflow-hidden">
            <img src="${feature.image}" class="w-100" alt="${feature.title}" />
          </div>
          <div class="abs z-2 bottom-0 p-30 w-100 text-center hover-op-0">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="mb-0">${feature.title}</h3>
            </div>
          </div>
          <div class="gradient-edge-bottom abs w-100 h-40 bottom-0"></div>
        </div>
      </div>
    `;
        featuresContainer.insertAdjacentHTML("beforeend", card);
      });
    }

    // Sliders
    const slidersData = await fetchSlidersData();
    const slidersContainer = document.getElementById("room-carousel");

    if (
      slidersContainer &&
      Array.isArray(slidersData) &&
      slidersData.length > 0
    ) {
      const slidesHTML = slidersData
        .map(
          (imgUrl) => `
        <div class="item">
          <div class="hover overflow-hidden relative text-light text-center">
            <div class="overflow-hidden">
              <img src="${imgUrl}" class="hover-scale-1-1 w-100" alt="" />
            </div>
            <div class="abs w-100 px-4 hover-op-1 z-4 hover-mt-40 abs-centered">
              <a class="btn-main btn-line fx-slide" href="https://africabooking.app/">
                <span> Details</span>
              </a>
            </div>
            <div class="abs bg-blur z-2 top-0 w-100 h-100 hover-op-1"></div>
            <div class="abs z-2 bottom-0 p-30 w-100 text-center hover-op-0">
              <div class="d-flex justify-content-between align-items-center"></div>
            </div>
            <div class="gradient-edge-bottom abs w-100 h-40 bottom-0"></div>
          </div>
        </div>
      `
        )
        .join("");

      slidersContainer.innerHTML = slidesHTML;

      if (typeof jQuery !== "undefined" && jQuery.fn.owlCarousel) {
        const owl = jQuery("#room-carousel");
        owl.trigger("destroy.owl.carousel");
        owl.owlCarousel({
          center: true,
          loop: true,
          margin: 30,
          nav: false,
          dots: false,
          responsive: {
            1000: { items: 2 },
            600: { items: 2 },
            0: { items: 1 },
          },
        });

        jQuery(".owl-custom-nav").each(function () {
          const target = jQuery(this).data("target");
          jQuery(this)
            .find(".btn-next")
            .on("click", function () {
              jQuery(target).trigger("next.owl.carousel");
            });
          jQuery(this)
            .find(".btn-prev")
            .on("click", function () {
              jQuery(target).trigger("prev.owl.carousel");
            });
        });
      }
    }
  } catch (error) {
    console.error("Erreur lors du chargement de la bannière :", error);
  }
});
