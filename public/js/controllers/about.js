vh.controller('about', function($scope){
	var badSkills = ['Noob', 'Scrub', 'Bronze V', 'Newbie', ':(', 'Y u no better?'];
	var middleSkills = ['Not Bad', 'Mid Level', 'Getting Better', 'It\'s Something', 'Still Learning', 'Silver V'];
	var goodSkills = ['Awesomesauce', 'Ninja', 'Pro', '1v1 Me Bro', 'Awwww Yiss', 'Skilzzzzz'];
	var oopsSkills = ['Uh-oh', 'Whoops', 'Oh Dear...', 'Ummmmm....', 'Oooops', 'Woah there!'];
	var mostRecent;

	$scope.open = function(e){
		var element = $(e.currentTarget);

		if(!element.is('.locked')){
			var skillLevel = element.find('[data-target="skill"]');
			var percentage = parseInt(element.find('[data-percentage]').attr('data-percentage')) || 0;
			element.toggleClass('open');	
			element.addClass('locked');

			if(skillLevel.length && element.is('.open')){
				
				renderSkill(skillLevel, percentage, function(){
					element.removeClass('locked');
				});
			}else{
				setTimeout(function(){
					skillLevel.text('');
					element.removeClass('locked');
				}, 1000);
			}
		}
		
	}

	function renderSkill(textContainer, percent, callbackFunction){
		var percentage = percent;
		var text = getSkill(percentage);
		var time = 0;

		for(var i = 0; i < text.length; i++){
			time += 100;
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
		var random =  Math.floor(Math.random() * 6);

		if(mostRecent == random && random != 5){
			random += 1;
		}

		mostRecent = random;
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