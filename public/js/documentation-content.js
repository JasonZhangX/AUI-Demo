require(['Common', 'DocLeftNav', 'DocRightBookmark', 'Layout', 'AccordianMenu', 'BreadCrumb' , 'IsExternalLink', 'Highlight', 'Table', 'LanguageSwitch', 'StorageByURL', 'tabActiveStatus'], function(Common, DocLeftNav, DocRightBookmark, Layout, AccordianMenu, BreadCrumb, IsExternalLink, Highlight, Table, LanguageSwitch, StorageByURL, tabActiveStatus) {
	var sLayout = 'col3'; //Default layout
	var sLeftNavStatus = '';
	Common.init();
	Layout.init();
	LanguageSwitch.init();
	$('.pure-content table').each(function(){
		var oTable = new Table();
		oTable.init({
			$table: $(this)
		});
	});
	$('pre code').each(function(i, block) {
    	Highlight.highlightBlock(block);
    });	
    
    var otabActiveStatus = new tabActiveStatus();
    otabActiveStatus.init();
    var oStorageByURL = new StorageByURL();
    oStorageByURL.init();
 	oStorageByURL.save();
	DocLeftNav.init({
		dataHost: 'https://wacnstoragestaging.blob.core.chinacloudapi.cn/tech-content/Content/leftnav/',
		endCallback: function(oLeftNavData) {
			var nExpandIndex = oLeftNavData.index;
			var sBreadcrumbLevel2Title = '';
			sLeftNavStatus = oLeftNavData.status;
			var oMenuConfig = {
				$container: $('.left-navigation ul')
			};
			var oAccordian = new AccordianMenu();
			oAccordian.init(oMenuConfig);
			oAccordian.expandByIndex(nExpandIndex);
			BreadCrumb.init();
//			if(nExpandIndex !== -1){
//				sBreadcrumbLevel2Title = AccordianMenu.expandByIndex(nExpandIndex).attr('title') || '';	
//			}
			IsExternalLink.init();
			console.log('Left nav load status', sLeftNavStatus);
//			DocRightBookmark.init({
//				endCallback: function(sRightBmStatus) {
//					console.log('Right bookmark load status', sRightBmStatus);
//					if (sLeftNavStatus === 'failed' && sRightBmStatus === 'success') {
//						sLayout = 'col2r';	
//					}
//					if (sLeftNavStatus === 'success' && sRightBmStatus === 'failed') {
//						sLayout = 'col2l';	
//					}
//					if (sLeftNavStatus === 'failed' && sRightBmStatus === 'failed') {
//						sLayout = 'col1';
//					}
//					Layout.switchLayout(sLayout);
//				}
//			});

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