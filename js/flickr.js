//Script to handle AJAX calls to functions.php script
//Gets string of all flickr tags on load (project names) and parses to array
//Passes tag(s) to functions.php and gets string of image source urls
//Parses source string and appends image urls to DOM html on button clicks

//Function to get tags
function getTagArray(callback) {
	var tagArray = [];
	$.ajax({
		url: 'functions.php',
		type: 'post',
		data: {'action': 'getTags'},
		dataType: 'json',
		async: false,
		success: function(data) {
			//handler goes here
			var obj = JSON.parse(data);
			obj = "" + obj;
			var json = $.parseJSON(obj);
			for (var i = 0, len = json.who.tags.tag.length; i<len; i++) {
				tagArray[i] = json.who.tags.tag[i]._content;
			}
			callback(tagArray);
			//console.log(tagArray);
		},
		error: function(xhr, desc, err) {
			console.log(xhr);
			console.log("Details: " + desc + "\nError:" + err);
		}
	}); // end ajax call
}

function getSrc(tagName, callback) {
	var srcArray = [];
	$.ajax({
		url: 'functions.php',
		type: 'post',
		data: {'action':'searchPhotos', 'tags':tagName},
		dataType: 'json',
		async: false,
		success: function(data) {
			//handler goes here
			var obj = JSON.parse(data);
			obj = "" + obj;
			var json = $.parseJSON(obj);

			//get indexes of photos
			var intA = 0; var intB = 0; var intC = 0;
			//randomize photo indexes
			if(json.photos.photo.length >= 3){ //prevent repeat photos
				intA = Math.floor(Math.random()*(json.photos.photo.length));
				intB = Math.floor(Math.random()*(json.photos.photo.length));
				while (intA == intB) {
					intB = Math.floor(Math.random()*(json.photos.photo.length));
				}
				intC = Math.floor(Math.random()*(json.photos.photo.length));
				while ((intC == intA) || (intC == intB)) {
					intC = Math.floor(Math.random()*(json.photos.photo.length));
				}
			} else if (json.photos.photo.length < 3) { //if less than 3 photos, repeats are ok
				intA = Math.floor(Math.random()*(json.photos.photo.length));
				intB = Math.floor(Math.random()*(json.photos.photo.length));
				intC = Math.floor(Math.random()*(json.photos.photo.length));
			}

			//create src urls from indexes
			var urlA = 'https://farm' + json.photos.photo[intA].farm + ".staticflickr.com/" + json.photos.photo[intA].server + "/" + json.photos.photo[intA].id + "_" + json.photos.photo[intA].secret + "_c.jpg";
			var urlB = 'https://farm' + json.photos.photo[intB].farm + ".staticflickr.com/" + json.photos.photo[intB].server + "/" + json.photos.photo[intB].id + "_" + json.photos.photo[intB].secret + "_c.jpg";
			var urlC = 'https://farm' + json.photos.photo[intC].farm + ".staticflickr.com/" + json.photos.photo[intC].server + "/" + json.photos.photo[intC].id + "_" + json.photos.photo[intC].secret + "_c.jpg";
			
			srcArray[0] = urlA;
			srcArray[1] = urlB;
			srcArray[2] = urlC;

			callback(srcArray);
			//console.log(json);
		},
		error: function(xhr, desc, err) {
			console.log(xhr);
			console.log("Details: " + desc + "\nError:" + err);
		}
	}); // end ajax call
}


$(document).ready(function() {
	
	var myTags = [];
	var mySrcs = [];
	var tCount = 0;

	getTagArray(function(e){
		myTags = e;
		//console.log(myTags);
	});
	
	function setPics() {
		console.log(tCount);
		console.log(myTags[tCount]);
		getSrc(myTags[tCount], function(e){
			mySrcs = e;
			console.log(mySrcs);
		});

		$('div.picA').html('<img src="'+mySrcs[0]+'" alt="" />');
		$('div.picB').html('<img src="'+mySrcs[1]+'" alt="" />');
		$('div.picC').html('<img src="'+mySrcs[2]+'" alt="" />');

		tCount++;

		if (tCount >= myTags.length) {
			tCount = 0;
		}
	}

	setPics();

	$('#content.form div.fourcol img').click(function(){
		setPics();
	});

});