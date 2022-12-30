const input=document.getElementById('input');
const clickButton=document.getElementById('coinSearch');
const container=document.getElementById('allCoinsContainer');

init()


function init(){

clickButton.addEventListener('click',getCryptoCurrencyData);

}


async function getCryptoCurrencyData(){
const value=input.value;
const streamResponse = await fetch(`https://api.coingecko.com/api/v3/search?query=${value}`);
const textResponse = await streamResponse.text();
const jsonData= JSON.parse(textResponse);

    let html=``;
    for(let i=0;i<jsonData['coins'].length;i++){
        html += `<div class="coinSetBox">
        <div class="alldetails">
            <p class="slNo">${i+1}</p>
            <img src="${jsonData.coins[i].large}" class="coinImage">
            <P class="CoinName">${jsonData.coins[i].name}</P>
            <p class="coinId">${jsonData.coins[i].symbol}</p>
        </div>
        <div class="moreInfo">
             <a href="details.html?id=${jsonData.coins[i].id}"><button id="moreInfo">More Info</button></a>  
        </div>
    </div>`
        
    }
    // console.log(html);
    container.innerHTML=html;
    
}