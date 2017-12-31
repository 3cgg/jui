/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    page = $.extend({
        root: $("#datatableDemoSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find('#datatablesTable').initDataTable({
        url: "/sample/datatables/getDatatables",
        urlDataFn: function () {
            return page.root.find('#datatablesForm').serializeObj();
        },
        lengthChange: false,
        checkbox: true,
        ops: {
            view: function (id, rowData) {
                alert('view ' + id);
            },
            edit: function (id, rowData) {
                alert('edit ' + id);
            },
            del: function (id, rowData) {
                alert('del ' + id);
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
                "width": "10%"
            }

        ]
    });
})