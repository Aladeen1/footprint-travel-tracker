// Function to keep the contest a first user has been invited to. 
// The goal is to make him a member of that contest as soon as he register so 
// the user can see this contest once he click to "access contests" after adding his flights.
const form = document.getElementById('new_contest_registration')


function assignRankingId() {
	let ranking_id = document.getElementById('contest_registration_ranking_id');
	const url = window.location.href;
	const id = parseInt(url.split('/')[4]);
	ranking_id.value = id;
	return id
}

function cacheRankingId(id) {
	let participationTarget = document.getElementById('participation-target');

	participationTarget.addEventListener('click', (envoi) => {
		localStorage.setItem('rankingId', JSON.stringify(id));
	})
}


if (document.getElementById('ranking_page') && document.getElementById('contest_registration_ranking_id')) {
	const id = assignRankingId();
	cacheRankingId(id)
	// verifyParticipant(form)
}

function verifyParticipant(form) {
	form.addEventListener('submit', (e) => {
			
			e.preventDefault();
			validateCode()
			// logic
			// if () {
			// 	form.submit();
			// } else {
			// 	addSearchErrorMessage()
			// 	e.stopPropagation()
			// 	cleanSearchErrorMessage()
			// }
	})
}

function validateCode() {
	let code = document.getElementById('partipant-verification')
	console.log(code.value)
}