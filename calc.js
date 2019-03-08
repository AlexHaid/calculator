var numberButtons = document.getElementsByClassName('number'),
	ops = document.getElementsByClassName('operation'),
	resultButton = document.getElementsByClassName('result')[0],
	workField = document.getElementsByClassName('workfield')[0],
	currentResult = 0,
	operationFlag = false,
	lastOperation,
	// firstOperation = true;
	lastOperand;
calcs = document.getElementsByClassName('calculations')[0];
currentText = workField.value;
for (var number of numberButtons){
	number.addEventListener('click', function(){
		if (operationFlag) {
			operationFlag = false;
			workField.value = '';
			console.log(currentResult);
			workField.value = workField.value + this.innerHTML;
		} else {
			workField.value = workField.value + this.innerHTML;
			console.log(currentResult);
		}          
	});
};
				
for (var op of ops) {
	op.addEventListener('click', function() {
		if (!operationFlag) {
			operationFlag = true;
		}
		
		if (calcs.value == '') {
			firstOperand = +workField.value;
			
		} else {
			lastOperand = +workField.value;
			
		}
		switch (this.dataset.operation) {
			case '+' : {
				currentResult += firstOperand;
				console.log(currentResult);
				if (calcs.value == '') {
					workField.value = firstOperand;
				} else {
					workField.value = currentResult;
				}
				if (calcs.value == '') {
					calcs.value = calcs.value + firstOperand;
				} else {
					calcs.value = calcs.value + lastOperand;
				}
				calcs.value = calcs.value + ' + ';
				
			}
			break;
			case '-' : {
				currentResult -= firstOperand;
				console.log(calcs.value);
				if (calcs.value == '') {
					workField.value = firstOperand;
				} else {
					workField.value = currentResult;
				};
				if (calcs.value == '') {
					calcs.value = calcs.value + firstOperand;
				} else {
					calcs.value = calcs.value + lastOperand;
				}
				calcs.value = calcs.value + ' - ';
				console.log(currentResult);
			}
			break;
		};
		
		lastOperation = this.dataset.operation;
	});
};
				
resultButton.addEventListener('click', function() {
	console.log(lastOperand);
	calcs.value = '';
	switch (lastOperation) {
		case '+': {
			lastOperand = +workField.value;
			currentResult += lastOperand;
			workField.value = currentResult;
			console.log(lastOperand);
		}
		break;
		case '-': {
			lastOperand = +workField.value;
			currentResult -= firstOperand;
			workField.value = currentResult;
			console.log(firstOperand);
		}
		break;
		case '=': {
			currentResult += lastOperand;
			workField.value = currentResult;
			console.log(firstOperand);
		}
		break;
	}
	lastOperation = '=';
});