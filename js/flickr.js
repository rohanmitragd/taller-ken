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

//Function to get array of image urls
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
				console.log('less than 3 images in set');
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
	var mobileSrc = [];
	var tCount = 0;
	var clickCount = 0;

	getTagArray(function(e){
		myTags = e;
		var mobileIndex = $.inArray('mobile',myTags);
		if (mobileIndex != -1) {
			myTags.splice(mobileIndex, 1);
		}
		console.log(myTags);
	});
	
	function setPics() {
		console.log(tCount);
		console.log(myTags[tCount]);
		getSrc(myTags[tCount], function(e){
			mySrcs = e;
			console.log(mySrcs);
		});
		if ($(window).width() <= 480) {
			var tagParam = myTags[tCount] + ',mobile';
			getSrc(tagParam, function(e){
				mobileSrc = e;
				console.log(mobileSrc);
			});
		}
		
		var colW = 0.3075*($(window).width() * .95);
		if ($(window).width() <= 480) {
			colW = $(window).width() - 20;
		}
		
		var picA = new Image();
		$(picA).bind('load', function(){
			var picH = picA.height;
			var picW = picA.width;
			
			if ( ($(window).width() <= 480) && ($(window).height() <= 400) ) {
				var picCompW = (picW/picH)*200;
				var topVal = ( $(window).height() - 200 ) / 2;
				var leftVal = ( $(window).width() - picCompW ) / 2;
				document.querySelector('.picA').appendChild(picA);
				$('div.picA img').css('margin-top',topVal+'px');
				$('div.picA img').css('margin-left',leftVal+'px');
			} else {
				var picCompH = (picH/picW)*colW;
				console.log('col width: '+colW);
				console.log('picA comp height: '+picCompH);
				var topVal = ( $(window).height() - picCompH ) / 2;
				document.querySelector('.picA').appendChild(picA);
				$('div.picA img').css('margin-top',topVal+'px');
			}
		});
		if ( ($(window).width() <= 480) && (clickCount < myTags.length)) {
			picA.src = mobileSrc[0];
			clickCount++;
		}
		else {
			picA.src = mySrcs[0];
		}
		
		
		var picB = new Image();
		$(picB).bind('load', function(){
			var picH = picB.height;
			var picW = picB.width;
			var picCompH = (picH/picW)*colW;
			console.log('col width: '+colW);
			console.log('picB comp height: '+picCompH);
			var topVal = ( $(window).height() - picCompH ) / 2;
			document.querySelector('.picB').appendChild(picB);
			$('div.picB img').css('margin-top',topVal+'px');
		});
		picB.src = mySrcs[1];
		
		
		var picC = new Image();
		$(picC).bind('load', function(){
			var picH = picC.height;
			var picW = picC.width;
			var picCompH = (picH/picW)*colW;
			console.log('col width: '+colW);
			console.log('picC comp height: '+picCompH);
			var topVal = ( $(window).height() - picCompH ) / 2;
			document.querySelector('.picC').appendChild(picC);
			$('div.picC img').css('margin-top',topVal+'px');
		});
		picC.src = mySrcs[2];
		
		
		tCount++;

		if (tCount >= myTags.length) {
			tCount = 0;
		}
	}

	setPics();
	
		
	$('#content.form div.fourcol').on('click', 'img', function(){
		$('#content.form .fourcol').empty();
		setPics();
		console.log("img clicked!")
	});

});