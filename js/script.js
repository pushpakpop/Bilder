// JavaScript Document
// contains functions for downloading albums and showing image slideshow

    /**
     * Gets the images of the album and plays the fancybox slideshow
     *@param Id of the album whose images are to be viewed
     */

    function viewAlbum(albumId) {

        $('#photos').load("album.php", {
                id: albumId,
                type: 'slideshow'
            }, // Load the div#photo with the anchor tags having link to the album images

            function (data) {
                    $('a.fancybox').fancybox({ // open fancybox
                        cyclic: true,
                        autoPlay: true, //  slideshow will start after opening the first gallery item
                        playSpeed: 4000, // 4sec pause between changing next item

                        onUpdate: function () {

                            //functions for enabling swipe in touch devices //touchSwype
                            var IMG_WIDTH = 500,
                                currentImg = 0,
                                speed = 500,
                                imgs,
                                swipeOptions = {
                                    triggerOnTouchEnd: true,
                                    swipeStatus: swipeStatus,
                                    allowPageScroll: "vertical",
                                    threshold: 75
                                };

                            $(function () {
                                imgs = $(".fancybox-skin");
                                imgs.swipe(swipeOptions);
                            });

                            /**
                             * Catch each phase of the swipe.
                             * move : we drag the div.
                             * cancel : we animate back to where we were
                             * end : we animate to the next image
                             */

                            function swipeStatus(event, phase, direction, distance) {
                                //If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
                                if (phase == "move" && (direction == "left" || direction == "right")) {
                                    var duration = 0;

                                    if (direction == "left") {
                                        scrollImages((IMG_WIDTH * currentImg) + distance, duration);
                                    } else if (direction == "right") {
                                        scrollImages((IMG_WIDTH * currentImg) - distance, duration);
                                    }

                                } else if (phase == "cancel") {
                                    scrollImages(IMG_WIDTH * currentImg, speed);
                                } else if (phase == "end") {
                                    if (direction == "right") {
                                        $.fancybox.prev();
                                    } else if (direction == "left") {
                                        $.fancybox.next();
                                    }
                                }
                            }

                            /**
                             * Manuallt update the position of the imgs on drag
                             */

                            function scrollImages(distance, duration) {
                                imgs.css("-webkit-transition-duration", (duration / 1000).toFixed(1) + "s");

                                //inverse the number we set in the css
                                var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();

                                imgs.css("-webkit-transform", "translate3d(" + value + "px,0px,0px)");
                            }

                        } // touchSwpe

                    });
                    $('a.fancybox:first').trigger('click'); // Acts as Click event for First Album photo to start the slideshow
            }
        );
    };

    /*
     * Create the zip of the images of the requested album and displays link to the user to download.
     */
    $('.download').click(function () {
        var albumId = this.id;
        var albumName = this.title;
        $('.download').fancybox({
            autoScale: true,

            afterClose: function () {
                //as soon as the fancybox closes, set the content of div#download-zip to the original one
                $('#download-zip').html('<p id="loading"><img src="images/loading.gif" alt="loading"></p><p>Please wait, the zip is being created.</p>');
            },
            helpers: {
                title: null // disable titles on sldeshow
            },

        });
        var request = $.ajax({
            type: "POST",
            data: {
                id: albumId,
                name: albumName,
                type: 'download'
            },
            url: "album.php",
            success: function (data) {
                if (data == '1') {
                    // as soon as zip is created, provide the link to download the album
                    $('#download-zip').html("<p id='dlink'><a href='download.php' title='click to download the album'>Download</a> the '" + albumName + "' album </p>");
                } else {
                    // show the user that some error occured
                    $('#download-zip').html("Some error occured while creating the zip of photos. Please try again");
                }
            },
            error: function () {
                alert("Some error occured while creating the zip of photos. Please try again");
                return false;
            }
        });
    });
