// JavaScript Document
// contains functions for downloading albums and showing image slideshow

function view_album(id){
		var album_id=id;
		$('#photos').load("album.php",{id:album_id,type:'slideshow'}, // Load the div#photo with the anchor tags having link to the album images
		function(){
				$('a.fancybox').fancybox({ // open fancybox
					cyclic : true,
					autoPlay : true, //  slideshow will start after opening the first gallery item
   					playSpeed : 4000, // 4sec pause between changing next item
					
					onUpdate:function(){
						
						//functions for enabling swipe in touch devices //touchSwype
						var IMG_WIDTH = 500; 
						var currentImg=0;
						var speed=500;
						var imgs;
					
						var swipeOptions=
						{
							triggerOnTouchEnd : true,	
							swipeStatus : swipeStatus,
							allowPageScroll:"vertical",
							threshold:75			
							}
						
						$(function()
						{				
							imgs = $(".fancybox-skin");
							imgs.swipe( swipeOptions );
						});
						
						/**
						* Catch each phase of the swipe.
						* move : we drag the div.
						* cancel : we animate back to where we were
						* end : we animate to the next image
						*/			
						function swipeStatus(event, phase, direction, distance)
						{
							//If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
							if( phase=="move" && (direction=="left" || direction=="right") )
							{
								var duration=0;
								
								if (direction == "left")
									scrollImages((IMG_WIDTH * currentImg) + distance, duration);
								
								else if (direction == "right")
									scrollImages((IMG_WIDTH * currentImg) - distance, duration);
								
							}
							
							else if ( phase == "cancel")
							{
								scrollImages(IMG_WIDTH * currentImg, speed);
							}
							
							else if ( phase =="end" )
							{
								if (direction == "right")
									$.fancybox.prev();
								else if (direction == "left")			
									$.fancybox.next();
							}
						}
						
						/**
						* Manuallt update the position of the imgs on drag
						*/
						
						function scrollImages(distance, duration)
						{
							imgs.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
							
							//inverse the number we set in the css
							var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
							
							imgs.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
						}
						
					} // touchSwpe
					
				});
				$('a.fancybox:first').trigger('click'); // Acts as Click event for First Album photo to start the slideshow
			}
		);
	};
	
	$('.download').click(function(){
		var album_id=this.id;
		var album_name=this.title;
		$('.download').fancybox({
			autoScale : true,
			
			afterClose: function() 
			{
				//as soon as the fancybox closes, set the content of div#download-zip to the original one
				$('#download-zip').html('<p id="loading"><img src="images/loading.gif" alt="loading"></p><p>Please wait, the zip is being created.</p>');
			},
			helpers: { 
						title: null
					},
					
			});
		var request=$.ajax({ //Ajax call to download script to get the photos and zip them
			type: "POST",
			data: {id:album_id,name:album_name,type:'download'},
			url: "album.php",
			success: function(data)
			{
				if(data=='1')
				{
					// as soon as zip is created, provide the link to download the album
					$('#download-zip').html("<p id='dlink'><a href='download.php' title='click to download the album'>Download</a> the '"+album_name+"' album </p>");
				}
				else
				{
					// show the user that some error occured
					$('#download-zip').html("Some error occured while creating the zip of photos. Please try again");					
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				return false;
			}
		}); 
	});
	
	function begin_download(aid){
			var album_id=aid;
		
		var album_name=this.title;
		var request=$.ajax({ //Ajax call to download script to get the photos and zip them
			type: "POST",
			data: {id:album_id,name:album_name,type:'download'},
			url: "album.php",
			success: function(data)
			{
				if(data=='1')
				{
					$(album_id+' btn-name').text('Downlaod Zip');
				}
				else
				{
					alert('some error occured while downloading the zip. Please try again');				
				}
			},
			error: function(){
				return false;
			}
		}); 
	};