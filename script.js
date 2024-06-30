// Select elements
const stockSymbolInput = document.getElementById('stock-symbol');
const getPriceButton = document.getElementById('get-price-btn');
const stockInfoDiv = document.getElementById('stock-info');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Event listener for Get Price button
getPriceButton.addEventListener('click', () => {
    const stockSymbol = stockSymbolInput.value.trim().toUpperCase();
    if (stockSymbol === '') {
        alert('Please enter a stock symbol.');
        return;
    }
    fetchStockPrice(stockSymbol);
});

// Function to fetch stock price data
function fetchStockPrice(symbol) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key from Alpha Vantage
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            displayStockInfo(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            stockInfoDiv.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
        });
}

// Function to display stock information
function displayStockInfo(data) {
    const symbol = data['Global Quote']['01. symbol'];
    const price = data['Global Quote']['05. price'];

    const html = `
        <p>Symbol: ${symbol}</p>
        <p>Price: $ ${price}</p>
    `;
    stockInfoDiv.innerHTML = html;
}

// Optional: Dark mode toggle functionality
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
