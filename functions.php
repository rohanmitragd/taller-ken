<?php

require_once('class.flickr.php');

$flickr = new Flickr("041a7d7998838a3794f563a56df46c29", "e18f3481a2fedb98");

if ($_POST['action']=="getTags") {
	
	$results= $flickr->getTags();

	echo json_encode($results);
	
} else if ($_POST['action']=="searchPhotos") {
	
	$tags = $_POST['tags'];
	
	$results = $flickr->searchPhotos($tags);
	
	echo json_encode($results);
}
?>
