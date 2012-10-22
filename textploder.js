(function($) {

  var options = {
    'cssClass': 'textploder',
    'speed': 750,
    'distance': 200,
    'rotation': 360,
    'onComplete': null
  },
    _this;


  var methods = {

    init: function(optionsObj) {

      options = $.extend(options, optionsObj);

      var original_selector = $(_this.selector);
      var original_text = original_selector.text();
      var new_text = "";

      $.each(original_text, function(index, value) {

        new_text += "<span class='" + options.cssClass + "' data-textplode-index='" + index + "'>" + value + "</span>"

      });

      original_selector.html(new_text);

      return _this;
    },

    explode: function() {

      $.each($('.' + options.cssClass), function(index, element) {

        var degrees = Math.random() * 360 * (Math.PI / 100);
        var xpos = (Math.round(Math.random() * 2) * Math.sin(degrees)) * options.distance;
        var ypos = (Math.round(Math.random() * 2) * Math.cos(degrees)) * options.distance;
        var rotationBase = 0;
        $(element).css('position', 'absolute').animate({
          'left': xpos,
          'top': ypos,
          'opacity': 0

        },

        {
          duration: options.speed,
          step: function() {

            $(element).css({
              'transform': 'rotate(' + rotationBase + 'deg)'
            });

            rotationBase += 2;
          },
          complete: function() {

            if(typeof options.onComplete === null) {

              $(element).remove();

            } else if(typeof options.onComplete === 'function') {

              options.onComplete.call(this);
            }

          }
        });
      });
    }

  }; // end methods
  $.fn.textploder = function(method) {

    _this = this;

    methods.init();

    // Method calling logic
    if(methods[method]) {

      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if(typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);
    } else {

      $.error('Method ' + method + ' does not exist on jQuery.jqTyper');
    }

    return _this;
  };

})(jQuery);