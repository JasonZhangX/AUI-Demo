//Category
define(['jquery', 'AX'], function($, AX){
	'use strict';
	var log = AX.Util.log;
	var Category = AX.Base.extend({
		defaults: {
            oURLCategoryMap: {
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
		},
		init: function(oConfig){
			this._config = $.extend({}, this.defaults, oConfig);
		},
        getCategory: function(){
            var sCurrentPageUrl = win.location.href;
            var oURLCategoryMap = this.get('oURLCategoryMap');
            for (var i in oURLCategoryMap) {
                if (sCurrentPageUrl.indexOf(i) > -1) {
                    return oURLCategoryMap[i];
                }
            }      
        }
	});
	return Category;
});