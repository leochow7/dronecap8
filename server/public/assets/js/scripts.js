/*
Author: Shuhao Zhou
Email:leochow7@hotmail.com
*/

(function($) {
	"use strict";
	
		/*preloader js*/
		$(window).load(function() { 
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow'); 
		}); 
		/*End preloader js*/
		
		/* Start Master Slider*/
			var slider = new MasterSlider();
		 
			slider.control('arrows' ,{insertTo:'#masterslider'});  
			slider.control('bullets'); 
		 
			slider.setup('masterslider' , {
				width: 1140,
				height: 768,
				space: 5,
				view: 'basic',
				layout: 'fullscreen',
				fullscreenMargin: 57,
				speed: 20
			});


			
			var slider = new MasterSlider();
			slider.setup('masterslider_promo' , {
				width: 1440,
				height: 553, //413
				//space:100,
				fullwidth:true,
				centerControls:false,
				speed:18,
				view:'basic'
			});
		/*End Master Slider*/
	
	    /*wow animation js*/
	    	new WOW().init();	
	    /*End wow animation js*/
	
		/*progress-bar*/
	  $('.progress-bar > span').each(function(){
			var $this = $(this);
			var width = $(this).data('percent');
			$this.css({
				'transition' : 'width 2s'
			});
			
			setTimeout(function() {
				$this.appear(function() {
						$this.css('width', width + '%');
				});
			}, 500);
		});
		/*End progress-bar*/
			
			
		/*testimonial carousel js*/
		$('.carousel').carousel({
			interval:5000,
			pause:"false",
		});
		/*End testimonial carousel js*/
		
	
		
			
})(jQuery);

