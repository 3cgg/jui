/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#addUserSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find("#addUserForm").validate({
        rules: {
            'userName': {
                required: true,
                maxlength: 32
            },
            'natureName': {
                required: true,
                maxlength: 32
            },
            'password': {
                required: true,
                maxlength: 16
            },
            'retypePassword': {
                required: true,
                maxlength: 16,
                equalTo: page.root.find('#password')
            }
        },
        submitHandler: function (form) {
            page.submitForm({
                url: '/usermanager/register',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/usermanager/user-list.html');
                }
            });
        }
    })
});