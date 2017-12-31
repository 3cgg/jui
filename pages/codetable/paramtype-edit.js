/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#editParamTypeSection"),
        model: {
            vm: avalon.define({
                $id: "paramtype_edit",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/codetablemanager/getParamTypeById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });

    page.root.find("#editParamTypeForm").validate({
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
                url: '/codetablemanager/updateParamType',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/codetable/paramtype-list.html');
                }
            });

        }
    });

});