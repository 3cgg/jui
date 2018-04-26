/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function(){

    var page=$.extend({
        root:$("#bindMatSection"),
        model:{
            vm:avalon.define({
                $id: "mat_assign_view",
                data: {}
            })
        }
    },$_youapp.pageTemplate);

    avalon.scan(page.root[0], page.model.vm);  // void braces

    function getId(){
        return page.root.getViewParam().id;
    }

    page.ajaxGet({
        url:'/matcategory/getMatCategoryById',
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
        url:"/matcategorylink/getBindMatCategory",
        urlDataFn:function(){
            return {
                'categoryId':getId(),
                'keyword' :titleOnBindContent()
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
                "data" : "name",
                "width": "60%",
                "render": function (data, type, row, meta) {
                    return '<a href="javascript:void(0);" name="tileLink" data-content-id="'+row.id+'"  style="text-decoration:underline">'+data+'</a>';
                }
            },
            {
                "data" : "size",
                "width": "15%"
            }
        ],
        callAfterDrawn:function(data,opts){
            page.root.find('#contentOnColListTable td.recordRemove').on('click',function(event){
                var $tr = $(this).closest('tr');
                var row = page.contentOnColListTable.row( $tr );
                var data=row.data();
                var matId=data.matId;
                var categoryId=getId();
                page.ajaxPost({
                    url:'/matcategorylink/unbindMatCategory',
                    formData:{
                        id:matId,
                        categoryId:categoryId
                    },
                    success:function(data){
                        page.success('unbing-success : ' + data);
                        page.contentOnColListTable.ajax.reload();
                        page.contentNotOnColListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            });

            // page.root.find('#contentOnColListTable [name="tileLink"]').on('click',function (event) {
            //     var contentId=$(event.target).data("contentId");
            //
            //     page.modal.open(page,
            //         {	id:"peekContentModal",
            //             title:"内容详情",
            //             hidden : function(e,ra){
            //                 console.log("hide modal  "+ JSON.stringify(ra[0]) );
            //             }
            //         },'/pages/cms/colmanager/content-peek-pop.html',{contentId : contentId , name : 'contentPeek' });
            //
            // });
        }
    });


    page.contentNotOnColListTable=page.root.find('#contentNotOnColListTable').initDataTable({
        url:"/matcategorylink/getUnbindMatCategory",
        urlDataFn:function(){
            return {
                'categoryId':getId(),
                'keyword' :titleOnUnbindContent()
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
                "data" : "name",
                "width": "60%",
                "render": function (data, type, row, meta) {
                    return '<a href="javascript:void(0);" name="tileLink" data-content-id="'+row.id+'"  style="text-decoration:underline">'+data+'</a>';
                }
            },
            {
                "data" : "size",
                "width": "15%"
            }
        ],
        callAfterDrawn:function(data,opts){
            page.root.find('#contentNotOnColListTable td.recordAdd').on('click',function(event){
                var $tr = $(this).closest('tr');
                var row = page.contentNotOnColListTable.row( $tr );
                var data=row.data();
                var matId=data.matId;
                var categoryId=getId();
                page.ajaxPost({
                    url:'/matcategorylink/bindMatCategory',
                    formData:{
                        id:matId,
                        categoryId:categoryId
                    },
                    success:function(data){
                        page.success('bing-success : ' + data);
                        page.contentOnColListTable.ajax.reload();
                        page.contentNotOnColListTable.ajax.reload();
                    }
                });
                event.stopPropagation();
            });


            // page.root.find('#contentNotOnColListTable [name="tileLink"]').on('click',function (event) {
            //     var contentId=$(event.target).data("contentId");
            //
            //     page.modal.open(page,
            //         {	id:"peekContentModal",
            //             title:"内容详情",
            //             hidden : function(e,ra){
            //                 console.log("hide modal  "+ JSON.stringify(ra[0]) );
            //             }
            //         },'/pages/cms/colmanager/content-peek-pop.html',{contentId : contentId , name : 'contentPeek' });
            //
            // });

        }
    });

    page.root.find('#searchBindContentBtn').on('click',function(event){
        page.contentOnColListTable.ajax.reload();
    });

    page.root.find('#searchUnbindContentBtn').on('click',function(event){
        page.contentNotOnColListTable.ajax.reload();
    });

});