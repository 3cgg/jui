/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function(){

    var page=$.extend({
        root:$("#editColSection"),
        model:{
            vm:avalon.define({
                $id: "col_edit",
                data: {}
            })
        }
    },$_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId(){
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url:'/colmanager/getColById',
        formData:{'id':getId()},
        success:function(data){
            page.model.vm.data=data;
            avalon.scan(page.root[0], page.model.vm);
        }
    });


    function titleOnUnbindContent() {
        return page.root.find('#titleOnUnbindContent').val();
    }

    function titleOnBindContent() {
        return page.root.find('#titleOnBindContent').val();
    }

    page.contentOnColListTable=page.root.find('#contentOnColListTable').initDataTable({
        url:"/colmanager/getBindColContents",
        urlDataFn:function(){
            return {
                'colId':getId(),
                'title' :titleOnBindContent()
            };
        },
//			paging:false,
        columns : [
            {
                "className":      'recordRemove',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
                "width":"5%"
            },
            {
                "data" : "title",
                "width": "60%",
                "render": function (data, type, row, meta) {
                    return '<a href="javascript:void(0);" name="tileLink" data-content-id="'+row.id+'"  style="text-decoration:underline">'+data+'</a>';
                }
            },
            {
                "data" : "author",
                "width": "15%"
            },
            {
                "data" : "source",
                "width": "20%"
            }
        ],
        callAfterDrawn:function(data,opts){
            page.root.find('#contentOnColListTable td.recordRemove').on('click',function(event){
                var $tr = $(this).closest('tr');
                var row = page.contentOnColListTable.row( $tr );
                var data=row.data();
                var contentId=data.contentId;
                var colId=getId();
                page.ajaxPost({
                    url:'/colmanager/unbindColContent',
                    formData:{
                        colId:colId,
                        contentId:contentId
                    },
                    success:function(data){
                        page.success('unbing-success : ' + data);
                        page.contentOnColListTable.ajax.reload();
                        page.contentNotOnColListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            });

            page.root.find('#contentOnColListTable [name="tileLink"]').on('click',function (event) {
                var contentId=$(event.target).data("contentId");

                page.modal.open(page,
                    {	id:"peekContentModal",
                        title:"内容详情",
                        hidden : function(e,ra){
                            console.log("hide modal  "+ JSON.stringify(ra[0]) );
                        }
                    },'/pages/cms/colmanager/content-peek-pop.html',{contentId : contentId , name : 'contentPeek' });

            });
        }
    });


    page.contentNotOnColListTable=page.root.find('#contentNotOnColListTable').initDataTable({
        url:"/colmanager/getUnbindColContents",
        urlDataFn:function(){
            return {
                'colId':getId(),
                'title' :titleOnUnbindContent()
            };
        },
//			paging:false,
        columns : [
            {
                "className":      'recordAdd',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
                "width":"5%",
                "createdCell":function (td, cellData, rowData, row, col) {
                    if ( cellData < 1 ) {
                        $(td).css('color', 'red')
                    }
                }
            },
            {
                "data" : "title",
                "width": "60%",
                "render": function (data, type, row, meta) {
                    return '<a href="javascript:void(0);" name="tileLink" data-content-id="'+row.id+'"  style="text-decoration:underline">'+data+'</a>';
                }
            },
            {
                "data" : "author",
                "width": "15%"
            },
            {
                "data" : "source",
                "width": "20%"
            }
        ],
        callAfterDrawn:function(data,opts){
            page.root.find('#contentNotOnColListTable td.recordAdd').on('click',function(event){
                var $tr = $(this).closest('tr');
                var row = page.contentNotOnColListTable.row( $tr );
                var data=row.data();
                var contentId=data.contentId;
                var colId=getId();
                page.ajaxPost({
                    url:'/colmanager/bindColContent',
                    formData:{
                        colId:colId,
                        contentId:contentId
                    },
                    success:function(data){
                        page.success('bing-success : ' + data);
                        page.contentOnColListTable.ajax.reload();
                        page.contentNotOnColListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            });


            page.root.find('#contentNotOnColListTable [name="tileLink"]').on('click',function (event) {
                var contentId=$(event.target).data("contentId");

                page.modal.open(page,
                    {	id:"peekContentModal",
                        title:"内容详情",
                        hidden : function(e,ra){
                            console.log("hide modal  "+ JSON.stringify(ra[0]) );
                        }
                    },'/pages/cms/colmanager/content-peek-pop.html',{contentId : contentId , name : 'contentPeek' });

            });

        }
    });

    page.root.find('#searchBindContentBtn').on('click',function(event){
        page.contentOnColListTable.ajax.reload();
    });

    page.root.find('#searchUnbindContentBtn').on('click',function(event){
        page.contentNotOnColListTable.ajax.reload();
    });

});