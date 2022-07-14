var cursor = $('.cursor'),
			follower = $('.cursor-follower'),
      link = $('hover-link');

		var posX = 0,
			posY = 0,
			mouseX = 0,
			mouseY = 0;

		TweenMax.to({}, 0.016, {
			repeat: -1,
			onRepeat: function() {
				posX += (mouseX - posX) / 9;
				posY += (mouseY - posY) / 9;

				TweenMax.set(follower, {
					css: {
						left: posX - 20,
						top: posY - 20
					}
				});

				TweenMax.set(cursor, {
					css: {
						left: mouseX,
						top: mouseY
					}
				})
			}
		});

const animateit = function (e) {
const span = this.querySelector('span');
const { offsetX: x, offsetY: y } = e,
{ offsetWidth: width, offsetHeight: height } = this,

move = 25,
xMove = x / width * (move * 2) - move,
yMove = y / height * (move * 2) - move;

span.style.transform = `translate(${xMove}px, ${yMove}px)`;

if (e.type === 'mouseleave') span.style.transform = '';
};

		$(document).on('mousemove', function(e) {
			mouseX = e.pageX;
			mouseY = e.pageY;
      animateit()
		});
