// ACS-1 configurator

// Get everything we need from the form

let carrier = document.getElementById("carrier");
let quantity = document.getElementById("quantity");
let cummerbund = document.getElementById("cummerbund");
let frontPanel = document.getElementById("frontPanel");

let addons = document.querySelectorAll(".addon");


// Price display stuff

let carrierPrice = document.getElementById("carrierPrice");
let cummerbundPrice = document.getElementById("cummerbundPrice");
let panelPrice = document.getElementById("panelPrice");
let addonsPrice = document.getElementById("addonsPrice");

let totalPrice = document.getElementById("totalPrice");
let packageSize = document.getElementById("packageSize");

let errorMessage = document.getElementById("errorMessage");


// ButtonsButtonsButtonsButtonsButtons

let calculateBtn = document.getElementById("calculateBtn");
let resetBtn = document.getElementById("resetBtn");


// Makes the normal number into cash money

function showPrice(price) {

  return price.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  });

}


// WHERES THE MONEY LEBOWSKI

function calculatePrice() {

  let carrierCost = Number(carrier.value);
  let cummerbundCost = Number(cummerbund.value);
  let panelCost = Number(frontPanel.value);

  let numberOrdered = Number(quantity.value);


  errorMessage.innerText = "";


  // Stop limit testing my shit

  if (numberOrdered < 1 || isNaN(numberOrdered)) {

    numberOrdered = 1;
    quantity.value = 1;

    errorMessage.innerText =
      "Quantity has been changed to the minimum of 1.";

  }


  if (numberOrdered > 20) {

    numberOrdered = 20;
    quantity.value = 20;

    errorMessage.innerText =
      "The maximum quantity for this demonstration is 20.";

  }


  // Seriously, stop it

  numberOrdered = Math.round(numberOrdered);
  quantity.value = numberOrdered;


  // Add up the ally fucking accessories

  let accessoryCost = 0;

  for (let i = 0; i < addons.length; i++) {

    if (addons[i].checked == true) {

      accessoryCost =
        accessoryCost + Number(addons[i].value);

    }

  }


  // Price of one finished carrier

  let oneSystemPrice =
    carrierCost +
    cummerbundCost +
    panelCost +
    accessoryCost;


  // Then multiply it by however many have been ordered

  let finalPrice =
    oneSystemPrice * numberOrdered;


  // The breakdown shows totals for the complete order

  carrierPrice.innerText =
    showPrice(carrierCost * numberOrdered);

  cummerbundPrice.innerText =
    showPrice(cummerbundCost * numberOrdered);

  panelPrice.innerText =
    showPrice(panelCost * numberOrdered);

  addonsPrice.innerText =
    showPrice(accessoryCost * numberOrdered);

  totalPrice.innerText =
    showPrice(finalPrice);


  // Just makes the wording a *preetttyyy*

  if (numberOrdered == 1) {

    packageSize.innerText = "1 system";

  } else {

    packageSize.innerText =
      numberOrdered + " systems";

  }

}


// Reset back to the standard example

function resetConfiguration() {

  carrier.value = "295";
  quantity.value = 1;
  cummerbund.value = "65";
  frontPanel.value = "55";


  // Turn all accessories off first

  for (let i = 0; i < addons.length; i++) {

    addons[i].checked = false;

  }


  // Shoulder pads are selected by default

  addons[0].checked = true;

  errorMessage.innerText = "";

  calculatePrice();

}


// ButtonButtonsButtonsButtons events

calculateBtn.addEventListener(
  "click",
  calculatePrice
);

resetBtn.addEventListener(
  "click",
  resetConfiguration
);


// Update automatically when somebody presses shit

carrier.addEventListener(
  "change",
  calculatePrice
);

cummerbund.addEventListener(
  "change",
  calculatePrice
);

frontPanel.addEventListener(
  "change",
  calculatePrice
);

quantity.addEventListener(
  "change",
  calculatePrice
);


// Each checkbox needs the same 

for (let i = 0; i < addons.length; i++) {

  addons[i].addEventListener(
    "change",
    calculatePrice
  );

}


// Calculate the starting price when the page first opens

calculatePrice();