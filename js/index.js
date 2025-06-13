import { fetchFooter, fetchSections, fetchSliders } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const slidersRes = await fetchSliders();
    const footerRes = await fetchFooter();
    const sectionsRes = await fetchSections();
    const images = slidersRes.data.map(
      (item) => "http://localhost:8000/storage/" + item.image
    );
    const feacturesSliders = slidersRes.data
      .filter((item) => item.title.startsWith("feature"))
      .map((item) => {
        return {
          title: item.description,
          image: "http://localhost:8000/storage/" + item.image,
        };
      });

    const featuresContainer = document.getElementById("features-container");

    if (featuresContainer && feacturesSliders.length > 0) {
      featuresContainer.innerHTML = ""; // Vider le contenu existant si nécessaire

      feacturesSliders.forEach((feature) => {
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
    const heroSlider = document.getElementById("hero-slider");
    const heroImages = slidersRes.data
      .filter((item) => item.title.startsWith("hero"))
      .map((item) => "http://localhost:8000/storage/" + item.image);

    const aboutSection = sectionsRes.data.find((item) => item.type === "about");

    if (aboutSection && aboutSection.data) {
      const { title, description, left_list, right_list } = aboutSection.data;

      let leftArray = [];
      let rightArray = [];

      try {
        leftArray = JSON.parse(left_list);
      } catch (e) {
        console.warn("Erreur lors du parsing de left_list", e);
      }

      try {
        rightArray = JSON.parse(right_list);
      } catch (e) {
        console.warn("Erreur lors du parsing de right_list", e);
      }

      const titleElement = document.querySelector("#section-facilities h2");
      if (titleElement) titleElement.textContent = title;

      const descriptionElement = document.getElementById("about-description");
      if (descriptionElement) descriptionElement.textContent = description;

      const leftListElement = document.getElementById("left-list");
      if (leftListElement && Array.isArray(leftArray)) {
        leftListElement.innerHTML = leftArray
          .map((item) => `<li>${item}</li>`)
          .join("");
      }

      const rightListElement = document.getElementById("right-list");
      if (rightListElement && Array.isArray(rightArray)) {
        rightListElement.innerHTML = rightArray
          .map((item) => `<li>${item}</li>`)
          .join("");
      }
    }

    if (heroSlider && heroImages.length > 0) {
      const slidesHTML = heroImages
        .map(
          (image) => `
            <div class="swiper-slide">
              <div class="swiper-inner" style="background-image:url(${image});">
                <div class="sw-overlay op-4"></div>
              </div>
            </div>
          `
        )
        .join("");

      heroSlider.innerHTML = slidesHTML;

      // Relancer Swiper après mise à jour du DOM
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

    const carousel = document.querySelector("#room-carousel");
    if (carousel) {
      const carouselItems = images
        .map(
          (image) => `
        <div class="item">
          <div class="hover overflow-hidden relative text-light text-center">
            <div class="overflow-hidden">
              <img src="${image}" class="hover-scale-1-1 w-100" alt="" />
            </div>
            <div class="abs w-100 px-4 hover-op-1 z-4 hover-mt-40 abs-centered">
              <a class="btn-main btn-line fx-slide" href="https://africabooking.app/">   
                <span>Details</span>
              </a>
            </div>
            <div class="abs bg-blur z-2 top-0 w-100 h-100 hover-op-1"></div>
            <div class="abs z-2 bottom-0 p-30 w-100 text-center hover-op-0">
              <div class="d-flex justify-content-between align-items-center">
                <div></div>
              </div>
            </div>
            <div class="gradient-edge-bottom abs w-100 h-40 bottom-0"></div>
          </div>
        </div>
      `
        )
        .join("");

      carousel.innerHTML = carouselItems;

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

    const footerData = footerRes.data.find((item) => item.type === "footer");
    if (footerData && footerData.data) {
      const data = footerData.data;

      const footerAddress = document.getElementById("footer-address");
      const footerPhone = document.getElementById("footer-phone");
      const footerHours = document.getElementById("footer-hours");
      const footerEmail = document.getElementById("footer-email");
      const footerCopyright = document.getElementById("footer-copyright");
      const footerFacebook = document.getElementById("footer-facebook");
      const footerLinkedin = document.getElementById("footer-linkedin");

      if (footerAddress) footerAddress.innerHTML = data.addresse || "";
      if (footerPhone) footerPhone.innerText = `Tel : ${data.telephone || ""}`;
      if (footerHours) footerHours.innerText = data.horaires || "";
      if (footerEmail) footerEmail.innerText = data.email || "";
      if (footerCopyright) footerCopyright.innerText = data.copyright || "";
      if (footerFacebook && data.facebook) footerFacebook.href = data.facebook;
      if (footerLinkedin && data.linkedin) footerLinkedin.href = data.linkedin;

      console.log("✅ Footer chargé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
});
