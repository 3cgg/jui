/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchSysParamSection"),
        model: {
            vm: avalon.define({
                $id: "sysparam_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.listTable = page.root.find('#sysparamListTable').initDataTable({
        url: "/sysparam/getSysParamsByPage",
        urlDataFn: function () {
            return page.root.find("#searchSysParamForm").serializeObj();
        },
        lengthChange: false,
        checkbox: true,
        ops: {
            view: function (id, rowData) {
                page.root.find('#sysparamListTable').goView('/pages/sysparam/sysparam-view.html', {"id": id});
            },
            edit: function (id, rowData) {
                page.root.find('#sysparamListTable').goView('/pages/sysparam/sysparam-edit.html', {"id": id});
            },
            del: function (id, rowData) {
                page.ajaxPost({
                    url: '/sysparam/deleteSysParamById',
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
                "data": "value",
                "width": "10%"
            },
            {
                "data": "desc",
                "width": "20%"
            }

        ]
    });

    page.root.find("#searchSysparamBtn").on("click", function () {
        page.listTable.ajax.reload();
    })

});