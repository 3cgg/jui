/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function(){

    var page=$.extend({
        root:$("#viewContentSection"),
        model:{
            vm:avalon.define({
                $id: "content_view",
                data: {}
            })
        }
    },$_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId(){
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url:'/contentmanager/getContentById',
        formData:{'id':getId()},
        success:function(data){
            page.model.vm.data=data;
            avalon.scan(page.root[0], page.model.vm);

            page.root.find('#adImag').attr('src',data.adImgFile.uri);

            $(window.frames["contentViewIframe"].contentDocument).find('body').html(data.content);

        }
    });
});
