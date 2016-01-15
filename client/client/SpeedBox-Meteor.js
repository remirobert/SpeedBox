Template.main.helpers({
  'Files': function() {
    return Files.find();
  },

  'link': function() {
  	let public = Meteor.settings.public;
    return 'http://' + public.server + ':' + public.port + '/download?filename=' + this.filename;
  }
});

Template.main.events({
	'click .download': function () {
		Meteor.call('download', this.filename, function(error, result) {
				if (error) {
					console.log(error);
				}
			});
	},

	'submit form': function (e, tmp) {
		e.preventDefault();

		var file = $('#fileinput').prop('files')[0];
    var reader = new FileReader();

    reader.onload = function(e) {
			Meteor.call('upload', e.target.result, file.name, file.type, file.size, function(error, result) {
				if (error) {
					console.log(error);
				}
			});			
    }
    reader.readAsDataURL(file);
	}
});