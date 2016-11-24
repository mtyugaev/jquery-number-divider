## Installation
1. Download the latest version from [GitHub](https://github.com/tyugaev/jquery-number-divider/releases/latest) or via Bower package manager:<br>
   ```
   bower install number-divider
   ```
2. Include the JS file from the dist folder in the end of body section:<br>
   ```
   <script type="text/javascript" src="dist/number-divider.min.js"></script>
   ```
3. Set up type of all your separating inputs to 'text'

Original number you can get simple using jQuery val(). Example: 
```javascript
$('#myinput').val();
```

## Code example

You can use it with default parameters:
```javascript
$('#input').divide();
```

Or you can specify parameters:
```javascript
$('#input').divide({
    delimiter:' ',
    divideThousand:false
});
```

Also you can divide numbers in simple HTML tags
```html
<div class="divide">1000</div>
<span class="divide">10000</span>
<label class="divide">1000000</label>
```

And even mix them which is not surprising
```
<div class="divide">1000</div>
<input class="divide" type="text">
```
In this case if you execute $('.divide').divide(); then all inputs was bind on change event, but others tags was processed once.

If you wish use it in form then formatted values will be auto replaced on original values
```html
<form method="get">
    <label>Simple GET form</label>
    <p><input class="divide" name="login" placeholder="Enter login" required type="text"></p>
    <p><input class="divide" name="password" placeholder="Enter password" required type="text"></p>
    <button type="submit">Confirm</button>
</form>
```
You do not need to do anything additional, plugin will automatically do it for you!

## Options
Below is a complete list of options and matching default values:
```
{
    delimiter: ',',                 // current delimiter
    divideThousand: true,           // 1,000..9,999
    delimiterRegExp: /[\.\,\s]/g    // available delimiters
}
```

## License
Copyright &copy; Mikhail Tyugaev<br>
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details
