const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
getButton =  document.querySelector("form button");

console.log(dropList.length);

for (let i=0; i < dropList.length; i++){
    for(currency_code in country_code){
        let selected;
        if(i == 0){
            selected = currency_code == "IDR" ? "selected" : "";
        } else if(i == 1){
            selected = currency_code == "USD" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag);

    }
    dropList[i].addEventListener("change", e=>{
        loadFlag(e.target);
    })
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `./assets/${country_code[code]}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e=>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }

    let url;
    let isCrypto = false;
    if (toCurrency.value == "BTC" || fromCurrency.value == "BTC"){
        //BTC pada API bisa diganti sesuai kebutuhan
        url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${fromCurrency.value}&tsyms=${toCurrency.value}&api_key=9368dcb15957feeef5647aacdf88b59670b81d825f6d1af941dbe1a18384d38f`;
        isCrypto = true;
    } else {
        url = `https://v6.exchangerate-api.com/v6/544f6b7979c7a9d074be52b2/latest/${fromCurrency.value}`;
        isCrypto = false;
    }

    

    exchangeRateTxt.innerText = "Getting exchange rate . . ."
    
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate;
        console.log(fromCurrency[toCurrency.value])
        if(isCrypto == true){
            exchangeRate = result[fromCurrency.value][toCurrency.value];
        }else{
            exchangeRate = result.conversion_rates[toCurrency.value];
        }

        
        let totalExchangeRate;
        if(fromCurrency.value<toCurrency.value){
            totalExchangeRate = (amountVal * exchangeRate).toFixed(8);
        }else {
            totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        }

        //let totalExchangeRate = (amountVal * exchangeRate).toFixed(4);
        const exchangeRateTxt = document.querySelector(".exchange-rate");
        
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        const rate = document.querySelector(".rate");
        rate.innerText = `1 ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`
    }).catch(()=>{
        exchangeRateTxt.innerText = "Something went wrong";
    })
}