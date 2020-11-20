// https://github.com/neovov/Fullscreen-API-Polyfill
(function ( doc ) {
	// Use JavaScript strict mode
	"use strict";

	/*global Element, Promise */

	var pollute = true,
		api,
		vendor,
		apis = {
			// http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
			w3: {
				enabled: "fullscreenEnabled",
				element: "fullscreenElement",
				request: "requestFullscreen",
				exit:    "exitFullscreen",
				events: {
					change: "fullscreenchange",
					error:  "fullscreenerror"
				}
			},
			webkit: {
				enabled: "webkitFullscreenEnabled",
				element: "webkitCurrentFullScreenElement",
				request: "webkitRequestFullscreen",
				exit:    "webkitExitFullscreen",
				events: {
					change: "webkitfullscreenchange",
					error:  "webkitfullscreenerror"
				}
			},
			moz: {
				enabled: "mozFullScreenEnabled",
				element: "mozFullScreenElement",
				request: "mozRequestFullScreen",
				exit:    "mozCancelFullScreen",
				events: {
					change: "mozfullscreenchange",
					error:  "mozfullscreenerror"
				}
			},
			ms: {
				enabled: "msFullscreenEnabled",
				element: "msFullscreenElement",
				request: "msRequestFullscreen",
				exit:    "msExitFullscreen",
				events: {
					change: "MSFullscreenChange",
					error:  "MSFullscreenError"
				}
			}
		},
		w3 = apis.w3;

	// Loop through each vendor's specific API
	for (vendor in apis) {
		// Check if document has the "enabled" property
		if (apis[vendor].enabled in doc) {
			// It seems this browser support the fullscreen API
			api = apis[vendor];
			break;
		}
	}

	function dispatch( type, target ) {
		var event = doc.createEvent( "Event" );

		event.initEvent( type, true, false );
		target.dispatchEvent( event );
	} // end of dispatch()

	function handleChange( e ) {
		e.stopPropagation();
		e.stopImmediatePropagation();

		// Recopy the enabled and element values
		doc[w3.enabled] = doc[api.enabled];
		doc[w3.element] = doc[api.element];

		dispatch( w3.events.change, e.target );
	} // end of handleChange()

	function handleError( e ) {
		dispatch( w3.events.error, e.target );
	} // end of handleError()

	// Prepare a resolver to use for the requestFullscreen and exitFullscreen's promises
	// Use a closure since we need to check which method was used
	function createResolver(method) {
		return function resolver(resolve, reject) {
			// Reject the promise if asked to exitFullscreen and there is no element currently in fullscreen
			if (method === w3.exit && !doc[api.element]) {
				setTimeout(function() {
					reject(new TypeError());
				}, 1);
				return;
			}

			// When receiving an internal fullscreenchange event, fulfill the promise
			function change() {
				resolve();
				doc.removeEventListener(api.events.change, change, false);
			}

			// When receiving an internal fullscreenerror event, reject the promise
			function error() {
				reject(new TypeError());
				doc.removeEventListener(api.events.error, error, false);
			}

			doc.addEventListener(api.events.change, change, false);
			doc.addEventListener(api.events.error,  error,  false);
		};
	}

	// Pollute only if the API doesn't already exists
	if (pollute && !(w3.enabled in doc) && api) {
		// Add listeners for fullscreen events
		doc.addEventListener( api.events.change, handleChange, false );
		doc.addEventListener( api.events.error,  handleError,  false );

		// Copy the default value
		doc[w3.enabled] = doc[api.enabled];
		doc[w3.element] = doc[api.element];

		// Match the reference for exitFullscreen
		doc[w3.exit] = function() {
			var result = doc[api.exit]();
			return !result && window.Promise ? new Promise(createResolver(w3.exit)) : result;
		};

		// Add the request method to the Element's prototype
		Element.prototype[w3.request] = function () {
			var result = this[api.request].apply( this, arguments );
			return !result && window.Promise ? new Promise(createResolver(w3.request)) : result;
		};
	}

	// Return the API found (or undefined if the Fullscreen API is unavailable)
	return api;

}( document ));