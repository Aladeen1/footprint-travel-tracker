export const validateForm = (form) => {
	form.addEventListener('submit', (e) => {
			
			e.preventDefault();
			const validDistance = validateDistance();
			const validRepetition = validateRepetition();

			if (validDistance && validRepetition) {
				form.submit();
			} else {
				addSearchErrorMessage()
				e.stopPropagation()
				cleanSearchErrorMessage()
			}
	})
}

function validateRepetition(){
	let valid;
	let repetitionField = document.getElementById('flight_repetition')
	if (repetitionField.value) {
		valid = /^[1-9]\d*$/.test(repetitionField.value)
	} else {
		valid = false
	}
	
	return valid
}

function validateDistance() {
	let valid;
	let distance = document.getElementById('flight_distance');
	if (distance.value >= 1) {
		valid = true
	} else {
		valid = false
	}
	return valid
}

function addSearchErrorMessage() {
	const ancre = document.getElementById('error-signal');
	ancre.style.border = 'solid 2px #FD1015';
	ancre.style.backgroundColor = 'white';
}

function cleanSearchErrorMessage() {
	const target = document.getElementById('error-signal');

	if (target) {
		window.addEventListener('click', () => { 
			target.style.border = 'solid 2px #F4F4F4';
			target.style.backgroundColor = '#F4F4F4';
		})
	}
}