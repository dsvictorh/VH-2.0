vh.controller('about', function($scope){
	var badSkills = ['Noob', 'Scrub', 'Bronze V', 'Newbie', ':(', 'Y u no better?'];
	var middleSkills = ['Not Bad', 'Mid Level', 'Getting Better', 'It\'s Something', 'Still Learning', 'Silver V'];
	var goodSkills = ['Awesomesauce', 'Ninja', 'Pro', '1v1 Me Bro', 'Awwww Yiss', 'Skilzzzzz'];
	var oopsSkills = ['Uh-oh', 'Whoops', 'Oh dear...', 'Ummmmm....', 'Oooops', 'Woah there!'];

	$scope.open = function(e){
		var element = $(e.currentTarget);

		if(!element.is('.locked')){
			var skillLevel = element.find('[data-target="skill"]');
			var percentage = parseInt(element.find('[data-percentage]').attr('data-percentage')) || 0;
			element.toggleClass('open');	

			if(skillLevel.length && element.is('.open')){
				element.addClass('locked');
				renderSkill(skillLevel, percentage, function(){
					element.removeClass('locked');
				});
			}else{
				skillLevel.text('');
			}
		}
		
	}

	function renderSkill(textContainer, percent, callbackFunction){
		var percentage = percent;
		var text = getSkill(percentage);
		var time = 0;

		for(var i = 0; i < text.length; i++){
			time += 150;
			(function(number){
				setTimeout(function(){
					textContainer.text(textContainer.text() + text.charAt(number));

					if(number == text.length - 1){
						if(typeof callbackFunction === 'function'){
							callbackFunction();
						}
					}
				}, time);
			})(i);
		}
	}

	function getSkill(percentage){
		var random =  Math.floor(Math.random() * 3);

		if(percentage < 50){
			return badSkills[random];
		}

		if(percentage < 80){
			return middleSkills[random];
		}

		if(percentage <= 100){
			return goodSkills[random];
		}

		return oopsSkills[random];
	}

});