const cur1  = document.querySelector(".cur-1");
const cur2  = document.querySelector(".cur-2");
const cur1Input  = document.querySelector(".cur-1-input");
const cur2Input  = document.querySelector(".cur-2-input");
const baseRate  = document.querySelector(".base");
const switchCur = document.querySelector(".switch-cur");
const apiUrl = "https://v6.exchangerate-api.com/v6/";
const key = "39d66754227f8cdfe900d3dc";
const countries=[
    {
        name: "EUR",
        flagURL: "https://www.countries-ofthe-world.com/flags-normal/flag-of-Austria.png",
    },
    {
        name: "GBP",
        flagURL: "https://www.countries-ofthe-world.com/flags-normal/flag-of-United-Kingdom.png",
    },
    {
        name: "USD",
        flagURL: "https://www.countries-ofthe-world.com/flags-normal/flag-of-United-States-of-America.png",
    },
    {
        name: "KES",
        flagURL: "https://www.countries-ofthe-world.com/flags-normal/flag-of-Kenya.png",
    },
]

// get Exchange Rate

async function getExchangeRate(){
    const cur1Value = cur1.value;
    const cur2Value = cur2.value;

    const response = await fetch(`${apiUrl}${key}/latest/${cur1Value}`);

    const data = await response.json();

    const rate = data.conversion_rates[cur2Value];
    baseRate.textContent = `1 ${cur1Value} = ${rate.toFixed(2)} ${cur2Value}`;

    cur2Input.value = ((cur1Input.value) * rate).toFixed(2);

}
getExchangeRate();
// Add event listener

cur1.addEventListener("change",()=>{
    getExchangeRate();
    getFlags();

})
cur2.addEventListener("change",()=>{
    getExchangeRate();
    getFlags();


})
cur1Input.addEventListener("input",()=>{
    getExchangeRate();

})
cur2Input.addEventListener("input",()=>{
    getExchangeRate();


})
switchCur.addEventListener("click",()=>{
    const cur1Val = cur1.value;
    cur1.value = cur2.value;
    cur2.value = cur1Val;
    switchCur.classList.toggle("rotate");
    getExchangeRate();
    getFlags();

})

// get flags
function getFlags(){
    countries.forEach((country)=>{
        if(cur1.value==country.name){
            const imgSrc = document.querySelector(".from img");
            imgSrc.setAttribute("src",country.flagURL);
        }
        if(cur2.value==country.name){
            const imgSrc = document.querySelector(".to img");
            imgSrc.setAttribute("src",country.flagURL);
        }
    });
}