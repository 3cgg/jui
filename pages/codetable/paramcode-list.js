/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchParamCodeSection"),
        model: {
            vm: avalon.define({
                $id: "paramcode-list",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.listTable = page.root.find('#paramCodeListTable').initDataTable({
        url: "/codetablemanager/getParamCodesByPage",
        urlDataFn: function () {
            return page.root.find("#searchParamCodeForm").serializeObj();
        },
        lengthChange: false,
        checkbox: true,
        ops: {
            view: function (id, rowData) {
                page.root.find('#paramCodeListTable').goView('/pages/codetable/paramcode-view.html', {"id": id});
            },
            edit: function (id, rowData) {
                page.root.find('#paramCodeListTable').goView('/pages/codetable/paramcode-edit.html', {"id": id});
            },
            del: function (id, rowData) {
                page.ajaxPost({
                    url: '/codetablemanager/deleteParamCodeById',
                    formData: {'id': id},
                    success: function (data) {
                        page.listTable.ajax.reload();
                    }
                });
            }
        },
        columns: [
            {
                "data": "id",
                "orderable": false,
                "width": "10%"
            },
            {
                "data": "type",
                "width": "10%"
            },
            {
                "data": "code",
                "width": "10%"
            },
            {
                "data": "codeName",
                "width": "10%"
            },
            {
                "data": "description",
                "width": "20%"
            }

        ]
    });

    page.root.find("#searchParamCodeBtn").on("click", function () {
        page.listTable.ajax.reload();
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
