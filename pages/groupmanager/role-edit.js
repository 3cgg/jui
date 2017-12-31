/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#editRoleSection"),
        model: {
            vm: avalon.define({
                $id: "role_edit",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/groupmanager/getRoleById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });

    page.root.find("#editRoleForm").validate({
        rules: {
            'roleCode': {
                required: true,
                maxlength: 32
            },
            'roleName': {
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
                url: '/groupmanager/updateRole',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/groupmanager/role-list.html');
                }
            });

        }
    });

});