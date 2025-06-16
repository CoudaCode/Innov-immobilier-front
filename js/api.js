export const baseUrl = "http://localhost:8000/api";
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
