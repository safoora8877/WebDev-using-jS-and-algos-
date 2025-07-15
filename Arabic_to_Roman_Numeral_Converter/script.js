const convertButton = document.getElementById("convert-btn");
const number = document.getElementById("number");
const output = document.getElementById("output");

const data = [
  {
    symbol: "M",
    value: 1000,
  },
  {
    symbol: "CM",
    value: 900,
  },
  {
    symbol: "D",
    value: 500,
  },
  {
    symbol: "CD",
    value: 400,
  },
  {
    symbol: "C",
    value: 100,
  },
  {
    symbol: "XC",
    value: 90,
  },
  {
    symbol: "L",
    value: 50,
  },
  {
    symbol: "XL",
    value: 40,
  },
  {
    symbol: "X",
    value: 10,
  },
  {
    symbol: "IX",
    value: 9,
  },
  {
    symbol: "V",
    value: 5,
  },
  {
    symbol: "IV",
    value: 4,
  },
  {
    symbol: "I",
    value: 1,
  },
];

const convertToRoman = (input) => {
  if (input === 0) {
    return "";
  }

  for (let i = 0; i < data.length; i++) {
    if (input >= data[i].value) {
      return data[i].symbol + convertToRoman(input - data[i].value);
    }
  }
};
const handleInput = () => {
  const inputVal = parseInt(number.value);

  switch (true) {
    case isNaN(inputVal):
      output.innerHTML = "Please enter a valid number";

      break;
    case inputVal < 0:
      output.innerHTML = "Please enter a number greater than or equal to 1";
      break;

    case inputVal >= 4000:
      output.innerHTML = "Please enter a number less than or equal to 3999";
      break;

    default:
      const roman = convertToRoman(inputVal);
      output.innerHTML = `<strong>${roman}</strong>`;
      number.value = "";
  }
};

convertButton.addEventListener("click", handleInput);
