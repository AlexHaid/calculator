const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const resultButton = document.querySelector('.result');
const workField = document.querySelector('.workfield');
let isSecondOperand = false;
let {value} = workField;
let firstOperand = null;
let secondOperand = null;
let operationType = null;
let result = null;
const calculate = () => {
	numberButtons.forEach((num) => { 
		num.addEventListener('click', typeNumber);
	});
 	operationButtons.forEach(operation => {
		operation.addEventListener('click', registerOperand);	
	});
	resultButton.addEventListener('click', formResult);
}

const typeNumber = (event) => {
	const isFirstOperand = !+value || value == firstOperand;
	let {target: {innerText}} = event;
	value = !isFirstOperand ? value + innerText : innerText;
	workField.value = value;
	return value;
};

const inputOperand = () => {
	!isSecondOperand ? (firstOperand = +value, isSecondOperand = true) : secondOperand = +value;
}

const registerOperand = () => {
	inputOperand();
	let {target: {dataset: {operation}}} = event;
	operationType = operation;
	return operationType;
}

const getResult = () => {
	inputOperand();
	switch (operationType) {
		case '+' : 
			result = firstOperand + secondOperand;	
			break;
		case '-' : 
			result = firstOperand - secondOperand;
			break;
		case '*' : 
			result = firstOperand * secondOperand;
			break;
		case '/' : 
			result = firstOperand / secondOperand;
			break;
		default:
			result = 'Error!';
	}
	return result;	
};

const formResult = () => {
	getResult();
	isSecondOperand = false;
	workField.value = value = result;
}

calculate();