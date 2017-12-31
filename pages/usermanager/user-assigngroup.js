/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#assignGroupOnUserSection"),
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

    page.groupOnUserListTable = page.root.find('#groupOnUserListTable').initDataTable({
        url: "/usermanager/getGroupsByUserIdByPage",
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
                var row = page.groupOnUserListTable.row($tr);
                var data = row.data();
                var groupId = data.id;
                var userId = getId();
                page.ajaxPost({
                    url: '/usermanager/unbingUserGroup',
                    formData: {
                        userId: userId,
                        groupId: groupId
                    },
                    success: function (data) {
                        page.success('unbing-success : ' + data);
                        page.groupOnUserListTable.ajax.reload();
                        page.groupNotOnUserListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


    page.groupNotOnUserListTable = page.root.find('#groupNotOnUserListTable').initDataTable({
        url: "/usermanager/getUnbingGroupsByUserIdByPage",
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
                var row = page.groupNotOnUserListTable.row($tr);
                var data = row.data();
                var groupId = data.id;
                var userId = getId();
                page.ajaxPost({
                    url: '/usermanager/bingUserGroup',
                    formData: {
                        userId: userId,
                        groupId: groupId
                    },
                    success: function (data) {
                        page.success('bing-success : ' + data);
                        page.groupOnUserListTable.ajax.reload();
                        page.groupNotOnUserListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            })
        }
    });


});