/*!
 * jQuery number separator
 * Copyright (C) 2016, Mikhail Tyugaev
 * Licensed under the MIT license
 *
 * @author Mikhail Tyugaev
 * @version 1.0.0 RC (2016-11-23)
 */
(function($) {

	var defaults = {
		delimiter:',',
		separateThousand:true, // 1,000..9,999
		delimiterRegExp:/[\.\,\s]/g
	};

	$.fn.separate = function(params){

		function isNotInput(elem) {
			return !elem.is("input, textarea");
		}

		function isNumeric(num) {
			return !isNaN(num)
		}

		function getSeparated(text) {
			text = text.replace(options.delimiterRegExp, '');

			if (!isNumeric(text) && text.length > 0) {
				$(this).val('');
				console.log(text + ' is not a number');
				return -1;
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
			return text.substring(0, pos) + result;
		}

		options = $.extend({}, defaults, params);

		this.each(function() {

			var $this = $(this);

			if (isNotInput($this)) {
				return;
			}

			$this.unbind("input.separate change.separate");
		});


		this.each(function() {

			var $this = $(this);

			if (isNotInput($this)) {
				var result = getSeparated($this.text());

				if (result != -1) {
					$this.text(result);
				}

				return;
			}

			$this.bind("input.separate change.separate", function() {

				var text = $(this).val().replace(options.delimiterRegExp, '');

				var result = getSeparated(text);

				if (result != -1) {
					$(this).val(result);
					$(this).attr('number', text);
				}
			});

			$this.trigger("change.separate");
		});

		return this;
	};

})(jQuery);