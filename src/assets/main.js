let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if(answer.value == '' || attempt.value == ''){ setHiddenFields(); }

    if(validateInput(input.value)){
    	attempt.value = parseInt(attempt.value) + 1;
    	console.log(attempt.value);
    }else{
    	return false;
    }

    if(getResults(input.value)){ 
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();

    }else{
    	if(attempt.value >= 10){
    		setMessage("You Lose! :(");
	    	showAnswer(false);
	    	showReplay();
    	}else{
    		setMessage("Incorrect, try again.");
    	}
    }
}

function setHiddenFields(){
	let num = Math.floor(Math.random() * 9999).toString();
	while(num.length < 4){
		num = '0'+num;
	}
	answer.value = num;
	attempt.value = 0;
}

function setMessage(message){
	document.getElementById('message').innerHTML = message;
}

function validateInput(input){
	if(input.length == 4){
		return true;
	}else{
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input){
	let correct = 0;

	results = document.getElementById('results').innerHTML;

	results = results += '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';


	for (var i = 0; i < input.length; i++) {
		let glyph = '<span class="glyphicon glyphicon-remove"></span>';
		if(input[i] == answer.value[i]){
			glyph = '<span class="glyphicon glyphicon-ok"></span>';
			correct++;
		}else{
			for (var j = 0; j < answer.value.length; j++) {
				if(input[i] == answer.value[j]){
					glyph = '<span class="glyphicon glyphicon-transfer"></span>';
				}
			}
		}
		results += glyph;
	}

	results += '</div>';

	document.getElementById('results').innerHTML = results;

	if(correct == 4){
		return true;
	}else{
		return false;
	}

}

function showAnswer(won){
	document.getElementById('code').innerHTML = answer.value;
	if(won){
		document.getElementById('code').className += " success";
	}else{
		document.getElementById('code').className += " failure";
	}
}

function showReplay(){
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}