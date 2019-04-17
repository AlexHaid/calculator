const numberButtons = document.querySelectorAll('.buttons-container__number');
const operationButtons = document.querySelectorAll('.buttons-container__operation');
const resultButton = document.querySelector('.buttons-container__result');
const workField = document.querySelector('.calculator__workfield');
const plusMinus = document.querySelector('.buttons-container__change-sign');
const clearButton = document.querySelector('.buttons-container__clear-current');
const clearAllButton = document.querySelector('.buttons-container__clear-all');
let isSecondOperand = false;
let {value} = workField;
let firstNumber = null;
let secondNumber = null;
let operationType = null;
let result = null;
let isFirstDigit = true;
let isFirstNumberPriority = true;

const getDigit = (event) => {
	let {target: {innerText}} = event;
	let digit = innerText;
	return digit;
};

const writeDigit = () => {
	if (isFirstDigit) {
		isFirstDigit = false;
		workField.value = '';
	}
	workField.value += getDigit(event);
};

const clear = () => {
	workField.value = 0;
	isFirstDigit = true;
};

const clearAll = () => {
	workField.value = 0;
	firstNumber = 0;
	secondNumber = 0;
	isFirstDigit = true;
	isFirstNumberPriority = true;
};

numberButtons.forEach((num) => { 
	num.addEventListener('click', getDigit);
});

numberButtons.forEach((num) => { 
	num.addEventListener('click', writeDigit);
});

const getNumber = () => {
	let number = null;
	isFirstDigit = true;
	console.log(value);
	return number = +workField.value;
};

const writeNumber = () => {
	console.log(isFirstNumberPriority);
	if (isFirstNumberPriority) {
		!firstNumber ? firstNumber = getNumber() : secondNumber = getNumber();
	} else {
		firstNumber = getNumber();
	}
	console.log(firstNumber + ' ' + secondNumber);
};

const getOperation = () => {
	let {target: {dataset: {operation}}} = event;
	operationType = operation;
	console.log(operationType);
	isFirstNumberPriority = true;
	return operationType;
};

const sum = (a,b) => {
	console.log(a+b);
	return a + b;
};

const diff = (a,b) => {
	return a - b;
};

const prod = (a,b) => {
	return a * b;
};

const quotient = (a,b) => {
	return a / b;
};

const changeSign = () => {
	let number = +value;
	number = 0 - number;
	workField.value = number;

}

const getResult = () => {
	getNumber();
	writeNumber();
	switch (operationType) {
		case '+' : 
			result = sum(firstNumber, secondNumber);	
			break;
		case '-' : 
			result = diff(firstNumber, secondNumber);
			break;
		case '*' : 
			result = prod(firstNumber, secondNumber);
			break;
		case '/' : 
			result = quotient(firstNumber, secondNumber);
			break;
		default:
			result = 'Error!';
	};
	isFirstNumberPriority = false;
	return result;	
};

const writeResult = () => {
	workField.value = result;
};

const initCalculator = () => {
	numberButtons.forEach((num) => { 
		num.addEventListener('click', getDigit);
	});
 	operationButtons.forEach(operation => {
		operation.addEventListener('click', getOperation);	
	});
	operationButtons.forEach(operation => {
		operation.addEventListener('click', getNumber);	
	});
	operationButtons.forEach(operation => {
		operation.addEventListener('click', writeNumber);	
	});
	plusMinus.addEventListener('click', changeSign);
	resultButton.addEventListener('click', getResult);
	resultButton.addEventListener('click', writeResult);
	clearButton.addEventListener('click', clear);
	clearAllButton.addEventListener('click', clearAll);
};

initCalculator();
    