/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#addGroupSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find("#addGroupForm").validate({
        rules: {
            'groupCode': {
                required: true,
                maxlength: 32
            },
            'groupName': {
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
                url: '/groupmanager/saveGroup',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/groupmanager/group-list.html');
                }
            });
        }
    })
});