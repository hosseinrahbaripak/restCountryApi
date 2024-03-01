//Pre loader
window.addEventListener("load", () => {
  document.querySelector(".preloader").style.display = "none";
});
let countriesName = new URLSearchParams(location.search).get("name");
let backBtn = document.querySelector(".back-btn");
let flagImg = document.querySelector(".flag-img");
let countryName = document.querySelector(".country-name");
let nativeName = document.querySelector(".native-name");
let imgContainer = document.getElementById("img-container");
let population = document.querySelector(".population");
let region = document.querySelector(".region");
let subRegion = document.querySelector(".subregion");
let capital = document.querySelector(".capital");
let currencies = document.querySelector(".currencies");
let language = document.querySelector(".language");
let borderCountries = document.querySelector(".border-countries");
let headerTheme = document.querySelector(".header-theme");
var borderBtns;
backBtn.style.left = flagImg.offsetLeft + 70 + "px";
backBtn.addEventListener("click", () => {
  window.history.back();
});
headerTheme.addEventListener("click", () => {
  changeTheme()
  if (headerTheme.classList.contains("txt-light")) {
    localStorage.setItem("Theme", "dark");
  } else {
    localStorage.setItem("Theme", "light");
  }
});
fetchBody();

function fetchBody() {
  fetch(`https://restcountries.com/v3.1/name/${countriesName}`)
    .then((response) => response.json())
    .then(([data]) => {
      makeCountry(data);
      
    });
}
function makeCountry(data) {
  setTheme(localStorage.getItem("Theme"));
  flagImg.src = data.flags.svg;
  countryName.innerHTML = data.name.common;
  nativeName.innerHTML = data.name.official;
  population.innerHTML = data.population.toLocaleString();
  region.innerHTML = data.region;
  subRegion.innerHTML = data.subregion;
  capital.innerHTML = data.capital;
  let ll = Object.values(data.languages).length;
  for (let i = 0; i < ll; i++) {
    if (i == ll - 1) {
      language.innerHTML += `${Object.values(data.languages)[i]} `;
    } else {
      language.innerHTML += `${Object.values(data.languages)[i]} ,`;
    }
  }
  if (data.borders) {
    for (let i = 0; i < data.borders.length; i++) {
      borders(data.borders[i]);
    }
  } else {
    return (borderCountries.style.display = "none");
  }
  
}
function borders(code) {
  fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then((response) => response.json())
    .then(([data]) => {
      let btn = document.createElement("a");
      btn.className = "btn txt-light TL bg-d-blue Dblue m-2";
      btn.href = `country.html?name=${data.name.common}`;
      btn.innerHTML = data.name.common;
      borderCountries.appendChild(btn);
      setTheme(localStorage.getItem("Theme"));
    });
}
function changeTheme() {
  //-----------------------------------------------------------
  let bgDBlue = document.querySelectorAll(".Dblue");
  let bgVdBlue = document.querySelectorAll(".Vdblue");
  let textLight = document.querySelectorAll(".TL");
  let btn = document.querySelectorAll(".btn");
  flagImg.classList.toggle("shadow");
  for (let i = 0; i < btn.length; i++) {
    btn[i].classList.toggle("shadow");
  }
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
  let btn = document.querySelectorAll(".btn");
  if (themeColor === "light") {
    for (let i = 0; i < bgDBlue.length; i++) {
      bgDBlue[i].classList.replace("bg-d-blue", "bg-light-elem");
    }
    for (let i = 0; i < bgVdBlue.length; i++) {
      bgVdBlue[i].classList.replace("bg-vd-blue", "bg-l-mode1");
    }
    for (let i = 0; i < textLight.length; i++) {
      textLight[i].classList.replace("txt-light","text-l-mode");
    }
    flagImg.classList.add("shadow");
    for (let i = 0; i < btn.length; i++) {
      btn[i].classList.add("shadow");
    }
  }
  else if(themeColor === "dark"){
    for (let i = 0; i < bgDBlue.length; i++) {
      bgDBlue[i].classList.replace("bg-light-elem","bg-d-blue");
    }
    for (let i = 0; i < bgVdBlue.length; i++) {
      bgVdBlue[i].classList.replace("bg-l-mode1","bg-vd-blue");
    }
    for (let i = 0; i < textLight.length; i++) {
      textLight[i].classList.replace("text-l-mode","txt-light");
    }
    flagImg.classList.remove("shadow");
    for (let i = 0; i < btn.length; i++) {
      btn[i].classList.remove("shadow");
    }
  }
}
