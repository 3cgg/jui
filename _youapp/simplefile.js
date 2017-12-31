/**
 *{
  id : '' // unique identification , default as div ($fsc) 's id attribute
  $fsc : '' // file select container
  $fc : '' // file form container , this can be empty , if it is empty , the real file selector can not be shown in the DOM
  added : fn(data,{ opt: {} , others...}) //
  removed : fn({ opt: {} , others...}) //
  types : [] // file type , such as txt, jpg , jpeg
  edit : {  // the internal property for showDefaultImg method

  }
}
 */
function fileAttach(opt) {

    function fileUploadTemplate() {
        return '<div class="col-sm-12 col-lg-12" style="padding-left: 0px;">'
            + '<div class="input-group" name="inputGroup">'
            + '<input name="nameShownInput" readOnly type="text" class="form-control input-sm" placeholder="" />'
            + '<span class="input-group-btn">'
            + '<button class="btn btn-primary btn-sm" type="button" name="browserBtn" style="margin: 0px;" >'
            + '<i class="fa"></i> 浏览'
            + '</button>'
            + '<button class="btn btn-primary btn-sm" type="button" name="uploadBtn" style="margin: 0px;" >'
            + '<i class="fa"></i> 上传'
            + '</button>'
            + '</span>'
            + '</div>'
            + '<span name="msg" style="color:red;" ></span>'
            + '</div>';
    }

    function acceptTypes() {
        return obj.opt.types.join(',');
    }

    function fileForm() {
        var fileForm = '<form enctype="multipart/form-data" role="form" id="' + obj.formId + '" class="form-horizontal" >'
            + '<input type="file" name="file"  id="' + obj.fileId + '" accept="' + acceptTypes() + '" />'
            + '</form>';
        return fileForm;
    }

    function fileInput() {
        return obj.$fform.find('#' + obj.fileId);
    }

    function msg(message) {
        $root.find('span[name="msg"]').text(message);
    }


    if (!opt.$fsc) {
        throw new Error(' property "$fsc" [file selcect container] missing.');
    }


    var $root = $(fileUploadTemplate());
    var $b = $root.find('[name="browserBtn"]');
    var $u = $root.find('[name="uploadBtn"]');
    var $t = $root.find('[name="nameShownInput"]');
    var $fc = $(opt.$fc);  // then put the real file selector in the container if provided one.
    // if (!$fc) {
    //     $fc = $('<div></div>');
    //     $('body').append($fc);
    // }
    var $fsc = opt.$fsc;
    $fsc.append($root);


    var id = new Date().getTime();
    var obj = {};
    obj.$b = $b;
    obj.$u = $u;
    obj.$t = $t;
    obj.$fc = $fc;  // file container
    obj.opt = opt;
    obj.opt.id = $fsc.attr('id') == undefined ? id : $fsc.attr('id');
    var $fform = $(fileForm());
    obj.$fform = $fform;
    obj.$root = $root;

    // only put file selector into the file container
    $fc.append($fform);

    formData($b, obj);
    formData($u, obj);
    formData(fileInput(), obj);

    function formData($e, formData) {
        if (formData) {
            $e.data('refform', obj);
        } else {
            return $e.data('refform');
        }
    }

    // initial
    $u.attr("disabled", true);

    // processing ...............start here

    function showDefaultImg(_data) {
        var data;
        if (_data) {
            var edit = data = obj.opt.edit = {};
            edit.id = data.id = _data.id;
            edit.uri = data.uri = _data.uri;
        } else {
            data = {};
            data.id = obj.opt.edit.id;
            data.uri = obj.opt.edit.uri;
        }

        showImg(data);
        obj.$fform[0].reset();
        setFileName();
        $(obj.$b).attr("disabled", false);
        obj.$root.find('[name="inputGroup"]').hide();

        if (obj.$root.find('[name="resetBtn"]').length == 0) {
            var $btnGroup = obj.$root.find('[name="inputGroup"] .input-group-btn');
            var $resetBtn = $('<button class="btn btn-primary btn-sm" type="button" name="resetBtn" style="margin: 0px;" >'
                + '<i class="fa"></i> 重置'
                + '</button>');
            $btnGroup.append($resetBtn);
            $resetBtn.on('click', function () {
                showDefaultImg();
            });
        }

    }


    function showImg(data) {

        $root.find('img').parent().remove();

        var $div = $('<div> '
            + '<img style="width:120px;height:120px;" src="' + data.uri + '" />'
            + '<a href="javascript:void(0);">delete</a>'
            + '</div>');

        $root.append($div);
        $div.find('a').on('click', function (e) {  // remove action
            if (obj.opt.removed) {
                obj.opt.removed(data, obj);
            }
            $div.remove();
            obj.$fform[0].reset();
            setFileName();
            obj.$root.find('[name="inputGroup"]').show();
            $(obj.$b).attr("disabled", false);
        });

        var added = obj.opt.added;
        if (added) {
            added(data, obj);
        }
    }

    function setFileName(file) {
        if (file) {
            $(obj.$t).val(file.name);
        } else {
            $(obj.$t).val('');
        }
    }

    function accept(file) {
        var type = file.type;
        var types = obj.opt.types;
        if (types) {
            return types.includes(type);
        }
        return true;
    }


    fileInput().on('change', function (e) {
        //var obj=formData($(e.target));

        if (e.target.files.length > 0) {
            var file = e.target.files[0];
            if (accept(file)) {
                msg('');
                setFileName(file);
                $u.attr("disabled", false);
            }
            else {
                $u.attr("disabled", true);
                setFileName();
                msg('file type is invalid;' + acceptTypes());
            }
        } else {
            $u.attr("disabled", true);
            setFileName();
        }
    });

    $b.on('click', function (e) {
        fileInput().click();
    });

    $u.on('click', function (e) {
        $u.attr("disabled", true);
        $b.attr("disabled", true);

        var opts = {
            type: "POST",
            url: $_youapp.$_config.getDataEndpoint() + "/file/upload",
            dataType: 'json',
            success: function (data) {
                $_youapp.$_toast.success("操作成功!");
                var _data = data.data[0];
                showImg(_data);
            },
            failure: function (data) {
                alertTool.error(data);
            }
        }

        $fform.ajaxSubmit(opts);

    });

    return {

        /**
         * var data={
       * id :
       * uri :
       * };
         * @param data
         */
        resetImg: function (data) {
            showDefaultImg(data);
        },

        id: function () {
            return obj.opt.id;
        }


    }

}
