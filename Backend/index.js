const getData = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur de réponse du serveur");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
};

async function main() {
  try {
    const data = await getData();
    const filters = await getDataFilter();
    displayData(data);
    displayDataFilters(filters);
  } catch (error) {
    console.error("Une erreur s'est produite", error);
  }
}

function displayData(data) {
  for (let elem of data) {
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = elem.imageUrl;
    const nomElement = document.createElement("figcaption");
    nomElement.textContent = elem.title;
    const sectionGallery = document.getElementById("gallery");

    sectionGallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
  }
}

//Filtres//
const getDataFilter = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error("Erreur de réponse du serveur");
    }
    const dataF = await response.json();
    console.log(dataF);
    return dataF;
  } catch (error) {
    console.error("Une erreur s'est produite", error);
    throw error;
  }
};

const baliseMain = document.querySelector("main");
const section = document.createElement("section");
section.id = "Filtres";
baliseMain.appendChild(section);
const ul = document.createElement("ul");
section.appendChild(ul);

function displayDataFilters(dataf) {
  for (let elem of dataf) {
    const li = document.createElement("li");
    li.textContent = elem.name;
    ul.appendChild(li);
  }
}
main();
