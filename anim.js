var ANIM = (function() {

  /* GRADUAL FADE-INS ------------------------------ */

  // HOW TO USE
  // 1.) Set a parent element with with a class onto which to hook (commonly set to a class like 'fade-in-gradual')
  // There are two ways to proceed from here -- set attributes or pass explicit timing delays and increments. The process for adding attributes is
  // detailed below -- if you would prefer to pass them explicitly, simply pass them along with your selector into the 'gradualFadeIn' function.
  // 2.) Set the timing-delay attribute of the parent element. This will determine when the fade-ins START. For example, setting a
  // timing-delay like this -- timing-delay="2000" -- will have the first fade-in start at 2000ms after the animation is initiated.
  // NOTE: The default is 0ms.
  // 3.) Set the timing-increment attribute of the parent element. This will determine the amount of time between each individual fade-* animation.
  // NOTE: The default is set to 40ms.
  // 4.) Set children elements with any of the fade-* classes (fade-in, fade-up, fade-down, fade-left, fade-right)
  // 3.) Initiate the animation by adding the 'anim-init' class to either the parent element, or an element further up the chain (both work).

  var fades = '.fade-in, .fade-up, .fade-right, .fade-down, .fade-left',
      defaultTimingDelay = 0,
      defaultTimingIncrement = 40;

  // Setting fade-in delays of children of gradualFadeInSelector with any of the fade-* classes
  function gradualFadeIn(selector, start, increment) {
    $(selector).each(function(el) {
      var timingDelay = start ? start : getTimingDelay($(this)), // start value
          timingIncrement = increment ? increment : getTimingIncrement($(this));
      setTimingIncrement($(this).find(fades), timingDelay, timingIncrement);
    });
  }

  // Utility function to get the timing delay from the 'timing-delay' attribute
  function getTimingDelay(el) {
    var timingDelayAttr = parseInt($(el).attr('timing-delay')),
        timingDelay = isNaN(timingDelayAttr) ? defaultTimingDelay : timingDelayAttr;
    return timingDelay;
  }

  // Utility function to get the timing increment from the 'timing-increment' attribute
  function getTimingIncrement(el) {
    var timingIncrementAttr = parseInt($(el).attr('timing-increment')),
        timingIncrement = isNaN(timingIncrementAttr) ? defaultTimingIncrement : timingIncrementAttr;
    return timingIncrement;
  }

  // Utility function to increment timing delays on passed el, starting from the start argument,
  // and incrementing by the increment argument
  function setTimingIncrement(el, start, increment) {
    var timingDelay = start,
        realIncrement = increment === undefined ? 0 : increment;
    $(el).each(function() {
      $(this).css('transition-delay', timingDelay + 'ms');
      timingDelay += realIncrement;
    });
  }

  // Progressively fade-in letters. This function takes letters in an element and wraps them in spans with the given fade-* class
  // as well as the given start and increment. You can also set the 'timing-delay' and 'timing-increment' on the passed element,
  // otherwise you can pass it explicitly as an argument.
  //
  // This can handle nested HTML elements (like span), but I would recommend keeping this as deep as possible in the node tree
  function letterFadeIn(selector, fadeInClass, start, increment) {
    var inHTML = false;

    // room for improvement -- scope the incremental delay to slides. Right now, it considers the entire carousel

    $(selector).each(function() {
      var split = $(this).html().match(/[a-zA-Z\d&;<\/="\->\s\n]/g),
          htmlEntity = false,
          htmlEntityContainer;
      var mappedSplit = split.map(function(el) {

        // Keeping track of any nested html tags
        if (el === '<') {
          inHTML = true;
          return el;
        } else if (el === '>') {
          inHTML = false;
          return el;
        } else if (inHTML) {
          return el;

        // collecting html entities for proper rendering
        } else if (!inHTML && !htmlEntity && el === '&') {
          htmlEntity = true;
          htmlEntityContainer = el;
        } else if (!inHTML && htmlEntity && el === ';') {
          htmlEntity = false;
          htmlEntityContainer += el;
          return '<span class="' + fadeInClass + '">' + htmlEntityContainer + '</span>';
        } else if (!inHTML && htmlEntity) {
          htmlEntityContainer += el;


        // collecting regular letters & numbers & wrapping them in spans with fade-in class
        } else if (!inHTML && /[a-zA-Z\d]/.test(el)) {
          return '<span class="' + fadeInClass + '">' + el + '</span>';
        } else if (!inHTML && /[\s|\n]/.test(el)) {
          return el;
        }
      });
      joinedMappedSplit = mappedSplit.join('');
      $(this).html(joinedMappedSplit);
    });

    var timingDelay = start ? start : getTimingDelay(selector),
        timingIncrement = increment ? increment : getTimingIncrement(selector);

    setTimingIncrement(selector + ' span.' + fadeInClass, timingDelay, timingIncrement);
  }


  return {
    gradualFadeIn: gradualFadeIn,
    letterFadeIn: letterFadeIn
  }
})();
