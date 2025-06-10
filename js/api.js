export const baseUrl = "http://localhost:8000/api/admin";

export const fetchSections = async () => {
  try {
    const response = await fetch(`${baseUrl}/sections/innov-imo`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchSliders = async () => {
  try {
    const response = await fetch(`${baseUrl}/sliders/innov-imo`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchFooter = async () => {
  try {
    const response = await fetch(`${baseUrl}/sections/innov-imo`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des données");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
