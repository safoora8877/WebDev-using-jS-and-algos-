const checkButton = document.querySelector("#check-btn");

const inputElement = document.querySelector("#text-input");

const resultMessage = document.querySelector("#result");

const checkValidity = () => {
  const value = inputElement.value;
  if (value === "") {
    alert("Please input a value");
  } else {
    checkPalindrome(value);
  }
};

checkButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkValidity();
});

const checkPalindrome = (string) => {
  const cleaned = string.replace(/[^a-z0-9]/gi, "").toLowerCase();

  const reversed = [...cleaned].reverse().join("");

  const oldMessage = document.querySelector("#result");
  if (oldMessage) {
    oldMessage.remove();
  }

  resultMessage.style.color = "red";

  if (cleaned === reversed) {
    resultMessage.innerText = `${string} is a palindrome`;
    checkButton.insertAdjacentElement("afterend", resultMessage);
  } else {
    resultMessage.innerText = `${string} is not a palindrome`;
    checkButton.insertAdjacentElement("afterend", resultMessage);
  }
};
