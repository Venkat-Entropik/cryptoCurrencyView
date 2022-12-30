const container1=document.getElementById('content');
const idDetails=document.getElementById('moreInfo');
const image=document.getElementById('coinLogoImage');
const title=document.querySelector('.title');
const description=document.querySelector('.description');
const priceList=document.getElementsByClassName('symbol');
init()

function init(){
const coinId =new URLSearchParams(window.location.search).get('id');
getDetails(coinId);
createChart(coinId);

}


async function getDetails(coinId){
    
    const streamResponse1= await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    const textResponse1=await streamResponse1.text();
    const jsonData1=JSON.parse(textResponse1);
  
    image.setAttribute('src',jsonData1.image.large);
    title.innerHTML=jsonData1.name;
    description.innerHTML=jsonData1.description.en;
    priceList[0].innerText=jsonData1.market_data.current_price.inr;
    priceList[1].innerText=jsonData1.market_data.current_price.usd;
    priceList[2].innerText=jsonData1.market_data.current_price.eur;
    priceList[3].innerText=jsonData1.market_data.current_price.gbp;
}

async function createChart(coinId) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=1&interval=hourly`)
    const jsonData = await res.json()
    const xValues = [];
    const yValues = [];
    for(const price of jsonData.prices) {
        const d = new Date(0)
        d.setUTCMilliseconds(price[0])
        xValues.push(`${d.getHours()}:${d.getMinutes()}`)
        yValues.push(price[1])
    }
    new Chart('coin_chart',{
        type: 'line',
        data: {
            labels: xValues,
            datasets: [
                {
                    label: 'Price',
                    data: yValues,
                    fill: false,
                    borderColor: 'blue'
                }
            ]
        }
    })
}
