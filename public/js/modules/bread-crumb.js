//Bread crumb
define(['jquery', 'AX', 'LanguageSwitch', 'Category'], function($, AX, LanguageSwitch, Category) {
	'use strict';
	var log = AX.Util.log;
	var oConfig = {};
	var oDefaults = {
		//dataURL: './../temp/breadcrumb.json',
		dataURL: 'https://wacnstoragestaging.blob.core.chinacloudapi.cn/tech-content/Content/', //data source URL
		dataName: 'breadcrumb.json',
		//level2Title: '',
		$Container: $('.bread-crumb'), //bread crumb container
		linkTemplate: '<li><span>&gt;</span></li><li><a href="<%=link%>" title="<%=title%>"><%=title%></a></li>', //link template
		categoryName: {
			documentation: {
				cn: '文档与资源',
				en: 'Documentation & Resources'
			},
			solutions: {
				cn: '解决方案',
				en: 'Solutions'
			}
		}
	}

	//Get service name
	var oCategory = new Category();
	var sCategoryName = oCategory.getCategory();	
	var fGetService = function() {
		return $('tags').attr('ms.service') || '';
	}
	var fGetJSON = function(sServiceName, fSuccessCallback, fFailCallback) {
		log('sServiceName', sServiceName);
		if (sServiceName) {
			var sRequestUrl = oConfig.dataURL + sCategoryName + '/' + oConfig.dataName;
			$.ajax({
				type: "GET",
				url: sRequestUrl,
				dataType: 'json'
			}).done(function(oData) {
				var oBreadCrumbData = {};
				$.each(oData, function() {
					//log('bread crumb:', this);
					if (this.service === sServiceName) {
						oBreadCrumbData['title'] = this.title;
						oBreadCrumbData['link'] = this.link;
						oBreadCrumbData['child'] = this.child;
						return;
					}
				});
				fSuccessCallback && fSuccessCallback(oBreadCrumbData);
				
			}).fail(function() {
				fFailCallback && fFailCallback();
				log('Bread crumb initialization failed', 'Can not load the JSON.');
			});
			
		}
	}

	var fLanguage = function(){
		var $ul = oConfig.$Container.find('ul');
		var sLanguage = LanguageSwitch.language();
		var sLevel1Name = oConfig.categoryName[sCategoryName][sLanguage];
		$ul.find('span').text(sLevel1Name);			
	}

	var fRenderDom = function(oData) {
		log('Bread crumb data', oData);		
		if ($.isEmptyObject(oData)) {			
			return;
		}
		var sLandingPageLink = AX.Util.Template(oConfig.linkTemplate, oData);
		if(oData['child'] !== undefined){
			sLandingPageLink += AX.Util.Template(oConfig.linkTemplate, oData['child']);
		}
		var $ul = oConfig.$Container.find('ul');
		$ul.find('li span').removeClass('hidden-all');
		$ul.append(sLandingPageLink);
	}

	var fInit = function(oCustomConfig) {
		oConfig = $.extend({}, oDefaults, oCustomConfig);
		fLanguage();
		fGetJSON(fGetService(), fRenderDom);
	}
	return {
		init: fInit
	}
});