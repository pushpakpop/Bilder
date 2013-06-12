<?php
require_once 'config.php';	//get the app configuration details	
$user = $facebook->getUser();	//Get facebook User Id
?>
<!DOCTYPE html>
<html lang="en">
	<head>
	<meta charset="utf-8">
	<title>Fb Albums</title>
	<!-- Loading Bootstrap css-->
	<link href="lib/Flat-UI/css/bootstrap.css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="lib/Flat-UI/css/bootstrap-responsive.css" rel="stylesheet">
	<!-- Loading Flat UI css-->
	<link href="lib/Flat-UI/css/flat-ui.css" rel="stylesheet">
    <!-- Loading fancybox css -->
	<link type="text/css" href="lib/fancybox/jquery.fancybox.css" rel="stylesheet" />
     <!-- Loading our css -->
    <link href="css/style.css" rel="stylesheet">
    
	<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
	<!--[if lt IE 9]>
      <script src="lib/Flat-UI/js/html5shiv.js"></script>
    <![endif]-->

	</head>

	<body>
    <div class="container">
      <?php        
			if ($user){	
			try { 
					$me = $facebook->api('/me'); //Get current user details 
		?>
       <div class="span12">
          <div id="header">
          		<div id="title">
                    <h1>Bilder</h1>
                </div><!--/#title-->
                
                <div id="user-info" > <img src="<?php echo "http://graph.facebook.com/".$me['id']."/picture" ?>" alt="logout">
                
                  <div>
                      <p><?php echo $me['name']?></p>
                      <p><a href="logout.php" title="Click to logout">Logout</a></p>
                  </div>
          		</div><!--/#user-info-->
                
        		<div class="clearfix"></div>
     	 </div><!--/#header-->
      
      <div id="download-link">
      	<div id="download-zip" style="display:none"><!--this div will be shown to user in fancybox when user clicks to download the album-->
        	<p id="loading"><img src="images/loading.gif" alt="loading"></p>
        	<p>Please wait, the zip is being created.</p>
        </div><!--/#download-zip-->
      </div><!--/#download-link-->
      
        <?php					
		$user_albums = $facebook->api('/me/albums'); //access users album by making call to FB GRAPH API method
		$albums = array();
		if(!empty($user_albums['data'])) {
			foreach($user_albums['data'] as $album) {
				$album_cover = "https://graph.facebook.com/{$album['cover_photo']}/picture?type=normal&access_token={$facebook->getAccessToken()}";
				$no_images = (!empty($album['count'])) ? $album['count']:0;// Number of Photos in the Album
				//print_r($album_cover);
		?>
        <!--album list comes here-->
        <div class="album-list span3">
          <div class="album tile">
            <label class="no-of-pics">
              <?=$no_images?>
            </label>
            <a href="javascript:void(0)" onClick="view_album(<?=$album['id'] ?>)" title="view album">
            <img src="<?=$album_cover?>" alt="<?=$album['id'] ?>" class="<?php if($no_images>0) echo "view-album" ?>" title="View album">
            </a>
            <p class="album-title" title="<?=$album['name']?>">
              <?=substr($album['name'], 0, 21)?>
            </p>
            <div>
              <a id="<?=$album['id'] ?>" title="<?=$album['name']?>" <?php if($no_images==0) echo "disabled" ?> class="btn btn-primary download" href="#download-zip">Begin Download</a>
            </div>
          </div><!--/.album--> 
        </div><!--/.album-list-->
        
        <?php
						}
					}
		?>
        
      </div><!--/.span12 -->
     <div class="clearfix"></div>
      <?	
				} 
				catch(FacebookApiException $fae)
				{
					error_log($fae);
				} ?>
      <?php }
						else
						{
							$params = array(
                                      'scope' => 'user_photos',   //Requesting User Permissions through Facebook App
                                      'redirect_uri' => 'http://www.umawoodenpallet.com/test-project/fbalbums/index.php' //User is redirected after Login
                                    );
                                $login_url = $facebook->getLoginUrl( $params );//Create the Login URL
								
						?>
      <div class="demo-headline">
        <h1 class="demo-logo">
          <div class="logo"></div>
          Bilder <small><a href="<?php echo $login_url ?>"><img src="images/facebook.png" alt=""></a></small> </h1>
      </div><!-- /.demo-headline -->
      
      <?php }
					
?>
      <div id="photos"> </div>
      
    </div><!--/.contianer--> 
    
    <!-- Loading jquery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <!-- Loading fancybox files -->
	<script src="lib/fancybox/jquery.fancybox.pack.js"></script>
    <!-- Loading touchswipe files used for navigating the images when user is on a smart phone or tablet -->
	<script src="lib/jquery.touchSwipe.min.js"></script>
    <!--Loading our javascript-->
    <script type="text/javascript" src="js/fbalbums.js"></script>

</body>
</html>
