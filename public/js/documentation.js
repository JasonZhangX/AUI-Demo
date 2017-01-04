require(['Common', 'DocLeftNav', 'DocRightBookmark', 'Layout', 'AccordianMenu', 'IsExternalLink'], function(Common, DocLeftNav, DocRightBookmark, Layout, AccordianMenu, IsExternalLink) {
	var sLayout = 'col3';
	var sLeftNavStatus = '';
	Common.init();
	Layout.init();
	DocLeftNav.init({
		dataHost: 'wacnstoragestaging.blob.core.chinacloudapi.cn/tech-content/Content/leftnav/',
		endCallback: function(oLeftNavData) {
			var nExpandIndex = oLeftNavData.index;
			sLeftNavStatus = oLeftNavData.status;
			AccordianMenu.init({
				$menuContainer: $('.left-navigation')
			});
			AccordianMenu.expandByIndex(nExpandIndex);
			
			IsExternalLink.init();
			console.log('Left nav load status', sLeftNavStatus);
			DocRightBookmark.init({
				endCallback: function(sRightBmStatus) {
					console.log('Right bookmark load status', sRightBmStatus);
					if (sLeftNavStatus === 'failed' && sRightBmStatus === 'success') {
						sLayout = 'col2r';	
					}
					if (sLeftNavStatus === 'success' && sRightBmStatus === 'failed') {
						sLayout = 'col2l';	
					}
					if (sLeftNavStatus === 'failed' && sRightBmStatus === 'failed') {
						sLayout = 'col1';
					}
					Layout.switchLayout(sLayout);
				}
			});
		}
	});
});