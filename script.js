const tbody = document.querySelector('tbody');

const coinRowData = ({ id, rank, name, symbol, quotes: { USD: { price, percent_change_24h, market_cap, volume_24h } } }) => {
    const row = document.createElement('tr');
    tbody.appendChild(row);
    for (let i = 1; i <= 7; i++) {
        const col = document.createElement('td');
        col.classList.add('col-' + i);
        const parentDiv = document.createElement('div');
        row.appendChild(col)
        col.appendChild(parentDiv);
        switch (i) {
            case 1:
                const starIcon = document.createElement('i');
                starIcon.className = 'fa-solid fa-star';
                starIcon.addEventListener('click', (e) => {
                    e.target.parentNode.classList.toggle('active')
                })
                parentDiv.appendChild(starIcon);
                break;
            case 2:
                const rankSpan = document.createElement('span');
                const rankText = document.createTextNode(rank);
                parentDiv.appendChild(rankSpan)
                rankSpan.appendChild(rankText)
                break;
            case 3:
                const coinIcon = document.createElement('img');
                coinIcon.src = `https://static.coinpaprika.com/coin/${id}/logo.png`;
                const coinName = document.createElement('span');
                const nameText = document.createTextNode(name);
                const coinShortName = document.createElement('b');
                const shortNameText = document.createTextNode(symbol);

                parentDiv.appendChild(coinIcon)
                parentDiv.appendChild(coinName)
                coinName.appendChild(nameText)
                parentDiv.appendChild(coinShortName)
                coinShortName.appendChild(shortNameText)

                break;
            case 4:
                const priceSpan = document.createElement('span');
                const priceText = document.createTextNode(price.toFixed(3));
                parentDiv.appendChild(priceSpan)
                priceSpan.appendChild(priceText)
                break;
            case 5:
                const change24Span = document.createElement('span');
                const change24Text = document.createTextNode(percent_change_24h);
                const arrowIcon = document.createElement('i');
                arrowIcon.className = 'fa-solid fa-sort-up';
                parentDiv.classList.add(percent_change_24h >= 0 ? 'positive' : 'negative');
                parentDiv.appendChild(arrowIcon)
                parentDiv.appendChild(change24Span)
                change24Span.appendChild(change24Text)
                break;
            case 6:
                const mrktSpan = document.createElement('span');
                const mrktText = document.createTextNode(market_cap);
                parentDiv.appendChild(mrktSpan)
                mrktSpan.appendChild(mrktText)
                break;
            case 7:
                const volumeSpan = document.createElement('span');
                const volumeText = document.createTextNode(Math.floor(volume_24h));
                parentDiv.appendChild(volumeSpan)
                volumeSpan.appendChild(volumeText)
                break;
            default:
                break;
        }

    }
}
fetch('https://api.coinpaprika.com/v1/tickers').then(res => {
    return res.json()
}).then(data => {
    const top100coinsArray = data.slice(0, 100);
    top100coinsArray.forEach(coin => {
        console.log(coin)
        coinRowData(coin)
    });
}).catch(err => {
    alert(err + '\n WE WILL PROVIDE YOU OLD DATA')
    fetch('./jsonfiles/tickers.json').then(res => {
        return res.json()
    }).then(data => {
        const top100coinsArray = data.slice(0, 100);
        top100coinsArray.forEach(coin => {
            console.log(coin)
            coinRowData(coin)
        });
    })
})