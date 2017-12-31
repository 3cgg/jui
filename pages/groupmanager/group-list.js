/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchGroupSection"),
        model: {
            vm: avalon.define({
                $id: "group_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.listTable = page.root.find('#groupListTable').initDataTable({
        url: "/groupmanager/getGroupsByPage",
        urlDataFn: function () {
            return page.root.find("#searchGroupForm").serializeObj();
        },
        checkbox: true,
        ops: {
            view: function (id, rowData) {
                page.root.find('#groupListTable').goView('/pages/groupmanager/group-view.html', {"id": id});
            },
            edit: function (id, rowData) {
                page.root.find('#groupListTable').goView('/pages/groupmanager/group-edit.html', {"id": id});
            },
            del: function (id, rowData) {
                page.ajaxPost({
                    url: '/groupmanager/deleteGroup',
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
                "data": "groupCode",
                "width": "10%"
            },
            {
                "data": "groupName",
                "width": "10%"
            },
            {
                "data": "description",
                "width": "20%"
            }

        ]
    });

    page.root.find("#searchGroupBtn").on("click", function () {
        page.listTable.ajax.reload();
    });

    function valid(ids) {
        if (ids && ids.length == 0) {
            page.warning('请选择一条记录');
            return false;
        }
        if (ids && ids.length > 1) {
            page.warning('只能选择一条记录');
            return false;
        }
        return true;
    }

    page.root.find('#toAssignRoleBtn').on('click', function () {
        var ids = page.root.find('#groupListTable').getSelectedRow();
        if (valid(ids)) {
            $(this).goView('/pages/groupmanager/group-assignrole.html', {"id": ids[0]});
        }
    });

    page.root.find('#toAssignGroupBtn').on('click', function () {
        var ids = page.root.find('#groupListTable').getSelectedRow();
        if (valid(ids)) {
            $(this).goView('/pages/groupmanager/group-assigngroup.html', {"id": ids[0]});
        }
    });

});