//Slideshow
define(['jquery', 'AX', 'Swiper'], function($, AX, Swiper){
	'use strict';
	var log = AX.Util.log;
	var Slideshow = AX.Base.extend({
		defaults: {
            $container: null
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
            if(!this.get('$container')){
                return;
            }
            var bRandomSwitch = this.get('$container').attr('data-random') === 'random' || false;
            this.set('random', bRandomSwitch);
            this.random();
            this.initSwiper();
		},
        random: function(){
            if(!!this.get('random')){
                var oElements = this.get('$container').children();
                while(oElements.length){
                    this.get('$container').append(oElements.splice(Math.floor(Math.random() * oElements.length), 1)[0]);     
                }
            }
        },
        initSwiper: function(){
        	var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                autoplay: 5000,
                autoplayDisableOnInteraction: false,
                speed: 800,
                onSlideChangeStart: function(){
                    $('.banner .promo-link').css('position', 'static');
                },
                onSlideChangeEnd: function(){
                    $('.banner .promo-link').css('position', 'absolute');	
                }
            }); 
        }
	});
	return Slideshow;
});