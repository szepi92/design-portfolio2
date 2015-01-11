

// This document initializes everything on load!
$(document).ready(function(){

// Hack to hide things while still forcing them to load
$('.js-hidden').delay(0).fadeTo(0,0,'linear');		

// Style grid-cells to play nicely (Masonry!)
$('.grid').masonry({
	itemSelector: '.grid-cell',
	gutter: 0,
	containerStyle: {},
	isFitWidth: true
});

// TODO: THIS DOESN'T DO ANYTHING RIGHT NOW!!!
$('.page').windows({
	snapping: false,
	snapSpeed: 500,
	snapInterval: 1100,
});

// Anonymous function to wrap variable scope
// SCROLLING AND THE REKA IMAGE (Animations)
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

});