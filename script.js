/* 
  To modify:
  
  Refactor to a transactions array:
    - Stop using the page as your memory. Keep your data in an array, and let one function redraw the page from it.
    - The problem now: your data lives in two places, the total variables and the HTML. When you delete, you dig the
      amount out of the page (previousElementSibling.value). That breaks easily.
*/

const transactionForm = document.querySelector("#transaction-form");
let totalBalance = 0.0;
let totalIncome = 0.0;
let totalExpense = 0.0;
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
            <p class="transaction-history__title"></p>
            <p class="transaction-history__date">${date}</p>
            </div>
        </div>

        <div class="transaction-history__list-item-div">
            <data class="${dataClass}" value="${amount}">${transactionSymbol}\u20B1${amount}</data
            >
            <button class="delete-item-btn" type="button" aria-label="delete transaction item">
                <img
                class="transaction-history__delete-item-btn"
                alt = ""
                src="images/delete_icon.png"
                data-note="${listType}"
                >
            </button>
        </div>
    `;
  li.querySelector(".transaction-history__title").textContent = category;

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
    totalIncomeEl.value = totalIncome.toFixed(2);
    totalIncomeEl.textContent = `\u20B1${totalIncome.toFixed(2)}`;
  } else {
    totalBalance -= transactionAmount;
    totalExpense += transactionAmount;
    totalExpenseEl.value = totalExpense.toFixed(2);
    totalExpenseEl.textContent = `\u20B1${totalExpense.toFixed(2)}`;
  }
  totalBalanceEl.value = totalBalance.toFixed(2);
  totalBalanceEl.textContent = `\u20B1${totalBalance.toFixed(2)}`;

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
  if (target.matches(".transaction-history__delete-item-btn")) {
    const dataEl = Number(target.parentElement.previousElementSibling.value);
    const isIncome = target.dataset.note === "income";
    if (isIncome) {
      totalBalance -= dataEl;
      totalIncome -= dataEl;
      totalIncomeEl.value = totalIncome.toFixed(2);
      totalIncomeEl.textContent = `\u20B1${totalIncome.toFixed(2)}`;
    } else {
      totalBalance += dataEl;
      totalExpense -= dataEl;
      totalExpenseEl.value = totalExpense.toFixed(2);
      totalExpenseEl.textContent = `\u20B1${totalExpense.toFixed(2)}`;
    }
    totalBalanceEl.value = totalBalance.toFixed(2);
    totalBalanceEl.textContent = `\u20B1${totalBalance.toFixed(2)}`;

    target.closest("li").remove();
  }
});
