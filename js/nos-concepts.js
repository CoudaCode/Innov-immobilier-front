import {
  aboutNosConcepts,
  getAboutDataNosConcepts,
  getHotelsDataNosConcepts,
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
      document.querySelectorAll("section").forEach((section) => {
        section.style.overflow = "visible";
        section.style.height = "auto";
      });
    }, 500);

    const aboutData = await getAboutDataNosConcepts();
    const hotelsData = await getHotelsDataNosConcepts();

    if (aboutData) {
      // Met à jour l'image de fond
      const heroImage = document.getElementById("hero-image");
      if (heroImage && aboutData.image_path) {
        heroImage.src = "http://localhost:8000/storage/" + aboutData.image_path;
      }

      // Met à jour le titre
      const heroTitle = document.getElementById("hero-title");
      if (heroTitle && aboutData.title) {
        heroTitle.textContent = aboutData.title;
      }
    }
    // Tabs mapping
    const hotelsTabsNav = document.getElementById("hotels-tabs-nav");
    const hotelsTabsContent = document.getElementById("hotels-tabs-content");

    if (
      hotelsTabsNav &&
      hotelsTabsContent &&
      Array.isArray(hotelsData) &&
      hotelsData.length > 0
    ) {
      // Générer les titres des tabs
      hotelsTabsNav.innerHTML = hotelsData
        .map(
          (hotel, idx) => `
            <li class="${idx === 0 ? "active-tab" : ""}" data-tab="${idx}">
              ${hotel.title || ""}
            </li>
          `
        )
        .join("");

      // Générer le contenu des tabs
      hotelsTabsContent.innerHTML = hotelsData
        .map(
          (hotel, idx) => `
            <li style="display:${idx === 0 ? "block" : "none"}">
              <div class="row g-4 gx-5 align-items-center justify-content-between">
                <div class="col-lg-3">
                  <h3 class="fs-32 text-dark mb-4">${hotel.title || ""}</h3>
                  <div>${hotel.content || ""}</div>
                </div>
                <div class="col-lg-8">
                  <div class="relative">
                    <div class="bg-blur abs p-2 bottom-0 rounded-2 px-4 m-4 text-white">
                      <h4 class="mb-0"></h4>
                    </div>
                    <img src="${
                      hotel.image_path
                        ? "http://localhost:8000/storage/" + hotel.image_path
                        : "images/default.jpg"
                    }" class="w-100 rounded-1" alt="" width="150" height="700">
                  </div>
                </div>
              </div>
            </li>
          `
        )
        .join("");

      // Ajoute l'interactivité des tabs
      hotelsTabsNav.querySelectorAll("li").forEach((tab, idx) => {
        tab.addEventListener("click", () => {
          // Active le bon tab
          hotelsTabsNav
            .querySelectorAll("li")
            .forEach((t) => t.classList.remove("active-tab"));
          tab.classList.add("active-tab");
          // Affiche le bon contenu
          hotelsTabsContent.querySelectorAll("li").forEach((content, cidx) => {
            content.style.display = cidx === idx ? "block" : "none";
          });
        });
      });
    }

    const nosConceptsAbout = await aboutNosConcepts();
    if (Array.isArray(nosConceptsAbout) && nosConceptsAbout.length > 0) {
      const data = nosConceptsAbout[0];

      // Image dynamique
      const aboutImage = document.getElementById("nos-concepts-about-image");
      if (aboutImage && data.image_path) {
        aboutImage.setAttribute(
          "data-bgimage",
          `url(http://localhost:8000/storage/${data.image_path}) center`
        );
        aboutImage.style.backgroundImage = `url(http://localhost:8000/storage/${data.image_path})`;
        aboutImage.style.backgroundPosition = "center";
        aboutImage.style.backgroundSize = "cover";
      }

      // Sous-titre dynamique
      const aboutSubtitle = document.getElementById(
        "nos-concepts-about-subtitle"
      );
      if (aboutSubtitle && data.subtitle) {
        aboutSubtitle.textContent = data.subtitle;
      }

      // // Titre dynamique
      // const aboutTitle = document.getElementById("nos-concepts-about-title");
      // if (aboutTitle && data.button_text) {
      //   aboutTitle.textContent = data.button_text;
      // }

      // Contenu dynamique
      const aboutContent = document.getElementById(
        "nos-concepts-about-content"
      );
      if (aboutContent && data.button_text) {
        aboutContent.textContent = data.button_text;
      }
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
});
