/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#assignRoleOnUserSection"),
        model: {
            vm: avalon.define({
                $id: "user_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/usermanager/getUserById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });

    page.roleOnUserListTable = page.root.find('#roleOnUserListTable').initDataTable({
        url: "/usermanager/getRolesByUserIdByPage",
        urlDataFn: function () {
            return {'userId': getId()};
        },
        paging: false,
        columns: [
            {
                "className": 'recordRemove',
                "orderable": false,
                "data": null,
                "defaultContent": '',
                "width": "5%"
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
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('td.recordRemove').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.roleOnUserListTable.row($tr);
                var data = row.data();
                var roleId = data.id;
                var userId = getId();
                page.ajaxPost({
                    url: '/usermanager/unbingUserRole',
                    formData: {
                        userId: userId,
                        roleId: roleId
                    },
                    success: function (data) {
                        page.success('unbing-success : ' + data);
                        page.roleOnUserListTable.ajax.reload();
                        page.roleNotOnUserListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


    page.roleNotOnUserListTable = page.root.find('#roleNotOnUserListTable').initDataTable({
        url: "/usermanager/getUnbingRolesByUserIdByPage",
        urlDataFn: function () {
            return {'userId': getId()};
        },
        paging: false,
        columns: [
            {
                "className": 'recordAdd',
                "orderable": false,
                "data": null,
                "defaultContent": '',
                "width": "5%",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData < 1) {
                        $(td).css('color', 'red')
                    }
                }
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
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('td.recordAdd').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.roleNotOnUserListTable.row($tr);
                var data = row.data();
                var roleId = data.id;
                var userId = getId();
                page.ajaxPost({
                    url: '/usermanager/bingUserRole',
                    formData: {
                        userId: userId,
                        roleId: roleId
                    },
                    success: function (data) {
                        page.success('bing-success : ' + data);
                        page.roleOnUserListTable.ajax.reload();
                        page.roleNotOnUserListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


});