/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#addParamTypeSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find("#addParamTypeForm").validate({
        rules: {
            'code': {
                required: true,
                maxlength: 32
            },
            'codeName': {
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
                url: '/codetablemanager/saveParamType',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/codetable/paramtype-list.html');
                }
            });
        }
    })
});