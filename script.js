
const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromcurr = document.querySelector('#from-curr');
const tocurr = document.querySelector('#to-curr');


for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {

        let amtvalue = 1;
        amount.value = "1";
    }
    await updateExchangeRate(amtvalue);
});
async function updateExchangeRate(amtvalue = 1) {

    const fromValue = fromcurr.value.toLowerCase();
    const toValue = tocurr.value.toLowerCase();

    const URL = `${Base_URL}/${fromValue}.json`;
    
    const msg = document.querySelector("#msg");

    try {
        let response = await fetch(URL);
        let data = await response.json();
        

        let rate = data[fromValue][toValue];
        let convertedAmount = (amtvalue * rate).toFixed(2);
        
        if (msg) {
            msg.innerText = `${amtvalue} ${fromValue.toUpperCase()} = ${convertedAmount} ${toValue.toUpperCase()}`;
        }

    } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        if (msg) {
            msg.innerText = "Conversion failed. Please try again.";
        }
     
    }
};
window.addEventListener("load", () => {
    updateExchangeRate(1);
});


