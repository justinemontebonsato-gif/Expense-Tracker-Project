const transactionForm = document.querySelector("#transaction-form");
let totalBalance = 0;
let totalIncome = 0;
let totalExpense = 0;
const totalBalanceEl = document.querySelector("#total-balance-el");
const totalIncomeEl = document.querySelector("#total-income-el");
const totalExpenseEl = document.querySelector("#total-expense-el");
const transactionHistoryList = document.querySelector(
  ".transaction-history__list",
);
let deleteBtn = null;

transactionForm.addEventListener("submit", function (addTransaction) {
  addTransaction.preventDefault();

  let transactionType = document.querySelector("#transaction-type").value;
  let transactionAmount = Number(
    document.querySelector("#transaction-amount").value,
  );

  let transactionDate = document.querySelector("#transaction-date").valueAsDate;
  if (!transactionDate) transactionDate = new Date();
  transactionDate = transactionDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let transactionCategory = document.querySelector(
    "#transaction-category",
  ).value;
  if (!transactionCategory) transactionCategory = "Untitled Transaction";

  console.log(transactionType);
  console.log(transactionAmount);
  console.log(transactionDate);
  console.log(transactionCategory);

  if (transactionType === "income") {
    totalBalance += transactionAmount;
    totalIncome += transactionAmount;
    totalIncomeEl.value = totalIncome;
    totalIncomeEl.textContent = `\u20B1${totalIncome}`;
  } else {
    totalBalance -= transactionAmount;
    totalExpense += transactionAmount;
    totalExpenseEl.value = totalExpense;
    totalExpenseEl.textContent = `\u20B1${totalExpense}`;
  }
  totalBalanceEl.value = totalBalance;
  totalBalanceEl.textContent = `\u20B1${totalBalance}`;

  const transactionItem = createTransactionItem(
    transactionAmount,
    transactionType,
    transactionDate,
    transactionCategory,
  );

  transactionHistoryList.prepend(transactionItem);
});

function createTransactionItem(amount, transactionType, date, category) {
  const li = document.createElement("li");
  li.className = "transaction-history__list-item";
  const income = transactionType === "income";
  const icon = income ? "images/income_icon.png" : "images/expense_icon.png";
  const altText = income ? "income icon" : "expense icon";
  const dataClass = income
    ? "transaction-history__income-amount"
    : "transaction-history__expense-amount";
  const transactionSymbol = income ? "+" : "-";

  li.innerHTML = `
        <div class="transaction-history__list-item-div">
            <img
            src="${icon}"
            class="transaction-history__income-expense-icon"
            alt="${altText}"
            >
            <div>
            <p class="transaction-history__title">${category}</p>
            <p class="transaction-history__date">${date}</p>
            </div>
        </div>

        <div class="transaction-history__list-item-div">
            <data class="${dataClass}" value="${amount}">${transactionSymbol}\u20B1${amount}</data
            >
            <img
            src="images/delete_icon.png"
            alt="${altText}"
            class="transaction-history__delete-item-btn"
            >
        </div>
    `;

  return li;
}

deleteBtn.addEventListener("click", (e) => {
  alert("hello");
  const deleteIncome = e.target.alt === "income icon";
  if (deleteIncome) {
    totalBalance -= Number(e.target.closest("data").value);
    totalIncome -= Number(e.target.closest("data").value);
    totalIncomeEl.textContent = `\u20B1${totalIncome}`;
  } else {
    totalBalance += Number(e.target.closest("data").value);
    totalExpense -= Number(e.target.closest("data").value);
    totalExpenseEl.textContent = `\u20B1${totalExpense}`;
  }
  totalBalanceEl.textContent = `\u20B1${totalBalance}`;
  e.target.closest("li")?.remove();
});

/*

document.querySelector(
  ".transaction-history__delete-item-btn",
);
*/
