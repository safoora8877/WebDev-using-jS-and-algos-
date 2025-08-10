const userInput = document.querySelector("#user-input");
const clearButton = document.querySelector("#clear-btn");
const checkButton = document.querySelector("#check-btn");
const result = document.querySelector("#results-div");

const regexWithCode = /^1\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
const regexWithoutCode = /^(\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4})$/;

const acceptingList = [regexWithCode, regexWithoutCode];

checkButton.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (input === "") {
    result.textContent = "Please provide a phone number";
    return;
  }
  const isValid = acceptingList.some((regex) => regex.test(input));
  if (isValid) {
    result.textContent = `Valid US number: ${input}`;
    result.style.color = "green";
  } else {
    result.textContent = `Invalid US number: ${input}`;

    result.style.color = "red";
  }
});
clearButton.addEventListener("click", () => {
  userInput.value = "";
  result.textContent = "";
});
