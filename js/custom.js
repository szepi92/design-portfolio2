// This document initializes everything on load!
$(document).ready(function(){

// Hack to hide things while still forcing them to load
$('.js-hidden').delay(1).fadeTo(0,0,'linear');		

// Style grid-cells to play nicely (Masonry!)
$('.grid').each(function(idx, el){
	var $el = $(el);
	var gutter = $el.data("gutter");
	var fitWidth = $el.data("fit");
	var columnWidth = $el.data("columnWidth");
	if (!_.isFinite(gutter)) gutter = 0;
	
	$(this).masonry({
		itemSelector: '.grid-cell',
		gutter: gutter,
		containerStyle: {},
		isFitWidth: fitWidth,
		columnWidth: columnWidth
	});
	
});

// TODO: THIS DOESN'T DO ANYTHING RIGHT NOW!!!
/*
$('.page').windows({
	snapping: false,
	snapSpeed: 500,
	snapInterval: 1100,
});*/

// Anonymous function to wrap variable scope
// SCROLLING AND THE REKA IMAGE (Animations)
// TODO: This doesn't work in mobile!!
(function(){
	var seen = {};
	
	// When about half-way, fade in Reka
	$('#about-page').waypoint({
		handler: function(direction) {
			if (seen['#about-page']) { return; }
			seen['#about-page'] = true;
			$('#reka-image').delay(2).fadeTo(1000, 1, 'linear');
		},
		
		offset: '50%'
	});
	
	// When fully in-view make Reka sticky
	$('#about-page').waypoint({
		handler: function(direction) {
			if (direction === 'down') {
				$('#reka-image').addClass("sticky");
			} else {
				$('#reka-image').removeClass("sticky");
			}
		}
	});
	
	// When passed view, hide Reka
	$('#about-page').waypoint({
		handler: function(direction) {
			if (direction === 'down') {
				$('#reka-image').addClass("hidden");
			} else {
				$('#reka-image').removeClass("hidden");
			}
		},
		
		offset: '-95%'
	});
	
})();

// do something with the real dimensions of the image
function realDimensions(elem, callback) {
	var image = new Image(); // or document.createElement('img')
	var width, height;
	image.onload = function() {
	  width = this.width;
	  height = this.height;
	  callback(width,height, elem);
	};
	image.src = $(elem).attr('src');
}

// Center the project thumbnails
function centerThumbs() {
	var W = $(".thumbnails").width();
	var H = $(".thumbnails").height();
	
	$(".thumb-box img").each(function (index, elem){
		realDimensions(elem, function (w, h, elem) {
			if (w*H >= h*W) {	// match top, scale width
				$(elem).height(H);
				$(elem).width(w * (H/h));
			} else {
				$(elem).height(h * (W/w));
				$(elem).width(W);
			}
		});
	});
}
centerThumbs();
$(window).resize(_.throttle(centerThumbs,100));

// Lightbox (the gallery!)
$('.thumbnails').each(function() {
	// Do this for each thumbnails-div once the images are loaded
	$(this).imagesLoaded(function(data){
		// Extract the set of <img /> children
		items = [];
		$el = $(data.elements[0]);
		$el.find('img').each(function(){
			items.push({
				src: $(this).attr('src'),
				title: $(this).attr('alt')
			})
		});
		
		// Setup the MagnificPopup light-box gallery with these items
		$el.magnificPopup({
			type: 'image',
			gallery: { enabled: true },
			items: items,
			image : { cursor: null }
		});
	});
});

});