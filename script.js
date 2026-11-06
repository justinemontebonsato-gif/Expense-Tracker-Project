const transactionForm = document.querySelector("#transaction-form");

transactionForm.addEventListener("submit", function (addTransaction) {
  let transactionType = document.querySelector("#transaction-type").value;
  let transactionAmount = document.querySelector("#transaction-amount").value;

  let transactionDate = document.querySelector("#transaction-date").valueAsDate;
  if (!transactionDate) transactionDate = new Date();

  let transactionCategory = document.querySelector(
    "#transaction-category",
  ).value;
  if (!transactionCategory) transactionCategory = "Transaction";

  console.log(transactionType);
  console.log(transactionAmount);
  console.log(transactionDate);
  console.log(transactionCategory);

  addTransaction.preventDefault();
});

let addTransactionBtn = document.querySelector("#add-transaction-btn");
