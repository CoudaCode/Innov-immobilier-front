import {
  aboutData,
  dataAfterSliders,
  fetchAprops,
  fetchBannerIndex,
  fetchFeaturesData,
  fetchHeader,
  fetchSlidersData,
} from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    setTimeout(() => {
      const footer = document.querySelector("footer");
      if (footer) {
        footer.style.position = "relative";
        footer.style.zIndex = "999";
        document.body.style.overflow = "visible";
      }

      // Réinitialise les styles problématiques
      document.querySelectorAll("section").forEach((section) => {
        section.style.overflow = "visible";
        section.style.height = "auto";
      });
    }, 500);
    const header = await fetchHeader();

    if (header && header.content) {
      const headerContent = document.getElementById("header-content");
      if (headerContent) {
        headerContent.innerHTML = header.content;
      }
    }

    const about = await aboutData();
    if (about.content) {
      const aboutContent = document.getElementById("about-content");
      if (aboutContent) {
        aboutContent.innerHTML = about.content;
      }
    }

    const aprops = await fetchAprops();
    console.log(aprops);

    if (aprops && aprops.content) {
      const apropsContent = document.getElementById("aprops-content");
      if (apropsContent) {
        apropsContent.innerHTML = aprops.content;
      }
    }

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

    const dataAfterData = await dataAfterSliders();

    const features = dataAfterData.filter((item) => item.icon);
    const overview = dataAfterData.find((item) => !item.icon);

    const overviewContainer = document.getElementById("features-overview");
    if (overview && overviewContainer) {
      const title = overviewContainer.querySelector("h2");
      const desc = overviewContainer.querySelector("p");
      if (title) title.textContent = overview.title;
      if (desc)
        desc.innerHTML = (overview.description || "").replace(/\n/g, "<br>");
    }
    const cardsContainer = document.getElementById("features-cards");
    if (cardsContainer && features.length > 0) {
      cardsContainer.innerHTML = "";
      features.forEach((feature) => {
        const card = `
          <div class="col-md-6">
            <div class="h-100 rounded-1">
              <img
                src="http://localhost:8000/storage/${feature.icon}"
                class="w-70px mb-4 wow scaleIn"
                alt="${feature.title}"
              />
              <div class="relative wow fadeInUp">
                <h4>${feature.title}</h4>
                <p class="mb-0">${feature.description || ""}</p>
              </div>
            </div>
          </div>
    `;
        cardsContainer.insertAdjacentHTML("beforeend", card);
      });
    }

    const pageLoader = document.getElementById("de-loader");
    if (pageLoader) {
      pageLoader.style.opacity = "0";
      setTimeout(() => {
        pageLoader.style.display = "none";
      }, 400);
    }
  } catch (error) {
    console.error("Erreur lors du chargement de la bannière :", error);
  }
});
