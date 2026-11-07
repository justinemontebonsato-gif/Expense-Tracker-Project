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

function createTransactionItem(amount, transactionType, date, category) {
  const li = document.createElement("li");
  li.className = "transaction-history__list-item";
  const isIncome = transactionType === "income";
  const icon = isIncome ? "images/income_icon.png" : "images/expense_icon.png";
  const altText = isIncome ? "income icon" : "expense icon";
  const dataClass = isIncome
    ? "transaction-history__income-amount"
    : "transaction-history__expense-amount";
  const transactionSymbol = isIncome ? "+" : "-";
  const listType = isIncome ? "income" : "expense";

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
            data-note="${listType}"
            class="transaction-history__delete-item-btn"
            >
        </div>
    `;

  return li;
}

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

transactionHistoryList.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches("img.transaction-history__delete-item-btn")) {
    let isIncome = target.dataset.note == "income";
    if (isIncome) {
      console.log(totalBalance);
      totalBalance -= Number(target.previousElementSibling.value);
      totalIncome -= Number(target.previousElementSibling.value);
      totalIncomeEl.value = totalIncome;
      totalIncomeEl.textContent = `\u20B1${totalIncome}`;
    } else {
      totalBalance += Number(target.previousElementSibling.value);
      totalExpense -= Number(target.previousElementSibling.value);
      totalExpenseEl.value = totalExpense;
      totalExpenseEl.textContent = `\u20B1${totalExpense}`;
    }
    totalBalanceEl.value = totalBalance;
    totalBalanceEl.textContent = `\u20B1${totalBalance}`;

    target.closest("li").remove();
  }
});