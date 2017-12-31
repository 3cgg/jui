/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#editUserSection"),
        model: {
            vm: avalon.define({
                $id: "user_edit",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/usermanager/getUserById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });

    page.root.find("#editUserForm").validate({
        rules: {
            'natureName': {
                required: true,
                maxlength: 32
            }
        },
        submitHandler: function (form) {
            page.submitForm({
                url: '/usermanager/updateUser',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/usermanager/user-list.html');
                }
            });

        }
    });

});