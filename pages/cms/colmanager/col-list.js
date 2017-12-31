/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function() {
    var page=$.extend({
        root:$("#searchColSection"),
        model:{
        }
    },$_youapp.pageTemplate);


    page.labelTree = page.root.find('#colTree').jstree({
        core : {
            'multiple':false,
            "animation" : 0,
            "check_callback" : true,
            "themes" : {
                "stripes" : true,
                "responsive" : false
            },
            data : function(obj, callback) {
                page.ajaxGet({
                    url:'/colmanager/getColsTree',
                    formData:{},
                    success:function(data){
                        callback.call(this, page.formatJstree(data));
                    }
                });
            }
        },
        "types" : {
            "default" : {
                "draggable" : false,
                "icon" : "fa fa-folder icon-state-warning icon-lg"
            }
        },
        "plugins" : [ "types", "wholerow", "dnd" ]
    }).on("load_node.jstree", function() {
        page.root.find('#colTree').jstree("open_all");
    });

    page.root.find('#btnAddRoot').on('click', function() {
        page.root.goView('/pages/cms/colmanager/col-add.html', {"id" : null});
    });

    page.root.find('#btnAdd').on('click', function() {
        var $jstree = page.root.find('#colTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if(selected.length == 0) {
            page.warning("请选择节点进行添加");
            return;
        }

        page.root.goView('/pages/cms/colmanager/col-add.html', {"id" : selected[0].id});
    });

    page.root.find('#btnEdit').on('click', function() {
        var $jstree = page.root.find('#colTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if(selected.length == 0) {
            page.warning("请选择节点进行编辑");
            return;
        }

        page.root.goView('/pages/cms/colmanager/col-edit.html', {"id" : selected[0].id});
    });

    page.root.find('#btnDel').on('click', function() {
        var $jstree = page.root.find('#colTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if(selected.length == 0) {
            page.warning("请选择节点进行删除");
            return;
        }


        page.ajaxPost({
            url:'/colmanager/deleteColById',
            formData:{"id" : selected[0].id},
            success:function(data){
                page.success("delete-success");
                $jstree.delete_node(selected[0]);
            }
        });

    });


    page.root.find('#btnAssign').on('click', function() {
        var $jstree = page.root.find('#colTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if(selected.length == 0) {
            page.warning("请选择节点进行Assign");
            return;
        }

        page.root.goView('/pages/cms/colmanager/col-assign.html', {"id" : selected[0].id});
    });
});