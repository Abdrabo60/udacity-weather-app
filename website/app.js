//#region  Global Variables
// Personal API Key for OpenWeatherMap API
const apiKey = "308fd14de1b74c704feab91018e489b9&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

/* Global dom Elements */
const generateBtn = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const errorPopup = document.querySelector("#error-popup");
const errorMessage = document.querySelector("#message");
const overlay = document.querySelector("#overlay");
const closeBtn = document.querySelector("#close");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
//#endregion Global Variables

//#region Declare Methods
const retrieveData = async () => {
  const request = await fetch("/getData");
  if (!request.ok) {
    return Promise.reject(Error(request.statusText));
  }
  // Transform into JSON
  const allData = await request.json();
  console.log(allData);
  // Write updated data to DOM elements
  document.getElementById("temp").innerHTML =
    Math.round(allData.temp) + "degrees";
  document.getElementById("content").innerHTML = allData.feel;
  document.getElementById("date").innerHTML = allData.date;
  return Promise.resolve();
};

//fetch data from openWeatherMap website
const getApiData = async () => {
  let request = await fetch(`${baseUrl}?zip=${zip.value}&appid=${apiKey}`);
  if (!request.ok) {
    return Promise.reject(Error(request.statusText));
  }
  let data = await request.json();
  return Promise.resolve(data);
};

/* post data to my server */

const postData = async (temp) => {
  let request = await fetch("/postData", {
    body: JSON.stringify({
      temp: temp,
      date: newDate,
      feel: document.getElementById("feelings").value,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (request.ok) {
    return Promise.resolve(request);
  } else {
    return Promise.reject(Error(request.statusText));
  }

  /***************/
  /* another way to request a post method */
  /**************/

  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "/postData ", true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(
  //   JSON.stringify({
  //     temp: data.main.temp,
  //     date: newDate,
  //     feel: document.getElementById("feelings").value,
  //   })
  // );
};

const displayError = (message) => {
  console.log(message);
  errorMessage.innerText = message;
  errorPopup.style.display = "flex";
  overlay.style.display = "block";
};
//#endregion Declare methods

//#region Assign Event Listeners
generateBtn.addEventListener("click", () => {
  let reg = /^\d{5}$/;
  //check for zip value is exactly 5 digits
  if (reg.test(zip.value.trim())) {
    getApiData().then(
      (data) => {
        postData(data.main.temp).then(
          retrieveData().then(null, (e) => displayError(e)),
          (e) => displayError(e)
        );
      },
      (e) => displayError(e)
    );
  } else {
    displayError("You have to enter exactly 5 digits for city zip code");
  }
});

closeBtn.onclick = () => {
  errorPopup.style.display = "none";
  overlay.style.display = "none";
};
//#endregion Assign Event Listeners
