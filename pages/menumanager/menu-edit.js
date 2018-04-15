/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#editMenuSection"),
        model: {
            vm: avalon.define({
                $id: "menu_edit",
                data: {},
                pdata:{}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    function parentShow(parentId) {
        if(parentId){
            page.ajaxGet({
                url: '/menumanager/getMenuById',
                formData: {'id': parentId},
                success: function (data) {
                    page.root.find('#parentMenuDiv').show();
                    page.model.vm.pdata = data;
                    avalon.scan(page.root[0], page.model.vm);
                }
            });
        }

    }

    page.ajaxGet({
        url: '/menumanager/getMenuById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
            parentShow(data.pid)
        }
    });



    page.root.find("#editMenuForm").validate({
        rules: {
            'code': {
                required: true,
                maxlength: 16
            },
            'name': {
                required: true,
                maxlength: 32
            },
            'sequence': {
                required: true,
                digits: true
            },
            'url': {
                required: true,
                maxlength: 128
            },
            'description': {
                required: true,
                maxlength: 2000
            }
        },
        submitHandler: function (form) {
            page.submitForm({
                url: '/menumanager/updateMenu',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/menumanager/menu-list.html');
                }
            });

        }
    });

});