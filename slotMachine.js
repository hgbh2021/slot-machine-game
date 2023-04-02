const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;

const symbol = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const val = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};
const spin = () => {
  const symb = [];
  for (const [sybl, val] of Object.entries(symbol)) {
    for (let i = 0; i < val; i++) {
      symb.push(sybl);
    }
  }
  const reels = [];
  for (let i = 0; i < cols; i++) {
    reels.push([]);
    const reel = [...symb];
    for (let j = 0; j < rows; j++) {
      const randI = Math.floor(Math.random() * reel.length);
      const selectedI = reel[randI];
      reels[i].push(selectedI);
      reel.splice(selectedI, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const newReel = [];
  for (let i = 0; i < rows; i++) {
    newReel.push([]);
    for (let j = 0; j < cols; j++) {
      newReel[i].push(reels[j][i]);
    }
  }
  return newReel;
};

function deposit() {
  while (true) {
    const money = prompt("enter the amount of money: ");
    const valD = parseFloat(money);
    if (isNaN(valD) || valD <= 0) {
      console.log("invalid amount of money deposit ");
    } else {
      return valD;
    }
  }
}

const getNumberOfLine = () => {
  while (true) {
    const numLine = prompt("enter the number of lines(1-3 only): ");
    const valid = parseFloat(numLine);
    if (isNaN(valid) || valid <= 0 || valid > 3) {
      console.log("invalid number of lines ");
    } else {
      return valid;
    }
  }
};

const getBalance = (balance, numberOfLine) => {
  while (true) {
    const betAmount = prompt("enter the amount of bet per line: ");
    const valid = parseFloat(betAmount);
    if (isNaN(valid) || valid <= 0 || balance / numberOfLine < betAmount) {
      console.log("invalid bet Amount used ");
    } else {
      return valid;
    }
  }
};

const print = (a) => {
  for (const row of a) {
    let str = "";
    for (const [i, symbol] of row.entries()) {
      str += symbol;
      if (i < row.length - 1) {
        str += " | ";
      }
    }
    console.log(str);
  }

  // console.log(str)
};

const getWinnings = (a, bet, numberOfLine) => {
  let winnings = 0;
  for (let i = 0; i < numberOfLine; i++) {
    const symbl = a[i];
    let same = true;
    for (const sym of symbl) {
      if (sym != symbl[0]) {
        same = false;
        break;
      }
    }
    if (same) {
      winnings += bet * val[symbl[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log(" your balance is $"+ balance)
    const numberOfLine = getNumberOfLine();
    const bal = getBalance(balance, numberOfLine);
    balance -= bal * numberOfLine;
    // console.log(bal);
    const ans = spin();
    // console.log(ans);
    const a = transpose(ans);
    print(a);
    const wins = getWinnings(a, bal, numberOfLine);
    balance += wins;
    console.log(" you won $" + wins.toString());

    if (balance <= 0) {
      console.log(" Your money has been exhausted ");
      break;
    }
    const playAgain = prompt(" Want to play again (y/n)? ");
    if (playAgain != "y" ){
      break;
    }
  }
};
game();
