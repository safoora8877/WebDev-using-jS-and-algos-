let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const currencyUnit = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1.0,
  FIVE: 5.0,
  TEN: 10.0,
  TWENTY: 20.0,
  "ONE HUNDRED": 100.0,
};

const inputCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const enteredPrice = document.getElementById("entered-price");
enteredPrice.innerHTML = price;
const cashDetails = document.getElementById("details");
const changeMsg = document.getElementById("change-due");

for (let [name, value] of cid) {
  const idSafeName = name.toLowerCase();

  const p = document.createElement("p");
  p.id = idSafeName;
  p.innerHTML = `${name}: <span id="${idSafeName}-left">${value.toFixed(
    2
  )}</span>`;

  cashDetails.appendChild(p);
}

function calculateChange(price, cash, cid) {
  let changeDue = +(cash - price).toFixed(2);
  let totalCID = +cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (changeDue === 0) {
    changeMsg.textContent = "No change due - customer paid with exact cash";
    return;
  }

  if (changeDue > totalCID) {
    changeMsg.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let cidCopy = cid.map(([unit, amount]) => [unit, amount]);
  cidCopy.reverse();

  let changeArr = [];

  for (let [unit, amount] of cidCopy) {
    let unitValue = currencyUnit[unit];
    let amountUsed = 0;

    while (changeDue >= unitValue && amount > 0) {
      changeDue = +(changeDue - unitValue).toFixed(2);
      amount = +(amount - unitValue).toFixed(2);
      amountUsed = +(amountUsed + unitValue).toFixed(2);
    }

    if (amountUsed > 0) {
      changeArr.push([unit, amountUsed]);

      for (let i = 0; i < cid.length; i++) {
        if (cid[i][0] === unit) {
          cid[i][1] = +(cid[i][1] - amountUsed).toFixed(2);
          break;
        }
      }
    }
  }

  if (changeDue > 0) {
    changeMsg.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let remainingTotal = +cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);
  let status = remainingTotal === 0 ? "CLOSED" : "OPEN";

  let message = `Status: ${status}`;
  for (let [unit, value] of changeArr) {
    message += ` ${unit}: $${value}`;
  }

  changeMsg.textContent = message;

  cid.forEach(([unit, amount]) => {
    const id = unit.toLowerCase() + "-left";
    const span = document.getElementById(id);
    if (span) span.textContent = amount.toFixed(2);
  });
}

purchaseBtn.addEventListener("click", () => {
  const cashGiven = parseFloat(inputCash.value);
  calculateChange(price, cashGiven, cid);
});
