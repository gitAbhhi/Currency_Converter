const BASE_URL ="https://v6.exchangerate-api.com/v6/c62b5fad79b68c81bc4c39d1/latest"

const inputd = document.querySelector("input");
const fromslct = document.querySelector(".from select");
const toslct = document.querySelector(".To select");
const result = document.querySelector(".result");
const button = document.querySelector("button");
const countryslct = document.querySelectorAll(".countrydetail select");

for (const select of countryslct) {
    for (corrcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = corrcode;
        newoption.value = corrcode
        console.log(newoption.innerText);
        if (select.id === "from" && corrcode === "USD") {
            newoption.selected = "selected";// key point
        }
        else if (select.id === "to" && corrcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener('change', (evt) => {
        updateflag(evt.target);//key point
    })
}
const updateExrate = async () => {
    let amountval = inputd.value;
    if (amountval === "" || amountval < 1) {
        amountval = 1;
        inputd.value = "1";//key point
    }
    console.log(fromslct.value, toslct.value + " ha yahi game h");

    const url = `${BASE_URL}/${fromslct.value}`
    const response = await fetch(url)
    try {
        if (!response.ok) {
            throw new Error("Api se kuch gadbad")
        }
        const data = await response.json();
        // console.log(data)
        const rate = data.conversion_rates[`${toslct.value}`]
        const vamount = rate * amountval;
        result.innerText = `${amountval} ${fromslct.value} = ${vamount} ${toslct.value}`;
    } catch (error) {
        console.log("api not working")
    }
}

const updateflag = (element) => {
    let currcode = element.value;
    let councode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${councode}/flat/64.png`
    let img = element.parentElement.querySelector("img");//key point
    img.src = newsrc;
}

button.addEventListener("click", (evt) => {//key point
    evt.preventDefault()
    updateExrate();
})
// window.addEventListener("load", () => {
//     updateExrate();
// });