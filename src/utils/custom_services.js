var inflection = require('inflection');

const AVAILABLE_DAYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
												"12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
												"22", "23", "24", "25", "26", "27", "28"]

export const Months = () => {
	let index = 0;
  let monthData = [
      { key: ++index, label: '01 - January' },
      { key: ++index, label: '02 - Febraury' },
      { key: ++index, label: '03 - March' },
      { key: ++index, label: '04 - April' },
      { key: ++index, label: '05 - May' },
      { key: ++index, label: '06 - June' },
      { key: ++index, label: '07 - July' },
      { key: ++index, label: '08 - August' },
      { key: ++index, label: '09 - September' },
      { key: ++index, label: '10 - October' },
      { key: ++index, label: '11 - November' },
      { key: ++index, label: '12 - December' }
  ];

  return monthData;
}

export const Years = () => {
	let yearData = [];
	var min = (new Date()).getFullYear();
	var max = (new Date()).getFullYear() + 50;

	for(var i = min; i < max; i++) {
		yearData.push({ key: String(i), label: String(i) });
	}

	return yearData;
}

export const States = () => {
    return [
      {label:"Alabama", key:"AL"},
      {label:"Alaska", key: "AK"},
      {label:"Arizona", key: "AZ"},
      {label:"Arkansas", key: "AR"},
      {label:"California", key: "CA"},
      {label:"Colorado", key: "CO"},
      {label:"Connecticut", key: "CT"},
      {label:"Delaware", key: "DE"},
      {label:"District Of Columbia", key: "DC"},
      {label:"Florida", key: "FL"},
      {label:"Georgia", key: "GA"},
      {label:"Hawaii", key: "HI"},
      {label:"Idaho", key: "ID"},
      {label:"Illinois", key: "IL"},
      {label:"Indiana", key: "IN"},
      {label:"Iowa", key: "IA"},
      {label:"Kansas", key: "KS"},
      {label:"Kentucky", key: "KY"},
      {label:"Louisiana", key: "LA"},
      {label:"Maine", key: "ME"},
      {label:"Maryland", key: "MD"},
      {label:"Massachusetts", key: "MA"},
      {label:"Michigan", key: "MI"},
      {label:"Minnesota", key: "MN"},
      {label:"Mississippi", key: "MS"},
      {label:"Missouri", key: "MO"},
      {label:"Montana", key: "MT"},
      {label:"Nebraska", key: "NE"},
      {label:"Nevada", key: "NV"},
      {label:"New Hampshire", key: "NH"},
      {label:"New Jersey", key: "NJ"},
      {label:"New Mexico", key: "NM"},
      {label:"New York", key: "NY"},
      {label:"North Carolina", key: "NC"},
      {label:"North Dakota", key: "ND"},
      {label:"Ohio", key: "OH"},
      {label:"Oklahoma", key: "OK"},
      {label:"Oregon", key: "OR"},
      {label:"Pennsylvania", key: "PA"},
      {label:"Rhode Island", key: "RI"},
      {label:"South Carolina", key: "SC"},
      {label:"South Dakota", key: "SD"},
      {label:"Tennessee", key: "TN"},
      {label:"Texas", key: "TX"},
      {label:"Utah", key: "UT"},
      {label:"Vermont", key: "VT"},
      {label:"Virginia", key: "VA"},
      {label:"Washington", key: "WA"},
      {label:"West Virginia", key: "WV"},
      {label:"Wisconsin", key: "WI"},
      {label:"Wyoming", key:"WY"}
    ]
}

export const AccountTypes = () => {
    return [
        {key:'checking', label: 'Checking'},
        {key:'savings', label: 'Savings'},
    ]
}

export const formatPhoneNumber = (phone) => {
  var s2 = (""+phone).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

export const formatAvailableDays = () => {
  var days = [];

  for(var i = 0; i < AVAILABLE_DAYS.length; i++) {
    days.push({ key: AVAILABLE_DAYS[i], label: ordinal_suffix_of(AVAILABLE_DAYS[i]) });
  }

  return days;
}

export const ordinal_suffix_of = (i) => {
  var j = i % 10,
      k = i % 100;
  if (j === 1 && k !== 11) {
      return i + "st";
  }
  if (j === 2 && k !== 12) {
      return i + "nd";
  }
  if (j === 3 && k !== 13) {
      return i + "rd";
  }
  return i + "th";
}

export const titleize = (slug) => {
  var words = slug.split("_");
  return words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  }).join(' ');
}

export const displayErrors = (errors) => {
	var messages = '';

	if(typeof errors === 'object') {
		for(var index in errors) {
	    	messages += inflection.titleize(index) + ' '+ errors[index] + "\n";
		}
	} else {
		messages = errors;
	}

	return messages
}

export const required = value => (value ? undefined : 'Required')
export const minValue = (min) => (value) => value && value < min ? `Must be at least ${min}` : undefined
export const maxValue = (max) => (value) => value && value > max ? `Must be less than ${max}` : undefined
export const email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const formatAmount = (amount) => {
	let formatted_amount = Number(amount / 100).toFixed(2)

	return '$'+formatted_amount
}
