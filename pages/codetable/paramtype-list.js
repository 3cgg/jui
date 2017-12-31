/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchParamTypeSection"),
        model: {
            vm: avalon.define({
                $id: "paramtype-list",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.listTable = page.root.find('#paramTypeListTable').initDataTable({
        url: "/codetablemanager/getParamTypesByPage",
        urlDataFn: function () {
            return page.root.find("#searchParamTypeForm").serializeObj();
        },
        lengthChange: false,
        checkbox: true,
        ops: {
            view: function (id, rowData) {
                page.root.find('#paramTypeListTable').goView('/pages/codetable/paramtype-view.html', {"id": id});
            },
            edit: function (id, rowData) {
                page.root.find('#paramTypeListTable').goView('/pages/codetable/paramtype-edit.html', {"id": id});
            },
            del: function (id, rowData) {
                page.ajaxPost({
                    url: '/codetablemanager/deleteParamTypeById',
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

    page.root.find("#searchParamTypeBtn").on("click", function () {
        page.listTable.ajax.reload();
    })

});