/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#addRoleSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find("#addRoleForm").validate({
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
                url: '/groupmanager/saveRole',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/groupmanager/role-list.html');
                }
            });
        }
    })
});