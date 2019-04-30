const initCalculator = () => {	
	const numberButtons = document.querySelectorAll('.buttons-container__number');
	const operationButtons = document.querySelectorAll('.buttons-container__operation');
	const resultButton = document.querySelector('.buttons-container__result');
	const inputField = document.querySelector('.calculator__inputfield');
	const plusMinus = document.querySelector('.buttons-container__change-sign');
	const clearButton = document.querySelector('.buttons-container__clear-current');
	const clearAllButton = document.querySelector('.buttons-container__clear-all');
	let firstNumber = null;
	let secondNumber = null;
	let operationType = null;

	
	numberButtons.forEach((num) => { 
		num.addEventListener('click', displayDigit);
	});
 	operationButtons.forEach(operation => {
		operation.addEventListener('click', () => {
			operationType = getOperation();
			firstNumber = getNumber();
		});
	});

	resultButton.addEventListener('click', () => {
		secondNumber = getNumber();
		inputField.value = getResult(firstNumber, secondNumber, operationType);
	});
};

const displayDigit = () => {
	const inputField = document.querySelector('.calculator__inputfield');
	let {dataset: {readyToClear}} = inputField;
	const getDigit = e => e.target.innerText;
	if (!+inputField.value || readyToClear == 'true') {
		inputField.value = '';
		inputField.dataset.readyToClear = false;
	};
	inputField.value += getDigit(event);
};

const getOperation = () => {
	let {target: {dataset: {operation}}} = event;
	const inputField = document.querySelector('.calculator__inputfield');
	inputField.dataset.readyToClear = true;
	return operation;
};

const getNumber = () => {
	const inputField = document.querySelector('.calculator__inputfield');
	return +inputField.value;
};

const getResult = (first, second, op) => {
	const sum = (a,b) => a + b;
	const distract = (a,b) => a - b;
	const multiply = (a,b) => a * b;
	const divide = (a,b) => a / b;
	const arithmetic = {
		'+' : sum(first, second),
		'-' : distract(first, second),
		'*' : multiply(first, second),
		'/' : divide(first, second),
	}
	return arithmetic[op];
};

initCalculator();