/*extern DOMAssistant */
/*
	PictureSlides is developed by Robert Nyman, http://www.robertnyman.com
	For more information, please see http://www.robertnyman.com/jas
*/
DOMAssistant.PictureSlides.set({
	useImageText : true,
	useImageCounter : true,
	useNavigationLinks : true,
	useKeyboardShortcuts : true, // Space bar starts/stops the slideshow, arrow used to navigate the pictures forward and back
	useThumbnails : true,
	useFadingIn : true,
	useFadingOut : true,
	useFadeWhenNotSlideshow : true,
	useFadeForSlideshow : true,
	useDimBackgroundForSlideshow : true,
	
	startIndex : 0,	
	startSlideshowAtLoad : false,
	dimBackgroundAtLoad : false,
	loopSlideshow : true,
	
	images : [
		/* 
			Set paths to the large images. Only needed if not using thumbnails with links to them.
			Example:
				["images/picture1.jpg", "Text describing that picture"],
				["images/picture2.jpg", "More descriptive text"]
		*/
	],
	
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
	
	fadeIncrement : 0.1, // Goes from 0 to 1, and vice versa
	fadeInterval : 50, // Milliseconds	
	timeForSlideInSlideshow : 2000 // Milliseconds
});