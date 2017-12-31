/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchResourceSection"),
        model: {
            vm: avalon.define({
                $id: "resource_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.resourceListTable = page.root.find('#resourceListTable').initDataTable({
        url: "/resourcemanager/getResourcesByPage",
        urlDataFn: function () {
            return page.root.find("#searchResourceForm").serializeObj();
        },
        checkbox: true,
        columns: [
            {
                "data": "id",
                "orderable": false,
                "width": "10%"
            },
            {
                "data": "url",
                "width": "10%"
            },
            {
                "data": "friendlyUrl",
                "width": "10%"
            },
            {
                "data": "cached",
                "width": "10%"
            },
            {
                "data": "description",
                "width": "20%"
            }
        ]
    });

    page.root.find("#searchResourceBtn").on("click", function () {
        page.resourceListTable.ajax.reload();
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

    page.root.find('#openCacheBtn').on('click', function () {
        var ids = page.root.find('#resourceListTable').getSelectedRow();
        if (valid(ids)) {
            page.ajaxPost({
                url: '/resourcemanager/enableCache',
                formData: {
                    id: ids[0]
                },
                success: function (data) {
                    page.success('enable-success : ' + data);
                    page.resourceListTable.ajax.reload();
                }
            });
            event.stopPropagation();
        }
    });

    page.root.find('#closeCacheBtn').on('click', function () {
        var ids = page.root.find('#resourceListTable').getSelectedRow();
        if (valid(ids)) {
            page.ajaxPost({
                url: '/resourcemanager/disableCache',
                formData: {
                    id: ids[0]
                },
                success: function (data) {
                    page.success('disable-success : ' + data);
                    page.resourceListTable.ajax.reload();
                }
            });
            event.stopPropagation();
        }
    });


    page.root.find('#refreshResourceBtn').on('click', function () {
        page.ajaxPost({
            url: '/resourcemanager/refreshResource',
            formData: {},
            success: function (data) {
                page.success('refresh-success : ' + data);
                page.resourceListTable.ajax.reload();
            }
        });
        event.stopPropagation();
    });

});
