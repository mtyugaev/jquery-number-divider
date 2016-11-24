/*!
 * jQuery number divider
 * Copyright (C) 2016, Mikhail Tyugaev
 * Licensed under the MIT license
 *
 * @author Mikhail Tyugaev
 * @version 1.0.0 (2016-11-25)
 */
(function($) {

	var defaults = {
		delimiter: ',',
		divideThousand: true, // 1,000..9,999
		delimiterRegExp: /[\.\,\s]/g
	};

	var originalVal = $.fn.val;

	// override for getting not formatted value
	$.fn.val = function(value) {
		var data = this.data('divided');

		if (typeof value == 'undefined') {
			// getter
			if (!data) {
				// simple not formatted input
				return originalVal.call(this);
			} else {
				// get original(not formatted) value
				return data.value;
			}
		} else {
			// setter
			if (!data) {
				// simple not formatted input
				return originalVal.call(this, value);
			} else {
				// change() - for formatting
				return originalVal.call(this, value).change();
			}
		}
	};

	$.fn.divide = function(params){
		/**
		 * Checking is input element or simple tag
		 */
		function isNotInput(elem) {
			return !elem.is("input, textarea");
		}
		/**
		 * Checking is a number
		 */
		function isNumeric(num) {
			return !isNaN(num)
		}
		/**
		 * Divide the number
		 * @param text - string representation of the number
		 * @returns {*} formatted string representation of the number or -1(if not number)
		 */
		function getDivided(text) {
			text = text.replace(options.delimiterRegExp, '');

			if (!isNumeric(text) && text.length > 0) {
				console.warn(text + ' is not a number');
				return -1;
			}

			var result = '';
			var pos = text.length;

			while (pos > 3) {
				if (text.length == 4) {
					result = (options.divideThousand ? options.delimiter : '') + text.substring(1);
					pos = 1;
					break;
				}
				pos -= 3;
				result = options.delimiter + text.substring(pos, pos + 3) + result;
			}
			return text.substring(0, pos) + result;
		}
		// override default parameters
		options = $.extend({}, defaults, params);

		this.each(function() {

			var $this = $(this);
			// skip if not input or if is first binding
			if (isNotInput($this) || !$this.data('divided')) {
				return;
			}
			// unbinding if is not first times
			$this.unbind(".divide");
		});

		this.each(function() {

			var $this = $(this);

			// not binding simple HTML tags
			if (isNotInput($this)) {
				var result = getDivided($this.text());

				// process once
				if (result != -1) {
					$this.text(result);
				}

				return;
			}

			$this.bind("input.divide change.divide", function() {
				var text = (this.value).replace(options.delimiterRegExp, '');
				var result = getDivided(text);
				var data = $this.data('divided');

				if (result == -1) {
					// value not number
					return;
				}

				if (!data) {
					data = {};
					// set up data for correct interaction
					var name = $this.attr('name');

					if (name != undefined) {
						// if input in form(have name) then adding hidden input
						$this.attr('name', '');
						$this.parent().append("<input type='hidden' name='" + name + "'>");
						data.name = name;
					} else {
						data.name = null;
					}
				}

				data.value = text;				// save original
				this.value = result;			// write formatted
				$this.data('divided', data);	// save setting

				// if input have name
				if (data.name) {
					$this.parent().children("input[name=" + data.name + "]").val(text);
				}
			});

			$this.change(); // call formatting
		});

		return this;
	};

})(jQuery);