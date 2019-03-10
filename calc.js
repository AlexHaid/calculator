const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const resultButton = document.querySelector('.result');
const workField = document.querySelector('.workfield');
const calcs = document.querySelector('.calculations');
let currentResult = 0;
let isSecondOperand = false;
let Calculate = () => {
	let firstOperand, secondOperand, operationType;
	let operationsArray = Array.from(operationButtons);
	let numArr = Array.from(numberButtons);
	let result;
	let hasWorkfieldNumbers = false;
	const inputOperand = () => {
		if (!isSecondOperand) {
			firstOperand = +workField.value;
			isSecondOperand = true;
			hasWorkfieldNumbers = true;
		} else {
			secondOperand = +workField.value;
		}
	}
	for (num of numArr) {
		num.addEventListener('click', function() {
			typeNumber(this);
		});
	};
	const typeNumber = (numberBtn) => {
		if (workField.value == 0 || workField.value == firstOperand) {
			workField.value = '';
		}
		workField.value = workField.value + numberBtn.innerText;
	}
			
	const getResult = () => {
		inputOperand();
		switch (operationType) {
			case '+' : {
				result = firstOperand + secondOperand;
			}
			break;
			case '-' : {
				result = firstOperand - secondOperand;
			}
			break;
			case '*' : {
				result = firstOperand * secondOperand;
			}
			break;
			case '/' : {
				if (secondOperand === 0) {
					result = 'Infinity';
				}
				result = firstOperand / secondOperand;
			}
			break;
		}
		return result;
	};

	for (operation of operationsArray) {
		operation.addEventListener('click', function() {
			inputOperand();
			operationType = this.dataset.operation;
		});
	}
		resultButton.addEventListener('click', function() {
			getResult();
			isSecondOperand = false;
			workField.value = result;
		});
		
	
}

Calculate();