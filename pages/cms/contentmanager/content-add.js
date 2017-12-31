/**
 * Created by J on 2017/10/31.
 */
$_youapp.ready(function (){

    var page=$.extend({
        root:$("#addContentSection"),
        model:{
        }
    },$_youapp.pageTemplate);

    page.root.find('#publishTime').datetimepicker();

    page.root.find('#backContentBtn').on('click',function (e) {
        $(this).goView("/pages/cms/contentmanager/content-list.html");
    });


    page.root.find("#addContentForm").validate({
        rules: {
            'title': {
                required: true,
                maxlength:255
            }
            ,
            'author': {
                required: true,
                maxlength:64
            }
            ,
            'publishTime': {
                required: true,
                maxlength:24
            }
            ,
            'source': {
                required: true,
                maxlength:64
            }
            ,
            'link': {
                required: true,
                maxlength:255
            }
            ,
            'overview': {
                required: true,
                maxlength:2000
            }
            ,
            'adImg': {
                required: true,
                maxlength:64
            }
            ,
            'content': {
                required: true
            }
            ,
            'sequence': {
                required: true,
                number : true
            }
        },
        submitHandler:function(form){
            page.submitForm({
                url:'/contentmanager/saveContent',
                formSelector:form,
                success:function(data){
                    page.root.goView('/pages/cms/contentmanager/content-list.html');
                }
            });
        }
    });
    page.root.find('#addContentBtn').on('click',function(){
        page.root.find("#addContentForm").submit();
    });

    page.root.find('#contentEdit').on('click',function () {
        var $content=page.root.find('#content');
        page.editorModal.open(page,
            {	id:"contentEditorModal",
                title:"内容详情",
                hidden : function(txt){
                    console.log("hide modal  "+ JSON.stringify(txt) );
                    $content.val(txt.htmlContent);
                },
                opt:{
                    width : '100%',
                    height : '100%'
                }
            },'/pages/cms/contentmanager/content-editor-pop.html',
            {
                name : 'contentEditor',
                content : $content.val()
            });
    });

    page.root.find('#contentPreview').on('click',function () {
        var $content=page.root.find('#content');
        page.editorModal.open(page,
            {	id:"contentPreviewModal",
                title:"内容详情",
                hidden : function(txt){
                    console.log("hide modal  "+ JSON.stringify(txt) );
                    $content.val(txt.htmlContent);
                },
                opt:{
                    width : '100%',
                    height : '100%'
                }
            },'/pages/cms/contentmanager/content-editor-pop.html',
            {
                name : 'contentPreview',
                content : $content.val(),
                preview : true
            });
    });


//			UE.delEditor('contentContainer');
//
//            var contentContainer = UE.getEditor('contentContainer',{
//
//
//            });
//
//            $('#tabContainer').scroll(function (event) {
//                var $this=$(event.target);
//                var top=$this.scrollTop();
//
//                console.log(top)
//
//
//            });

    page.root.find('[name="fileUploadDiv"]').each(function(i,e){
        var opt={
            $fsc : $(e),
            $fc : page.root.find('#filesDiv'), // form container
            added : function(data,obj){
                obj.opt.$fsc.parent().children('input').val(data.id);
            },
            removed : function(data,obj){
                obj.opt.$fsc.parent().children('input').val('');
            },
            types : ['image/jpeg','image/jpg','image/png']
        }
        fileAttach(opt);
    });



});
