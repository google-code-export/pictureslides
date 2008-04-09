/*extern DOMAssistant */
/*
	DOMAssistant.PictureSlides is developed by Robert Nyman, http://www.robertnyman.com
	For more information, please see http://www.robertnyman.com/picture-slides
	Released under a MIT License
*/
DOMAssistant.PictureSlides.set({
	// Switches to decide what features to use
	useImageText : true,
	useImageCounter : true,
	useNavigationLinks : true,
	useKeyboardShortcuts : true,
	useThumbnails : true,
	useFadingIn : true,
	useFadingOut : true,
	useFadeWhenNotSlideshow : true,
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
		["pictures/3.jpg", ""]
	],
	thumbnailActivationEvent : "click",
	
	// IDs of HTML elements to use
	fadeContainerId : "picture-slides-container",
	mainImageId : "picture-slides-image",
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
	fadeInterval : 50, // Milliseconds	
	timeForSlideInSlideshow : 2000 // Milliseconds
});