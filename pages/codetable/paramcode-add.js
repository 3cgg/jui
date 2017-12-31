/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#addParamCodeSection"),
        model: {}
    }, $_youapp.pageTemplate);
    page.root.find("#addParamCodeForm").validate({
        rules: {
            'code': {
                required: true,
                maxlength: 32
            },
            'type': {
                required: true
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
        messages: {
            'type': {valueNotEquals: "Please select an item!"}
        },
        submitHandler: function (form) {
            page.submitForm({
                url: '/codetablemanager/saveParamCode',
                formSelector: form,
                success: function (data) {
                    page.root.goView('/pages/codetable/paramcode-list.html');
                }
            });
        }
    });

    page.ajaxGet({
        url: '/codetablemanager/getParamTypes',
        formData: {},
        success: function (data) {
            var optionEles = '';
            optionEles = optionEles + '<option value="" >请选择</option>'
            for (var i = 0; i < data.length; i++) {
                var paramtype = data[i];
                optionEles = optionEles + '<option value="' + paramtype.code + '" >' + paramtype.codeName + '</option>'
            }
            page.root.find('#type').empty().append(optionEles);
        }
    });

});
