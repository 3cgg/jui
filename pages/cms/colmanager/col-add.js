/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function (){

    var page=$.extend({
        root:$("#addColSection"),
        model:{
            vm:avalon.define({
                $id: "col_add",
                data: {}
            })
        }
    },$_youapp.pageTemplate);

    function getId(){
        return page.root.getViewParam().id;
    }

    page.root.find('#pid').val(getId());

    if(getId()){
        page.ajaxGet({
            url:'/colmanager/getColById',
            formData:{'id':getId()},
            success:function(data){
                page.model.vm.data=data;
                avalon.scan(page.root[0], page.model.vm);
            }
        });
    }
    else{
        page.root.find('#parentColDiv').hide();
    }

    page.root.find("#addColForm").validate({
        rules: {
            'code': {
                required: true,
                maxlength:16
            },
            'name': {
                required: true,
                maxlength:32
            },
            'sequence': {
                required: true,
                digits: true
            },
            'description': {
                required: true,
                maxlength:2000
            }
        },
        submitHandler:function(form){
            page.submitForm({
                url:'/colmanager/saveCol',
                formSelector:form,
                success:function(data){
                    page.root.goView('/pages/cms/colmanager/col-list.html');
                }
            });
        }
    })
});