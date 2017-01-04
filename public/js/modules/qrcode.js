//Responsive table
define(['jquery', 'AX', 'plugins/qrcode/qrcode.min'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var QRcodeGen = AX.Base.extend({
		defaults: {
            $sidebarContainer: $('.common-sidebar'),
            $QRContainer: $('.qrcode-container'),
            $QRcodeBtn: $('a[href="#qrcodegen"]')
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
            this.render();
            this.bind();
		},
        render: function(){
            var sCurrentURL = window.location.href;
            var o$QRContainer = this.get('$QRContainer');
            var oQrCode = new QRCode(o$QRContainer[0], {
                text: sCurrentURL,
                width: 90,
                height: 90,
                colorDark : "#323a45",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            }); 
        },
        bind: function(){
            var o$QRcodeBtn = this.get('$QRcodeBtn');
            o$QRcodeBtn.on('mouseleave', function(){
                o$QRcodeBtn.next('.tab-panel').removeClass('show-md');
            });    
        }
	});
	return QRcodeGen;
});