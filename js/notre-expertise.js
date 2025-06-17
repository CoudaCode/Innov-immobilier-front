import {
  fetchAboutExpertise,
  fetchHeader,
  fetchPartners,
  fetchSectionsData,
} from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    setTimeout(() => {
      const footer = document.querySelector("footer");
      if (footer) {
        footer.style.position = "relative";
        footer.style.marginTop = "5rem";

        document.body.style.overflow = "visible";
      }

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

    const expertise = await fetchAboutExpertise();
    if (expertise) {
      const expertiseContent = document.getElementById("expertise-description");
      const expertiseTitle = document.getElementById("expertise-title");

      if (expertiseContent && expertise.content) {
        expertiseContent.innerHTML = expertise.content;
      }
      if (expertiseTitle && expertise.title) {
        expertiseTitle.innerHTML = expertise.title;
      }
    }

    const sections = await fetchSectionsData();
    if (sections?.length) {
      const sectionsContainer = document.getElementById("sections-container");

      sections.forEach((section, index) => {
        const isEven = index % 2 === 0;

        const sectionHTML = `
        <section class="bg-dark section-dark text-light relative no-top no-bottom overflow-hidden">
          <div class="container-fluid position-relative half-fluid">
            <div class="container">
              <div class="row gx-5">
                <!-- Image -->
                <div class="col-lg-6 position-lg-absolute ${
                  isEven ? "right-half" : "left-half"
                } h-100 overflow-hidden">
                  <div class="image" style="background: url('${
                    section.image
                  }') center/cover no-repeat;"></div>
                </div>
                <!-- Text -->
                <div class="col-lg-6 ${
                  isEven ? "" : "offset-lg-6"
                } relative z-3">
                  <div class="${
                    isEven ? "me-lg-5 pe-lg-5" : "ms-lg-5 ps-lg-5"
                  } py-5 my-5">
                    <div class="subtitle wow fadeInUp" data-wow-delay=".0s">INNOV IMMOBILIER</div>
                    <h2 class="wow fadeInUp" data-wow-delay=".2s">${
                      section.title
                    }</h2>
                    <p>${section.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>`;
        sectionsContainer.insertAdjacentHTML("beforeend", sectionHTML);
      });
    }
    const partners = await fetchPartners();
    console.log("partners", partners);
    const galleryContainer = document.getElementById("gallery");
    if (galleryContainer && Array.isArray(partners)) {
      galleryContainer.innerHTML = "";

      partners.forEach((partner) => {
        const partnerHTML = `
          <div class="col-md-3 col-sm-6 col-12 item ${partner.description}">
            <a href="${partner.image}" class="image-popup d-block hover" title="${partner.title}">
              <div class="relative overflow-hidden">
                <div class="absolute start-0 w-100 h-100 hover-op-1 z-2"></div>
                <img src="${partner.image}" class="w-100 hover-scale-1-2" alt="${partner.title}" loading="lazy">
              </div>
            </a>
          </div>
        `;
        galleryContainer.insertAdjacentHTML("beforeend", partnerHTML);
      });
    }

    const slides = document.getElementById("slide-hero");
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
});
