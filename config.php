<?php
   require 'lib/facebook-php-sdk/facebook.php';
   //Facebook Object
	$facebook = new Facebook(array(
	  'appId'  => '', //Provide your app id here
	 'secret' => '', // provide your app secret key here
	  'cookie' => true,
	));
	
?>
