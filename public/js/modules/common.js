define(['jquery', 'AX', 'FastClick', 'AccordianMenu', 'ScreenTest', 'AutoScroll', 'Tab', 'Dialog', 'AutoHeight', 'TemporaryHide', 'MobileDetect', 'QRcodeGen', 'Webchat'], function($, AX, FastClick, AccordianMenu, ScreenTest, AutoScroll, Tab, Dialog, AutoHeight, TemporaryHide, MobileDetect, QRcodeGen, Webchat) {
	'use strict';	
	//Config
	var oConfig = {
		AJAXRequestPrefix: 'api-'
	}
	var bIsMobileMode = false;
	var bIsTabletMode = false;
	var bIsDesktopMode = false;
	var win = window;
	var doc = document;
	var o$Win = $(win);
	var o$Doc = $(doc);
	var o$Body = $('body');
	var log = AX.Util.log;



	//Pub/sub model implementation
	//	(function($) {
	//		var oPubSub = $({});
	//		$.subscribe = function() {
	//			oPubSub.on.apply(oPubSub, arguments);
	//		}
	//		$.unsubscribe = function() {
	//			oPubSub.off.apply(oPubSub, arguments);
	//		}
	//		$.publish = function() {
	//			oPubSub.trigger.apply(oPubSub, arguments);
	//		}
	//	})($);

	//View Mode
	var oTestScreen = (function () {
		ScreenTest.init();
		bIsMobileMode = ScreenTest.screen.bIsMobileMode;
		bIsTabletMode = ScreenTest.screen.bIsTabletMode;
		bIsDesktopMode = ScreenTest.screen.bIsDesktopMode;
		//TODO: Need to refactor.
		var fAdd = ScreenTest.add;
		return {
			add: fAdd
		}

	})();

	//Absolute Child Container Auto Height
	var oAutoHeight = (function () {
		var _oConfig = {}
		var oDafaults = {
			selector: '.auto-height'
		};

		var fHandle = function () {

		}
		var fUpdate = function () {
			$.each(aAutoHeightCon, function () {
				this.update();
			})
		}
		var aAutoHeightCon = [];
		var fInit = function (oConfig) {
			_oConfig = $.extend({}, oDafaults, oConfig);
			$(_oConfig.selector).each(function () {
				var oAutoHeight = new AutoHeight(this);
				aAutoHeightCon.push(oAutoHeight);
			});
		}
		return {
			update: fUpdate,
			init: fInit
		}
	})();

	//Body Scroll
	var oBodyScroll = (function () {

		//var bScrollAble = true;
		var fNoScroll = function () {
			if (!o$Body.hasClass("no-scroll")) {
				o$Body.addClass("no-scroll");
			}

		}
		var fScroll = function () {
			if (o$Body.hasClass("no-scroll")) {
				o$Body.removeClass("no-scroll");
			}
		}
		var fInit = function () {
			//			o$Doc.on("touchmove", function(e){
			//				e.preventDefault();
			//			})
			//			o$Body.on("touchstart", ".no-scroll", function(e){
			//				if(e.currentTarget.scrollTop === 0){
			//					e.currentTarget.scrollTop = 1;
			//				}else if(e.currentTarget.scrollHeight == e.currentTarget.scrollTop + e.currentTarget.offsetHeight){
			//					e.currentTarget.scrollTop -=1;	
			//				}
			//			});
			//			o$Body.on("touchmove", ".no-scroll", function(e){
			//				e.stopPropagation();		
			//			});				
		}
		return {
			noScroll: fNoScroll,
			scroll: fScroll,
			init: fInit
		}
	})();

	//ACA link is not in webchat browser
	(function () {
		var oMobileDetect = new MobileDetect(win.navigator.userAgent);
		var isWebChatBrowser = !!oMobileDetect.version('MicroMessenger');
		if (!isWebChatBrowser && !bIsDesktopMode) {
			$('#footer-weixin-id').attr('href', '#weixinQRcodeDialog').attr('data-toggle', 'dialog');
		}
	})();

	//Header Auto Hide
	var oHeaderAutoHide = (function () {
		var o$Header = $(".header");
		var oConfig = {
			autoHideHeight: 150
		}
<<<<<<< HEAD
		var fHideHeader = function () {
			o$Header.addClass("hide");
		};
		var fShowHeader = function () {
			o$Header.removeClass("hide");
		}
		var bIsAndroidWebChat = (function () {
			var oMobileDetect = new MobileDetect(win.navigator.userAgent);
			var isWebChatBrowser = !!oMobileDetect.version('MicroMessenger');
			//console.log(oMobileDetect.version('MicroMessenger'));			
			return (oMobileDetect.os() === 'AndroidOS' && isWebChatBrowser);
		})();
		var fInteraction = function (nDelta) {
			if (bIsDesktopMode) {
				return;
			}
			var nWinScrollTop = o$Win.scrollTop();
			if (nDelta > 0) {
				if (nWinScrollTop >= oConfig.autoHideHeight) {
					fHideHeader();
				}
				//log(nDelta);
				//log("Down");
			} else {
				fShowHeader();
				//log("Up");
			}
		}
		var fFixed = function () {
			if (bIsAndroidWebChat) {
				o$Header.removeClass('scroll');
				o$Header.next('.content').css('margin-top', 87);
			}
		}
		var fScroll = function () {
			if (bIsAndroidWebChat) {
				o$Header.addClass('scroll');
				o$Header.next('.content').css('margin-top', 0);
			}
		}
		var nScrollTop;
		var fBindEvent = function () {
			nScrollTop = o$Win.scrollTop();
			o$Win.on("scroll", function () {
				var nAfterScrollTop = o$Win.scrollTop();
				var nDelta = nAfterScrollTop - nScrollTop;
				if (nDelta === 0) {
					return false;
				}
				fInteraction(nDelta);
				nScrollTop = nAfterScrollTop;
			})
		}
		var fInit = function () {
			if (bIsAndroidWebChat) {
				fScroll();
			} else {
				fBindEvent();
			}

		}
		fInit();
=======
		var fFixed = function(){
			o$Header.removeClass('scroll');
		}
		var fScroll = function(){
			o$Header.addClass('scroll');
			o$Header.next('.content').css('margin-top', 0);	
		}		
		// var fHideHeader = function() {
		// 	o$Header.addClass("hide");
		// };
		// var fShowHeader = function() {
		// 	o$Header.removeClass("hide");
		// }
		// var bIsAndroidWebChat = (function(){
		// 	var oMobileDetect = new MobileDetect(win.navigator.userAgent);
		// 	var sWebChatBrowser = oMobileDetect.version('MicroMessenger');
		// 	//console.log(oMobileDetect.version('MicroMessenger'));			
		// 	return (oMobileDetect.os() === 'AndroidOS') && !!sWebChatBrowser;
		// })();
		// var fInteraction = function(nDelta) {
		// 	if (bIsDesktopMode) {
		// 		return;
		// 	}
		// 	var nWinScrollTop = o$Win.scrollTop();
		// 	if (nDelta > 0) {
		// 		if (nWinScrollTop >= oConfig.autoHideHeight) {
		// 			fHideHeader();
		// 		}
		// 		//log(nDelta);
		// 		//log("Down");
		// 	} else {
		// 		fShowHeader();
		// 		//log("Up");
		// 	}
		// }
		// var fFixed = function(){
		// 	if(bIsAndroidWebChat){
		// 		o$Header.removeClass('scroll');	
		// 		o$Header.next('.content').css('margin-top', 87);				
		// 	}
		// }
		// var fScroll = function(){
		// 	//if(bIsAndroidWebChat){
		// 		o$Header.addClass('scroll');
		// 		o$Header.next('.content').css('margin-top', 0);					
		// 	//}
		// }
		// var nScrollTop;
		// var fBindEvent = function(){
		// 	nScrollTop = o$Win.scrollTop();
		// 	o$Win.on("scroll", function() {
		// 		var nAfterScrollTop = o$Win.scrollTop();
		// 		var nDelta = nAfterScrollTop - nScrollTop;
		// 		if (nDelta === 0) {
		// 			return false;
		// 		}
		// 		fInteraction(nDelta);
		// 		nScrollTop = nAfterScrollTop;
		// 	})			
		// }
		// var fInit = function() {
		// 	if(bIsAndroidWebChat){
		// 		fScroll();							
		// 	}else{
		// 		fBindEvent();
		// 	}

		// }
		// //fInit();
		fScroll();	
>>>>>>> stage
		return {
			fixed: fFixed,
			scroll: fScroll
		}
	})();

	//Search Panel
	var oSearchPanel = (function () {
		var _oConfig = {}
		var oDefaults = {
			openCall: null,
			closeCall: null
		}
		var o$SearchPanel = $(".search-panel");
		var o$SearchToggleBtn = $(".top-nav .search .icon");
		var fToggleSearchPanel = function () {
			//			if ($(".nav").hasClass("show")) {
			//				$(".nav").removeClass("show");
			//			}
			if (o$SearchPanel.hasClass("show")) {
				fClose();
			} else {
				fOpen();
			}
			return false;
		}
		var fOpen = function () {
			if (bIsDesktopMode) {
				$("#searchInput").trigger("focus");
			}
			o$SearchPanel.addClass("show");
			oHeaderAutoHide.fixed();
			if (!bIsDesktopMode) {
				//o$SearchToggleBtn.removeClass("icon-search").addClass("icon-close");
			}
			oBodyScroll.noScroll();
			_oConfig.openCall && _oConfig.openCall();
			//log("Search Panel Open", _oConfig.openCall);
		}
		var fClose = function () {
			o$SearchPanel.removeClass("show");
			//o$SearchToggleBtn.addClass("icon-search").removeClass("icon-close");
			if (!$(".nav").hasClass('show')) {
				oHeaderAutoHide.scroll();
			}
			oBodyScroll.scroll();
			_oConfig.closeCall && _oConfig.closeCall();
		}
		var fInputBlur = function () {
			if (bIsDesktopMode) {
				fClose();
			}
		}
		var fInit = function (oConfig) {
			_oConfig = $.extend({}, oDefaults, oConfig);
			o$Doc.on("click", ".search,.search-cancel a", fToggleSearchPanel);
			o$Doc.on("blur", "#searchInput", fInputBlur);
		}
		return {
			open: fOpen,
			close: fClose,
			init: fInit
		}
	})();

	//Global Search
	var oGlobalSearch = (function () {
		var _oConfig = {}
		var defaults = {
			beforeSearch: null,
			$input: $("#searchInput"),
			searchRequestUrl: "/searchresults/?query="
		}
		var fIsEmptyString = function (sKeywords) {
			var rReg = /^\s+$/g;
			return rReg.test(sKeywords) || sKeywords === "";
		}
<<<<<<< HEAD
		var fDoSearch = function () {
			var sKeywords = _oConfig.$input.val();
			if (fIsEmptyString(sKeywords)) {
				return;
			}
=======
		var fDoSearch = function(sKeywords) {
>>>>>>> stage
			var sRedirectUrl = _oConfig.searchRequestUrl + encodeURIComponent(sKeywords);
			_oConfig.beforeSearch && _oConfig.beforeSearch(sKeywords);
			win.location = sRedirectUrl;
		}
		var fBindEvent = function () {
			o$Win.on("keyup", function (e) {
				if (e.keyCode == "13") {
					var sKeywords = _oConfig.$input.val();
					if (fIsEmptyString(sKeywords)) {
						return false;
					}					
					fDoSearch(sKeywords);
				}
			});
		}
		var fInit = function (oConfig) {
			_oConfig = $.extend({}, defaults, oConfig);
			fBindEvent();
		}
		return {
			init: fInit
		}
	})();

	//Search History 
	var oSearchHistory = (function () {
		var SearchHistory = function () {
			this.defaults = {
				keywordCountLimit: 10,
				localDataName: "searchHistory",
				$container: $(".search-history ul"),
				$clearButton: $(".search-history .clear-btn"),
				searchRequestUrl: "/searchresults/?query="
			}
			this.template = '<li><a class="text-limit" href="<%=url%>" title="<%=keyword%>"><%=keyword%></a><i class="icon icon-close"></i></li>';
		}
		SearchHistory.prototype.init = function (oConfig) {
			this.config = $.extend({}, this.defaults, oConfig);
			this.bind();
			this.update();
		}
		SearchHistory.prototype.update = function () {
			this._fGetLocalKeywords();
			this.render();
		}
		SearchHistory.prototype.render = function () {
			var sAllKeywordsTemplate = "";
			var self = this;
			var aKeywords = this._fGetLocalKeywords();
			$.each(aKeywords, function () {
				sAllKeywordsTemplate += AX.Util.Template(self.template, {
					url: (self.config.searchRequestUrl + encodeURIComponent(this)),
					keyword: this
				});
			})
			this.config.$container.empty();
			this.config.$container.append(sAllKeywordsTemplate);
		}
		SearchHistory.prototype._find = function (sKeyword) {
			var aKeywords = this._fGetLocalKeywords();
			return $.inArray(sKeyword, aKeywords);
		}
		SearchHistory.prototype.save = function (sKeyword) {
			if (!(this._find(sKeyword) == -1)) {
				return;
			}
			var aKeywords = this._fGetLocalKeywords();
			if (aKeywords.length < this.config.keywordCountLimit) {
				aKeywords.unshift(sKeyword);
			} else {
				aKeywords.pop();
				aKeywords.unshift(sKeyword);
			}
			AX.Storage.set(this.config.localDataName, aKeywords);
			this.update();
		}
		SearchHistory.prototype.clearAll = function (event) {
			var self = event.data;
			AX.Storage.clear(self.config.localDataName);
			self.update();
			return false;
		}
		SearchHistory.prototype.remove = function (event) {
			var self = event.data;
			var oLink = $(event.target).prev('a');
			var sKeyword = oLink.attr('title');
			self.del(sKeyword);
			return false;
		}
		SearchHistory.prototype.del = function (sKeyword) {
			var nIndex = this._find(sKeyword);
			if (nIndex === -1) {
				return;
			}
			var aKeywords = this._fGetLocalKeywords();
			aKeywords.splice(nIndex, 1);
			AX.Storage.set(this.config.localDataName, aKeywords);
			this.update();
		}
		SearchHistory.prototype.bind = function () {
			var self = this;
			o$Doc.on("click", self.config.$clearButton.selector, self, self.clearAll);
			self.config.$container.on("click", '.icon-close', self, self.remove);
		}
		SearchHistory.prototype._fGetLocalKeywords = function () {
			return AX.Storage.get(this.config.localDataName) || [];
		}
		var fFilter = function (sKeyword) {

		}
		var searchHistory = new SearchHistory();
		var fInit = function () {
			searchHistory.init();
		};
		var fSave = function (sKeyword) {
			searchHistory.save(sKeyword);
		};
		return {
			save: fSave,
			init: fInit
		}
	})();

	//Top search keywords
	var oTopSearchKeywords = (function () {
		var _oConfig = {};
		var oDefaults = {
			$container: $(".search-panel .hot-tag"),
			requestUrl: "/" + oConfig.AJAXRequestPrefix + "hotkeywords",
			requestParam: "topK",
			keywordsCount: 9,
			searchUrl: "/searchresults/?query=",
			template: '<a class="btn btn-link btn-default text-limit" href="<%=url%>" title="<%=keyword%>"><%=keyword%></a>'
		}
		var fRenderData = function (oData) {
			var sHotKeywordsDom = "";
			$.each(oData, function () {
				var sKeyword = this;
				var sUrl = _oConfig.searchUrl + encodeURIComponent(sKeyword);
				sHotKeywordsDom += AX.Util.Template(_oConfig.template, {
					url: sUrl,
					keyword: sKeyword
				});
			});
			return sHotKeywordsDom;
		}
		var fRender = function (sDom) {
			_oConfig.$container.empty();
			_oConfig.$container.append(sDom);
		}
		var fGetData = function () {
			var oRequestParam = {}
			oRequestParam[_oConfig.requestParam] = _oConfig.keywordsCount
			$.ajax({
				url: _oConfig.requestUrl,
				method: "POST",
				data: oRequestParam,
				dataType: "json"
			}).done(function (oData) {
				fRender(fRenderData(oData));
			}).fail(function (oError) {
				log('Get top search keywords failed.');
			});
		}
		var fInit = function (oConfig) {
			_oConfig = $.extend({}, oDefaults, oConfig);
			fGetData();
		}
		return {
			init: fInit
		}
	})();

	//Navigation
	//TODO: Update new childe menu selector.
	var oNavigation = (function () {
		var o$Nav = $(".nav");
		var o$AllNavLink = $(".nav > ul > li > a");
		var o$ChildMenu = o$Nav.find(".sub-menu");
		var fToggleNavigation = function () {
			if (o$Nav.hasClass("show")) {
				fNavigationClose();
			} else {
				fNavigationOpen();
			}
			return false;
		}
		var fNavigationOpen = function () {
			o$Nav.addClass("show");
			oHeaderAutoHide.fixed();
			oSearchPanel.close();
			oBodyScroll.noScroll();

			//$(".nav-toggle>.icon").removeClass("icon-navigation").addClass("icon-close");
		}
		var fNavigationHide = function () {
			o$Nav.removeClass("show");

			o$AllNavLink.removeClass("active");
			//$(".nav-toggle>.icon").addClass("icon-navigation").removeClass("icon-close");
		}
		var fNavigationClose = function () {
			fNavigationHide();
			oHeaderAutoHide.scroll();
			oBodyScroll.scroll();
		}
		var fToggleChildMenu = function () {
			//log(this);
			if (!$(this).next(".sub-menu").length == 0) {
				o$AllNavLink.removeClass("active");
				$(this).addClass("active");
				//			if(bIsDesktopMode){
				//					
				//			}
				o$ChildMenu.removeClass("show");
				$(this).next(".sub-menu").addClass("show");
				oBodyScroll.noScroll();
				return false;
			}
		}

		var fChildMenuColse = function () {
			if (!bIsDesktopMode) {
				return;
			}
			o$AllNavLink.removeClass("active");
			o$ChildMenu.removeClass("show");
			fNavigationClose();
			oBodyScroll.scroll();
			//return false;
		}

		var fCountElementDt = function () {
			o$ChildMenu.find("dl").each(function () {
				var o$Dl = $(this);
				var nDtCount = o$Dl.find("dt").length;
				//log(nDtCount%2);
				if (nDtCount % 2) {
					o$Dl.addClass("odd-child");
				}
				fPreventScrollEvent(o$Dl);
			});
		}

		var fPreventScrollEvent = function () {
			o$ChildMenu.find(".menu-child").each(function () {
				var o$Dl = $(this);
				o$Dl.on("mousewheel", function (e) {
					if (!$(this).hasClass("scrollable")) {
						return;
					}
					var oEvent = e.originalEvent,
						nDelta = oEvent.wheelDelta || -oEvent.detail;
					this.scrollTop += (nDelta < 0 ? 1 : -1) * 30;
					e.preventDefault();
				})
			});
		}

		var fDdHover = function () {
			$(this).prev("dt").toggleClass("mouse-hover");
		}

		var fDdClick = function () {
			var sJumpUrl = $(this).prev("dt").find("a").attr("href");
			win.location = sJumpUrl;
			return false;
		}

		var fGetCurrentCategoryByURL = function () {
			var sCurrentPageUrl = win.location.href;
			var oURLCategoryMap = {
				'/home/features/': 'product',
				'/pricing/': 'price',
				'/solutions/': 'solutions',
				'/partnerancasestudy/': 'partnerAndCase',
				'/isv-plan/': 'partnerAndCase',
				'/starter-guide/': 'document',
				'/video-center/': 'document',
				'/documentation/': 'document',
				'/develop/': 'document',
				'/blog/': 'community',
				'/community/': 'community',
				'/support/': 'support',
				'/icp/': 'support',
				'/projectoxford/': 'projectoxford'
			}
			var fSelectCategory = function () {
				for (var i in oURLCategoryMap) {
					if (sCurrentPageUrl.indexOf(i) > -1) {
						return oURLCategoryMap[i];
					}
				}
			}
			if (fSelectCategory()) {
				o$Nav.find('.nav-' + fSelectCategory()).addClass('current');
			} else {
				o$Nav.find('.nav-index').addClass('current');
			}
		}

		var fInit = function () {
			o$Doc.on("click", ".nav-toggle", fToggleNavigation);
			o$Doc.on("click", ".nav > ul > li > a", fToggleChildMenu);
			o$Doc.on("click", ".content, .footer ", fChildMenuColse);
			o$Doc.on("mouseover", ".nav .sub-menu dl dd", fDdHover);
			o$Doc.on("mouseout", ".nav .sub-menu dl dd", fDdHover);
			o$Doc.on("click", ".nav .sub-menu dl dd", fDdClick);
			fCountElementDt();
			fPreventScrollEvent();
			fGetCurrentCategoryByURL();
		}

		return {
			hide: fNavigationHide,
			open: fNavigationOpen,
			close: fNavigationClose,
			init: fInit
		}
	})();



	//Auto Scroll
	var oAutoScroll = (function () {
		//TODO: Need to refactor.

		var aScrollContainer = [];
		var fUpdate = function () {
			$.each(aScrollContainer, function () {
				this.update();
			});
		}
		var fInit = function () {
			$(".auto-scroll").each(function (index, element) {
				var oAutoScroll = new AutoScroll(this);
				aScrollContainer.push(oAutoScroll);
			});
		}
		return {
			update: fUpdate,
			init: fInit
		}
	})();

	//Tab 
	var oTab = (function () {
		var _oConfig = {}
		var oDefaults = {
			$tabNav: $(".tab-nav")
		}

		//TODO: Need to refactor.
		var fInit = function (oConfig) {
			_oConfig = $.extend({}, oDefaults, oConfig);
			_oConfig.$tabNav.each(function () {
				var oTabInstance = new Tab($(this));
				oTabInstance.init();
			});
		}
		return {
			init: fInit
		}
	})();

	//Dialog
	var oDialog = (function () {
		//TODO: Need to refactor.
		var fInit = function () {
			$('[data-toggle="dialog"]').each(function () {
				var oDialogInstance = new Dialog($(this));
				oDialogInstance.init();
				//log(oDialogInstance);
			});
		}
		return {
			init: fInit
		}
	})();

	//Implement touchend event handlers
	var oHandleTouchEvent = (function () {
		var fInit = function () {
			if (!bIsDesktopMode) {
				FastClick.attach(doc.body);
			}
		}
		return {
			init: fInit
		}
	})();

	var oAccordianMenu = (function () {
		var aAccordianMenus = [];
		var fUpdate = function () {
			for (var i = 0; i < aAccordianMenus.length; i++) {
				//aAccordianMenus[i].update();
				aAccordianMenus[i].render();
			}
		}
		var fInit = function () {
			//				AccordianMenu.init({
			//					$menuContainer: $('.accordian-menu')
			//				});	
			$('.accordian-menu').each(function (nIndex, oElement) {
				var oConfig = {
					$container: $(oElement)
				};
				var oAccordian = new AccordianMenu();
				oAccordian.init(oConfig);
				aAccordianMenus.push(oAccordian);
			});
		}
		return {
			init: fInit,
			update: fUpdate
			}
		})();

	var oTemporaryHide = (function(){
		var oHideConfig = {
			rules:[
				[$('.header .nav .nav-partnerAndCase'), 'hidden-xs hidden-sm'], //partnerancasestudy
				//[$('.header .nav .nav-projectoxford'), 'hidden-xs hidden-sm'],			
				//[$('.header .nav #nav_product_what-is-windows-azure'), 'hidden-xs hidden-sm'],
				//[$('.header .nav #nav_documentation_guide'), 'hidden-xs hidden-sm'],//starter-guide 
				[$('.header .nav #nav_documentation_video_center'), 'hidden-xs hidden-sm'], //video-center
				//[$('.header .nav #nav_support_contact'), 'hidden-xs hidden-sm'],  //support/contact
				//[$('.header .nav #nav_support_forums'), 'hidden-xs hidden-sm'], 
				//[$('.header .nav #nav_support_plans'), 'hidden-xs hidden-sm'], //support/plans /
				[$('.header .nav #nav_documentation_icp'), 'hidden-xs hidden-sm'],
				//[$('.header .nav #nav_support_faq'), 'hidden-xs hidden-sm'],
				//[$('.footer .footer-navigation #footer-news-id'), 'hidden-xs hidden-sm'],
				//[$('.footer .footer-navigation #footer-azure-id'), 'hidden-xs hidden-sm'],
				[$('.footer .footer-navigation #footer-calculator-id'), 'hidden-xs hidden-sm'],
				//[$('.footer .footer-navigation #footer-starter-guide-id'), 'hidden-xs hidden-sm'],				
				[$('.footer .footer-navigation #footer-casestudy-id'), 'hidden-xs hidden-sm'],
				//[$('.footer .footer-navigation #footer-contact-id'), 'hidden-xs hidden-sm'],
				//[$('.footer .footer-navigation #footer-plans-id'), 'hidden-xs hidden-sm'],
				[$('.footer .footer-navigation #footer-icp-id'), 'hidden-xs hidden-sm'],
				//[$('.footer .footer-navigation #footer-support-faq-id'), 'hidden-xs hidden-sm'],
                //[$('.header .top-nav .search'), "hidden-xs hidden-sm"]
			]
		}
		var fInit= function(){
			var oHide = new TemporaryHide();
			oHide.init(oHideConfig);
		}	
		return {
			init: fInit
		};	
	})();

	//QRcode
	var oQRcode = (function(){
		var fInit = function(){
			var sURL = win.location.href;
			if (sURL.match(/^((?!\/pricing\/calculator|\/icp\/|\/video-center\/|\/partnerancasestudy\/).)*$/)) {
				return new QRcodeGen();
			}else{
				$('.common-sidebar').hide();	
			}	
		}
		return {
			init: fInit
		}
	})();

	return {
		init: function () {
			//Fix IE11 triggers css transition bug
			$(doc).ready(function () {
				$(".header .nav").removeClass("loading");
			});
			//oTestScreen.init();
			//oHeaderAutoHide.init();
			oBodyScroll.init();
			oSearchPanel.init({
				openCall: oNavigation.hide
			});
			oNavigation.init();
			oAutoScroll.init();
			oAccordianMenu.init();
			//oPanel.init();
			oAutoHeight.init();
			oSearchHistory.init();
			oTopSearchKeywords.init();
			oGlobalSearch.init({
				beforeSearch: function (sKeyword) {
					oSearchHistory.save(sKeyword);
				}
			});
			oTab.init();
			oDialog.init();
			oTestScreen.add(oAutoScroll.update);
			oTestScreen.add(oAutoHeight.update);
			oTestScreen.add(oAccordianMenu.update);
			oHandleTouchEvent.init();
			oTemporaryHide.init();
			oQRcode.init();
			var oWebChatSharing = new Webchat({
				defaultIconURL: '/Static/Favicon/apple-touch-icon.png'
			});
		}
	}
});