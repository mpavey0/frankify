$(function() {

	// anything that needs to happen when DOM is loaded goes here
	$('select').select2({
		tags: true
	});
	
});


$("form").submit(newCalculate);




function newCalculate() {

	var stampsAvailable = [];
	var stampValues = [];

	var inputs = $("input[id|='cent']");
	inputs.each(function(index){
		stampsAvailable.push(parseInt($(this).val()));
		stampValues.push(parseInt($(this).parent().prev().find("select").val()));
	});

	var target = parseFloat($("form input[name='target']").val())*100;

	var bestValue = 0;
	var calculatedValue = 0;
	var bestStamps = [];

	iterate(0, [], 0);
	
	if (bestValue) {
		var answer = 'The best you can do is use ';
		for (var i = 0; i < stampsAvailable.length; i++) {
			answer += bestStamps[i] + ' ' + stampValues[i] + '¢ stamps';
			if (i < (stampsAvailable.length-1)) {
				answer += ", ";
			}
			else {
				answer += ".";
			}
		} 
		answer += "Your total will be $" + (bestValue/100).toFixed(2) + '.';	
	} else {
		var answer = "Sorry, you don't have enough stamps!"
	}
	
	displayAnswer(answer);


	return false;

	function iterate(stampNumber, prevStampQuantities, runningTotal = 0) {
		console.log("About to run the loop for stamp number " + stampNumber + " (" + stampValues[stampNumber] + ").");

		for (var i = 0; i <= stampsAvailable[stampNumber]; i++) {
			if (stampNumber == (stampsAvailable.length -1)) { // We are on the final stamp type
				console.log("Looks like there are no more stamp types. stampNumber is " + stampNumber);
				calculatedValue = runningTotal + (i * stampValues[stampNumber]);
				if (calculatedValue >= target && (calculatedValue - target) < Math.abs(bestValue - target)) {
					bestValue = calculatedValue;
					bestStamps = prevStampQuantities.slice();
					bestStamps.push(i);
				}
			}
			else {
				var intermediateValue = runningTotal + (i * stampValues[stampNumber]);
				console.log(prevStampQuantities);			

				while (prevStampQuantities.length > stampNumber)
					prevStampQuantities.pop();
				prevStampQuantities.push(i);
				console.log("About to call iterate function, using prevStampQuantities of " + prevStampQuantities);

				iterate(stampNumber + 1, prevStampQuantities, intermediateValue);
			}
		}
	}

}




function displayAnswer(answer) {
	$("#answer").text(answer);
}

// $("input[id|='cent']")

