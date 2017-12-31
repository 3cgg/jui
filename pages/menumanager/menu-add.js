/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#addMenuSection"),
        model: {
            vm: avalon.define({
                $id: "menu_add",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    function getId() {
        return page.root.getViewParam().id;
    }

    page.root.find('#pid').val(getId());

    if (getId()) {
        page.ajaxGet({
            url: '/menumanager/getMenuById',
            formData: {'id': getId()},
            success: function (data) {
                page.model.vm.data = data;
                avalon.scan(page.root[0], page.model.vm);
            }
        });
    }
    else {
        page.root.find('#parentMenuDiv').hide();
    }

    page.root.find("#addMenuForm").validate({
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
                url: '/menumanager/saveMenu',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/menumanager/menu-list.html');
                }
            });
        }
    })
});