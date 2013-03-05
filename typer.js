(function($) {
	"use strict";

	// interval - the instance of setInterval() call that powers the effect
	// typeCount - counter used to keep track of options.string's position
	// currentText - object to store internal data that is passed to onInterval() callback
	// _this - reference to DOM element on which the animation is bound, primarily for ease of scope
	var typeCount = 0;
	var currentText = {
		fullString: "",
		currentString: ""
	};

	var the_substr = "";
	var interval;
	var _this;

	var options = {
		speed		: 50,					// speed of the animation
		cursor		: '_',					// character to represent the cursor within the animation
		string		: 'This is a typer',	// string to be used as the text for the animation
		shiftType	: false,				// flag to determine if the typing should 'shift' the text up withing DOM element
		onInterval	: null,					// optional callback function to be called after each animation interval
		onComplete	: $.noop				// optional callback function to be called after the animation is complete
	};


	// 'private' method -
	// this will be applied to a setInterval() call
	// and will drive the typing effect
	var run = function() {
		if(typeCount <= options.string.length) {

			// store substring in variable
			the_substr = options.string.substr(0, typeCount);

			// update element's display
			_this.html(the_substr + options.cursor);

			// fire callback if defined
			if(typeof options.onInterval === 'function') {
				
				// update object before passing to onInterval
				currentText.fullString 			= options.string;
				currentText.currentString 		= the_substr;

				// fire callback - passing the element plugin is updating
				// to callback's 'this' keyword, and the currentText object as
				// it's argument
				options.onInterval.call(_this[0], currentText);
			}
			typeCount++;

		} else {

			// typing is complete
			_this.html(options.string);
			clearInterval(interval);

			options.onComplete.call(_this);
		}
	};


	// public methods
	var methods = {

		// general instantiation - user may apply object
		// to customize settings
		init : function(optionsObj) {

			options = $.extend(options, optionsObj);
		},

		// start the animation
		play : function(optionsObj) {

			if(typeof(optionsObj) ==='object'){

				methods.init(optionsObj)
			} 

			interval = setInterval(run, options.speed);
		},

		// stops the animation in place - may be restarted by 
		// calling 'play' method again.
		pause : function() {

			clearInterval(interval);
		},

		// stops the animation and clears the
		// display & counter - may not be restarted
		stop : function() {

			clearInterval(interval);
			typeCount = 0;
		}
	};



	$.fn.typer = function(method) {
		// set reference of 'this' for ease of scoping
		// within above methods
		_this = this;

		// Method calling logic
		if(methods[method]) {

			return methods[method].apply(_this, Array.prototype.slice.call(arguments, 1));
		} else if( typeof method === 'object' || !method) {

			return methods.init.apply(_this, arguments);
		} else {

			$.error('Method ' + method + ' does not exist on jQuery.typer');
		}

		return _this;
	};
})(jQuery);
