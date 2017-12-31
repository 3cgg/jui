/**
 * Created by J on 2017/11/10.
 */
$_youapp.ready(function () {

    var page = $.extend({
        root: $("#searchRuntimeUrlSection"),
        model: {}
    }, $_youapp.pageTemplate);

    function format(d) {
        // `d` is the original data object for the row
        var runtimeurlExtTableId = 'runtimeurlExtTable';
        var runtimeUrlMockExtFormId = 'runtimeUrlMockExtForm';
        var $extTableClone = page.root.find('#' + runtimeurlExtTableId).clone(false);
        $extTableClone.attr('id', runtimeurlExtTableId + "_" + d.id);
        var $mockForm = $extTableClone.find('#' + runtimeUrlMockExtFormId);
        $mockForm.attr('id', runtimeUrlMockExtFormId + "_" + d.id);
        var $mockCheckBox = $mockForm.find('input[type="checkbox"][name="mock"]')
        if (d.mockInfo.mock) {
            $mockCheckBox.attr('checked', 'true');
        }
        $extTableClone.css('display', 'inline-table');
        return $extTableClone;
    }

    page.listTable = $('#runtimeurlListTable').initDataTable({
        url: "/runtimeurl/getRuntimeUrlsByPage",
        urlDataFn: function () {
            return page.root.find("#searchRuntimeUrlForm").serializeObj();
        },
        lengthChange: false,
        checkbox: false,
        columns: [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": '',
                "width": "5%"
            },
            {
                "data": "id",
                "orderable": false,
                "width": "15%"
            },
            {
                "data": "url",
                "width": "10%"
            },
            {
                "data": "name",
                "width": "15%"
            },
            {
                "data": "containerUnique",
                "width": "15%"
            },
            {
                "data": "desc",
                "width": "30%"
            }

        ],
        callAfterDrawn: function (data, opts) {
            // Add event listener for opening and closing details
            page.root.find('#runtimeurlListTable tbody').off('click', 'td.details-control');
            page.root.find('#runtimeurlListTable tbody').on('click', 'td.details-control', function (event) {
                var $tr = $(this).closest('tr');
                var row = page.listTable.row($tr);

                if ($tr.hasClass('shown')) {
                    // This row is already open - close it
                    $tr.next('tr').toggleClass('hidden');
                    $tr.removeClass('shown');
                }
                else {
                    var runtimeurlExtTableId = 'runtimeurlExtTable' + "_" + row.data().id;
                    var $extTable = $tr.next('tr').find('#' + runtimeurlExtTableId);
                    if ($extTable.length > 0) {
                        $tr.next('tr').toggleClass('hidden');
                        $tr.addClass('shown');
                        event.stopPropagation();
                        return;
                    }
                    // Open this row
                    var $tableInfo = $(format(row.data()));
                    row.child($tableInfo).show();
                    //$tr.after($tableInfo);
                    $tr.addClass('shown');
                    var $chk = $tableInfo.find('input[type="checkbox"].minimal');
                    //check-box
                    //iCheck for checkbox and radio inputs
                    $chk.iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                    });

                    $chk.on('ifChecked', {rowData: row.data()}, function (event) {

                        $_youapp.$_data.ajaxGet({
                            url: '/runtimeurl/updateMockState',
                            formData: {
                                url: event.data.rowData.url,
                                mock: true
                            },
                            success: function (data) {
                                alert('mock-success : ' + data);
                            }
                        });

                    });

                    $chk.on('ifUnchecked', {rowData: row.data()}, function (event) {

                        $_youapp.$_data.ajaxGet({
                            url: '/runtimeurl/updateMockState',
                            formData: {
                                url: event.data.rowData.url,
                                mock: false
                            },
                            success: function (data) {
                                alert('unmock-success : ' + data);
                            }
                        });

                    });

                }
                event.stopPropagation();
            });
        }
    });

    page.root.find("#searchRuntimeUrlBtn").on("click", function () {
        page.listTable.ajax.reload();
    })

});
