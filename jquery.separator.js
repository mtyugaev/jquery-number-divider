/*!
 * JavaScript jQuery number separator
 * Copyright (C) 2016, Mikhail Tyugaev
 * Licensed under the MIT license
 *
 * @author Mikhail Tyugaev
 * @version 1.0.0 (2016-11-09)
*/
(function($) {

    var defaults = { 
        delimiter:',',
        separateThousand:true, // 1,000..9,999
        delimiterRegExp:/[\.\,\s]/g
    };

    $.fn.separate = function(params){
        options = $.extend({}, defaults, params);

        $(this).unbind("input.separate");

        $(this).bind('input.separate', function() {

            var text = $(this).val().replace(options.delimiterRegExp, '');
            var number = parseInt(text, 10);

            if (isNaN(number) && text.length > 0) {
                $(this).val('');
                console.log(text + ' is not a number');
                return;
            }

            var result = '';
            var pos = text.length;

            while (pos > 3) {
                if (text.length == 4) {
                    result = (options.separateThousand ? options.delimiter : '') + text.substring(1);
                    pos = 1;
                    break;
                }
                pos -= 3;
                result = options.delimiter + text.substring(pos, pos + 3) + result;
            }
            result = text.substring(0, pos) + result;

            $(this).val(result);
        });

        $(this).trigger('input.separate');

        return this;
    };
})(jQuery);