/**
 * Created by J on 2017/11/13.
 */
$_youapp.$_htmlWorker=(function () {






    return {

        /**
         *
         * @param $html
         * @param requsetVO  {
						layoutId:layoutId,
						htmlUrl:htmlUrl
				}
         * @returns {*}
         */
        js : function($html,requsetVO){
            $.each($html,function (i,e) {
                var nodeName=e.nodeName;
                if(('SCRIPT'==nodeName||'script'==nodeName)&&$(e).attr('src')!=undefined){
                    var defaultRelative=requsetVO.htmlUrl.substring(0,requsetVO.htmlUrl.lastIndexOf('/'));
                    var absolute=$_youapp.$_config.getHtmlEndpoint()+ "/"+defaultRelative+"/"+$(e).attr('src');
                    var id=$.md5(absolute);
                    $(e).attr('src',absolute).attr('id' ,id);
                }
            });


            $html.find('script').each(function (i ,e) {
                var defaultRelative=requsetVO.htmlUrl.substring(0,requsetVO.htmlUrl.lastIndexOf('/'));
                var absolute=$_youapp.$_config.getHtmlEndpoint()+"/"+defaultRelative+"/"+$(e).attr('src');
                var id=$.md5(absolute);
                $(e).attr('src',absolute).attr('id' ,id);
            });

            return $html;

        },

        /**
         *
         * @param $html
         * @param requsetVO {
						layoutId:layoutId,
						htmlUrl:htmlUrl
				}
         * @returns {*}
         */
        css:function ($html,requsetVO) {

            $.each($html,function (i,e) {
                var nodeName=e.nodeName;
                if(('LINK'==nodeName||'link'==nodeName)&&$(e).attr('href')!=undefined){
                    var defaultRelative=requsetVO.htmlUrl.substring(0,requsetVO.htmlUrl.lastIndexOf('/'));
                    var absolute=$_youapp.$_config.getHtmlEndpoint()+ "/"+defaultRelative+"/"+$(e).attr('href');
                    var id=$.md5(absolute);
                    $(e).attr('href',absolute).attr('id' ,id);
                }
            });

            $html.find('link').each(function (i ,e) {
                var defaultRelative=requsetVO.htmlUrl.substring(0,requsetVO.htmlUrl.lastIndexOf('/'));
                var absolute=$_youapp.$_config.getHtmlEndpoint()+ "/"+defaultRelative+"/"+$(e).attr('href');
                var id=$.md5(absolute);
                $(e).attr('href',absolute).attr('id' ,id);
            });

            return $html;
        },

        /**
         *
         * @param $html
         * @param requsetVO {
						layoutId:layoutId,
						htmlUrl:htmlUrl
				}
         * @returns {*}
         */
        all:function ($html,requsetVO) {
            this.js($html,requsetVO);
            this.css($html,requsetVO);
        }



    }

})();