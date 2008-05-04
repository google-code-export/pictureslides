/*extern DOMAssistant */
/*
	DOMAssistant.PictureSlides is developed by Robert Nyman, http://www.robertnyman.com
	For more information, please see http://www.robertnyman.com/picture-slides
	Released under a MIT License
*/
DOMAssistant.PictureSlides.set({
	// Switches to decide what features to use
	useImageText : false,
	useImageCounter : false,
	useNavigationLinks : true,
	useKeyboardShortcuts : true,
	useThumbnails : false,
	useFadingIn : false,
	useFadingOut : false,
	useFadeWhenNotSlideshow : false,
	useFadeForSlideshow : false,
	useDimBackgroundForSlideshow : false,
	loopSlideshow : false,
	usePreloading : true,
	
	// At page load
	startIndex : 0,	
	startSlideshowAtLoad : false,
	dimBackgroundAtLoad : false,
	
	// Large images to use and thumbnail settings
	/* 
		Set paths to the large images. Only needed if not using thumbnails with links to them.
	*/
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
	imageTextContainerId : "picture-slides-image-text",
	previousLinkId : "previous-image",
	nextLinkId : "next-image",
	imageCounterId : "image-counter",
	startSlideShowId : "start-slideshow",
	stopSlideShowId : "stop-slideshow",
	thumbnailContainerId: "picture-slides-thumbnails",
	dimBackgroundOverlayId : "picture-slides-dim-overlay",
	elementOnTopOfDimBackgroundId : "picture-slides-frame",	
	
	// Fading settings
	fadeIncrement : 0.1, // Goes from 0 to 1, and vice versa
	fadeInterval : 10, // Milliseconds	
	timeForSlideInSlideshow : 2000 // Milliseconds
});