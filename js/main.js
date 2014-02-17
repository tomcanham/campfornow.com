$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
    });
};

$(document).ready(function() {
  var locals = {
    rotation1: Math.floor(Math.random()*20) - 10,
    rotation2: Math.floor(Math.random()*20) - 10,
    rotation3: Math.floor(Math.random()*10) - 5,
    yoffset1: 25 + Math.floor(Math.random()*10) - 5,
    yoffset2: 50 + Math.floor(Math.random()*10) - 5,
    animateDuration1: 1000 + Math.floor(Math.random()*500) - 250,
    animateDuration2: 1000 + Math.floor(Math.random()*500) - 250,
    animateDuration3: 1000 + Math.floor(Math.random()*500) - 250
  };
  console.log(
              locals.rotation1 + "deg " +
              locals.rotation2 + "deg " +
              locals.rotation3 + "deg " +
              locals.yoffset1 + "% " +
              locals.yoffset2 + "%"
              );
  $('.home-page-welcome').css('background-position', "0 " + locals.yoffset1 + "%");
  $('.home-page-home').css('background-position', "0 " + locals.yoffset2 + "%");
  $('.home-page-welcome').animateRotate(locals.rotation1, locals.animateDuration1, 'easeOutBounce');
  $('.home-page-home').animateRotate(locals.rotation2, locals.animateDuration2, 'easeOutBounce');
  $('.home-page-janky').animateRotate(locals.rotation3, locals.animateDuration3, 'easeOutBounce');
});

// .home-page-welcome {
//   background-position: 0 {{yoffset1}}%;
//   transform:rotate({{rotation1}}deg);
//   -ms-transform:rotate({{rotation1}}deg); /* IE 9 */
//   -webkit-transform:rotate({{rotation1}}deg); /* Safari and Chrome */
// }

// .home-page-home {
//   background-position: 0 {{yoffset2}}%;
//   transform:rotate({{rotation2}}deg);
//   -ms-transform:rotate({{rotation2}}deg); /* IE 9 */
//   -webkit-transform:rotate({{rotation2}}deg); /* Safari and Chrome */
// }

// .home-page-janky {
//   transform:rotate({{rotation3}}deg);
//   -ms-transform:rotate({{rotation3}}deg); /* IE 9 */
//   -webkit-transform:rotate({{rotation3}}deg); /* Safari and Chrome */
// }
