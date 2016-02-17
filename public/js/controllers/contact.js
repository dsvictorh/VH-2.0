vh.controller('contact', function($scope){
	$scope.sendMail = function(e){
		var form = $(e.target);
		var data = {};
		data.name = form.find('[name="name"]').val();
		data.email = form.find('[name="email"]').val();
		data.message = form.find('[name="message"]').val();

		$.ajax({
			url: '/api/mail/send',
			method: 'POST',
			dataType: 'application/json',
			data: data,
			sucess: function(data){

			}
		});

		return false;
	}
});