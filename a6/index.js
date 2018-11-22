window.addEventListener("load", function (event) {
  //Fading list items on mouseenter and mouseleave
  var imgAnimation = 'pulse slow';
  var listItems = $('.card > .card-body');
  listItems.mouseenter(function () {
    $element = $(this);
    $cardImg = $element.parent().children('.card-img-bottom');
    $cardImg.animateCss(imgAnimation);
  });

});

//Extending jquery to to remove animation classes once finished 
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = (function (el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});
