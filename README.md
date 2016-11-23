## Installation

1. [Download](https://github.com/tyugaev/jquery-number-separator/blob/master/jquery.number-separator.js) jquery.number-separator.js and just add the line

   ```
   <script type="text/javascript" src="jquery.number-separator.js"></script>
   ```
2. Set up type of inputs to 'text', original value was saved in attr with name 'number'

## Code Example

With default parameters:
```javascript
$('#input').separate();
```

Or you can specify parameters:
```javascript
$('#input').separate({
    delimiter:' ',
    separateThousand:false
});
```

Also you can separate numbers in simple HTML tags
```html
<p><div class="separate">1000</div></p>
<p><span class="separate">10000</span></p>
<p><label class="separate">1000000</label></p>
<input class="separate" type="text">
```
```javascript
$('.separate').separate();
```
In this case all inputs was bind on change event, but others tags was processed once 

## License
Copyright &copy; Mikhail Tyugaev<br>
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
