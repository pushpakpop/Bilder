<?php
	session_start();
   	require 'config.php';
   	//ovewrites the cookie
   	unset($_COOKIE['PHPSESSID']);
	$signed_request_cookie = 'fbsr_' . $_fbApiKey;
	setcookie($signed_request_cookie, "", time()-3600, '/', $_SERVER['HTTP_HOST']);
	// destroy the current sessions
	session_destroy(); 
	$facebook->destroySession();
	//Redirect the user to the index page
	header('Location:index.php');
	die();
?>
