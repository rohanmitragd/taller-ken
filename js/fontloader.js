// JavaScript Document

//Google WebFont Code
	WebFontConfig = {
		// google: { families: [ 'font1', 'font2' ] },
		
		typekit: { id: 'fpt7ukv' }, //enter typekit ID here
		
		loading: function() {
		// do something
		},
		
		fontloading: function(fontFamily, fontDescription) {
		  // do something
		},
		
		fontactive: function(fontFamily, fontDescription) {
		  // do something
		},
		
		fontinactive: function(fontFamily, fontDescription) {
		  // do something
		},
		
		active: function() {
		  // do something
		},
		
		inactive: function() {
		  // do something
		}
	};
		
	(function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();