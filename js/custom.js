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
	
	var msn = $(this).masonry({
		itemSelector: '.grid-cell',
		gutter: gutter,
		containerStyle: {},
		isFitWidth: fitWidth,
		columnWidth: columnWidth
	});
	
	$(this).imagesLoaded(function(){
		msn.masonry();
	});
});

function setActivePage(id) {
	$('.nav-bar-item a').removeClass('active');
	$('.nav-bar-item a[href="'+id+'"]').addClass('active');
}

// Anonymous function to wrap variable scope
// SCROLLING AND THE REKA IMAGE (Animations)
// TODO: This doesn't work in mobile!!
(function(){
	var seen = {};
	
	// Make the nav-bar stick when we scroll down the page
	$('#about-page').waypoint({
		handler: function(direction) {
			if (direction === 'down') {
				$('.nav-bar').addClass("sticky");
				$('#small-logo').addClass("sticky");
			} else {
				$('.nav-bar').removeClass("sticky");
				$('#small-logo').removeClass("sticky");
			}
		},
		
		offset: '52px'
	})
	
	// When about half-way, fade in Reka
	$('#about-page').waypoint({
		handler: function(direction) {
			if (direction == 'down') {
				$('.title-image').stop().animate({opacity: 0}, 1000);
			} else {
				$('.title-image').stop().animate({opacity: 1}, 1000);
			}
			
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
				setActivePage('#about-page');
			} else {
				setActivePage('');
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
	
	// Highlight active page (Skills)
	$('#skills-page').waypoint({
		handler: function(direction) {
			if (direction == 'down') {
				setActivePage('#skills-page');
			} else {
				setActivePage('#about-page');
			}
		}
	});
	
	// Highlight active page (Projects)
	$('#project-header').waypoint({
		handler: function(direction) {
			if (direction == 'down') {
				setActivePage('#project-header');
			} else {
				setActivePage('#skills-page');
			}
		}
	});
	
	// Highlight active page (Contacts)
	$('#contact-page').waypoint({
		handler: function(direction) {
			if (direction == 'down') {
				setActivePage('#contact-page');
			} else {
				setActivePage('#project-header');
			}
		}
	});
})();


// Code to center the thumbnails in each project
// Uses the "jQuery Image Center" plugin (by Boxlight)
function centerThumbs() {
	$('.thumbnail-img').each(function(){
		$(this).centerImage(null,null,'fix-top');
	});
}

// Call it at beginning and on resize
centerThumbs();
$(window).resize(_.throttle(centerThumbs, 100));


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


// Nav-bar scrollable clicks
$('a.scroll-click').click(function(){
	var href = $(this).attr("href");
	
	if (!_.isFunction($(href).offset)) return true;
	var offset = $(href).offset();
	
	if (!(_.isObject(offset) && _.has(offset,'top'))) return true;
	var top = offset.top;
	if (!_.isFinite(top)) return true;
	
	$('body,html').animate({scrollTop: top}, 1000);
	return false;
});


// Mobile menu!
function updateButtonState() {
	if ($('.drop-down').is(":visible")) {
		$('#menu-button').addClass('pressed');
	} else {
		$('#menu-button').removeClass('pressed');
	}
}

$('#menu-button').click(function(){
	$('.drop-down').toggle(200, updateButtonState);
});

});