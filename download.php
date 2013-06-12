<?php 
	header('Content-Description: File Transfer');
    header('Content-Type: application/zip');
	header("Content-Type: application/force-download");
    header('Content-Disposition: attachment; filename="albums.zip"');
    header('Content-Transfer-Encoding: binary');
    readfile('albums.zip');
	ob_clean();
    flush();
	//unlink('albums.zip');
	exit;

?>