//Pre loader
window.addEventListener("load", () => {
  document.querySelector(".preloader").style.display = "none";
});
let cardContainer = document.querySelector(".card-container");
let dropDown = document.querySelector(".dropdown-text");
let dropDownList = document.querySelector(".dropdown-list");
let dropDownItem = document.querySelectorAll(".dropdown-item");
let searchForm = document.querySelector(".search-form");
let headerTheme = document.querySelector(".header-theme");
let Africa = [],
  Asia = [],
  Europe = [],
  Americas = [],
  Oceania = [],
  noRegion = [],
  allCountries = [];

dropDown.addEventListener("click", () => {
  dropDownList.classList.toggle("d-none");
});
dropDownList.addEventListener("click", () => {
  dropDownList.classList.toggle("d-none");
});
//

headerTheme.addEventListener("click", () => {
  changeTheme();
  if (headerTheme.classList.contains("txt-light")) {
    localStorage.setItem("Theme", "dark");
  } else {
    localStorage.setItem("Theme", "light");
  }
});

function searchEngine() {
  searchForm.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      if (allCountries.includes(searchForm.value.toLowerCase())) {
        for (let i = 0; i < nCardBox.length; i++) {
          nCardBox[i].style.display = "none";
        }
        nCardBox[
          allCountries.indexOf(searchForm.value.toLowerCase())
        ].style.display = "block";
      } else {
        alert("Please Tey Again");
        searchForm.value = "";
      }
    } else if (searchForm.value == "") {
      for (let i = 0; i < nCardBox.length; i++) {
        nCardBox[i].style.display = "block";
      }
    }
  });
}

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    onLoad(data);
    showRegion(data);
    searchEngine();
  });
