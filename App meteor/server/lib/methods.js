Meteor.methods({
	'upload': function(file, name, type, size) {
		let public = Meteor.settings.public;

		var FormData = Npm.require('form-data');
		var form = new FormData();

		form.append('filename', file, {
			filename: name
		});

		form.submit('http://' + public.server + ':' + public.port + '/upload', function(err, res) {
			res.resume();
		});
	}
});