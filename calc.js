const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const resultButton = document.querySelector('.result');
const workField = document.querySelector('.workfield');
let isSecondOperand = false;
const calculate = () => {
	let firstOperand = null;
	let secondOperand = null;
	let operationType = null;
	let result = null;
	let {value} = workField;

	const inputOperand = () => {
		if (!isSecondOperand) {
			firstOperand = +value;
			isSecondOperand = true;
		} else {
			secondOperand = +value;
		}
	}

	const typeNumber = (event) => {
		const isFirstOperand = !+value || value == firstOperand;
		let {target: {innerText}} = event;
		value = !isFirstOperand ? value + innerText : '' + innerText;
		workField.value = value;		
	};

	numberButtons.forEach((num) => { 
		num.addEventListener('click', typeNumber);
	});

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
	const registerOperand = () => {
		inputOperand();
		let {target: {dataset: {operation}}} = event;
		operationType = event.target.dataset.operation;
	}
 	operationButtons.forEach(operation => {
		operation.addEventListener('click', registerOperand);	
	});

	const formResult = () => {
		getResult();
		isSecondOperand = false;
		workField.value = value = result;
	}
	resultButton.addEventListener('click', formResult);
}

calculate();