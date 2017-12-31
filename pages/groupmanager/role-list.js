/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchRoleSection"),
        model: {
            vm: avalon.define({
                $id: "role_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.listTable = page.root.find('#roleListTable').initDataTable({
        url: "/groupmanager/getRolesByPage",
        urlDataFn: function () {
            return page.root.find("#searchRoleForm").serializeObj();
        },
        checkbox: true,
        ops: {
            view: function (id, rowData) {
                page.root.find('#roleListTable').goView('/pages/groupmanager/role-view.html', {"id": id});
            },
            edit: function (id, rowData) {
                page.root.find('#roleListTable').goView('/pages/groupmanager/role-edit.html', {"id": id});
            },
            del: function (id, rowData) {
                page.ajaxPost({
                    url: '/groupmanager/deleteRole',
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
                "data": "roleCode",
                "width": "10%"
            },
            {
                "data": "roleName",
                "width": "10%"
            },
            {
                "data": "description",
                "width": "20%"
            }

        ]
    });

    page.root.find("#searchRoleBtn").on("click", function () {
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
        var ids = page.root.find('#roleListTable').getSelectedRow();
        if (valid(ids)) {
            $(this).goView('/pages/groupmanager/user-assignrole.html', {"id": ids[0]});
        }
    });

    page.root.find('#toAssignGroupBtn').on('click', function () {
        var ids = page.root.find('#roleListTable').getSelectedRow();
        if (valid(ids)) {
            $(this).goView('/pages/groupmanager/role-assigngroup.html', {"id": ids[0]});
        }
    });

});