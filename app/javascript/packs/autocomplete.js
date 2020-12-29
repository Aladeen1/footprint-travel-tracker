import axios from 'axios'; 
import 'js-autocomplete/auto-complete.css';
import autoComplete from 'js-autocomplete';
import $ from "jquery";

const proxy = 'https://cors-anywhere.herokuapp.com/';
   
var xhr;

const departInput = document.getElementById('flight_depart');
const arriveeInput = document.getElementById('flight_arrival');
let locationCoordinates = [];

// Function calculating the distance between two points using geolocation coordinates

function distanceFlight(lat1, lon1, lat2, lon2, unit) {
	
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return Math.round(dist);
	}
}


// Function setting the value for the distance between two airports in an hidden input field.
function calculateDistance(coordinates) {
	let distance = document.getElementById('flight_distance');
	if (coordinates.length == 2) {
		distance.value = distanceFlight(coordinates[0][0], coordinates[0][1], coordinates[1][0], coordinates[1][1], 'K' )
		// Premier [0] c'est allé(0) ou retour(1) et deuxième c'est latitude(0) ou longitude(1)
	}
}

// Function rendering the airport in the input field once it has been selected from the suggestion.
// Once two airports have been selected the distance is filled up in the hidden input. 

function renderSelection(id, input, airport, type){
	const element = document.getElementById(id);
	element.addEventListener('click', () => {
		const code = airport.iata_code;
 		const city = airport.city;
		input.value = `${city}, ${code}`
		document.getElementById(type).style.display = "none";

		let geoloc = [airport.latitude, airport.longitude];
		
		if (type === 'depart__suggestion') {
			locationCoordinates.splice(0, 1, geoloc);
			calculateDistance(locationCoordinates)
		} else if (type === 'arrival__suggestion') {
			locationCoordinates.splice(1, 1, geoloc);
			calculateDistance(locationCoordinates)
		}
	})
}

// Function rendering the airport suggestions for the search bar. 
// Define the display for aiport in the suggestion when user is typing.

function renderSuggestion(data, input, type) {
	const list = document.getElementById(type);
	list.innerHTML = ' ';
	if (data.length != 0) {
		data.forEach( (airport, index) => {
			let markup =`
			<div class="suggestion__markup">
			<img class="tour-de-control" src="https://res.cloudinary.com/tark-industries/image/upload/v1561724813/control_tower.png">
			<p class="suggestion-text">${airport.iata_code} <strong>${airport.city}</strong>, ${airport.country}- ${airport.name}</p>
			</div>`
			list.insertAdjacentHTML('beforeend', `<ul id="choice-${index}-${type}">${markup}</ul>`)
			renderSelection(`choice-${index}-${type}`, input, airport, type)
		})
	} else {
		list.innerHTML = '<li class="no-airport-list">No airport bearing this name</li>'
	}
}

// Function making suggestion box disappear when the user clicks outside of it.

function boxDisappear(input, type) {
	const box = document.getElementById(type);
	document.addEventListener('click', (target) => {
		if (box !== event.target && !box.contains(event.target)) {
			 document.getElementById(type).style.display = "none";
		}
	})
}

// Function creating the autocomplete field using autocomplete.js library, it's a lightweight library from unsplash.
// It doesn't work fully anymore because of Jquery and maintainance problem I think so I found a work around and it works well.

function createAutocomplete(input, type) {
	let result;
	console.log("creating input")
	boxDisappear(input, type)
	new autoComplete({
	    selector: input,
	    minChars: 3,
	    source: function(term, response){
	    	try { xhr.abort(); } catch(e){}
	    	// We send the request to our local airports database.
			xhr = $.getJSON(`/flights/new?q=${term}&type=public`,
			function(data){
				//The response is sent in json format from our new method in the flights_controller.
				result = data.result.slice(0, 5);
				// Then we handle it by making the box appear and rendering the results.
				document.getElementById(type).style.display = "block";
				renderSuggestion(result, input, type);
			})
	    }
	});
}

// Listening to load event to see if we are on search page so we can create the autocomplete fields. 

window.addEventListener('load', () => {
	if (document.getElementById('search')) {
		createAutocomplete(departInput, 'depart__suggestion');
		createAutocomplete(arriveeInput, 'arrival__suggestion');
	}
})

