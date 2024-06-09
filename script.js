function solveProblem() {
    // Mendapatkan nilai koin dan jumlah dari input
    let coinsInput = document.getElementById('coins').value.trim();
    let amountInput = document.getElementById('amount').value.trim();

    // Mengecek inputan
    if (coinsInput === "" || amountInput === "") {
        alert("Silahkan isi dengan benar");
        return;
    }

    //  mengurai input menjadi array integer
    let coins = coinsInput.split(" ").map(Number);
    let amount = parseInt(amountInput);

    if (isNaN(amount) || coins.some(isNaN)) {
        alert('Please enter valid numbers');
        return;
    }

    // Menjalankan algoritma Greedy dan Dynamic Programming
    let greedyResult = greedy(coins, amount);
    let dpResult = dynamicProgramming(coins, amount);

    // Menampilkan hasil di dalam div dengan id 'results'
    let resultDiv = document.getElementById('results');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = "<h2>Greedy Algorithm Result:</h2>";
    resultDiv.innerHTML += `<p>${greedyResult ? greedyResult.join(", ") : "Solusi tidak ditemukan"}</p>`;
    resultDiv.innerHTML += "<h2>Dynamic Programming Result:</h2>";
    resultDiv.innerHTML += `<p>${dpResult ? dpResult.join(", ") : "Solusi tidak ditemukan"}</p>`;
}

// Fungsi greedy
function greedy(coins, amount) {
    coins.sort((a, b) => b - a); 
    let result = [];
    for (let coin of coins) {
        while (amount >= coin) {
            amount -= coin;
            result.push(coin);
        }
    }
    return amount === 0 ? result : null;
}

// Fungsi dynamic programming
function dynamicProgramming(coins, amount) {
    let dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    let usedCoins = Array(amount + 1).fill(0);

    for (let coin of coins) {
        for (let x = coin; x <= amount; x++) {
            if (dp[x - coin] + 1 < dp[x]) {
                dp[x] = dp[x - coin] + 1;
                usedCoins[x] = coin;
            }
        }
    }

    if (dp[amount] === Infinity) return null;

    let result = [];
    while (amount > 0) {
        result.push(usedCoins[amount]);
        amount -= usedCoins[amount];
    }
    return result;
}
