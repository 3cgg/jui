$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchContentSection"),
        model: {
            vm: avalon.define({
                $id: "content_view",
                data: {}
            })
        }
    }, $_youapp.pageTemplate);

    page.root.find('#toAddContentBtn').on('click',function (e) {
        $(this).goView("/pages/cms/contentmanager/content-add.html");
    });


    page.listTable = page.root.find('#contentListTable').initDataTable({
        url: "/contentmanager/getContentsByPage",
        urlDataFn: function () {
            return page.root.find("#searchContentForm").serializeObj();
        },
        lengthChange: false,
        checkbox: true,
        index:true,
        ops: {
            view: function (id, rowData) {
                page.root.find('#contentListTable').goView('/pages/cms/contentmanager/content-view.html', {"id": id});
            },
            edit: function (id, rowData) {
                page.root.find('#contentListTable').goView('/pages/cms/contentmanager/content-edit.html', {"id": id});
            },
            del: function (id, rowData) {
                page.ajaxPost({
                    url: '/contentmanager/deleteContentById',
                    formData: {'id': id},
                    success: function (data) {
                        page.listTable.ajax.reload(null,false);
                    }
                });
            }
        },
        columns: [

            {
                "data": "title",
                "width": "15%"
            }
            ,
            {
                "data": "author",
                "width": "5%"
            }
            ,
            {
                "data": "publishTime",
                "width": "10%"
            }
            ,
            {
                "data": "source",
                "width": "10%"
            }
            ,
            {
                "data": "link",
                "render": function (data, type, row, meta) {
                    return '<span style="width: 27em;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;display: block ">'+data+'</span>'
                }
            }
            ,
            {
                "data": "overview",
                "render": function (data, type, row, meta) {
                    return '<span style="width: 27em;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;display: block ">'+data+'</span>'
                }
            }
            ,
            {
                "data": "sequence",
                "width": "5%"
            }
        ]
    });

    page.root.find("#searchContentBtn").on("click", function () {
        page.listTable.ajax.reload();
    });

    page.root.find('#publishTimeStart').datetimepicker();

    page.root.find('#publishTimeEnd').datetimepicker();

    page.root.find('snapshot').on('snapshot.shown',function (event,args) {

        console.log(event);
        console.log(JSON.stringify(args));
        page.listTable.ajax.reload(null,false);
    })






















});













