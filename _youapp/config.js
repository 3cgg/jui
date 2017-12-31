(function(){
	function _Config(){
		function getWebPath(){
			return window.location.protocol+"//"+window.location.host+"/"+window.location.pathname.split('/')[1];
		}

		this.getEndpoint=function(){
			return getWebPath();
		}

		this.getHtmlEndpoint=function(){
			//return getWebPath()+ "/get/gethtml/";
			return getWebPath();
		}

		this.getDataEndpoint=function(){
			//return getWebPath()+"/get/getdata/";
			return window.location.protocol+"//"+window.location.host+"/api/";
		}

		this.getFileUploaderEndpoint=function(){
			//return getWebPath()+"/get/fileupload/";
			return window.location.protocol+"//"+window.location.host+"/api/file/batch/upload";
		}

		this.getTokenKey=function(){
			//return getWebPath()+"/get/fileupload/";
			return '_token';
		}
	}

	window.$_youapp.$_config=new _Config();

})(window);
