var vh = angular.module('vh', []);

vh.directive('waypointsAnimate', function(){
	return{
		link: function(scope, elem, attr){
			$(window).load(function() {
				$('body').addClass('ready');
				elem.find('[data-animation]').each(function(){
					var element = $(this);

					element.waypoint({
						offset: function () {
							return Waypoint.viewportHeight() * 0.9;
						},
						handler: function(){
							var waypointElement = $(this.element);
							waypointElement.addClass('animate');
							if(waypointElement.is('[data-trigger]')){
								waypointElement.trigger(waypointElement.attr('data-trigger'));
							}
							
							this.destroy();
						}
					});	
				});
			});
		}
	}
});

vh.directive('fillMeters', function(){
	return{
		link: function(scope, elem, attr){
			$(elem).on('fill', function(){
				var timeline = 0;
				elem.find('[data-percentage]').each(function(){
					var element = $(this);
					
					timeline += 500;
					setTimeout(function(){
						var percentage = parseInt(element.attr('data-percentage')) || 0;
						var time = 0;
						for(var i = 0; i <= percentage; i++){
							time += 25;
							(function(number){
								setTimeout(function(){
									element.find('[data-fill]').css('width', number + '%');
									element.find('[data-text]').text(number + '%');
									
									if(number == 35){
										element.find('[data-fill]').addClass('med');
									}

									if(number == 65){
										element.find('[data-fill]').addClass('med-good');
									}

									if(number == 80){
										element.find('[data-fill]').addClass('good');
									}

									if(number == 101){
										element.find('[data-fill]').addClass('oops');
									}
								}, time);
							})(i);
						}
					}, timeline);
				});
			});
		}
	}
});

vh.directive('fadeIn', function(){
	return{
		link: function(scope, elem, attr){
			$(window).load(function() {
				setTimeout(function(){
					if(elem.attr('fade-in') === 'self'){
						elem.addClass('fade-in')
					}else{
						elem.children().addClass('fade-in');
					}
				}, 700);
			});
		}
	}
});

vh.directive('unfocus', function(){
	return{
		link: function(scope, elem, attr){
			$(elem).on('click', '[data-focus-container] *, [data-focus]', function (e) {
				$(this).blur();
			});
		}
	}
});

vh.directive('scrollTo', function(){
	return{
		link: function(scope, elem, attr){
			$(elem).on('click', function(e){
				var scrollTarget = $(elem.attr('href') || elem.attr('data-scroll'));
				e.preventDefault();

				if(scrollTarget){
					$.scrollTo(scrollTarget, 1000);
				}
			});
		}
	}
})