/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#assignGroupOnRoleSection"),
        model: {
            vm: avalon.define({
                $id: "row_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId() {
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url: '/groupmanager/getRoleById',
        formData: {'id': getId()},
        success: function (data) {
            page.model.vm.data = data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });

    page.groupOnRoleListTable = page.root.find('#groupOnRoleListTable').initDataTable({
        url: "/groupmanager/getGroupsByRoleIdByPage",
        urlDataFn: function () {
            return {'roleId': getId()};
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
                "data": "description",
                "width": "20%"
            }
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('td.recordRemove').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.groupOnRoleListTable.row($tr);
                var data = row.data();
                var groupId = data.id;
                var roleId = getId();
                page.ajaxPost({
                    url: '/groupmanager/unbingRoleGroup',
                    formData: {
                        roleId: roleId,
                        groupId: groupId
                    },
                    success: function (data) {
                        page.success('unbing-success : ' + data);
                        page.groupOnRoleListTable.ajax.reload();
                        page.groupNotOnRoleListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


    page.groupNotOnRoleListTable = page.root.find('#groupNotOnRoleListTable').initDataTable({
        url: "/groupmanager/getUnbingGroupsByRoleIdByPage",
        urlDataFn: function () {
            return {'roleId': getId()};
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
                "data": "description",
                "width": "20%"
            }
        ],
        callAfterDrawn: function (data, opts) {
            page.root.find('td.recordAdd').on('click', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.groupNotOnRoleListTable.row($tr);
                var data = row.data();
                var groupId = data.id;
                var roleId = getId();
                page.ajaxPost({
                    url: '/groupmanager/bingRoleGroup',
                    formData: {
                        roleId: roleId,
                        groupId: groupId
                    },
                    success: function (data) {
                        page.success('bing-success : ' + data);
                        page.groupOnRoleListTable.ajax.reload();
                        page.groupNotOnRoleListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


});