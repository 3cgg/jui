/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#viewGroupSection"),
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

    page.listTable = page.root.find('#roleOnGroupListTable').initDataTable({
        url: "/groupmanager/getRolesByGroupIdByPage",
        urlDataFn: function () {
            return {'groupId': getId()};
        },
        paging: false,
        columns: [
            {
                "data": "roleCode",
                "orderable": false,
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


    page.userlistTable = page.root.find('#userOnGroupListTable').initDataTable({
        url: "/usermanager/getUsersByGroupIdByPage",
        urlDataFn: function () {
            return {'groupId': getId()};
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