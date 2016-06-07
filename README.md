# UI-Animation-Library
Some of my useful methods for UI animation scoped under the ANIM object.

##   HOW TO USE

### Set Incremental Timing

This method will automatically add incremented delays to a set of elements. This is useful for when you'd like to stagger animations. While there are a number of other options to use out there, the main feature of this method is that it will also look for html attributes on the parent element in addition to passed options.

```javascript
// defaults shown here
var opt = {
      parent: '.set-timing' // [selector] -- The parent class to look for
      child: '.fade-in, .fade-up, .fade-left, .fade-right, .fade-down' // [selector] -- children classes onto which the timing is set
      delay: 0, // [int] or [html-attribute] -- where the increments should start counting up in ms
      increment: 40, // [int] or [html-attribute] -- value to increment in ms
      type: 'transition' // [string] -- either 'transition' or 'animation'
    }

ANIM.setTiming(opt);
```
  
#### Set-up
  1.) Firstly, set a class on a parent element whose children you would like to have incremental timing set. The default class for this is 'set-timing.' If attributes are set, this is the element that should have them.
  ..a. Note: attributes always have priority.
  
  2.) Secondly, set a selector onto the children -- this is how the method will know where to put the incremental timing delays.
  ..a. The default classes are 'fade-in' classes that you can find in the stylesheet in this repo. Once the these values are set, the animation still needs to get triggered, and I've set up the fade-* classes to get triggered if either themselves or a parent gains the 'anim-init' class.
  
  3.) Thirdly, determine whether you want your delay to affect transitions or animations. This will change the property that is set to either 'transition-delay' or 'animation-delay.'
  
#### Options vs. Attributes
  1.) There are two ways to set the delay and increment values -- you can either set it as an integer in ms in the options, or you can set an attribute on the parent element. I found the attributes very useful for times when I had to write a lot of markup, and I didn't want to keep switching back and forth to a script to manage all of the animations. This way, you can manage your animation timeline right in the markup.
  ..a. Timing delay is set as: timing-delay="300"
  ..b. Timing increment is set as: timing-increment="40"
  
  To give an example, if you set the timing delay to 300 and the increment to 40, the children elements will get styles like this:
  ..'transition-delay:300ms;'
  ..'transition-delay:340ms;'
  ..'transition-delay:380ms;'
  And so on.
  
  If set to 500 and 60, you get values like this:
  ..'transition-delay:500ms;'
  ..'transition-delay:560ms;'
  ..'transition-delay:620ms;'
  And so on.
  
#### Putting it all together

So once everything is set up, you should wind up with markup like this in your view:

```html
<section class="set-timing" timing-delay="300" timing-increment="40">
  <ul>
    <li class="fade-up" style="transition-delay:300ms;">
    <li class="fade-up" style="transition-delay:340ms;">
    <li class="fade-up" style="transition-delay:380ms;">
    <li class="fade-up" style="transition-delay:420ms;">
  </ul>
  <aside>
    <!-- other stuff goes here that is not affected by method -->
  </aside>
</section>
```
  NOTE: These will still require the 'anim-init' class on either the parent or the children (or however you've set up your CSS) to trigger the animation.
  
### Letter Fade In

I've also created a method that builds off of the incremental timing to incrementally animate letters. 

It works by taking letters in an element and wrapping them in spans with the passed animation class that will receive the correct delays. Since this uses the setTiming method, you can either pass the delay and increment as an argument or set it as an attribute on the parent element.

```javascript
ANIM.letterFadeIn(selector, animClass[, start[, increment]]);
```
  
It can handle nested HTML elements (like span), but I would recommend keeping this as close as possible to the target letters.

# Thanks!
This repo is mostly for me, but if you find something useful, feel free to use :)
