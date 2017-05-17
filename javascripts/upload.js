/*
 上传图片
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
    }).fail(function () {
        alert("保存失败，服务器出错，或网络异常。");
    });
}