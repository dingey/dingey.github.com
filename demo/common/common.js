/**
 * 克隆元素，重命名id,name
 * @param id 元素id
 */
function renameClone(id) {
    var o = $("#" + id).clone();
    $(o).find("input,select,textarea").each(function () {
        rename(this);
    })
    return o;
}
/**
 * 重命名元素的id,name
 * @param o 元素对象
 */
function rename(o) {
    var i = $(o).attr("id");
    var n = $(o).attr("name");
    if (i != undefined && i != "") {
        var len = 0;
        if (isNaN(i.substr(i.length - 1))) {
            while (true) {
                if ($("#" + i.substr(0, i.length - 1) + len).length < 1) {
                    i = i.substr(0, i.length - 1) + len;
                    break;
                }
                len++;
            }
        } else {
            while (true) {
                if ($("#" + i + len).length < 1) {
                    i = i + len;
                    break;
                }
                len++;
            }
        }
    }
    if (n != undefined && n != "") {
        var re = /[A-Za-z]\[\d\]/;
        var len = 0;
        if (n.match(re)) {
            var prefix = n.substr(0, n.indexOf("[") + 1);
            var surfix = n.substr(n.indexOf("]"));
            while (true) {
                if ($("[name='" + prefix + len + surfix + "']").length < 1) {
                    n = prefix + len + surfix;
                    break;
                }
                len++;
            }
        }
    }
}