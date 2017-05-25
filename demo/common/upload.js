/*
 上传图片
 url:图片地址
 fileInputId:文件所在框
 valueSetId:返回地址赋值框
 previewId: 预览元素ID
 */
function uploadImg(url,fileInputId, valueSetId, previewId) {
    if ($('#' + fileInputId).val() == "") {
        alert("请选择图片后再点击上传");
        return;
    }
    var formData = new FormData();
    formData.append('img', $('#' + fileInputId)[0].files[0]);
    var index = layer.load(1, {shade: [0.1,'#fff'] });
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        dataType: "html"
    }).done(function (data) {
        $("#" + valueSetId).val(data);
        $("#" + previewId).attr('src',data);
        parent.layer.close(index);
    }).fail(function () {
        alert("保存失败，服务器出错，或网络异常。");
        parent.layer.close(index);
    });
}
/**
 * summernote配合图片上传
 * @param uri
 * @param file
 * @param el
 */
function sendFile(url,file, el) {
    var formData = new FormData();
    formData.append("img", file);
    var fileData = URL.createObjectURL(file);
    $(el).summernote('insertImage', fileData, function ($image) {
        $.ajax({
            url: url,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "text",
            type: 'POST',
            success: function (url) {
                if (url == "") {
                    $image.attr('src', "");
                } else {
                    $image.attr('src', url);
                }
            }
        });
    });
}