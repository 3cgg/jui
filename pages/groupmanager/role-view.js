/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#viewRoleSection"),
        model: {
            vm: avalon.define({
                $id: "role_view",
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

    page.listTable = page.root.find('#groupOnRoleListTable').initDataTable({
        url: "/groupmanager/getGroupsByRoleIdByPage",
        urlDataFn: function () {
            return {'roleId': getId()};
        },
        paging: false,
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


    page.userlistTable = page.root.find('#userOnRoleListTable').initDataTable({
        url: "/usermanager/getUsersByRoleIdByPage",
        urlDataFn: function () {
            return {'roleId': getId()};
        },
        paging: false,
        columns: [
            {
                "data": "userName",
                "orderable": false,
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
                "width": "20%"
            }

        ]
    });

});