/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#addSysParamSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find("#addSysParamForm").validate({
        rules: {
            'code': {
                required: true,
                maxlength: 64
            },
            'value': {
                required: true,
                maxlength: 128
            },
            'desc': {
                required: true,
                maxlength: 2000
            }
        },
        submitHandler: function (form) {
            page.submitForm({
                url: '/sysparam/saveSysParam',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/sysparam/sysparam-list.html');
                }
            });
        }
    });
    page.root.find('#addSysParamBtn').on('click', function () {
        page.root.find("#addSysParamForm").submit();
    });

});