const elements = {
  inputField: [...document.getElementsByClassName("calculator__inputfield")][0],
  numberButtons: [
    ...document.getElementsByClassName("buttons-container_item--number")
  ],
  operationButtons: [
    ...document.getElementsByClassName("buttons-container_item--operation")
  ],
  resultButton: [
    ...document.getElementsByClassName("buttons-container_item--result")
  ]
};

const utils = {
  trigger: "first",
  buttonTrigger: null
};

const components = {
  firstNumber: null,
  secondNumber: null,
  operator: null,
  result: null
};

const truncateCalculation = someRes => {
  let count = 0;
  let position = 0;
  let newStr = "";
  let rightZerosAmount = 0;
  let roundedNum = null;
  someRes += "";
  for (let i = 0; i < someRes.length; i++) {
    position = i;
    if (someRes[i] === someRes[i + 1]) {
      count++;
    } else {
      count = 0;
    }
    if (count === 9) {
      break;
    }
  }
  if (count === 9) {
    newStr = someRes.slice(0, position);
    newStr = +newStr;
    roundedNum = newStr.toFixed(position - count) + "";
  } else {
    roundedNum = someRes;
  }
  for (let i = 0; i < roundedNum.length; i++) {
    if (roundedNum[roundedNum.length - i - 1] === "0") {
      rightZerosAmount++;
    } else {
      break;
    }
  }
  if (rightZerosAmount !== 0) {
    roundedNum = roundedNum.slice(0, -rightZerosAmount);
  }

  return +roundedNum;
};

const getResult = (e, firstNumber, secondNumber, operator) => {
  let ableCalc = true;
  getNumber(e);
  const sum = (a, b) => a + b;
  const distract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;
  const arithmetic = {
    "+": sum(components.firstNumber, components.secondNumber),
    "-": distract(components.firstNumber, components.secondNumber),
    "*": multiply(components.firstNumber, components.secondNumber),
    "/": divide(components.firstNumber, components.secondNumber)
  };
  if (components.secondNumber === null) {
    ableCalc = false;
  }
  if (ableCalc === true) {
    components.result = truncateCalculation(arithmetic[components.operator]);
    elements.inputField.value = components.result;
  }

  return components.result;
};

const getDigit = e => e.target.innerText;

const setInputField = e => {
  let { trigger } = utils;
  let clearCondition =
    (trigger === "first" &&
      elements.inputField.value === "0" &&
      getDigit(e) !== ".") ||
    (trigger === "second" && getDigit(e) !== ".");
  if (clearCondition) {
    elements.inputField.value = "";
  }
  elements.inputField.value += getDigit(e);
	utils.trigger = setTrigger(e);
	if (getDigit(e) === '.') {
		e.target.disabled = true;
	}
};

const setNumbers = e => {
  if (components.secondNumber === null) {
    components.firstNumber === null
      ? (components.firstNumber = +elements.inputField.value)
      : (components.secondNumber = +elements.inputField.value);
  } else {
    components.firstNumber = +elements.inputField.value;
  }
  if (e.target.dataset.type === "operation") {
    utils.buttonTrigger = "operation";
  } else {
    utils.buttonTrigger = "result";
  }
};

const enableButtons = () => {
	for (numBtn in elements.numberButtons) {
		let currentBtn = elements.numberButtons[numBtn];
		if (currentBtn.disabled) {
			currentBtn.disabled = false;
		}
	}
}

const getNumber = e => {
  utils.trigger = setTrigger(e);
  setNumbers(e);

  return elements.inputField.value;
};

const setOperator = e => {
  components.operator = e.target.dataset.operation;
};

const setTrigger = e =>
  e.target.dataset.type === "operation" ? "second" : "first";

const initCalculator = () => {
  elements.numberButtons.forEach(num => {
		num.addEventListener("click", setInputField);
  });
  elements.operationButtons.forEach(op => {
    op.addEventListener("click", setOperator);
		op.addEventListener("click", getResult);
		op.addEventListener('click', enableButtons);
  });
	elements.resultButton[0].addEventListener("click", getResult);
};

initCalculator();