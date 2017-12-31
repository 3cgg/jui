/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function() {

    var page=$.extend({
        root:$("#page-header"),
        model:{
        }
    },$_youapp.pageTemplate);

    page.root.find('#close-sidebar').on('click',function(){
        $('#page-sidebar').toggle('slow',function(){
            if($(this).is(':hidden')){
                $('#page-content').addClass('move-to-left');
            }
            else{
                $('#page-content').removeClass('move-to-left');
            }
        });
    });

    page.root.find('#search-btn.popover-button').popover({
        html:true,
        animation:true,
        content:function(){
            var $dom=$(page.root.find($(this).data('id')).html());
            var $a=$dom.find('a');
            $a.attr('id','_global_search');
            $(document).on('click','a#_global_search',function(){
                page.info('search '+$(this).parent().parent().children('input').val()+ ' ...');
            })
            return $dom.html();
        }
    });

});
