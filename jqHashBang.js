(function( $ ){

	// object to store functions to be called by hashchange event
	var router = {};

	
	var methods = {
		// initialization method this would take an object as the
		// argument, which would be a namespace containing a method
		// when the named hash is added to the URI, and (optionally),
		// a function to call when the namespace is removed from the URI
		init: function(routerObj){
			// if object is being passed, add it to the
			// router object
			if($.isPlainObject(routerObj)){
				router = routerObj;

			}

			// set window to listen for hashchange event
			// and then fire appropiate methods in the router object
			$(window).on('hashchange', function(){
				// parse hash from location object
				var hash = location.hash.substring(options.defaultHashTag.length+1);

				// determine if hash segment is in the router
				// and if so, call the function
				for(var item in router){
					if(item == hash){
						router[item]();

					}
				}
			});

		},

		// set router function - this is an alternative
		// from doing so via the init() method
		setRouter: function(obj){
			router[obj.name] = obj.func;

		},


		// remove functions from router object
		removeRouter: function(stringName){
			delete router[stringName];

		},


		setHash: function(mixedObj){
			location.hash = options.defaultHashTag + mixedObj.replace(' ', '-');

		},


		removeHash: function(stringHash){ // TODO rewrite using regex
			var currentHashArray = location.hash.substring(options.defaultHashTag.length+1).split('/');
			var removalIndex = $.inArray(stringHash, currentHashArray);
			if(removalIndex >= 0)
			{
				var updatedHashArray = currentHashArray.splice(removalIndex, 1);
				return (location.hash = updatedHashArray.join('/'))? true : false;
			}
			return false;
		},

		// return full location hash
		getHash: function(){
			return location.hash;
		},

		// return full router object
		getRouter: function(){
			return router;

		}

	}; // end methods

	// plugin options
	var options = {
		'defaultHashTag': '!/'

	};

	// the actual plugin - using default pattern of using a string argument to call
	// one of the above menthods. If and object is passed (or no argument at all),
	// then the init() method will be used.
	$.jqHashBang = function(method) {

		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));

		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );

		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.jqHashBang' );

		}

		return this;
	};

})( jQuery );