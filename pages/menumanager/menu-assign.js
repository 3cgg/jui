/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#editMenuSection"),
        model: {
            vm: avalon.define({
                $id: "menu_edit",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/menumanager/getMenuById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });


    page.roleOnMenuListTable = page.root.find('#roleOnMenuListTable').initDataTable({
        url: "/menumanager/getBindMenuRoles",
        urlDataFn: function () {
            return {'menuId': getId()};
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
                "data": "roleDesc",
                "width": "20%"
            }
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('#roleOnMenuListTable td.recordRemove').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.roleOnMenuListTable.row($tr);
                var data = row.data();
                var roleId = data.roleId;
                var menuId = getId();
                page.ajaxPost({
                    url: '/menumanager/unbindMenuRole',
                    formData: {
                        menuId: menuId,
                        roleId: roleId
                    },
                    success: function (data) {
                        page.success('unbing-success : ' + data);
                        page.roleOnMenuListTable.ajax.reload();
                        page.roleNotOnMenuListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


    page.roleNotOnMenuListTable = page.root.find('#roleNotOnMenuListTable').initDataTable({
        url: "/menumanager/getUnbindMenuRoles",
        urlDataFn: function () {
            return {'menuId': getId()};
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
                "data": "roleDesc",
                "width": "20%"
            }
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('#roleNotOnMenuListTable td.recordAdd').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.roleNotOnMenuListTable.row($tr);
                var data = row.data();
                var roleId = data.roleId;
                var menuId = getId();
                page.ajaxPost({
                    url: '/menumanager/bindMenuRole',
                    formData: {
                        menuId: menuId,
                        roleId: roleId
                    },
                    success: function (data) {
                        page.success('bing-success : ' + data);
                        page.roleOnMenuListTable.ajax.reload();
                        page.roleNotOnMenuListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


    page.groupOnMenuListTable = page.root.find('#groupOnMenuListTable').initDataTable({
        url: "/menumanager/getBindMenuGroups",
        urlDataFn: function () {
            return {'menuId': getId()};
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
                "data": "groupCode",
                "width": "10%"
            },
            {
                "data": "groupName",
                "width": "10%"
            },
            {
                "data": "groupDesc",
                "width": "20%"
            }
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('#groupOnMenuListTable td.recordRemove').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.groupOnMenuListTable.row($tr);
                var data = row.data();
                var groupId = data.groupId;
                var menuId = getId();
                page.ajaxPost({
                    url: '/menumanager/unbindMenuGroup',
                    formData: {
                        menuId: menuId,
                        groupId: groupId
                    },
                    success: function (data) {
                        page.success('unbing-success : ' + data);
                        page.groupOnMenuListTable.ajax.reload();
                        page.groupNotOnMenuListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


    page.groupNotOnMenuListTable = page.root.find('#groupNotOnMenuListTable').initDataTable({
        url: "/menumanager/getUnbindMenuGroups",
        urlDataFn: function () {
            return {'menuId': getId()};
        },
        paging: false,
        columns: [
            {
                "className": 'recordAdd',
                "orderable": false,
                "data": null,
                "defaultContent": '',
                "width": "5%"
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
                "data": "groupDesc",
                "width": "20%"
            }
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('#groupNotOnMenuListTable td.recordAdd').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.groupNotOnMenuListTable.row($tr);
                var data = row.data();
                var groupId = data.groupId;
                var menuId = getId();
                page.ajaxPost({
                    url: '/menumanager/bindMenuGroup',
                    formData: {
                        menuId: menuId,
                        groupId: groupId
                    },
                    success: function (data) {
                        page.success('bing-success : ' + data);
                        page.groupOnMenuListTable.ajax.reload();
                        page.groupNotOnMenuListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


});