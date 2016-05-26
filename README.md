# UI-Animation-Library
Some of my useful methods for UI animation.

##   HOW TO USE

### Gradual Fade In

gradualFadeIn(selector[, start[, increment]]);

  1.) Set a parent element with a class onto which to hook (commonly set to a class like 'fade-in-gradual'). There are two ways to proceed from here -- set attributes or pass explicit timing delays and increments. The process for adding attributes is detailed below -- if you would prefer to pass them explicitly, simply pass them in ms along with your selector.
  2.) Set the timing-delay attribute of the parent element. This will determine when the fade-ins START. For example, setting a timing-delay like this -- timing-delay="2000" -- will have the first fade-in start at 2000ms after the animation is initiated. The subsequent items will then increment from there.
  NOTE: The default is 0ms.
  3.) Set the timing-increment attribute of the parent element. This will determine the amount of time between each individual fade-* animation.
  NOTE: The default is set to 40ms.
  4.) Set children elements with any of the fade-* classes (fade-in, fade-up, fade-down, fade-left, fade-right)
  5.) Initiate the animation by adding the 'anim-init' class to either the parent element, or an element further up the chain (both work).
  
### Letter Fade In

letterFadeIn(selector, fadeInClass[, start[, increment]]);

Progressively fade-in letters. This function takes letters in an element and wraps them in spans with the passed fade-* class as well as the given start and increment. You can also set the 'timing-delay' and 'timing-increment' on the passed element, otherwise you can pass it explicitly as an argument.
  
This can handle nested HTML elements (like span), but I would recommend keeping this as close as possible to the target letters.
  
## Plans for Improvement
I want to change the arguments to an object that will include the property 'mode' with the values of either 'linear' or 'hierarchical.' Setting this mode to 'linear' will tell the method to set the delays of all children with fade-* classes in their source order; setting it to 'hierarchical' tells it to set the delays of all siblings before proceeding to their children.

This repo is mostly for me, but if you find something useful, feel free to use :)
