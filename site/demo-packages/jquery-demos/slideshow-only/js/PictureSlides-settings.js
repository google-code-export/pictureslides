/*extern jQuery */
/*
	jQuery.PictureSlides is developed by Robert Nyman, http://www.robertnyman.com
	For more information, please see http://www.robertnyman.com/picture-slides
	Released under a MIT License
*/
jQuery.PictureSlides.set({
	// Switches to decide what features to use
	useImageText : false,
	useImageCounter : false,
	useNavigationLinks : false,
	useKeyboardShortcuts : false,
	useThumbnails : false,
	useFadingIn : true,
	useFadingOut : true,
	useFadeWhenNotSlideshow : false,
	useFadeForSlideshow : true,
	useDimBackgroundForSlideshow : false,
	loopSlideshow : true,
	usePreloading : false,
	
	// At page load
	startIndex : 0,
	startSlideshowAtLoad : true,
	dimBackgroundAtLoad : false,
	
	// Large images to use and thumbnail settings
	images : [
		["pictures/1.jpg", ""],
		["pictures/2.jpg", ""],
		["pictures/3.jpg", ""],
		["pictures/4.jpg", ""],
		["pictures/5.jpg", ""],
		["pictures/6.jpg", ""],
		["pictures/7.jpg", ""],
		["pictures/8.jpg", ""],
		["pictures/9.jpg", ""]
	],
	thumbnailActivationEvent : "click",
	
	// IDs of HTML elements to use
	mainImageId : "picture-slides-image", // Mandatory
	fadeContainerId : "picture-slides-container",
	imageTextContainerId : null,
	previousLinkId : null,
	nextLinkId : null,
	imageCounterId : null,
	startSlideShowId : null,
	stopSlideShowId : null,
	thumbnailContainerId: null,
	dimBackgroundOverlayId : null,
	elementOnTopOfDimBackgroundId : null,
	
	// Fading settings
	fadeIncrement : 0.1, // Goes from 0 to 1, and vice versa
	fadeInterval : 20, // Milliseconds	
	timeForSlideInSlideshow : 2000 // Milliseconds
});