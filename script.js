const emojis = [
'🍰','🧁','🍩','🍪',
'🍫','🍬','🍭','🍿',
'🍔','🍟','🍕','🌭',
'🍎','🍓','🍇','🍉',
'🍋','🥐'
];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let boardSize = 4;

let gameStarted = false;

let timeLeft = 60;

let timerInterval;

// ===== 洗牌 =====

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(
            Math.random()*(i+1)
        );

        [array[i],array[j]] =
        [array[j],array[i]];
    }
}

// ===== 建立遊戲 =====

function startGame(size){

    boardSize = size;

    gameStarted = false;

    clearInterval(timerInterval);

    if(size === 4){

        timeLeft = 60;

    }else{

        timeLeft = 100;
    }

    document.getElementById("timer")
    .textContent = timeLeft;

    document.getElementById("winPopup")
    .style.display = "none";

    document.getElementById("losePopup")
    .style.display = "none";

    firstCard = null;
    secondCard = null;

    lockBoard = false;

    const game =
    document.getElementById("game");

    game.innerHTML = "";

    game.style.gridTemplateColumns =
    `repeat(${size},85px)`;

    const pairCount =
    (size * size) / 2;

    let cards = [

        ...emojis.slice(0,pairCount),

        ...emojis.slice(0,pairCount)

    ];

    shuffle(cards);

    cards.forEach(symbol => {

        const card =
        document.createElement("div");

        card.className = "card";

        card.dataset.value = symbol;

        card.textContent = "?";

        card.addEventListener(
            "click",
            () => flipCard(card)
        );

        game.appendChild(card);
    });
}

// ===== 開始計時 =====

function startTimer(){

    if(gameStarted) return;

    gameStarted = true;

    timerInterval = setInterval(()=>{

        timeLeft--;

        document.getElementById("timer")
        .textContent = timeLeft;

        if(timeLeft <= 0){

            clearInterval(
                timerInterval
            );

            showLose();
        }

    },1000);
}

// ===== 翻牌 =====

function flipCard(card){

    if(!gameStarted) return;

    if(lockBoard) return;

    if(card.classList.contains(
        "matched"
    )) return;

    if(card.classList.contains(
        "flipped"
    )) return;

    card.classList.add(
        "flipped"
    );

    card.textContent =
    card.dataset.value;

    if(!firstCard){

        firstCard = card;

        return;
    }

    secondCard = card;

    lockBoard = true;

    if(
        firstCard.dataset.value
        ===
        secondCard.dataset.value
    ){

        firstCard.classList.add(
            "matched"
        );

        secondCard.classList.add(
            "matched"
        );

        resetTurn();

        checkWin();

    }else{

        setTimeout(()=>{

            firstCard.classList.remove(
                "flipped"
            );

            secondCard.classList.remove(
                "flipped"
            );

            firstCard.textContent =
            "?";

            secondCard.textContent =
            "?";

            resetTurn();

        },800);
    }
}

// ===== 重置回合 =====

function resetTurn(){

    firstCard = null;

    secondCard = null;

    lockBoard = false;
}

// ===== 檢查勝利 =====

function checkWin(){

    const matched =
    document.querySelectorAll(
        ".matched"
    ).length;

    const total =
    document.querySelectorAll(
        ".card"
    ).length;

    if(matched === total){

        clearInterval(
            timerInterval
        );

        launchConfetti();

        document
        .getElementById(
            "winPopup"
        )
        .style.display = "flex";
    }
}

// ===== 失敗 =====

function showLose(){

    lockBoard = true;

    fruitAttack();

    document
    .getElementById(
        "losePopup"
    )
    .style.display = "flex";
}

// ===== 重新開始 =====

function restartGame(){

    startGame(boardSize);
}

// ===== 彩帶特效 =====

function launchConfetti(){

    const colors = [

        "#ff6b6b",
        "#ffd93d",
        "#6bcB77",
        "#4d96ff",
        "#ff66c4"

    ];

    for(let i=0;i<120;i++){

        const piece =
        document.createElement(
            "div"
        );

        piece.className =
        "confetti";

        piece.style.left =
        Math.random()*100
        + "vw";

        piece.style.background =
        colors[
            Math.floor(
                Math.random()
                * colors.length
            )
        ];

        piece.style.animationDelay =
        Math.random()*2
        + "s";

        document.body.appendChild(
            piece
        );

        setTimeout(()=>{

            piece.remove();

        },3000);
    }
}

// ===== 水果攻擊 =====

function fruitAttack(){

    const fruits = [

        "🍎",
        "🍓",
        "🍉",
        "🍇",
        "🍋",
        "🍒"

    ];

    for(let i=0;i<50;i++){

        const fruit =
        document.createElement(
            "div"
        );

        fruit.className =
        "fruit";

        fruit.textContent =
        fruits[
            Math.floor(
                Math.random()
                * fruits.length
            )
        ];

        fruit.style.left =
        Math.random()*100
        + "vw";

        fruit.style.top =
        Math.random()*20
        + "vh";

        fruit.style.animationDelay =
        Math.random()*0.5
        + "s";

        document.body.appendChild(
            fruit
        );

        setTimeout(()=>{

            fruit.remove();

        },1500);
    }
}

// ===== 預設 =====

startGame(4);
