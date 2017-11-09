/**
 * 克隆元素，重命名id,name
 * @param id 元素id
 */
function renameClone(id) {
    var o = $("#" + id).clone();
    $(o).find("input,select,textarea,a,button").each(function () {
        rename(this);
    })
    rename(o);
    return o;
}
/**
 * 重命名元素的id,name
 * @param o 元素对象
 */
function rename(o) {
    var i = $(o).attr("id");
    var n = $(o).attr("name");
    var i_=i;
    if (i != undefined && i != "") {
        var len = 0;
        console.log(i.substr(i.length - 1));
        if (isNum(i.substr(i.length - 1))) {
            while (true) {
                if ($("#" + i.substr(0, i.length - 1) + len).length < 1) {
                    i = i.substr(0, i.length - 1) + len;
                    $(o).attr("id",i);
                    break;
                }
                len++;
            }
        } else {
            while (true) {
                if ($("#" + i + len).length < 1) {
                    i = i + len;
                    $(o).attr("id",i);
                    break;
                }
                len++;
            }
        }
    }
    if(i!=i_){
        $(o).find("a,button").each(function(){
            if($(this).attr("onclick").indexOf(i_)!=-1){
                $(this).attr("onclick",$(this).attr("onclick").replace(i_,i));
            }
        });
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
                    $(o).attr("name",n);
                    break;
                }
                len++;
            }
        }
    }
}
function isNum(s){
    var reg = /^[0-9]+.?[0-9]*$/;
    if (s.match(reg)) {
        return true;
    }
    return false;
}