import {
  aboutInnovplaza,
  dataAboutInnovplaza,
  fetchAboutInnovplaza,
  fetchDataSpace,
  sectionsHomeData,
} from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Initialiser le chargement visuel
    document.body.style.cursor = "wait";
    const loader = document.getElementById("de-loader");
    if (loader) loader.style.display = "block";

    // 2. Désactiver temporairement le défilement
    document.body.style.overflow = "hidden";

    // 3. Charger toutes les données en parallèle
    const [
      InnovplazaData,
      aboutData,
      sectionsData,
      spaceData,
      dynamicAboutData,
    ] = await Promise.all([
      aboutInnovplaza(),
      fetchAboutInnovplaza(),
      sectionsHomeData(),
      fetchDataSpace(),
      dataAboutInnovplaza(),
    ]);

    // 4. Traiter les données dans l'ordre souhaité
    await processCommercialData(InnovplazaData);
    await processImagesData(InnovplazaData);
    await processAboutSection(dynamicAboutData);
    await processSectionsData(sectionsData);
    await processAboutInnovData(aboutData);
    await processSpaceData(spaceData);

    // 5. Finaliser le chargement
    setTimeout(() => {
      const footer = document.querySelector("footer");
      if (footer) {
        footer.style.position = "relative";
        footer.style.zIndex = "999";
      }
      document.querySelectorAll("section").forEach((section) => {
        section.style.overflow = "visible";
        section.style.height = "auto";
      });
      document.body.style.overflow = "visible";
      document.body.style.cursor = "default";
      if (loader) loader.style.display = "none";
    }, 500);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    // Gérer l'erreur visuellement
    document.body.style.overflow = "visible";
    document.body.style.cursor = "default";
    const loader = document.getElementById("de-loader");
    if (loader) loader.style.display = "none";
  }
});

// Fonctions de traitement séparées pour une meilleure organisation
async function processCommercialData(data) {
  const commerciaux = data.filter(
    (item) => item.title && item.title.startsWith("Commercial")
  );
  const row = document.querySelector("#contact .row.g-4.gx-5");
  if (row) {
    row.innerHTML = commerciaux
      .map(
        (com) => `
      <div class="col-md-4">
        <div class="text-center">
          <img src="${
            com.image_path
              ? "http://localhost:8000/storage/" + com.image_path
              : "images/default.jpg"
          }" class="w-60 circle" alt="" />
          <div class="mt-3">
            <h4 class="mb-0">${com.subtitle || "Nom non renseigné"}</h4>
            <div class="fw-500 black-color">${
              com.phone || "+225 07 00 15 54 44"
            }</div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
}

async function processImagesData(data) {
  const imagesInnovPlaza = data.filter(
    (item) => item.title && item.title.startsWith("innov-plaza")
  );
  const imagesRow = document.getElementById("innovplaza-images");
  if (imagesRow) {
    imagesRow.innerHTML = imagesInnovPlaza
      .map(
        (img) => `
      <div class="col-lg-3 col-sm-6">
        <div class="hover overflow-hidden relative text-light text-center">
          <img src="${
            img.image_path
              ? "http://localhost:8000/storage/" + img.image_path
              : "images/default.jpg"
          }" class="hover-scale-1-1 w-100" alt="" />
          <div class="abs z-2 bottom-0 mb-3 w-100 text-center hover-op-0"></div>
          <div class="gradient-edge-bottom abs w-100 h-40 bottom-0 hover-op-0"></div>
        </div>
      </div>
    `
      )
      .join("");
  }
}

async function processAboutSection(data) {
  if (data) {
    const aboutImage = document.getElementById("innoplaza-about-image");
    if (aboutImage && data.image_path) {
      aboutImage.setAttribute(
        "data-bgimage",
        `url(http://localhost:8000/storage/${data.image_path}) center`
      );
      aboutImage.style.backgroundImage = `url(http://localhost:8000/storage/${data.image_path})`;
      aboutImage.style.backgroundPosition = "center";
      aboutImage.style.backgroundSize = "cover";
    }

    const aboutTitle = document.getElementById("innoplaza-about-title");
    if (aboutTitle && data.title) {
      aboutTitle.textContent = data.title;
    }

    const aboutContent = document.getElementById("innoplaza-about-content");
    if (aboutContent && data.content) {
      aboutContent.textContent = data.content;
    }
  }
}

async function processSectionsData(sections) {
  const roomCarousel = document.getElementById("room-carousel");
  if (roomCarousel && Array.isArray(sections)) {
    roomCarousel.innerHTML = sections
      .map(
        (item) => `
      <div class="item">
        <div class="relative">
          <div class="overflow-hidden text-light">
            <div class="gradient-edge-top h-50 op-8"></div>
            <div class="abs h-100 start-0 z-2 p-4">
              <h3>${item.title || ""}</h3>
            </div>
            <img src="${
              item.image_path
                ? "http://localhost:8000/storage/" + item.image_path
                : "images/default.jpg"
            }" class="w-100" alt="${item.title || ""}" />
          </div>
        </div>
      </div>
    `
      )
      .join("");

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
}

async function processAboutInnovData(aboutData) {
  if (aboutData) {
    const aboutRow = document.getElementById("about-innov-row");
    if (aboutRow) {
      aboutRow.innerHTML = `
        <div class="col-lg-5">
          ${aboutData.title}
        </div>
        <div class="col-lg-4">
          <p class="mb-4">
            ${aboutData.content}
          </p>
        </div>
      `;
    }
  }
}

async function processSpaceData(dataSpace) {
  const featuresRow = document.getElementById("features-row");
  if (featuresRow && Array.isArray(dataSpace)) {
    featuresRow.innerHTML = dataSpace
      .map(
        (feature) => `
    <div class="col-md-3 col-6">
      <div class="relative">
        <h5>${feature.title || ""}</h5>
        <div class="d-flex justify-content-start align-items-center">
          <img
            src="${
              feature.icon
                ? "http://localhost:8000/storage/" + feature.icon
                : "images/default.jpg"
            }"
            class="w-40px me-3"
            alt="${feature.title || ""}"
          />
        </div>
      </div>
    </div>
  `
      )
      .join("");
  }
}
