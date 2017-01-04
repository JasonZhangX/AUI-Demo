//Tab active status
define(['jquery', 'AX'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var tabActiveStatus = AX.Base.extend({
		defaults: {
			tabSelector: $('.technical-azure-selector a'),
			activeClass: 'active',
			reg: /documentation\/articles\/[^\/|^\.]*/g
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
			if(this.get('tabSelector').length > 0){
				this.render();
			}	
		},
		getUrlStr: function(sStr){
			return this.get('reg').exec(sStr);
		},
		render: function(){
			var self = this;
			var sCurrentUrl = this.getUrlStr(window.location.pathname);
			if(sCurrentUrl !== null){
				this.get('tabSelector').each(function(nIndex, oElement){
					var sLinkURL = $(oElement).attr('href');	
					var sLinkStr = self.getUrlStr(sLinkURL);
					if(sCurrentUrl === sLinkStr){
						 $(oElement).addClass(self.get('activeClass'));
						return false;		
					}
				});
			}
			
		}
	});
	return tabActiveStatus;
});