# UI-Animation-Library

Some of my useful methods for UI animation scoped under the ANIM object.

## Set Incremental Timing

This method will automatically add incremented delays to a set of elements, which is useful for when you'd like to stagger animations. While there are a number of options out there to achieve this effect (like GSAP), the main feature of this method is that it will also look for html attributes on the parent element in addition to passed options.

### Arguments

* **parent** { String } 
 * A selector or series of selectors upon whose children the timing delay will iterate. Can also be thought of as 'scope.'
* **child** { String } 
 * A selector or series of selectors to target for when iterating the timing delay.
* **delay** { Integer } 
 * Time in ms. If left blank, it will search for the html attribute 'timing-delay' on the parent element. The number at which to begin the increment.
* **increment** { Integer } 
 * Time in ms. If left blank, it will search for the html attribute 'timing-increment' on the parent element. The amount to increment.
* **type** { String } 
 * Either 'transition' or 'animation.' The delay property to set (either 'transition-delay' or 'animation-delay').

Defaults below:

```javascript
var opt = {
      parent    : '.set-timing',
      child     : '.fade-in, .fade-up, .fade-left, .fade-right, .fade-down',
      delay     : 0,
      increment : 40,
      type      : 'transition'
}

ANIM.setTiming(opt);
```
  
### Set-up

1. First, set a class on a parent element whose children you would like to have incremental timing set. The default class for this is 'set-timing.' If attributes are set, this is the element that should have them.  
2. Second, set a selector onto the children -- this is how the method will know where to put the incremental timing delays.
 * The default classes are 'fade-in' classes that you can find in the stylesheet in this repo. Once the these values are set, the animation still needs to get triggered, and I've set up the fade-\* classes to get triggered if either themselves or a parent gains the 'anim-init' class.
3. Third, determine whether you want your delay to affect transitions or animations. This will change the property that is set to either 'transition-delay' or 'animation-delay.'
  
### Options vs. Attributes

There are two ways to set the delay and increment values -- you can either set it as an integer in the options, or you can set an attribute on the parent element (both in ms). I found the attributes very useful for times when I had to write a lot of markup and I didn't want to keep switching back and forth to a script to manage all of the animations. With this, you can manage your animation timeline right in the markup.

* Timing delay is set as: timing-delay="300"
* Timing increment is set as: timing-increment="40"
* Note: attributes always have priority.
  
To give an example, if you set the timing delay to 300 and the increment to 40, the children elements will get styles like this:

* 'transition-delay: 300ms;'
* 'transition-delay: 340ms;'
* 'transition-delay: 380ms;'

And so on.
  
If set to 500 and 60, you get values like this:

* 'transition-delay: 500ms;'
* 'transition-delay: 560ms;'
* 'transition-delay: 620ms;'
  
And so on.
  
### Putting it all together

So once everything is set up, you should wind up with markup like this after the method has done its thing:

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
  
  
## Letter Fade In

I've also created a method that builds off of the incremental timing to incrementally animate letters. 

It works by taking letters in an element and wrapping them in spans with the passed animation class that will receive the correct delays. Since this uses the setTiming method, you can either pass the delay and increment as an argument or set it as an attribute on the parent element.

```javascript
ANIM.letterFadeIn(selector, animClass[, start[, increment]]);
```
  
It can handle nested HTML elements (like span), but I would recommend keeping this as close as possible to the target letters.

## Plans for improvement

I'd like to add a 'mode' option that will take into account the nesting of children elements. I plan two values for this: 'linear' or 'hierarchical.' The difference between the two is probably best illustrated with an example.

### Linear

A linear mode will set delays like this:

```html
<ul class="set-timing" timing-delay="200" timing-increment="20">
      <li class="fade-up" style="transition-delay:200ms">
            Lorem Ipsum
      </li>
      <li class="fade-up" style="transition-delay:220ms">
            <ul>
                  <li class="fade-up" style="transition-delay:240ms">
                        Lorem Ipsum
                  </li class="fade-up" style="transition-delay:260ms">
                  <li>
                        Lorem Ipsum
                  </li>
            </ul>
      </li>
      <li class="fade-up" style="transition-delay:280ms">
            Lorem Ipsum
      </li>
</ul>
```

The method will simply apply delays to elements in their source order. This is how it works now.

### Hierarchical

This is the planned improvement. Setting this mode will result in increments set like this:

```html
<ul class="set-timing" timing-delay="200" timing-increment="20">
      <li class="fade-up" style="transition-delay:200ms">
            Lorem Ipsum
      </li>
      <li class="fade-up" style="transition-delay:220ms">
            <ul>
                  <li class="fade-up" style="transition-delay:200ms">
                        Lorem Ipsum
                  </li class="fade-up" style="transition-delay:220ms">
                  <li>
                        Lorem Ipsum
                  </li>
            </ul>
      </li>
      <li class="fade-up" style="transition-delay:240ms">
            Lorem Ipsum
      </li>
</ul>
```

This time, the method will go through all of the siblings before delving into any children, where it will start the increments over from the set delay. I found this useful for stuff like a mobile-nav where only a single level is shown at a time.


# Thanks!
This repo is mostly for me, but if you find something useful, feel free to use :)
