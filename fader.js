(function( $ ){

    var methods = {

        init : function(){
            $(this).data('pos', {
                'x': $(this).offset().left,
                'y': $(this).offset().top
            }).css({
                'display' : 'none',
                'opacity' : 0
            });
        },

        up : function(){

            $(this).css({
                'display' : 'block',
                'position' : 'absolute',
                'top' : $(this).data('pos').y + 100,
                'left' : $(this).data('pos').x
            }).animate({
                'top' : $(this).data('pos').y,
                'opacity': 1
            }, 500);
        },

        down : function(){

            $(this).css({
                'display' : 'block',
                'position' : 'absolute',
                'top' : $(this).data('pos').y - 100,
                'left' : $(this).data('pos').x
            }).animate({
                'top' : $(this).data('pos').y,
                'opacity': 1
            }, 500);

        },

        left : function(){

            $(this).css({
                'display' : 'block',
                'position' : 'absolute',
                'top' : $(this).data('pos').y,
                'left' : $(this).data('pos').x -100
            }).animate({
                'left' : $(this).data('pos').x,
                'opacity': 1
            }, 500);

        },

        right : function(){

            $(this).css({
                'display' : 'block',
                'position' : 'absolute',
                'top' : $(this).data('pos').y,
                'left' : $(this).data('pos').x + 100
            }).animate({
                'left' : $(this).data('pos').x,
                'opacity': 1
            }, 500);

        },

        random : function(){
            var randomArray = [methods.up, methods.down, methods.left, methods.right];
            randomIndex = Math.floor(Math.random() * randomArray.length);
            randomArray[randomIndex].apply(this);
        }

    }; // end methods

    var options;


    $.fn.fader = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));

        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );

        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.fader' );

        }


        return this;
    };

})( jQuery );