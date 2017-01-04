require(['Common', 'Swiper', 'AccordianMenu', 'Transit'], function(Common, Swiper, AccordianMenu){
	Common.init();
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        autoplay: 525000,
        autoplayDisableOnInteraction: false,
        speed: 800,
        onSlideChangeStart: function(){
        	$('.banner .promo-link').css('position', 'static');
        },
        onSlideChangeEnd: function(){
        	$('.banner .promo-link').css('position', 'absolute');
        }
    });

    //Homepage solution 
    (function(){
        var nBaseHeight = 34;
        var o$HomepageSolution = $('.homepage-solution');
        var o$HomepageSolutionTabContent = o$HomepageSolution.find('.tab-content');
        var o$leftTabLi = o$HomepageSolution.find('.tab-nav li');
        //animation
        var fGetTopPos = function(nIndex){
            return nBaseHeight * nIndex;
        }
        var fDoAnimation = function(nIndex){
            var o$Triangle = $('.solution-animation .triangle');          
            var nTopPos = fGetTopPos(nIndex);
            // o$Triangle.animate({ top: nTopPos}, {
            //     step: function(nNow, fx){
            //         $(this).css('transform', 'translateY(' + nNow + 'px)');
            //     }
            // });
            o$Triangle.transition({y: nTopPos});
        }  

        o$leftTabLi.each(function(){
            var o$Link = $(this).find('a');
            var o$ContentDomSelector = o$Link.attr('href');
            var o$ContentClone = o$HomepageSolutionTabContent.find(o$ContentDomSelector).find('.menu-child').clone();
            var nIndex = o$leftTabLi.index($(this));
            if($(this).hasClass('active')){
                fDoAnimation(nIndex);
            }
            o$ContentClone.addClass('hidden-md hidden-lg');
            o$Link.after(o$ContentClone);
            $(this).on('click', function(){
               fDoAnimation(nIndex);
            });
        });

        var oMenuConfig = {
            $container: o$HomepageSolution.find('.tab-nav ul')
        };
        var oAccordian = new AccordianMenu();
        oAccordian.init(oMenuConfig);

    })();

    
});