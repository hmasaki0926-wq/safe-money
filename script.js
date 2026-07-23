// 日時表示
function updateDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const hour = now.getHours();
    const min = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("datetime").textContent =
        `${year}年${month}月${day}日 ${hour}:${min}`;
}

updateDateTime();


// 金庫計算
function calculate() {

    let total = 0;


    // 紙幣
    const bills = [
        [10000, "bill10000", "sum10000"],
        [5000, "bill5000", "sum5000"],
        [2000, "bill2000", "sum2000"],
        [1000, "bill1000", "sum1000"]
    ];


    bills.forEach(item => {

        const money = item[0];
        const count = Number(document.getElementById(item[1]).value) || 0;

        const sum = money * count;

        document.getElementById(item[2]).textContent =
            sum.toLocaleString() + "円";

        total += sum;
    });



    // 硬貨
    const coins = [
        [500, "roll500", "coin500", "total500", 50],
        [100, "roll100", "coin100", "total100", 50],
        [50, "roll50", "coin50", "total50", 50],
        [10, "roll10", "coin10", "total10", 50],
        [5, "roll5", "coin5", "total5", 50],
        [1, "roll1", "coin1", "total1", 50]
    ];


    coins.forEach(item => {

        const value = item[0];

        const roll =
            Number(document.getElementById(item[1]).value) || 0;

        const coin =
            Number(document.getElementById(item[2]).value) || 0;


        // 棒金1本＝50枚
        const sum =
            value * ((roll * item[4]) + coin);


        document.getElementById(item[3]).textContent =
            sum.toLocaleString() + "円";


        total += sum;

    });



    // 自由入力
    const free =
        Number(document.getElementById("freeMoney").value) || 0;

    total += free;


    // 総合計表示
    document.getElementById("grandTotal").textContent =
        total.toLocaleString();

}


// 入力変更時に自動計算
document.querySelectorAll("input").forEach(input => {

    input.addEventListener("input", calculate);

});


// 保存ボタン
document.getElementById("saveButton").addEventListener("click", function(){

    const total =
        document.getElementById("grandTotal").textContent;

    localStorage.setItem(
        "safeMoney",
        total
    );

    alert("保存しました");

});


// 履歴ボタン
document.getElementById("historyButton").addEventListener("click", function(){

    const data = localStorage.getItem("safeMoney");

    if(data){
        alert(
            "前回保存した金庫残高\n￥" + data
        );
    }else{
        alert("履歴はありません");
    }

});