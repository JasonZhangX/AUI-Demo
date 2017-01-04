define(['jquery', 'AX'], function ($, AX) {
    'use strict';
    var log = AX.Util.log;
    var oConfig = {};
    var oDefaults = {
        defaultColor: '#1494f7',
        defaultImage: '',
        defalutHeight: '300',
        bannerControl: '.common-banner',
        bannerImage: '.common-banner-image',
        isMobile: 768,
        exchangeHeight:''
    };

    var fnBanner = function (bannerContainer) {
        this.$bannerContainer = $(bannerContainer);
        this.bannerConfig = strToJson(this.$bannerContainer.attr('data-config'));
        this.bannerBgColor = this.bannerConfig.backgroundColor ? this.bannerConfig.backgroundColor : oConfig.defaultColor;
        this.bannerImage = this.bannerConfig.backgroundImage ? this.bannerConfig.backgroundImage : oConfig.defalutImage;
        this.bannerHeight = this.bannerConfig.imageHeight ? this.bannerConfig.imageHeight : oConfig.defalutHeight;

    }
    fnBanner.prototype.fnInit = function () {
        this.$bannerContainer.css({ backgroundColor: this.bannerBgColor })
        if ($(window).width() > oConfig.isMobile) {
            this.$bannerContainer.find(oConfig.bannerImage).css({ backgroundImage: 'url("' + this.bannerImage + '")', height: this.bannerHeight + 'px' })
        } else {
            this.$bannerContainer.find(oConfig.bannerImage).css({ backgroundImage: '', height: 'auto' })
        }

    }

    var strToJson = function (str) {
        var json = (new Function("return " + str))();
        return json;
    }

    var fInit = function (oCustomConfig) {
        oConfig = $.extend({}, oDefaults, oCustomConfig);
        $(oConfig.bannerControl).each(function () {
            var bannerExchange = new fnBanner(this);
            $(window).on('resize', function () {
                bannerExchange.fnInit();
            })
            bannerExchange.fnInit();
        })

    }
    return {
        init: fInit,
    }

})