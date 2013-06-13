<?php
$album_id = $_POST['id'];
$total_images = $_POST['totalImages'];
if( !isset($album_id) ) // check if album id is exists or not
	die("You are not authorized to access this page");

ini_set('max_execution_time', 0); // Increase the max execution time as some albums may have too many images which requires more time to create the zip
	
//get the app configuration details	
require_once 'config.php';

		$album_photos = $facebook->api("/{$album_id}/photos?limit={$total_images}");// Photos for the corresponding album id are accessed with their name, source and photo itself
		$photos = array();
		
		if(!empty($album_photos['data'])) {
			foreach($album_photos['data'] as $photo) {
				$temp = array();
				$temp['source'] = $photo['source'];
				$photos[] = $temp;
			}
		}
			
?>
<?php if(!empty($photos)) { 
	
	//Outputs Photo Links if User has requested Slide show
	if($_POST['type']=='slideshow'){
		$count = 0;
		foreach($photos as $photo) {
			 echo "<a href='".$photo['source']."' class='fancybox' data-fancybox-group='gallery'></a>";
		}
	}
	
	//Creates a zip file of photos if user asks to download the album
	if($_POST['type']=='download'){
		$zipname="albums.zip"; // provide the name of the zip file
		$zip = new ZipArchive();
		# create a zip file & open it. OVERWRITE mode is to overwrite the old file if any with same name
		$zip->open($zipname,ZipArchive::OVERWRITE);
		# loop through each file
		foreach($photos as $photo) {
			 # download file
  			  $download_file = file_get_contents($photo['source']);
   			 #add it to the zip
   			 $zip->addFromString(basename($photo['source']),$download_file);
		}
		$zip->close(); 
		echo "1";
		
		
	}
	} 
	?>
