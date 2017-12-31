/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#editSysParamSection"),
        model: {
            vm: avalon.define({
                $id: "sysparam_edit",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/sysparam/getSysParamById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });

    page.root.find("#editSysParamForm").validate({
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
                url: '/sysparam/updateSysParam',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/sysparam/sysparam-list.html');
                }
            });

        }
    });

});