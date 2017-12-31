/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function() {

    var page=$.extend({
        root:$("#page-sidebar"),
        model:{
        }
    },$_youapp.pageTemplate);

    function getMenuNode(_name){
        var $menuNode=page.root.find('#_template_treeview > #_template_treeview_menu>ul>li ').clone(false);
        var $menuNodeLink=$menuNode.find('a');
        $menuNodeLink.find('i:first').next('span').text(_name);
        return $menuNode;
    }

    function appendMenu(parent,child){
        $(parent).find('.sidebar-submenu').first().children('ul').append($(child));
    }

    function getMenuItem(data){
        var $menuItem=page.root.find('#_template_treeview > #_template_treeview_item> ul>li ').clone(false);
        var $menuItemLink=$menuItem.find('a');
        $menuItemLink.val('href','javascript:void(0)');
        $menuItemLink.data('url',data.url);
        $menuItemLink.data('urldata','');
        $menuItemLink.data('tabid','layoutTab');
        $menuItemLink.data('tabmenuid',data.code+'_'+data.id);
        $menuItemLink.data('tabmenutitle',data.name);
        $menuItemLink.text(data.name);
        $menuItemLink.attr('id',data.id);
        return $menuItem;
    }

    var $sideBar=page.root.find('#sidebar-menu');

    function cycle(eles,opts,menus,parent){
        for(var i=0;i<eles.length;i++){
            var _data=eles[i];
            var child;
            if(_data.children.length>0){  // menu node
                child=getMenuNode(_data.data.name);
            }
            else{
                child=getMenuItem(_data.data);
            }
            if(parent){
                appendMenu(parent, child);
            }

            if(_data.meta.level==1){
                menus.push(child);
            }
            if(_data.children.length>0){  // menu node
                cycle(_data.children,opts,menus,child);
            }
        }
    }

    page.ajaxGet({
        url:'/menumanager/getMenusTree',
        formData:{
        },
        success:function(data){
            try{
                var menus=[];
                cycle(data, {},menus);
                for(var i=0;i<menus.length;i++){
                    var menu=menus[i];
                    $sideBar.find('#_document_start').before(menu);
                }
            }catch (e) {
                page.warning(e);
            }
            $sideBar.find('a[data-url]').on('click',function(event){
                $_youapp.$_html.newTab($(event.target));
                $(this).closest('li').addClass('active');
            });
        }
    });

    $(document).on('click','.sf-with-ul',function(){
        $(this).next().toggle(600);
    });

    var $menu=page.root;
    $menu.css({
        'overflow-y':'auto'
    });
    $menu.hover(function(){
        $menu.css({
            'overflow-y':'auto'
        });
    },function(){
        $menu.css({
            'overflow-y':'hidden'
        });
        // $menu.find('.treeview').width($menu.innerWidth());
    });

    function setHeight(){
        var windowHeight=$(window).height();
        var menuHeight=$menu.position().top;
        page.log('window-height: '+windowHeight);
        page.log('menu-height: '+menuHeight);
        var height=windowHeight-menuHeight;
        $menu.css({
            'height':height+'px'
        });
        page.log(height)
    }
    setHeight();

    $(window).resize(function(){
        setTimeout(setHeight,150);
    });

    $(window).scroll(function(){
        //setTimeout(setHeight(),2000);
    });


    //
    page.root.on('show.bs.collapse',function(){
        page.info('aside show...');
    });
    page.root.on('hide.bs.collapse',function(){
        page.info('aside hide...');
    })
})
