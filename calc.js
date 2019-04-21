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
	let isFirstDigit = true;
	let isFirstNumberPriority = true;

	const displayDigit = () => {
		const getDigit = e => e.target.innerText;
		if (isFirstDigit) {
			isFirstDigit = false;
			inputField.value = '';
		}
		inputField.value += getDigit(event);
	};

	const clear = () => {
		if (event.target == clearAllButton) {
			firstNumber = 0;
			secondNumber = 0;
			isFirstNumberPriority = true;
		}
		inputField.value = 0;
		isFirstDigit = true;
	};

	const displayNumber = () => {
		const getNumber = () => {
			let {value} = inputField;
			isFirstDigit = true;
			return +value;
		};
		(isFirstNumberPriority && !firstNumber || !isFirstNumberPriority) ? firstNumber = getNumber() : secondNumber = getNumber();
	};

	const getOperation = () => {
		let {target: {dataset: {operation}}} = event;
		operationType = operation;
		isFirstNumberPriority = true;
	};

	const changeSign = () => {
		let number = +inputField.value;
		number = -number;
		inputField.value = number;
	}

	const getResult = () => {
		displayNumber();
		const sum = (a,b) => a + b;
		const distract = (a,b) => a - b;
		const multiply = (a,b) => a * b;
		const divide = (a,b) => a / b;
		const arithmetic = {
			'+' : sum(firstNumber, secondNumber),
			'-' : distract(firstNumber, secondNumber),
			'*' : multiply(firstNumber, secondNumber),
			'/' : divide(firstNumber, secondNumber),
		}
		isFirstNumberPriority = false;
		return arithmetic[operationType];
	};

	const displayResult = () => {
		inputField.value = getResult();
	};

	numberButtons.forEach((num) => { 
		num.addEventListener('click', displayDigit);
	});
 	operationButtons.forEach(operation => {
		operation.addEventListener('click', getOperation);	
		operation.addEventListener('click', displayNumber);	
	});
	plusMinus.addEventListener('click', changeSign);
	resultButton.addEventListener('click', displayResult);
	clearButton.addEventListener('click', clear);
	clearAllButton.addEventListener('click', clear);
};

initCalculator();