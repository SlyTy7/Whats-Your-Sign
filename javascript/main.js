$(document).ready(function(){
	$(".reading").css({'display': 'none'});
});

//DISPLAYS HOROSCOPE READING WHEN INVOKED
function displayReading(){
	const userInput = $("input").val().toLowerCase();
	const nameInfo = $("#sign-name");
	const dateInfo = $("#sign-date");
	const readingInfo = $("#sign-reading");

	//resets reading section to default styling
	nameInfo.text("");
	

	const todayReading = 'https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/today/' + userInput;
	$.getJSON(todayReading, function(data){
		const name = data.sunsign;
		const reading = data.horoscope.slice(12, -19);


		$(".reading").css({'display': 'block'});
		$(".reading").removeClass('error');
		nameInfo.text(name);
		readingInfo.html(reading);
	})
	.fail(function() {
		//displays error message if input field is left blank or is an invalid entry
		if(userInput == ""){
			$(".reading").css({'display': 'block'});
			$(".reading").addClass('error');
			return readingInfo.text("You didn't enter anything! Please try again.");
		}else{
			$(".reading").css({'display': 'block'});
			$(".reading").addClass('error');
			return readingInfo.text("That's not a horoscope sign! Please try again.");
		}
	});


	
}

$("#reading-button").click(displayReading);
$("#user-input").keypress(function(e){
	if(e.keyCode == 13) {
		return displayReading();
	}
});