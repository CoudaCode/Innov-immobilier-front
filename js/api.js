export const baseUrl = "https://backoffice.caauri.com";
export const fetchFooter = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchBannerIndex = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sliders`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");

    const data = await response.json();
    return data.data
      .filter((item) => item.title && item.title.startsWith("Banner"))
      .map((item) => item.image_path);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchFeaturesData = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data
      .filter((item) => item.type && item.type.startsWith("features"))
      .map((item) => {
        return {
          title: item.title,
          image: "http://localhost:8000/storage/" + item.image_path,
        };
      });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchSlidersData = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sliders`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    const filteredData = data.data.filter(
      (item) => item.title && item.title.startsWith("slider-home")
    );

    return filteredData.map(
      (item) => "http://localhost:8000/storage/" + item.image_path
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const dataAfterSliders = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/features`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    const filteredData = data.data.filter(
      (item) => item.section_id && item.section_id === 14
    );
    return filteredData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const aboutData = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/12`);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchHeader = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/11`);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchAprops = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/13`);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchAboutExpertise = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/16`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchSectionsData = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections?page=2`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();

    const filteredData = data.data
      .filter((item) => item.type && item.type.startsWith("expertise-section"))
      .map((item) => {
        return {
          title: item.title,
          content: item.content,
          image: "http://localhost:8000/storage/" + item.image_path,
        };
      });

    return filteredData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPartners = async () => {
  try {
    let allData = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await fetch(
        `${baseUrl}/app/innov-team/features?page=${page}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des données");
      const data = await response.json();

      allData = allData.concat(data.data);
      lastPage = data.meta.last_page;
      page++;
    } while (page <= lastPage);

    allData = allData
      .filter((item) => item.section_id && item.section_id === 20)
      .map((item) => {
        return {
          title: item.title,
          image: "http://localhost:8000/storage/" + item.icon,
          description: item.description,
        };
      });
    return allData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const bannerNosExpertise = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/15`);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const ImageBannerSlider = async () => {
  try {
    let allData = [];
    let page = 1;
    let lastPage = 1;
    do {
      const response = await fetch(
        `${baseUrl}/app/innov-team/features?page=${page}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des données");
      const data = await response.json();

      allData = allData.concat(data.data);
      lastPage = data.meta.last_page;
      page++;
    } while (page <= lastPage);

    allData = allData.filter(
      (item) => item.section_id && item.section_id === 13
    );
    console.log("allData", allData);
    return allData.map((item) => "http://localhost:8000/storage/" + item.icon);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Innovplaza
export const aboutInnovplaza = async () => {
  try {
    let allData = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await fetch(
        `${baseUrl}/app/innov-team/sliders?page=${page}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des données");
      const data = await response.json();

      allData = allData.concat(data.data);
      lastPage = data.meta.last_page;
      page++;
    } while (page <= lastPage);

    const filteredData = allData.filter(
      (item) =>
        item.title &&
        (item.title.startsWith("innov-plaza") ||
          item.title.startsWith("Commercial"))
    );
    console.log("filteredData", filteredData);
    return filteredData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const dataAboutInnovplaza = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/23`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sectionsHomeData = async () => {
  try {
    let allData = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await fetch(
        `${baseUrl}/app/innov-team/sections?page=${page}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des données");
      const data = await response.json();

      allData = allData.concat(data.data);
      lastPage = data.meta.last_page;
      page++;
    } while (page <= lastPage);
    console.log("allData", allData);
    const filteredData = allData.filter(
      (item) => item.type && item.type.startsWith("plaza-feature")
    );
    console.log("filteredData", filteredData);
    return filteredData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchAboutInnovplaza = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/22`);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchDataSpace = async () => {
  try {
    let allData = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await fetch(
        `${baseUrl}/app/innov-team/features?page=${page}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des données");
      const data = await response.json();

      allData = allData.concat(data.data);
      lastPage = data.meta.last_page;
      page++;
    } while (page <= lastPage);
    const filteredData = allData.filter(
      (item) => item.section_id && item.section_id === 21
    );
    console.log("filteredData", filteredData);
    return filteredData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAboutDataNosConcepts = async () => {
  try {
    const response = await fetch(`${baseUrl}/app/innov-team/sections/24`);

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getHotelsDataNosConcepts = async () => {
  try {
    let allData = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await fetch(
        `${baseUrl}/app/innov-team/sections?page=${page}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des données");
      const data = await response.json();

      allData = allData.concat(data.data);
      lastPage = data.meta.last_page;
      page++;
    } while (page <= lastPage);

    // Filtrer uniquement les sliders (type commence par "sliders-")
    const filteredData = allData.filter(
      (item) => item.type && item.type.startsWith("sliders-")
    );
    return filteredData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const aboutNosConcepts = async () => {
  try {
    let allData = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await fetch(
        `${baseUrl}/app/innov-team/sliders?page=${page}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des données");
      const data = await response.json();

      allData = allData.concat(data.data);
      lastPage = data.meta.last_page;
      page++;
    } while (page <= lastPage);
    const filteredData = allData.filter(
      (item) => item.title && item.title === "nos-concepts-about"
    );
    console.log("filteredData", filteredData);
    return filteredData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
