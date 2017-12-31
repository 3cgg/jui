/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#viewUserSection"),
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

    page.listTable = page.root.find('#roleOnUserListTable').initDataTable({
        url: "/usermanager/getRolesByUserIdByPage",
        urlDataFn: function () {
            return {'id': getId()};
        },
        paging: false,
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


    page.userlistTable = page.root.find('#groupOnUserListTable').initDataTable({
        url: "/usermanager/getGroupsByUserIdByPage",
        urlDataFn: function () {
            return {'id': getId()};
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
                "orderable": false,
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

});