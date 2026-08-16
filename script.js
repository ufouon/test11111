let roundnum = 0;
let wallet= 24700000;
let bet = false;
let pendding;
let rowColor;
let boxSelected = -1;
let inputValue = 1000;
let infoInputValue = 0 ;
let winMultiManey = 1000 ;
let gameStarted ;
let gameCount =0;
const mood1 = ['1110', '1011', '1101', '0111'];
const mood2 = ['1100', '0110', '0011', '0101', '1010', '1001'];
const mood3 = ['0001', '0010', '0100', '1000'];
const moneyWallet = document.querySelector('.moneyWallet')
moneyWallet.textContent = String(wallet).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const timer = document.querySelector('.gameTimerContainer')

const input = document.getElementById('numberInput');
input.addEventListener('input', function (e) { 
    let value = input.value.replace(/,/g, '');
    inputValue = Number(value);
    winMultiManey=inputValue;
    console.log(inputValue)
    if (!/^\d*$/.test(value)) {
        input.value = input.value.replace(/[^\d,]/g, '');
        return;
    }
    let formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input.value = formatted;
    document.querySelectorAll('.money').forEach((money,index) => {
        if(index === 0){
            infoInputValue = (inputValue * 1.25);
            money.innerText =String(Math.floor(infoInputValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else if(index === 1){
            infoInputValue = (infoInputValue * 1.40);
            money.innerText =String(Math.floor(infoInputValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else if(index === 2){
            infoInputValue = (infoInputValue * 1.85 );
            money.innerText =String(Math.floor(infoInputValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else if(index === 3){
            infoInputValue =( infoInputValue*2.00 )
            money.innerText =String(Math.floor(infoInputValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else if(index === 4){
            infoInputValue = (infoInputValue*3.50 )
            money.innerText =String(Math.floor(infoInputValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    })
    
});

const betBtn = document.querySelector('.betBtn');
const betCancelBtn = document.querySelector('.betCancelBtn');
const cancelBtnInfo = document.querySelector('.cancelBtnInfo');
betBtn.addEventListener('click',()=>{
    if(gameStarted === true ){
        cancelBtnInfo.classList.remove('hideBtn')
        bet = false;
    }else{
        cancelBtnInfo.classList.add('hideBtn');
        bet = true;
        if(gameCount === 1){
            wallet -= inputValue;
            moneyWallet.textContent = String(wallet).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
        }
    }
    pendding = true
    winMultiManey = inputValue;
    betBtn.classList.remove('showBtn')
    betCancelBtn.classList.add('showBtn')
})
betCancelBtn.addEventListener('click',()=>{
    bet = false;
    pendding=false;
    betCancelBtn.classList.remove('showBtn')
    betBtn.classList.add('showBtn')
})

const getMoneyBtn = document.querySelector('.getMoneyBtn');
const getMoneyBtnInfo = getMoneyBtn.querySelector('.getMoneyBtnInfo')
getMoneyBtn.addEventListener('click',()=>{
    bet = false;
    pendding=false;
    wallet += winMultiManey ;
    moneyWallet.textContent = String(wallet).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    getMoneyBtn.classList.remove('showBtn')
    betBtn.classList.add('showBtn')
})

const penddingGetMoney =  document.querySelector('.penddingGetMoney');


function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const moodSelected = arr[randomIndex];
    if (arr === mood1) {
        const poop = moodSelected.indexOf('0');
        return (poop)
    } else if (arr === mood2) {
        const poop1 = moodSelected.indexOf('0');
        const poop2 = moodSelected.lastIndexOf('0');
        return ([poop1, poop2])
    } else if (arr === mood3) {
        const goll = moodSelected.indexOf('1');
        return (goll)
    }
}
async function roundTimeLine(roundNumber) {
    const round1_poop = getRandomElement(mood1);
    const round2_poop = getRandomElement(mood1);
    const round3_poop = getRandomElement(mood2);
    const round4_poop = getRandomElement(mood2);
    const round5_poop = getRandomElement(mood3);

    const roundActive = document.querySelector(`.round${roundNumber}`);
    roundActive.classList.add("activeTimeLine", rowColor);
    roundActive.querySelectorAll('.box').forEach(box => {
        box.classList.add("boxOpacity");
        const userCount = box.querySelector('.userCount');
        userCountRandom(userCount , roundNumber); 
    });

    ////////////////////////BOT
    document.querySelector('.bot').querySelectorAll('.botCerc').forEach(botBox =>{
        botBox.classList.remove('botPoopBox')
    })
    if (roundNumber === 1){
        document.querySelector('.bot').querySelector(`.botBox${round1_poop}`).classList.add('botPoopBox')
    }else if (roundNumber === 2){
        document.querySelector('.bot').querySelector(`.botBox${round2_poop}`).classList.add('botPoopBox')
    }else if (roundNumber === 3){
        document.querySelector('.bot').querySelector(`.botBox${round3_poop[0]}`).classList.add('botPoopBox')
        document.querySelector('.bot').querySelector(`.botBox${round3_poop[1]}`).classList.add('botPoopBox')
    }else if (roundNumber === 4){
        document.querySelector('.bot').querySelector(`.botBox${round4_poop[0]}`).classList.add('botPoopBox')
        document.querySelector('.bot').querySelector(`.botBox${round4_poop[1]}`).classList.add('botPoopBox')
    }else if (roundNumber === 5){
        
        document.querySelector('.bot').querySelectorAll('.botCerc').forEach((botBox,index)=>{
        
            if(index != round5_poop){
                botBox.classList.add('botPoopBox')
            }
        })
    }
    ///////////////////////////////////////////////////////////

    const roundinfo = document.querySelector(`.info${roundNumber}`);
    roundinfo.classList.add(rowColor);
    timer.classList.add('timer')
    startCountdown(5);
    bet ? onSelectBoxes(roundNumber) : (console.log(''));
    return new Promise((resolve) => {
        setTimeout(function () {
            roundActive.classList.remove(rowColor);
            roundinfo.classList.remove(rowColor);
            roundActive.classList.remove("activeTimeLine");
            
            if(bet === true ){
                getMoneyBtn.classList.remove('showBtn')
                penddingGetMoney.classList.add('showBtn')
            }
            if (roundNumber === 1) round1(round1_poop, roundNumber).then(resolve);
            else if (roundNumber === 2) round1(round2_poop, roundNumber).then(resolve);
            else if (roundNumber === 3) round1(round3_poop, roundNumber).then(resolve);
            else if (roundNumber === 4) round1(round4_poop, roundNumber).then(resolve);
            else if (roundNumber === 5) round1(round5_poop, roundNumber).then(resolve);

            
        }, 5000);
    });
}

async function round1(poopBoxNumber, roundNumber) {
    offSelectBoxes(roundNumber);
    //boxSelected === -1 ? bet = false : bet = true;
    if(bet === true && boxSelected === -1){
        bet = false;
        getMoneyBtn.classList.remove('showBtn');
        penddingGetMoney.classList.remove('showBtn');
        betBtn.classList.add('showBtn');
        wallet += winMultiManey;
        moneyWallet.textContent = String(wallet).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    boxSelected === -1 ? rowColor = 'colorOrange' : rowColor = 'colorGreen';
    timer.classList.remove('timer');
    const roundActive = document.querySelector(`.round${roundNumber}`);
    const roundinfo = document.querySelector(`.info${roundNumber}`);
    const boxes = roundActive.querySelectorAll('.box');
    const promises = Array.from(boxes).map((box, index) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userCount = box.querySelector('.userCount');
                let span = userCount.querySelector(".userCountNum");
                userCount.classList.remove('showUserCount');
                span.classList.remove('userCountNumShow');
                span.textContent = 0;
                const boxImg = box.querySelector('.img');

                if (roundNumber === 1 || roundNumber === 2) {
                    if (index === poopBoxNumber) {
                        boxImg.src = './images/poop.png';
                        if (index === boxSelected) {
                            box.classList.add('boxLossBorder');
                            bet = false;
                            rowColor = 'colorOrange';
                            boxSelected = -1;
                            winMultiManey =0;

                            getMoneyBtn.classList.remove('showBtn');
                            penddingGetMoney.classList.remove('showBtn');
                            betBtn.classList.add('showBtn');
                        }
                    } else {
                        boxImg.src = './images/winner.png';
                        if (index === boxSelected) {
                            boxSelected = -1;
                            if(roundNumber === 1){
                                winMultiManey = Math.floor((inputValue * 1.25));
                            }else if(roundNumber === 2){
                                winMultiManey = Math.floor((winMultiManey * 1.40));
                            }
                        }
                    }

                }

                else if (roundNumber === 3 || roundNumber === 4) {
                    if (index === poopBoxNumber[0] || index === poopBoxNumber[1]) {
                        boxImg.src = './images/poop.png';
                        if (index === boxSelected) {
                            box.classList.add('boxLossBorder')
                            bet = false;
                            rowColor = 'colorOrange';
                            boxSelected = -1;
                            winMultiManey =0;

                            getMoneyBtn.classList.remove('showBtn')
                            penddingGetMoney.classList.remove('showBtn')
                            betBtn.classList.add('showBtn')
                        }
                    } else {
                        boxImg.src = './images/winner.png';
                        if (index === boxSelected) {
                            boxSelected = -1;
                            if(roundNumber === 3){
                                winMultiManey = Math.floor((winMultiManey * 1.85));
                            }else if(roundNumber === 4){
                                winMultiManey = Math.floor((winMultiManey * 2.00));
                            }
                            //console.log("win")
                        }
                    }
                }
                else if (roundNumber === 5) {
                    if (index === poopBoxNumber) {
                        boxImg.src = './images/winner.png';
                        if (index === boxSelected) {
                            boxSelected = -1;
                            winMultiManey = Math.floor((winMultiManey * 3.50));
                            wallet += winMultiManey ;
                            moneyWallet.textContent = String(wallet).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            bet = false;
                            pendding =false;
                            getMoneyBtn.classList.remove('showBtn')
                            penddingGetMoney.classList.remove('showBtn')
                            betBtn.classList.add('showBtn')
                            
                        }
                    }else if(bet === true && boxSelected === -1){
                        bet = false;
                        pendding=false;
                        boxSelected=-1;
                        getMoneyBtn.classList.remove('showBtn');
                        penddingGetMoney.classList.remove('showBtn');
                        betBtn.classList.add('showBtn');
                        wallet += winMultiManey;
                        moneyWallet.textContent = String(wallet).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    else {
                        boxImg.src = './images/poop.png';
                        if (index === boxSelected) {
                            box.classList.add('boxLossBorder')
                            bet = false;
                            pendding=false;
                            boxSelected = -1;
                            winMultiManey =0;
                            rowColor = 'colorOrange';
                            getMoneyBtn.classList.remove('showBtn')
                            penddingGetMoney.classList.remove('showBtn')
                            betBtn.classList.add('showBtn')
                            
                        }
                    }
                    bet=false;
                    
                    boxSelected=-1;

                }

                roundActive.classList.add(rowColor);
                roundinfo.classList.add(rowColor);

                setTimeout(() => {
                    roundActive.classList.remove(rowColor);
                    roundinfo.classList.remove(rowColor);
                }, 150);

                boxImg.classList.add('openImg');
                box.classList.add("boxBg");
                resolve(); 
            }, index * 1000);
        });
    });
    // منتظر اجرای تمام انیمیشن‌ها
    await Promise.all(promises);
    // اجرای تابع wait به مدت 1 ثانیه
    await wait(roundActive, roundinfo ,roundNumber);
    if(bet === true){
        getMoneyBtn.classList.add('showBtn')
        penddingGetMoney.classList.remove('showBtn')
    }
    roundinfo.classList.add(`offinfo`);
    
}


// تابع async برای اجرای انیمیشن 1 ثانیه‌ای
async function wait(roundActive, roundinfo ,roundNumber) {
    await new Promise(resolve => setTimeout(resolve, 160));
    roundActive.classList.add(rowColor);
    roundinfo.classList.add(rowColor);
    if (roundNumber === 5){
        timerFinishRound()
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    roundActive.classList.remove(rowColor);
    roundinfo.classList.remove(rowColor);
}

////functions for select box when betting
const boxClickHandlers = new Map();
function boxIdSelected(box, roundNumber) {
    const roundActive = document.querySelector(`.round${roundNumber}`);
    roundActive.querySelectorAll('.box').forEach(box => {
        box.classList.remove('boxSelectedBorder')
    });
    box.classList.add('boxSelectedBorder');
    boxSelected = Number(box.id);
}
function onSelectBoxes(roundNumber) {
    const roundActive = document.querySelector(`.round${roundNumber}`);
    roundActive.querySelectorAll('.box').forEach(box => {
        const handler = () => boxIdSelected(box, roundNumber);
        boxClickHandlers.set(box, handler);
        box.addEventListener("click", handler);
    });
}
function offSelectBoxes(roundNumber) {
    const roundActive = document.querySelector(`.round${roundNumber}`);
    roundActive.querySelectorAll('.box').forEach(box => {
        const handler = boxClickHandlers.get(box);
        if (handler) {
            box.removeEventListener("click", handler);
            boxClickHandlers.delete(box);
        }
    });
}


async function userCountRandom(userCount , roundNumber) {
    let span = userCount.querySelector(".userCountNum");
    let count = 0;
    if(count === 0){
        let delay = Math.floor(Math.random() * 1000) + 500;
        await new Promise(resolve => setTimeout(resolve, delay)); 
        span.classList.add('userCountNumShow');
        userCount.classList.add('showUserCount');
    }
    function run() {
      
      let current = parseInt(span.textContent, 10);
      let random ;

      if(roundNumber === 1){
        if (count >= 4) return;
        random = Math.floor(Math.random() * 5) + 1;
      }else if(roundNumber === 2){
        if (count >= 3) return;
        random = Math.floor(Math.random() * 4) + 1;
      }else if(roundNumber === 3){
        if (count >= 3) return;
        random = Math.floor(Math.random() * 3) + 1;
      }else if(roundNumber === 4){
        if (count >= 2) return;
        random = Math.floor(Math.random() * 2) + 1;
      }else if(roundNumber === 5){
        if (count >= 1) return;
        random = Math.floor(Math.random() * 2) + 1;
      }
      span.textContent = current + random;
      count++;
      let delay = Math.floor(Math.random() * 501) + 1000;
      setTimeout(run, delay);
    }
  
    run();
  }



function startCountdown(durationSeconds) {
    const p = timer.querySelector('.timerNum');
    let timeLeft = durationSeconds;
    
    const interval = setInterval(() => {
      timeLeft -= 0.01;
  
      if (timeLeft <= 0) {
        timeLeft = 0;
        p.textContent ='';
        timerFinishText();
        clearInterval(interval);
        
      }else{
        timerStartText()
        p.textContent = timeLeft.toFixed(2);
      }
    }, 10);
   
    
  }
function timerFinishText(){
    timer.querySelector('.timerText').classList.add('noneTimeText')
    timer.querySelector('.timerTextRoundFinish').classList.add('noneTimeText')
    timer.querySelector('.timerTextFinish').classList.remove('noneTimeText')
    
}

function timerStartText(){
    timer.querySelector('.timerText').classList.remove('noneTimeText')
    timer.querySelector('.timerTextFinish').classList.add('noneTimeText')
    timer.querySelector('.timerTextRoundFinish').classList.add('noneTimeText')
    
}
function timerFinishRound(){
    timer.querySelector('.timerText').classList.add('noneTimeText')
    timer.querySelector('.timerTextFinish').classList.add('noneTimeText')
    timer.querySelector('.timerTextRoundFinish').classList.remove('noneTimeText')
}


const messages = [
    'كسي هست بزنه من ميكم',
    'سلام ساقی نیومدی',
    'دیوونه شدم رفت',
    'بچه ها چقدر موجودی دارید',
    'حسرت بازس کن پشت دستتم',
    'بچه ها کسی هست باخت سنگین داده باشه',
    'سلام رفقا',
    'همش دستی خدایا',
    'همش بیس تومن بیس تومن میزاره',
    'تو ک هیچ این عباسو بگو چقد باخت',
    'اره خب میاد سنگین میزنه هم برا خودش بدهدهم مارو خراب میکنه',
    'خیلی بده بددددد',
    'باز خراب شد ریتم',
    'صفرمون کرد دیگ نمیشه اینجا برد',
    'مراقب خودت باش باش',
    'چشم ♥️',
    'خخخ چرا نشد🤣',
    'خدا قوت',
    'بعدیو بریم',
    'بچه ها',
    '800 بردم',
    'رفتم برداشت',
    'دسخوش',
    'هرچی میزنم برعکسه',
    'بعد از سال ها اومدم',
    'بازی نکن بنظرم',
    'ما 15سالع تو اینیم',
    'اینجوری دستی میکنن کلا باختی',
    'هاکان ۱دونه بگو',
    'چندتا رو بگید',
    'وای باختم',
    'یا خداااااا',
    'نازنین بسه',
    'Laj dary?',
    '💩💩💩',
    '😂',
    'بای',
    'صفر شدیم',
    'نامرد'
];

const names = [
    'SANTOS',
    'amirali sami',
    '❤️نازنین مطاعی بیرانوند❤️',
    'هاکان ✌️',
    '♣️خّـ..ـان_سیـ..ـگاری♣️',
    'پولدار بی پول',
    'یاس',
    'برنده قمار❤️',
    'هدیه راحله'
];
function chat(){
    const chatContainer = document.querySelector('.messageBox');
    let messageCount = 1;

    setInterval(() => {
      const html = `
        <div class="message">
            <div class="msgSender" >${names[Math.floor(Math.random() * 9) + 0]}</div>
            <div class="msgTxt"> ${messages[Math.floor(Math.random() * 39) + 0]}</div>
        </div>
      `;
      chatContainer.innerHTML += html;
      chatContainer.scrollTop = chatContainer.scrollHeight;
      messageCount++;
    }, 1700);
}
chat();
async function startGame() {
    for (let i = 0; i <= 4; i++) {
        roundnum = i + 1;
        gameStarted = true;
        getMoneyBtnInfo.textContent = String(winMultiManey).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        bet ? rowColor = 'colorGreen' : rowColor = 'colorOrange';
        if(bet === true){
            betCancelBtn.classList.remove('showBtn')
            getMoneyBtn.classList.add('showBtn')
        }
        
        await roundTimeLine(roundnum);
        if (roundnum === 5){
            console.log("game finish ");
            gameStarted = false 
            cancelBtnInfo.classList.add('hideBtn')
            if(pendding===true){
                bet = true;
            }
        }else{
            console.log("round " + roundnum + "finished");
        } 
    }
}

async function main() {
    
    for (let j = 0; j <= 1000; j++) {
        gameCount++;
        document.querySelectorAll('.gameRounds').forEach((row) => {
            row.querySelectorAll('.box').forEach((box) => {
                box.classList.remove('boxOpacity');
                box.classList.remove("boxBg");
                box.classList.remove('boxSelectedBorder');
                box.classList.remove('boxLossBorder');
                const boxImg = box.querySelector('.img');
                boxImg.classList.remove('openImg');
            })
            row.querySelectorAll('.roundInfo').forEach(roundInfo => {
                roundInfo.classList.remove(`offinfo`);
            })
        })
        
        timer.classList.add('firstTimer');
        startCountdown(7);
        if(bet === true){
            wallet -= inputValue;
            moneyWallet.textContent = String(wallet).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
        timer.classList.remove('firstTimer');
        await new Promise(resolve => setTimeout(resolve, 100));
        await startGame();
    }
}

main();
