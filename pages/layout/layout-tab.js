/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function() {

    var page = $.extend({
        root: $("#layoutTab"),
        model: {}
    }, $_youapp.pageTemplate);

    $_youapp.$tabs = {};
    $_youapp.$tabs.layoutTab = $('#layoutTab').tabulous({
        effect: 'scaleUp'
    });

    $menu = page.root.find('#tabContainer');

    function setHeight() {
        var windowHeight = $(window).height();
        var menuHeight = $menu.offset().top;
        page.log('window-height: ' + windowHeight);
        page.log('menu-height: ' + menuHeight);
        var height = windowHeight - menuHeight;
        $menu.css({
            'height': height + 'px',
            'overflow-y': 'auto'
        });
        page.log(height)
    }

    setTimeout(setHeight, 150);

    $(window).resize(function () {
        setTimeout(setHeight, 150);
    });

    $('#tabContainer').scroll(function () {




    });


});
