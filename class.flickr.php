<?php
	class Flickr{
		private $flickr_key;
		private $flickr_secret;
		private $format = 'json';
		
		public function __construct($flickr_key, $flickr_secret) {
			$this->flickr_key = $flickr_key;
			$this->flickr_secret = $flickr_secret;
		}
		
		public function getTags(){
			//construct the url
			$url  = 'https://api.flickr.com/services/rest/?';
			$url .= 'method=flickr.tags.getListUser';
			$url .= '&api_key=' . $this->flickr_key;
			$url .= '&user_id=115711795%40N04';
			$url .= '&format=' . $this->format;
			$url .= '&nojsoncallback=1';
			//get the results
			$result = file_get_contents($url);
			return json_encode($result);
		}
		
		
		public function searchPhotos($tags = ''){
			$urlencoded_tags = array();
			
			if(!empty($tags)){
				$tags_r = explode(',', $tags);
				foreach($tags_r as $tag){
					$urlencoded_tags[] = urlencode($tag);
				}
			}

			//construct the url
			$url  = 'https://api.flickr.com/services/rest/?';
			$url .= 'method=flickr.photos.search';
			$url .= '&api_key=' . $this->flickr_key;
			$url .= '&user_id=115711795%40N04';
			$url .= '&tags=' . implode(',', $urlencoded_tags);
			$url .= '&tag_mode=all';
			$url .= '&per_page=500';
			$url .= '&format=' . $this->format;
			$url .= '&nojsoncallback=1';
			//get the results
			$result = file_get_contents($url);
			return json_encode($result);
		}
	}
?>


