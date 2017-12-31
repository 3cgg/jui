/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchUserSection"),
        model: {
            vm: avalon.define({
                $id: "user_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.listTable = page.root.find('#userListTable').initDataTable({
        url: "/usermanager/getUsersByPage",
        urlDataFn: function () {
            return page.root.find("#searchUserForm").serializeObj();
        },
        checkbox: true,
        index: true,
        ops: {
            view: function (id, rowData) {
                page.root.find('#userListTable').goView('/pages/usermanager/user-view.html', {"id": id});
            },
            edit: function (id, rowData) {
                page.root.find('#userListTable').goView('/pages/usermanager/user-edit.html', {"id": id});
            },
            del: function (id, rowData) {
                page.ajaxPost({
                    url: '/usermanager/deleteUser',
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
                "data": "userName",
                "width": "10%"
            },
            {
                "data": "natureName",
                "width": "10%"
            },
            {
                "data": "status",
                "width": "10%"
            },
            {
                "data": "registerTime",
                "width": "10%"
            }
        ]
    });

    page.root.find("#searchUserBtn").on("click", function () {
        page.listTable.ajax.reload();
    });

    page.codeTable($('.codetable'));

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
        var ids = page.root.find('#userListTable').getSelectedRow();
        if (valid(ids)) {
            $(this).goView('/pages/usermanager/user-assignrole.html', {"id": ids[0]});
        }
    });

    page.root.find('#toAssignGroupBtn').on('click', function () {
        var ids = page.root.find('#userListTable').getSelectedRow();
        if (valid(ids)) {
            $(this).goView('/pages/usermanager/user-assigngroup.html', {"id": ids[0]});
        }
    });

});