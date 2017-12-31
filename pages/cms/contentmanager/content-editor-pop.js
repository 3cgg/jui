/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#contentContainer"),
        model: {}
    }, $_youapp.pageTemplate);



//        var frameHeight=window.innerHeight-50*10;




    var contentContainer = UE.getEditor('contentContainer',{
        zIndex : 9999,
        allowDivTransToP: false,
        initialFrameHeight : window.innerHeight-50*5

    });

    contentContainer.ready(function() {
        var content=page.editorModal.param(page,"content");
        console.log(content);
        contentContainer.setContent(content);
    });

    contentContainer.ready(function() {
        var preview=page.editorModal.param(page,"preview");
        var content=page.editorModal.param(page,"content");
        console.log(content);
        console.log(preview);
        if(preview){
            contentContainer.setContent(content);
            contentContainer.setDisabled();
            contentContainer.execCommand( 'preview' );
//                setTimeout(function () {
//                    page.editorModal.close(page,{
//
//                    });
//                },1000);
            page.editorModal.close(page,{

            });
        }

    });


    page.editorModal.registerClose(page,function () {
        console.log("destroy contentContainer ");
        contentContainer.destroy();
    });

    page.editorModal.registerReturn(page,function () {
        var html = contentContainer.getContent();
        return {
            htmlContent : html,
            plainContent : contentContainer.getContentTxt()
        }
    });


});