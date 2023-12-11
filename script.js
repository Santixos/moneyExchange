const currencyEl_one = document.getElementById('currency-one'); /*document.querySelector('#currency-one') è equivalente*/
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function initialize(currenciesList) {
  
//prima VERIFICA COSA è DENTRO DI DATA IN RIGA 23 (CONSOLE LOG AD ESEMPIO)
// object.keys vedere come funziona
// riga 23 argomento mettere array di nomi di valute
// riempire i select utilizzando currenciesList
}

// Fetch exchange rates and update the DOM
function caclulate(currency_one, currency_two) {
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json()) /*converto lo stream in json   questa conversione richiede un tempo*/
    .then(data => { /* questo accade non appena la conversione e' pronta */
      // in data ottengo l'output della conversione
      initialize();
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate("EUR", "RUB");
