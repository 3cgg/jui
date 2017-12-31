/**
 * Created by J on 2017/11/10.
 */
$(function () {
    page = $.extend({
        root: $("#codetableDemoSection"),
        model: {}
    }, $_youapp.pageTemplate);

    page.root.find('#codeTableDemoBtn').on('click', function () {
        $_youapp.$_codeTable.draw($('.codetable'));
    });


});
