const nav = document.getElementById("nav-items");
const topButton = document.getElementById("top");
const gallery = document.getElementById("gallery-grid");
const closeButton = document.getElementById("close");
const overlay = document.getElementById("overlay-background");

const List = [
  {
    img: "./images/colors.png",
    title: "Many Colors",
  },
  {
    img: "./images/hub.png",
    title: "Google Hub",
  },
  {
    img: "./images/home.png",
    title: "Google Home",
  },
  {
    img: "./images/hand.png",
    title: "Manual Adjust",
  },
  {
    img: "./images/heating.png",
    title: "Auto Adjust",
  },
  {
    img: "./images/options.png",
    title: "Many Options",
  },
];

closeButton.addEventListener("click", CloseOverlay);

window.addEventListener("load", () => {
  //Hide the top button until we scroll to a certain position.
  window.addEventListener("scroll", ShowToTopButton);
  CreateCard();
});

function ShowToTopButton() {
  if (window.scrollY > 165) {
    topButton.classList.remove("hidden");
  } else {
    topButton.classList.add("hidden");
  }
}

topButton.addEventListener("click", () => {
  window.scrollTo(0, 0);
  window.scrollTo({
    top: 0,
    scrollBehavior: "smooth",
  });
});

function CreateCard() {
  for (var i = 0; i < List.length; i++) {
    var item = document.createElement("div");
    var img = document.createElement("img");
    var p = document.createElement("p");
    item.appendChild(p);
    item.appendChild(img);
    item.className = "grid-item";
    img.src = List[i].img;
    p.innerHTML = List[i].title;
    gallery.appendChild(item);
  }
}

setTimeout(function ShowOverlay() {
  overlay.style.display = "flex";
}, 15000);

function OverlaySettings() {
  var submit = document.getElementById("submit");
  var name = document.getElementById("name");
  var email = document.getElementById("email");

  submit.addEventListener("click", () => {
    if (name.value == "" || email.value == "") {
      alert("Sorry please fill these areas in");
    } else {
      console.log(name.value);
      console.log(email.value);
      name.value = "";
      email.value = "";
      CloseOverlay();
    }
  });
}

function CloseOverlay() {
  overlay.classList.add("hidden");
  overlay.style.zIndex = -1;
}

OverlaySettings();

for (var i = 0; i < 5; i += 2) {
  console.log("loop");
}

// Create a Card

const card = document.getElementById("weather-card");
const cardImg = document.createElement("img");
const cardTitle = document.createElement("h3");
const cardDesc = document.createElement("h4");
const cardDegrees = document.createElement("p");
const cardText = document.createElement("div");

cardText.appendChild(cardTitle);
cardText.appendChild(cardDesc);
cardText.appendChild(cardDegrees);

card.appendChild(cardImg);
card.appendChild(cardText);

// Get users Zip Code with a prompt
let zip = prompt("What is your Zipcode?");

// Verify that its valid
while (isNaN(zip)) {
  alert("That is not a valid Zip Code");
  zip = prompt("What is your Zipcode?");
}

// get the api key and url
const APIkey = "88c06867d98cc2a95d04fb2708e70ce4";
const weather_url = `https://api.weatherstack.com/current?access_key=${APIkey}&query=${zip}&units=f`;

// create a function that fetches the data
async function GetWeather() {
  let response = await fetch(weather_url);
  let data = await response.json();
  console.log(data);

  return data;
}

GetWeather().then((data) => {
  data.location.name == "Nulles"
    ? (card.style.opacity = 0)
    : (cardDegrees.innerHTML = data.current.temperature + "&deg;F");
  cardTitle.innerHTML = data.location.name;
  cardImg.src = data.current.weather_icons[0];
  cardDesc.innerHTML = data.current.weather_descriptions[0];
});
