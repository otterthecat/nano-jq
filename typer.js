(function($) {
	"use strict";

	// interval - the instance of setInterval() call that powers the effect
	// typeCount - counter used to keep track of options.string's position
	// scrollPos - scroll height of Dom Element to receive the animation
	// _this - reference to DOM element on which the animation is bound, primarily for ease of scope
	var interval, typeCount = 0, scrollPos = $(this).scrollHeight, _this;

	var options = {
		'speed' : 50,					// speed of the animation
		'cursor' : '_',					// character to represent the cursor within the animation
		'string' : 'This is a typer',	// string to be used as the text for the animation
		'shiftType' : false,			// flag to determine if the typing should 'shift' the text up withing DOM element
		'onComplete' : $.noop			// onComplete function to be called after the animation is complete (optional)
	};


	// 'private' method -
	// this will be applied to a setInterval() call
	// and will drive the typing effect
	var run = function() {
		if(typeCount <= options.string.length) {
			_this.html(options.string.substr(0, typeCount) + options.cursor);

			// determine if animation will 'shift up' the text as it gets
			// to bottom of DOM element
			if(options.shiftType && scrollPos < _this.scrollHeight) {
				_this.scrollTop = (scrollPos += 10);
			}
			typeCount++;

		} else {
			_this.html(options.string);
			clearInterval(interval);

			if(options.onComplete) {
				options.onComplete();
			}
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
