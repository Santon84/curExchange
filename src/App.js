import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [rates, setRates] = React.useState({}),
        [fromCurrency, setFromCurrency] = React.useState('RUB'),
        [toCurrency, setToCurrency] = React.useState('USD'),
        [fromPrice, setFromPrice] = React.useState(1),
        [toPrice, setToPrice] = React.useState(0),
        [lastEdited, setLastEdited] = React.useState(0);

  
React.useEffect(() => {
	fetch('https://cdn.cur.su/api/latest.json')
	.then(res => res.json())
	.then(json => {
	setRates(json.rates);
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
    setToPrice(total.toFixed(3));
    

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
    onChangeFromValue(fromPrice);
    } else {
    onChangeToValue(toPrice); 
    }
  }, [fromCurrency, toCurrency])
  
  // React.useEffect(() =>  {
  //   if (lastEdited===0) {
  //     onChangeFromValue(fromPrice);
  //     } else {
  //     onChangeToValue(toPrice); 
  //   }
  // }, [toCurrency])

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