function onLoad(data) {
  let l = data.length;
  for (let i = 0; i < l; i++) {
    sortByRegion(data[i]);
    createElem(data[i]);
    MakeCountry(data[i], i);
  }
}
function MakeCountry(country, index) {
  nCountryNames[index].innerHTML = country.name.common;
  nPopulationVal[index].innerHTML = country.population;
  nRegionVal[index].innerHTML = country.region;
  nCapitalVal[index].innerHTML = country.capital;
  nImgs[index].src = country.flags.svg;
  setTheme(localStorage.getItem("Theme"));
}
function sortByRegion(data) {
  allCountries.push(data.name.common.toLowerCase());
  switch (data.region) {
    case "Asia":
      Asia.push(data.name.common);
      break;
    case "Europe":
      Europe.push(data.name.common);
      break;
    case "Africa":
      Africa.push(data.name.common);
      break;
    case "Americas":
      Americas.push(data.name.common);
      break;
    case "Oceania":
      Oceania.push(data.name.common);
      break;
    default:
      noRegion.push(data.name.common);
      break;
  }
}
function createElem(data = "") {
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title txt-light TL country-name";
  let cardText1 = document.createElement("p");
  let population = document.createElement("span");
  population.appendChild(document.createTextNode("population : "));
  let populationVal = document.createElement("span");
  cardText1.classList.add("card-text");
  population.className = "population txt-light TL";
  populationVal.className = "population-value txt-light TL";
  cardText1.appendChild(population);
  cardText1.appendChild(populationVal);
  let cardText2 = document.createElement("p");
  let region = document.createElement("span");
  region.appendChild(document.createTextNode("region : "));
  let regionVal = document.createElement("span");
  cardText1.classList.add("card-text");
  region.className = "region txt-light TL";
  regionVal.className = "region-value txt-light TL";
  cardText2.appendChild(region);
  cardText2.appendChild(regionVal);
  let cardText3 = document.createElement("p");
  let capital = document.createElement("span");
  capital.appendChild(document.createTextNode("capital : "));
  let capitalVal = document.createElement("span");
  cardText1.classList.add("card-text");
  capital.className = "capital txt-light TL";
  capitalVal.className = "capital-value txt-light TL";
  cardText3.appendChild(capital);
  cardText3.appendChild(capitalVal);
  let cardBody = document.createElement("div");
  cardBody.className = "card-body bg-d-blue Dblue";
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText1);
  cardBody.appendChild(cardText2);
  cardBody.appendChild(cardText3);
  let img = document.createElement("img");
  img.className = "card-img-top img";
  let card = document.createElement("section");
  card.className = "card bg-d-blue Dblue my-3 pointer card-height";
  card.appendChild(img);
  card.appendChild(cardBody);
  let cardBox = document.createElement("a");
  cardBox.href = `country.html?name=${data.name.common}`;
  cardBox.className = "card-box col-12 col-sm-6 col-md-4 col-lg-3";
  cardBox.setAttribute("value", data.region);
  cardBox.appendChild(card);
  cardContainer.appendChild(cardBox);
  nCardBox = document.querySelectorAll(".card-box");
  nCountryNames = document.querySelectorAll(".country-name");
  nPopulationVal = document.querySelectorAll(".population-value");
  nRegionVal = document.querySelectorAll(".region-value");
  nCapitalVal = document.querySelectorAll(".capital-value");
  nImgs = document.querySelectorAll(".img");
}
function changeTheme() {
  let bgDBlue = document.querySelectorAll(".Dblue");
  let bgVdBlue = document.querySelectorAll(".Vdblue");
  let textLight = document.querySelectorAll(".TL");
  let searchFormColor = document.querySelector(".search-form");
  //-----------------------------------------------------------
  searchFormColor.classList.toggle("plh-L");
  searchFormColor.classList.toggle("plh-G");
  for (let i = 0; i < bgDBlue.length; i++) {
    bgDBlue[i].classList.toggle("bg-d-blue");
    bgDBlue[i].classList.toggle("bg-light-elem");
  }
  for (let i = 0; i < bgVdBlue.length; i++) {
    bgVdBlue[i].classList.toggle("bg-vd-blue");
    bgVdBlue[i].classList.toggle("bg-l-mode1");
  }
  for (let i = 0; i < textLight.length; i++) {
    textLight[i].classList.toggle("txt-light");
    textLight[i].classList.toggle("text-l-mode");
  }
}
function setTheme(themeColor) {
  let bgDBlue = document.querySelectorAll(".Dblue");
  let bgVdBlue = document.querySelectorAll(".Vdblue");
  let textLight = document.querySelectorAll(".TL");
  let searchFormColor = document.querySelector(".search-form");
  if (themeColor === "light") {
    for (let i = 0; i < bgDBlue.length; i++) {
      bgDBlue[i].classList.replace("bg-d-blue", "bg-light-elem");
    }
    for (let i = 0; i < bgVdBlue.length; i++) {
      bgVdBlue[i].classList.replace("bg-vd-blue", "bg-l-mode1");
    }
    for (let i = 0; i < textLight.length; i++) {
      textLight[i].classList.replace("txt-light", "text-l-mode");
    }
    searchFormColor.classList.remove("plh-L");
    searchFormColor.classList.add("plh-G");
  } else if (themeColor === "dark") {
    for (let i = 0; i < bgDBlue.length; i++) {
      bgDBlue[i].classList.replace("bg-light-elem", "bg-d-blue");
    }
    for (let i = 0; i < bgVdBlue.length; i++) {
      bgVdBlue[i].classList.replace("bg-l-mode1", "bg-vd-blue");
    }
    for (let i = 0; i < textLight.length; i++) {
      textLight[i].classList.replace("text-l-mode", "txt-light");
    }
    searchFormColor.classList.remove("plh-G");
    searchFormColor.classList.add("plh-L");
  }
}

function showRegion(data){
  dropDownItem.forEach((e) => {
    e.addEventListener("click", () => {
      console.log(sessionStorage.getItem("region"));
      for (let i = 0; i < data.length; i++) {
        nCardBox[i].style.display = "block";
        if (
          e.dataset.value === "Asia" && 
          !Asia.includes(data[i].name.common)) {
          nCardBox[i].style.display = "none";
        }
        if (
          e.dataset.value === "Africa" &&
          !Africa.includes(data[i].name.common)
        ) {
          nCardBox[i].style.display = "none";
        }
        if (
          e.dataset.value === "Europe" &&
          !Europe.includes(data[i].name.common)
        ) {
          nCardBox[i].style.display = "none";
        }
        if (
          e.dataset.value === "Americas" &&
          !Americas.includes(data[i].name.common)
        ) {
          nCardBox[i].style.display = "none";
        } else if (
          e.dataset.value === "Oceania" &&
          !Oceania.includes(data[i].name.common)
        ) {
          nCardBox[i].style.display = "none";
        }
      }
    });
  });
}