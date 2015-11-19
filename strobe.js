/**
 * Sam Hage
 * Background strobe effect I found on SO
 * 11/2015
 */

var bodyElement = document.querySelector( 'body' );
var delay = 0;
var requestAnimationFrame = window.requestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.msRequestAnimationFrame;

/* start the strobe after a 250 ms delay so we can check for the right response */
setTimeout( function()
{
	var responseText = document.getElementsByClassName( 'response' )[0].innerHTML;
	console.log( responseText );
	if ( responseText === 'Yes! Get over to Ross right now!' ) {
		changeColor();
	}
}, 250 );


/**********************************************************************************************************************
 * Change the background to a random color at every animation frame
 */
function changeColor()
{
	delay++;
	if ( delay > 3 ) {
		bodyElement.style.backgroundColor = getRandomColor();
		delay = 0;
	}
	requestAnimationFrame(changeColor);
}


/**********************************************************************************************************************
 * Get a randdom hex color
 */
function getRandomColor()
{
	// creating a random number between 0 and 255
	var r = Math.floor( Math.random()*256 );
	var g = Math.floor( Math.random()*256 );
	var b = Math.floor( Math.random()*256 );

	// going from decimal to hex
	var hexR = r.toString( 16 );
	var hexG = g.toString( 16 );
	var hexB = b.toString( 16 );

	// making sure single character values are prepended with a "0"
	if ( hexR.length == 1 ) {
		hexR = "0" + hexR;
	}

	if ( hexG.length == 1 ) {
		hexG = "0" + hexG;
	}

	if ( hexB.length == 1 ) {
		hexB = "0" + hexB;
	}

	// creating the hex value by concatenatening the string values
	var hexColor = "#" + hexR + hexG + hexB;
	return hexColor.toUpperCase();
}
