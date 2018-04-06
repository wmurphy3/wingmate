import { Platform }  from 'react-native';
import colors        from '*/views/components/atoms/Colors'
import {
	showToast,
	showNotification,
	showLoading,
	hideLoading,
	hide
} 									 from 'react-native-notifyer';

function getStyle(type) {
	const style={
		backgroundColor: type,
		minHeight: 50,
		color: "#ffffff",
		fontSize: 15,
	    padding: 10,
	    alignItems: 'left',
	    flex: 1,
	    flexDirection: 'row',
		borderRadius: Platform.OS === ("ios") ? 5 : 0,
		'textStyle': {
	      textAlign: 'left',
	    },
	    'containerStyle': {
	    	position: 'absolute',
	    	top: 75
	    }
	};

	return style;
}

function titleize(slug) {
    var words = slug.split("_");
    return words.map(function(word) {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }).join(' ');
}

export const displayError = (errors)  => {
	var messages = '';

	if(typeof errors === 'object') {
		for(var index in errors) {
	    	messages += titleize(index) + ' '+ errors[index] + "\n";
		}
		showToast(messages, getStyle(colors.delete));
	} else {
		if(errors) {
			showToast(errors, getStyle(colors.delete));
		}
	}
}

export const displayWarning = (message) => {
	showToast(message, getStyle(colors.warning));
}

export const displaySuccess = (message) => {
	showToast(message, getStyle(colors.success));
}
