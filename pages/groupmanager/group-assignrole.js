/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#assignRoleOnGroupSection"),
        model: {
            vm: avalon.define({
                $id: "group_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/groupmanager/getGroupById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });

    page.roleOnGroupListTable = page.root.find('#roleOnGroupListTable').initDataTable({
        url: "/groupmanager/getRolesByGroupIdByPage",
        urlDataFn: function () {
            return {'groupId': getId()};
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
                var row = page.roleOnGroupListTable.row($tr);
                var data = row.data();
                var roleId = data.id;
                var groupId = getId();
                page.ajaxPost({
                    url: '/groupmanager/unbingRoleGroup',
                    formData: {
                        groupId: groupId,
                        roleId: roleId
                    },
                    success: function (data) {
                        page.success('unbing-success : ' + data);
                        page.roleOnGroupListTable.ajax.reload();
                        page.roleNotOnGroupListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


    page.roleNotOnGroupListTable = page.root.find('#roleNotOnGroupListTable').initDataTable({
        url: "/groupmanager/getUnbingRolesByGroupIdByPage",
        urlDataFn: function () {
            return {'groupId': getId()};
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
                var row = page.roleNotOnGroupListTable.row($tr);
                var data = row.data();
                var roleId = data.id;
                var groupId = getId();
                page.ajaxPost({
                    url: '/groupmanager/bingRoleGroup',
                    formData: {
                        groupId: groupId,
                        roleId: roleId
                    },
                    success: function (data) {
                        page.success('bing-success : ' + data);
                        page.roleOnGroupListTable.ajax.reload();
                        page.roleNotOnGroupListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


});