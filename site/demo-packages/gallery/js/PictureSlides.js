/*extern DOMAssistant, $, $$ */
/*
	DOMAssistant.PictureSlides is developed by Robert Nyman, http://www.robertnyman.com
	For more information, please see http://www.robertnyman.com/picture-slides
	Released under a MIT License
*/
DOMAssistant.PictureSlides = function () {
	var useMSFilter = false;
	var previousLink = null;
	var nextLink = null;
	var imageCounter = null;
	var startSlideShowLink = null;
	var stopSlideShowLink = null;
	var dimBackgroundOverlay = null;
	var elementOnTopOfDimBackground = null;
	var dimBackgroundLink = null;
	var noDimBackgroundLink = null;
	var dimmingEnabled = false;
	var fadeContainer = null;
	var mainImage = null;
	var imageTextContainer = null;
	var thumbnailContainer = null;
	var preloadImages = true;
	var imageIndex = 0;
	var slideshowIsPlaying = false;
	return {
		currentIndex : 0,
		fadingIn : true,
		fadeLevel : 0,
		fadeEndLevel : 1,
		slideTimer : null,
		fadeTimer : null,
		setImageTimer : null,
		functionAfterFade : null,
		
		set : function (settings) {
			for (var i in settings) {
				if (typeof i === "string") {
					this[i] = settings[i];
				}
			}
		},
		
		init : function () {
			$$(window).addEvent("load", function () {
				DOMAssistant.PictureSlides.initSlides();
			});
			$$(window).addEvent("unload", function () {
				DOMAssistant.PictureSlides.closeSession();
			});
		},
	
		initSlides : function (){
	    	if(document.getElementById){
				fadeContainer = $$(this.fadeContainerId);
				mainImage = $$(this.mainImageId);
				this.slideshowIsSupported = fadeContainer && mainImage;
				thumbnailContainer = $$(this.thumbnailContainerId);
				if (!this.images) {
					this.images = [];
				}
				preloadImages = this.usePreloading || true;
				if (this.useThumbnails && thumbnailContainer) {
					this.imageLinks = thumbnailContainer.cssSelect("a");
					for (var i=0, il=this.imageLinks.length, link, index, imgSrc, imgRef; i<il; i++) {
						link = $(this.imageLinks[i]);
						index = function () {
							return i;
						}();
						link.index = index;
						link.addEvent(this.thumbnailActivationEvent, function () {
							DOMAssistant.PictureSlides.nextImage(this.index);
							return false;
						});
						imgSrc = link.href;
						if (preloadImages) {
							imgRef = new Image();
							imgRef.src = imgSrc;
						}
						this.images.push([imgSrc, link.title]);
					}
				}
				
				if (this.images.length > 0) {
					if (typeof this.startIndex === "undefined") {
						this.startIndex = 0;
					}
					if(this.useImageText){
						imageTextContainer = $$(this.imageTextContainerId);
						if(!imageTextContainer){
							this.useImageText = false;
						}
					}
					if (this.useImageCounter) {
						imageCounter = $("#" + this.imageCounterId);
					}
					if (this.useNavigationLinks) {
						previousLink = $("#" + this.previousLinkId);
						previousLink.addEvent("click", this.previousLinkClick);
						nextLink = $("#" + this.nextLinkId);
						nextLink.addEvent("click", this.nextLinkClick);
						
						startSlideShowLink = $("#" + this.startSlideShowId);
						startSlideShowLink.addEvent("click", this.startSlideShowClick);
						stopSlideShowLink = $("#" + this.stopSlideShowId);
						stopSlideShowLink.setStyle("display", "none");
						stopSlideShowLink.addEvent("click", this.stopSlideshowClick);
					}
			
					if(this.useKeyboardShortcuts){
						$(document).addEvent("keydown", function (evt) {
							DOMAssistant.PictureSlides.keyboardNavigation(evt);
						});
					}
					if (this.useDimBackgroundForSlideshow && this.dimBackgroundOverlayId) {
						dimBackgroundOverlay = $$(this.dimBackgroundOverlayId);
						if (!dimBackgroundOverlay) {
							dimBackgroundOverlay = $(document.body).create("div", {
								id : this.dimBackgroundOverlayId
							}, true);
						}
						elementOnTopOfDimBackground = $("#" + this.elementOnTopOfDimBackgroundId);
						elementOnTopOfDimBackground.setStyle({
							position : "relative",
							"z-index" : (dimBackgroundOverlay.getStyle("z-index") + 1)
						});	
						dimmingEnabled = true;
					}
					useMSFilter = typeof fadeContainer.style.filter !== "undefined";
					if (this.startSlideshowAtLoad) {
						this.startSlideshow();
					}
					if (this.dimBackgroundAtLoad) {
						this.dimBackground();
					}
					else {
						this.setImage();
					}
				}
			}
		},
	
		previousLinkClick : function(evt){
			DOMAssistant.preventDefault(evt);
			DOMAssistant.PictureSlides.previousImage();
		},
	
		nextLinkClick : function(evt){
			DOMAssistant.preventDefault(evt);
			DOMAssistant.PictureSlides.nextImage();
		},
	
		startSlideShowClick : function(evt){
			DOMAssistant.preventDefault(evt);
			DOMAssistant.PictureSlides.startSlideshow();
		},
	
		stopSlideshowClick : function(evt){
			DOMAssistant.preventDefault(evt);
			DOMAssistant.PictureSlides.stopSlideshow();
		},
	
		setImage : function (index){
			index = index || this.startIndex;
			if (this.imageLinks) {
				this.imageLinks[imageIndex || 0].removeClass("selected");
				this.imageLinks[index].addClass("selected");
			}
			mainImage.setAttribute("src", this.images[index][0]);
			if (this.useImageText) {
				imageTextContainer.replaceContent(this.images[index][1]);
			}
			if(this.useImageCounter){
				imageCounter.replaceContent((((this.images.length > 0)? index : -1) + 1) + " / " + this.images.length);
			}
			if (this.useNavigationLinks) {
				previousLink.setStyle("visibility", (index > 0)? "visible" : "hidden");
				nextLink.setStyle("visibility", (index < (this.images.length - 1))? "visible" : "hidden");
			}
			imageIndex = index;
		},
	
		nextImage : function (index){
			if(imageIndex < (this.images.length - 1) || typeof index !== "undefined" || this.loopSlideshow){
				this.currentIndex = (typeof index !== "undefined")? index : (this.loopSlideshow && imageIndex === (this.images.length - 1))? 0 : (imageIndex + 1);
				if (((this.useFadeForSlideshow && slideshowIsPlaying) || (!slideshowIsPlaying && this.useFadeWhenNotSlideshow)) && (this.useFadingOut || this.useFadingIn)) {
					if(this.useFadingOut){
						this.fadeOut();
					}
					else if(this.useFadingIn){
						this.fadeIn();
					}
				}
				else {
					this.setImage(this.currentIndex);
				}
			}
		},
	
		previousImage : function (){
			if(imageIndex > 0){
				this.currentIndex = imageIndex - 1;
				if (((this.useFadeForSlideshow && slideshowIsPlaying) || (!slideshowIsPlaying && this.useFadeWhenNotSlideshow)) && (this.useFadingOut || this.useFadingIn)) {
					if(this.useFadingOut){
						this.fadeOut();
					}
					else if(this.useFadingIn){
						this.fadeIn();
					}
				}
				else {
					this.setImage(this.currentIndex);
				}
			}         
		},
	
		setDimBackgroundSize : function(){
			var width = document.body.offsetWidth;
			var bodyHeight = document.body.scrollHeight;
			var height = (typeof window.innerHeight !== "undefined")? window.innerHeight : (document.documentElement)? document.documentElement.clientHeight : document.body.clientHeight;
			height = (bodyHeight > height)? bodyHeight : height;
	        dimBackgroundOverlay.setStyle({
				width : width + "px",
				height : height + "px"
			});
		},
	
		dimBackground : function (){
			this.setDimBackgroundSize();
			dimBackgroundOverlay.setStyle("display", "block");
		},
	
		noDimBackground : function (fromStopSlideshow){
			dimBackgroundOverlay.setStyle("display", "none");
		},
		
		startSlideshow : function (){
			if (this.useNavigationLinks) {
				startSlideShowLink.setStyle("display", "none");
				stopSlideShowLink.setStyle("display", "inline");
			}
			slideshowIsPlaying = true;
			this.slideTimer = setInterval(function (obj) {
				return function () {
					obj.nextImage();
				};
			}(this), this.timeForSlideInSlideshow);
			if(dimmingEnabled  && this.useDimBackgroundForSlideshow){
				this.dimBackground();
			}
		},
	
		stopSlideshow : function (){
			clearInterval(this.slideTimer);
			clearInterval(this.fadeTimer);
			clearTimeout(this.setImageTimer);
			if (this.useNavigationLinks) {
				startSlideShowLink.setStyle("display", "inline");
				stopSlideShowLink.setStyle("display", "none");
			}	
			slideshowIsPlaying = false;
			if (this.useFadeForSlideshow && (this.useFadingOut || this.useFadingIn)) {
				this.setFadeParams(true, 1, 0);
				this.setFade();
			}
			if(dimmingEnabled){
				this.noDimBackground();
			}
		},
	
		fadeIn : function (){
			this.setFadeParams(true, 0, 1);
			this.functionAfterFade = null;
			this.fadeTimer = setInterval(function (obj) {
				return function () {
					obj.fade();
				};
			}(this), this.fadeInterval);
			this.setImageTimer = setInterval(function (obj) {
				return function () {
					obj.setImage(obj.currentIndex);
				};
			}(this), this.fadeInterval);
		},
	
		fadeOut : function (){
			this.setFadeParams(false, 1, 0);
			this.functionAfterFade = this.fadeOutDone;
			this.fadeTimer = setInterval(function (obj) {
				return function () {
					obj.fade();
				};
			}(this), this.fadeInterval);
		},
	
		fadeOutDone : function (){
			if(!this.useFadingIn){
				this.fadeLevel = 1;
				this.setFade();
				this.setImage(this.currentIndex);
			}
			else {
				this.fadeIn();
			}
		},
	
		fade : function (){
			if((this.fadingIn && this.fadeLevel < this.fadeEndLevel) || !this.fadingIn && this.fadeLevel > this.fadeEndLevel){
				this.fadeLevel = (this.fadingIn)? this.fadeLevel + this.fadeIncrement : this.fadeLevel - this.fadeIncrement;
				// This line is b/c of a floating point bug in JavaScript
				this.fadeLevel = Math.round(this.fadeLevel * 10) / 10;
				this.setFade();
			}
			else{
				clearInterval(this.fadeTimer);
				clearTimeout(this.setImageTimer);
				if(this.functionAfterFade){
					this.functionAfterFade();
				}
			}
		},
	
		setFade : function (){
			if(useMSFilter){
				fadeContainer.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.fadeLevel * 100) + ")";
			}
			else{
				fadeContainer.style.opacity = this.fadeLevel;
			}
		},
	
		setFadeParams : function (fadingIn, fadeLevel, fadeEndLevel){
			this.fadingIn = fadingIn;
			this.fadeLevel = fadeLevel;
			this.fadeEndLevel = fadeEndLevel;
		},
	
		closeSession : function (oEvent){
			DOMAssistant.PictureSlides = null;
		},
	
		keyboardNavigation : function (evt){
	    	var keyCode = evt.keyCode;
	    	if(!evt.altKey && this.images.length > 0){
				switch(keyCode){
					case 32:
						if(slideshowIsPlaying){
							this.stopSlideshow();
						}
						else{
							this.startSlideshow();
						}
						DOMAssistant.preventDefault(evt);
						break;
					case 37:
					case 38:
						this.previousImage();
						DOMAssistant.preventDefault(evt);
						break;
					case 39:
					case 40:
						this.nextImage();
						DOMAssistant.preventDefault(evt);
						break;
				}
			}
		}
	};
}();
DOMAssistant.PictureSlides.init();