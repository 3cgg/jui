/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {
    var page = $.extend({
        root: $("#searchMenuSection"),
        model: {}
    }, $_youapp.pageTemplate);


    page.labelTree = page.root.find('#menuTree').jstree({
        core: {
            'multiple': false,
            "animation": 0,
            "check_callback": true,
            "themes": {
                "stripes": true,
                "responsive": false
            },
            data: function (obj, callback) {
                page.ajaxGet({
                    url: '/menumanager/getMenusTree',
                    formData: {},
                    success: function (data) {
                        callback.call(this, page.formatJstree(data));
                    }
                });
            }
        },
        "types": {
            "default": {
                "draggable": false,
                "icon": "fa fa-folder icon-state-warning icon-lg"
            }
        },
        "plugins": ["types", "wholerow", "dnd"]
    }).on("load_node.jstree", function () {
        page.root.find('#menuTree').jstree("open_all");
    });

    page.root.find('#btnAddRoot').on('click', function () {
        page.root.goView('/pages/menumanager/menu-add.html', {"id": null});
    });

    page.root.find('#btnAdd').on('click', function () {
        var $jstree = page.root.find('#menuTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if (selected.length == 0) {
            page.warning("请选择节点进行添加");
            return;
        }

        page.root.goView('/pages/menumanager/menu-add.html', {"id": selected[0].id});
    });

    page.root.find('#btnEdit').on('click', function () {
        var $jstree = page.root.find('#menuTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if (selected.length == 0) {
            page.warning("请选择节点进行编辑");
            return;
        }

        page.root.goView('/pages/menumanager/menu-edit.html', {"id": selected[0].id});
    });

    page.root.find('#btnDel').on('click', function () {
        var $jstree = page.root.find('#menuTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if (selected.length == 0) {
            page.warning("请选择节点进行删除");
            return;
        }


        $.confirm({
            title: false,
            content: '确定删除？',
            confirm: function(){
                page.ajaxPost({
                    url: '/menumanager/deleteMenuById',
                    formData: {"id": selected[0].id},
                    success: function (data) {
                        page.success("delete-success");
                        $jstree.delete_node(selected[0]);
                    }
                });
            },
            cancel: function(){
            },
            confirmButton: '确定',
            cancelButton: '撤销',
            onOpen: function(){
            }
        });


    });


    page.root.find('#btnAssign').on('click', function () {
        var $jstree = page.root.find('#menuTree').jstree(true);
        var selected = $jstree.get_selected(true);

        if (selected.length == 0) {
            page.warning("请选择节点进行Assign");
            return;
        }

        page.root.goView('/pages/menumanager/menu-assign.html', {"id": selected[0].id});
    });
});