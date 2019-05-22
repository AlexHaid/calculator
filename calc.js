const elements = {
	inputField: document.querySelector('.calculator__inputfield'),
	numberButtons: document.querySelectorAll('.buttons-container__item-buttons-container__item--number'),
	operationButtons: document.querySelectorAll('.buttons-container__item-buttons-container__item--operation'),
	resultButton: document.querySelector('.buttons-container__item-buttons-container__item--result')
};

const utils = {
	trigger: 'first',
	buttonTrigger: null
};

const components = {
	firstNumber: null,
	secondNumber: null,
	operator: null,
	result: null
};

const getResult = (e, firstNumber, secondNumber, operator) => {
	getNumber(e);
	const sum = (a,b) => a + b;
	const distract = (a,b) => a - b;
	const multiply = (a,b) => a * b;
	const divide = (a,b) => a / b;
	const arithmetic = {
		'+' : sum(components.firstNumber, components.secondNumber),
		'-' : distract(components.firstNumber, components.secondNumber),
		'*' : multiply(components.firstNumber, components.secondNumber),
		'/' : divide(components.firstNumber, components.secondNumber)
	};
	components.result = arithmetic[components.operator];
	elements.inputField.value = components.result;
	return components.result;
};

const getDigit = (e) => e.target.innerText;

const setInputField = (e) => {
	let {trigger} = utils;
	if (trigger === 'first' && +elements.inputField.value === 0 || trigger === 'second') {
		elements.inputField.value = '';
	}
	elements.inputField.value += getDigit(e);
	utils.trigger = setTrigger(e);
}

const setNumbers = (e) =>  {
	if (components.secondNumber === null) {
		(!components.firstNumber) ? components.firstNumber = +elements.inputField.value : components.secondNumber = +elements.inputField.value;
	} else {
		components.firstNumber = +elements.inputField.value;
	};


	if (utils.buttonTrigger === 'result' && e.target.dataset.type === 'operation') {
		components.secondNumber = null;
	};

	if (e.target.dataset.type == 'operation') {
		utils.buttonTrigger = 'operation'
	} else {
		utils.buttonTrigger = 'result'
	};
}



const getNumber = (e) => {
	utils.trigger = setTrigger(e);
	setNumbers(e);
	return elements.inputField.value;
}

const setOperator = (e) => {
	components.operator = e.target.dataset.operation;
}

const setTrigger = (e) => {
	let pressedButton = e.target.dataset.type;
	let numberOrder = null;
	return numberOrder = (pressedButton == 'operation') ? 'second' : 'first';
};

const initCalculator = () => {
	elements.numberButtons.forEach((num) => {
		num.addEventListener('click', setInputField);
	});
	elements.operationButtons.forEach((op) => {
		op.addEventListener('click', setOperator);
		op.addEventListener('click', getResult);
	});
	elements.resultButton.addEventListener('click', getResult);
};

initCalculator();





