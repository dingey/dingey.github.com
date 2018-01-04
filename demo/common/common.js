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
//保留两位小数的JS
$(function(){
    $(".float2").keyup(function () {
        var v = $(this).val();
        if(v==""||v=="-"){
            return false;
        }else {
            v=v.replace(/\s/g, "").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        }
        if(v.split(".").length>2){
            v=v.split(".")[0]+"."+v.split(".")[1];
        }
        if(!v.endsWith(".")){
            v=Math.round(v*100)/100;
        }
        $(this).val(v);
    });
    $(".int").keyup(function(){
        var v = $(this).val();
        v=v.replace(/[^\-\d]/g,'');
        if(v.indexOf('-')>=0){
            v='-'+v.replace(/-/g,'');
        }
        $(this).val(v);
    });
})
// 通用JS校验
function valid() {
    var a = true;
    var msg = "";
    $("input,select,textarea").not(':disabled').each(function () {
        if ($(this).attr("minlength") != undefined && $(this).attr("minlength") != "") {
            var len = parseInt($(this).attr("minlength"));
            if ($(this).val().length < len) {
                a = false;
                var m = $(this).attr("minlength-msg");
                if (m == undefined && $(this).parent().prev().prop("tagName") == "LABEL") {
                    m = $(this).parent().prev().html().replace("：", "").replace(":", "") + "不能小于" + len + "个字符";
                }
                if (msg.indexOf(m) == -1) {
                    msg += m + "、";
                }
            }
        } else if ($(this).attr("required") == true || $(this).attr("required") != undefined) {
            //单选,多选
            if ($(this).attr("type") == "radio" && $(this).attr("required") != undefined && $(this).attr("name") != undefined) {
                if ($("input[type=radio][name='" + $(this).attr("name") + "']:checked").val() == undefined) {
                    a = false;
                    var m = $(this).attr("required-msg");
                    if (m == undefined && $(this).parent().parent().prev().prop("tagName") == "LABEL") {
                        m = $(this).parent().parent().parent().find("label:eq(0)").html().replace("：", "").replace(":", "") + "不能为空";
                    }
                    if (msg.indexOf(m) == -1) {
                        msg += m + "、";
                    }
                }
            } else if ($(this).attr("type") == "checkbox" && $(this).attr("required") != undefined && $(this).attr("name") != undefined) {
                if ($("input[type=checkbox][name='" + $(this).attr("name") + "']:checked").val() == undefined) {
                    a = false;
                    var m = $(this).attr("required-msg");
                    if (m == undefined && $(this).parent().parent().prev().prop("tagName") == "LABEL") {
                        m = $(this).parent().parent().parent().find("label:eq(0)").html().replace("：", "").replace(":", "") + "不能为空";
                    }
                    if (msg.indexOf(m) == -1) {
                        msg += m + "、";
                    }
                }
            } else if ($(this).val() == "") {
                a = false;
                var m = $(this).attr("required-msg");
                if (m == undefined && $(this).parent().prev().prop("tagName") == "LABEL") {
                    m = $(this).parent().prev().html().replace("：", "").replace(":", "") + "不能为空";
                }
                if (msg.indexOf(m) == -1) {
                    msg += m + "、";
                }
            }
        }
        //large-id:元素选择器;large-msg:验证消息
        if ($(this).attr("large-id") != undefined && $(this).attr("large-id") != "") {
            var lid = $(this).attr("large-id");
            if (lid.indexOf(",") > 0) {
                var strs = new Array();
                strs = lid.split(",");
                var msgs = new Array();
                msgs = $(this).attr("large-msg").split(",");
                for (var i = 0; i < strs.length; i++) {
                    if ($(this).val() < $(strs[i]).val()) {
                        a = false;
                        msg += msgs[i] + ",";
                    }
                }
            } else {
                if ($(this).val() < $(lid).val()) {
                    a = false;
                    msg += $(this).attr("large-msg") + "、";
                }
            }
        }
        //less-id:元素选择器;less-msg:验证消息
        if ($(this).attr("less-id") != undefined && $(this).attr("less-id") != "") {
            var lid = $(this).attr("less-id");
            if (lid.indexOf(",") > 0) {
                var strs = new Array();
                strs = lid.split(",");
                var msgs = new Array();
                msgs = $(this).attr("less-msg").split(",");
                for (var i = 0; i < strs.length; i++) {
                    if ($(this).val() < $(strs[i]).val()) {
                        a = false;
                        msg += msgs[i] + "、";
                    }
                }
            } else {
                if ($(this).val() < $(lid).val()) {
                    a = false;
                    msg += $(this).attr("less-msg") + "、";
                }
            }
        }
        //大于指定值
        if ($(this).attr("large-val") != undefined && $(this).attr("large-val") != "") {
            if ($(this).val() < $(this).attr("large-val")) {
                a = false;
                msg += $(this).attr("large-val-msg") + "、";
            }
        }
        //小于指定值
        if ($(this).attr("less-val") != undefined && $(this).attr("less-val") != "") {
            if ($(this).val() < $(this).attr("less-val")) {
                a = false;
                msg += $(this).attr("less-val-msg") + "、";
            }
        }
    });
    if(!a){
        layer.msg(msg);
    }
    return a;
}
//通用校验帮助文本
function validHelp(dom) {
    if ($(dom).attr("minlength") != undefined && $(dom).attr("minlength") != "") {
        var len = parseInt($(dom).attr("minlength"));
        if ($(dom).val().length < len && !$(dom).next().hasClass("help-block")) {
            var h = "<span class='help-block'>不能小于" + len + "个字符</span>";
            $(dom).parent().addClass("has-error").append(h);
        } else if ($(dom).val().length >= len && $(dom).parent().hasClass("has-error")) {
            $(dom).parent().removeClass("has-error").find("span.help-block").remove();
        }
    } else if ($(dom).attr("required") != undefined) {
        if (!$(dom).parent().hasClass("has-error") && $(dom).val() == "") {
            var h = "<span class='help-block'>不能为空</span>";
            $(dom).parent().addClass("has-error").append(h);
        } else if ($(dom).parent().hasClass("has-error")) {
            $(dom).parent().removeClass("has-error").find("span.help-block").remove();
        } else if ($(dom).attr("type") == "radio" && $(dom).attr("name") != "") {
            if ($("input[type=radio][name='" + $(dom).attr("name") + "']:checked").val() == undefined) {
                if ($(dom).parent().parent().find("span.help-block").length < 1) {
                    var h = "<span class='help-block'>必须选择一个</span>";
                    $(dom).parent().parent().addClass("has-error").append(h);
                }
            } else {
                $(dom).parent().parent().removeClass("has-error").find("span.help-block").remove();
            }
        } else if ($(dom).attr("type") == "checkbox" && $(dom).attr("name") != "") {
            if ($("input[type=checkbox][name='" + $(dom).attr("name") + "']:checked").val() == undefined) {
                if ($(dom).parent().parent().find("span.help-block").length < 1) {
                    var h = "<span class='help-block'>必须选择一个</span>";
                    $(dom).parent().parent().addClass("has-error").append(h);
                }
            } else {
                $(dom).parent().parent().removeClass("has-error").find("span.help-block").remove();
            }
        }
    }
}
//$(function () {
//    $("input,textarea").not(':disabled').each(function () {
//        validHelp(this);
//    }).change(function () {
//        validHelp(this);
//    });
//});