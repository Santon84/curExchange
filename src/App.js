import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [rates, setRates] = React.useState({}),
        [fromCurrency, setFromCurrency] = React.useState('USD'),
        [toCurrency, setToCurrency] = React.useState('RUB'),
        [fromPrice, setFromPrice] = React.useState(1),
        [toPrice, setToPrice] = React.useState(0),
        [lastEdited, setLastEdited] = React.useState(0);

  
React.useEffect(() => {
	fetch('https://cdn.cur.su/api/latest.json')
	.then(res => res.json())
	.then(json => {
	setRates(json.rates);
  //onChangeFromValue(1);
  console.log(json.rates)
	})
	.catch(err => {
	console.log(err);
	alert('Ошибка получения валют');
})
},[])

  // function filterObj(keys, obj) {
  //   const newObj = {};
  //   for (let key in obj) {
  //     if (keys.includes(key)) {
  //       newObj[key] = obj[key];
  //     }
  //   }
  //   return newObj;
  // }



  
  const onChangeFromValue = value => {
    
    setFromPrice(value)
    setLastEdited(0);
    const currencyValue = value / rates[fromCurrency],
    total = currencyValue * rates[toCurrency]
    
    setToPrice(isNaN(total) ? 0 : total.toFixed(3));
    

  }
  const onChangeToValue = value => {

    
    setToPrice(value);
    setLastEdited(1);
    const currencyValue = value / rates[toCurrency],
    total = (currencyValue * rates[fromCurrency])
    setFromPrice(total.toFixed(3));
  }



  React.useEffect(() =>  {
    if (lastEdited===0) {
      //console.log(fromPrice +' fromPrice')
    onChangeFromValue(fromPrice);
    } else {
    onChangeToValue(toPrice); 
    }
  }, [fromCurrency, toCurrency, rates])
  
  

  // const onToCurrencyChange = (cur) => {
  //     setToCurrency(cur);
    
  //     const currencyValue = fromPrice / rates[fromCurrency],
  //     total = currencyValue * rates[cur]
  //     setToPrice(total.toFixed(3));
  // }

  
  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency}  onChangeValue={onChangeFromValue} onChangeCurrency={setFromCurrency} />
      <Block value={toPrice} currency={toCurrency}  onChangeValue={onChangeToValue} onChangeCurrency={setToCurrency} />
    </div>
  );
}

export default App;
