/**
 * Is it greek night?
 * Sam Hage
 * 11/2015
 *
 * TODO:
 * - list next night
 * - email list
 */

/* get the menu JSON and change HTML if appropriate */
window.addEventListener( 'load', function()
{
	tomorrow = formatDate( 1 );
	yesterday = formatDate( -1 );

	var response = document.getElementsByClassName( 'response' )[0];
	response.innerHTML = 'Nope! Sorry.'

	getJSON( 'http://middmenuapi.herokuapp.com/' ).then( function( response )
	{
		if ( greekNight( response ) ) {
			var response = document.getElementsByClassName( 'response' )[0];
			response.innerHTML = 'Yes! Get over to Ross right now!'
		}
	}).catch( function( error )
	{
		console.log( error.message );
	});

	getJSON( 'http://middmenuapi.herokuapp.com/' + yesterday ).then( function( response )
	{
		if ( greekNight( response ) ) {
			var response = document.getElementsByClassName( 'response' )[0];
			response.innerHTML = 'Nope, it was yesterday.'
		}
	}).catch( function( error )
	{
		console.log( error.message );
	});

	getJSON( 'http://middmenuapi.herokuapp.com/' + tomorrow ).then( function( response )
	{
		if( greekNight( response ) ) {
			var response = document.getElementsByClassName( 'response' )[0];
			response.innerHTML = 'Nope...but it is tomorrow!'
		}
	}).catch( function( error )
	{
		console.log( error.message );
	});
});


/**********************************************************************************************************************
 * Determine if it is greek night based on the given menu. This is a little
 * experimental because the menus aren't perfectly consistent
 *
 * @param: {string} response The entire menu
 * @return: {boolean} Whether or not it is greek night
 */
var greekNight = function( response )
{
	return response.toLowerCase().includes( 'tzatziki' ) &&
		   response.toLowerCase().includes( 'lamb' ) &&
		   response.toLowerCase().includes( 'pita' ) ||
		   response.toLowerCase().includes( 'gyros' );
}


/**********************************************************************************************************************
 * Format the date to yyyy-mm-dd
 *
 * @param: {number} offset The number of days off from today e.g. -1 for
 * yesterday, 1 for tomorrow
 * @return: {string} The date
 */
var formatDate = function( offset )
{
	var d = new Date();
	d.setDate( d.getDate() + offset );

	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yyyy = d.getFullYear();

	if( dd < 10 ) {
	    dd = '0' + dd;
	}
	if( mm < 10 ) {
	    mm = '0' + mm;
	}

	return yyyy + '-' + mm + '-' + dd;
}

/**********************************************************************************************************************
 * Get a text representation of the dining menus on the given date. If no date
 * is given it will give today's.
 *
 * @param: date The desired date in yyyy-mm-dd form
 * @return: The menu text
 */
var getMenuOn = function( date )
{
	date = date || '';
	var url = 'http://middmenuapi.herokuapp.com/' + date;
	getJSON( url ).then( function( response )
	{
		return response;
	}).catch( function( error )
	{
		console.log( error.message );
	});
};


/**********************************************************************************************************************
 * Create and issue an HTTP request for JSON data
 *
 * @param: {string} url Location of the information
 * @return: {Promise}
 */
var getJSON = function( url )
{
	return new Promise( function( resolve, reject )
	{
		/* create a new request */
		var request = new XMLHttpRequest();
		/* event listener for success */
		request.addEventListener( 'load', function()
		{
			if ( request.status >= 200 && request.status < 400 ) {
				resolve( request.response );
			}
			else {
				reject( Error( request.statusText ) );
			}
		});
		/* event listener for error */
		request.addEventListener( 'error', function()
		{
			reject( Error( 'Network error' ) );
		});
		/* open the request then send it */
		request.responType = 'json';
		request.open( 'GET', url, true );
		request.send();
	});
};
