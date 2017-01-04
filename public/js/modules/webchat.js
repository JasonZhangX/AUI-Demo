//Webchat
define(['AX', 'jquery','WebchatJSSDK', 'MobileDetect'], function(AX, $, WebchatJSSDK, MobileDetect){
	'use strict';
	var log = AX.Util.log;
	var Webchat = AX.Base.extend({
		defaults: {
            debug: false,
            jsSDKAPI: '/api/wechat/JSSdkConfig',
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            defaultTitle: 'Microsoft Azure',
            defaultDescription: 'Microsoft Azure',
            defaultIconURL: '',
            defaultType: 'link',
            $content: $('.content'),
            thumbnailClassName: 'webchat-thumbnail'
		},
		init: function(oConfig){
            if(!this.isWebchatBrowser()){
                return;
            }
			this._config = $.extend({}, this.defaults, oConfig);
            this.getConfig();   
		},
        getConfig: function(){
            var self = this;
            $.ajax({
                url: self.get('jsSDKAPI'),
                dataType: 'json'
            }).done(function(oData){
                self.set('APIData', oData);
                self.validatePermission();
            }).fail(function(o$XHR, sError){
                log('Webchat', 'Get Webchat API failed.' + sError);
            }); 
        },
        validatePermission: function(){
            var self = this;  
            var oData = this.get('APIData');
            log(oData);
            WebchatJSSDK.config({
                debug: self.get('debug'), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: oData.AppId, // 必填，公众号的唯一标识
                timestamp: oData.TimeStamp, // 必填，生成签名的时间戳
                nonceStr: oData.NonceString, // 必填，生成签名的随机串
                signature: oData.Signature,// 必填，签名，见附录1
                jsApiList: self.get('jsApiList') // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            WebchatJSSDK.ready(function(){
                self.ready();
                log('Webchat', 'Webchat Ready!');
            });
        },
        checkJSAPI: function(){
            
        },
        isWebchatBrowser: function(){
            var oMobileDetect = new MobileDetect(window.navigator.userAgent);
		    return !!oMobileDetect.version('MicroMessenger');
        },
        ready: function(){
            this.bind();
        },
        getThumbnail: function(){
            var self = this;
            var o$thumbnail = $('.' +  self.get('thumbnailClassName'));
            if(o$thumbnail.length > 0){
                return o$thumbnail.attr('href');
            }
            var o$FirstImage = null;
            $.each(this.get('$content').find('img'), function(){
                if($(this).width() > 300 &&　$(this).height() > 300){
                    o$FirstImage = $(this);
                    return false;
                }    
            });
            if(o$FirstImage){
                var sImageURL = o$FirstImage.attr('src');
                if(/^\/\/\S+/g.test(sImageURL)){
                    return window.location.protocol + sImageURL; 
                }           
            }
            return window.location.origin + this.get('defaultIconURL');
        },
        getTitle: function () {
            var sTitle = $('title').html();
            if(sTitle !== ''){
                return sTitle;
            } 
            return this.get('defaultTitle')  
        },
        getDescription: function () {
            var sDescription = $('meta[name="description"]').attr('content');
            if(sDescription !== ''){
                return sDescription;
            }
            return this.get('defaultDescription');
        },
        bind: function(){
            var self = this;
            WebchatJSSDK.onMenuShareTimeline({
                title: self.getTitle(), // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: self.getThumbnail(), // 分享图标
                success: function () { 
                    // 用户确认分享后执行的回调函数
                    log('Webchat', 'Share successful.')
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                }
            });
            WebchatJSSDK.onMenuShareAppMessage({
                title: self.getTitle(), // 分享标题
                desc: self.getDescription(), // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: self.getThumbnail(), // 分享图标
                type: self.get('defaultType'), // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () { 
                    // 用户确认分享后执行的回调函数
                    log('Webchat', 'Share successful.')
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数
                }
            });
        }
	});
	return Webchat;
});