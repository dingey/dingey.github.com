//时间日期
$(function () {
    initData();
});

function initData() {
    $('[datetime]').datetimepicker({
        showTodayButton: true,
        showClear: true,
        locale: 'zh_CN',
        format: 'YYYY-MM-DD HH:mm:ss'
    });
    $('[date]').datetimepicker({
        showTodayButton: true,
        showClear: true,
        locale: 'zh_CN',
        format: 'YYYY-MM-DD'
    });
    $('[time]').datetimepicker({
        showTodayButton: true,
        showClear: true,
        locale: 'zh_CN',
        format: 'HH:mm:ss'
    });
}

//左边元素拖拽到右边
var copyObj;//克隆对象
$(function () {
    rightSort();
    dragRight();
})

//左边元素拖拽到右边
function dragRight() {
    //移除
    $("#left>div.form-group,#left>div.form-group>label,#left>div.form-group>div,#left>div.form-group>span,#left>div.form-group>a.btn").draggable({
        revert: true, start: function () {
            copyObj = $(this);
            debug("左边元素拖拽到右边拖动开始");
        }, stop: function () {
            copyObj = null
            debug("左边元素拖拽到右边拖动停止");
        }
    });
    //右边表单复制移动的元素
    $("#fc>form>div.form-group").droppable({
        drop: function () {
            debug("有元素拖入");
            var o = $(copyObj).clone();
            $(o).removeAttr("style").removeClass("ui-draggable-handle").removeClass("ui-draggable");
            if ($(o).hasClass("form-group")) {
                $(this).after(o);
            } else {
                $(this).append(o);
            }
            rightSort();
            hoverBorder();
            popover();
            initData();
        }
    });
}

//左边双击到右边
$(function () {
    $("#left>div").dblclick(function () {
        var o = $(this).clone().removeClass("border");
        $("#fc>form").append(o);
        rightSort();
        hoverBorder();
        popover();
        dragRight();
        initData();
    });
});

//右边排序
function rightSort() {
    $("#fc>form").sortable();//表单行排序
    $("#fc>form>div.form-group").sortable();//表单行内元素排序
}

var formElement = "#fc>form>div.form-group>div,#fc>form>div.form-group>label,#fc>form>div.form-group>span,#fc>form>div.form-group>a.btn,#fc>form>div.form-group>button";
//鼠标移入边框
$(function () {
    hoverBorder();
})

//鼠标移入边框
function hoverBorder() {
    //row
    $("#left>div,#fc>form>div.form-group").hover(function () {
        $(this).addClass("border");
    }, function () {
        $(this).removeClass("border");
    });
    //row element
    $(formElement).hover(function () {
        $(this).parent().removeClass("border");
        $(this).addClass("border");
    }, function () {
        $(this).removeClass("border");
    });
}

//元素弹出
$(function () {
    popover();
})

//右边弹出
function popover() {
    $(formElement).click(function () {
        var htm = "";
        $(formElement).popover('destroy');
        if ($(this).prop("nodeName") == "LABEL" || $(this).prop("nodeName") == "SPAN" || $(this).prop("nodeName") == "A" || $(this).prop("nodeName") == "BUTTON") {
            var v = $(this).text().trim();
            htm = "标签名<input id='pop-value' type='text' class='form-control' value='" + v + "'>";
        } else if ($(this).find("input[type=text],input[type=password],textarea").length > 0) {
            var v = $(this).find("input[type=text],input[type=password],textarea").attr("placeholder");
            v = v == undefined ? "" : v;
            htm = "占位符<input id='pop-value' type='text' class='form-control' value='" + v + "'>";
        } else if ($(this).find("p").length > 0) {
            var v = $(this).text().trim();
            htm = "标签名<input id='pop-value' type='text' class='form-control' value='" + v + "'>";
        } else if ($(this).find("[type=checkbox]").length > 0 || $(this).find("[type=radio]").length > 0) {
            var v = "";
            $(this).find("label").each(function () {
                v += $(this).text().replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "") + "\r\n";
            });
            v = v.substring(0, v.lastIndexOf("\r\n"));
            htm = "可选值<textarea id='pop-value' type='text' class='form-control'>" + v + "</textarea>";
        } else if ($(this).find("select").length > 0) {
            var v = "";
            $(this).find("option").each(function () {
                v += $(this).text().replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "") + "\r\n";
            });
            v = v.substring(0, v.lastIndexOf("\r\n"));
            htm = "可选值<textarea id='pop-value' type='text' class='form-control'>" + v + "</textarea>";
        }
        if ($(this).find(".input-group-addon").length > 0) {
            $(this).find(".input-group-addon").each(function () {
                htm += "附加<input addon type='text' class='form-control' value='" + $(this).text() + "'>";
            });
        }
        if ($(this).find("input[type=text]").length > 0) {
            htm += "文本类型<select class='form-control input-sm' id='type-value'>";
            htm += "<option value='text'>文本</option>" +
                "<option value='int'>整数</option>" +
                "<option value='uint'>正整数</option>" +
                "<option value='float'>小数</option>" +
                "<option value='ufloat'>正小数</option>" +
                "<option value='datetime'>日期时间</option>" +
                "<option value='date'>日期</option>" +
                "<option value='time'>时间</option>";
            htm += "</select>";
        }
        if ($(this).prop("nodeName") == "A" || $(this).prop("nodeName") == "BUTTON") {
            htm += "按钮类型<select class='form-control input-sm' id='btn-value'>";
            htm += "<option value='btn btn-default'>默认</option>" +
                "<option value='btn btn-primary'>首选</option>" +
                "<option value='btn btn-success'>成功</option>" +
                "<option value='btn btn-info'>一般信息</option>" +
                "<option value='btn btn-warning'>警告</option>" +
                "<option value='btn btn-danger'>危险</option>" +
                "<option value='btn btn-link'>链接</option>";
            htm += "</select>";
        }
        if ($(this).attr("class").indexOf("col-") != -1) {
            htm += "宽度<select class='form-control input-sm' id='col-value'>";
            for (var i = 1; i <= 12; i++) {
                htm += "<option value='" + i + "'";
                if (i == colnum($(this).attr("class"))) {
                    htm += " selected ";
                }
                htm += ">" + i + "</option>";
            }
            htm += "</select>";
            htm += "偏移<select class='form-control input-sm' id='off-value'><option value=''>无</option>";
            for (var i = 1; i <= 6; i++) {
                htm += "<option value='" + i + "'";
                if (i == colnum($(this).attr("class"), "offset")) {
                    htm += " selected ";
                }
                htm += ">" + i + "</option>";
            }
            htm += "</select>";
        }
        htm += "<a class='btn btn-default btn-sm' onclick='savepop()'>保存</a>";
        htm += "<a class='btn btn-default btn-sm' onclick='delpopover()'>删除</a>";
        $(this).popover({
            container: 'body',
            placement: 'bottom',
            content: htm,
            html: true,
            trigger: 'click'
        });
    });
}

//保存弹出数据
function savepop() {
    $("[data-original-title]").each(function () {
        var a = $(this);
        debug("savepop:" + $(a).html());
        debug("savepop:" + $(a).prop("aria-describedby"));
        if ($(a).attr("aria-describedby") == undefined) {
            a = $(this).parent();
        }
        if ($(a).attr("aria-describedby") != undefined && $(a).attr("aria-describedby") != "") {
            var pop_val = $("#pop-value").val();
            var col_val = $("#col-value").val();
            var btn_val = $("#btn-value").val();
            if ($(a).prop("nodeName") == "LABEL" || $(this).prop("nodeName") == "SPAN" || $(this).prop("nodeName") == "A" || $(this).prop("nodeName") == "BUTTON") {
                $(a).text(pop_val);
            } else if ($(a).find("input[type=text],input[type=password],textarea").length > 0) {
                $(a).find("input[type=text],input[type=password],textarea").attr("placeholder", pop_val);
            } else if ($(a).find("p").length > 0) {
                $(a).find("p").html(pop_val);
            } else if ($(a).find("[type=checkbox]").length > 0) {
                v = pop_val.split(/[\s\n]/);
                debug("checkbox:" + v.length);
                $(a).empty();
                for (var i = 0; i < v.length; i++) {
                    $(a).append("<label class='checkbox-inline'><input type='checkbox' name='checkbox' value='" + v[i] + "'>" + v[i] + "</label>");
                }
            } else if ($(a).find("[type=radio]").length > 0) {
                v = $("#pop-value").val().split(/[\s\n]/);
                debug("radio:" + v.length);
                $(a).empty();
                for (var i = 0; i < v.length; i++) {
                    $(a).append("<label class='radio-inline'><input type='radio' name='radio' value='" + v[i] + "'>" + v[i] + "</label>");
                }
            } else if ($(a).find("select").length > 0) {
                v = $("#pop-value").val().split(/[\s\n]/);
                debug("radio:" + v.length);
                $(a).find("select").empty();
                for (var i = 0; i < v.length; i++) {
                    $(a).find("select").append("<option>" + v[i] + "</option>");
                }
            }
            if ($(a).find(".input-group-addon").length > 0) {
                $("[addon]").each(function (index) {
                    debug("addon1");
                    var txt = $(this).val();
                    $(a).find(".input-group-addon").eq(index).html(txt);
                    debug("addon2");
                });
            }
            if ($(a).prop("nodeName") == "A" || $(this).prop("nodeName") == "BUTTON") {
                $(a).attr("class", btn_val);
            }
            if ($(a).attr("class").indexOf("col-") != -1 && col_val != undefined) {
                var cs = $(this).attr("class").split(" ");
                var cv = "";
                for (var i = 0; i < cs.length; i++) {
                    if (cs[i].indexOf("col-") != -1 && cs[i].indexOf("offset") == -1) {
                        cv = cs[i];
                        break;
                    }
                }
                if (cv != "") {
                    $(a).removeClass(cv);
                    cv = cv.substr(0, cv.lastIndexOf("-")) + "-" + col_val;
                    $(a).addClass(cv);
                }
            }
            if ($(a).attr("class").indexOf("col-") != -1) {
                var cs = $(this).attr("class").split(" ");
                var cv = "";
                for (var i = 0; i < cs.length; i++) {
                    if (cs[i].indexOf("offset-") != -1) {
                        cv = cs[i];
                        break;
                    }
                }
                if (cv != "" && $("#off-value").val() != "") {
                    $(a).removeClass(cv);
                    cv = cv.substr(0, cv.lastIndexOf("-")) + "-" + $("#off-value").val();
                    $(a).addClass(cv);
                } else if ($("#off-value").val() != "") {
                    $(a).addClass("col-sm-offset-" + $("#off-value").val());
                } else if ($("#off-value").val() == "") {
                    $(a).removeClass(cv);
                }
            }
            $("div.popover").remove();
            return;
        }
    }).attr("aria-describedby", "");
    $("div.popover").remove();
}

//获取class里的列宽
function colnum(classStr, cname) {
    if (cname == undefined) {
        cname = "col-";
    }
    if (classStr.indexOf("col-") != -1) {
        var cs = classStr.split(" ");
        var cv = "1";
        for (var i = 0; i < cs.length; i++) {
            if (cs[i].indexOf(cname) != -1) {
                cv = cs[i];
                cv = cv.substr(cv.lastIndexOf("-") + 1);
                debug(cv);
                return parseInt(cv);
            }
        }
    } else {
        return 1;
    }
}

function debug(str) {
    console.log(str);
}

//删除弹出
function delpopover() {
    $("[data-original-title]").each(function () {
        debug("delpopover:" + $(this).prop("aria-describedby"));
        if ($(this).attr("aria-describedby") != "" && $(this).attr("aria-describedby") != undefined) {
            if ($(this).siblings().length == 0) {
                $(this).parent().remove();
            } else {
                $(this).remove();
            }
            $("div.popover").remove();
            return;
        }
    });
    $("div.popover").remove();
}

function clear(dom) {
    $(dom).removeClass("ui-sortable").find("div,label,span,a").removeClass("ui-draggable").removeClass("ui-draggable-handle").removeClass("ui-sortable").removeClass("ui-droppable").removeClass("ui-draggable").removeClass("ui-sortable-handle").removeClass("ui-draggable-dragging").removeAttr("style").removeAttr("data-original-title").removeAttr("aria-describedby").removeAttr("title");
}

$(function () {
    $("[adjust]").click(function () {
        if ($("body>div").hasClass("container-fluid")) {
            $("body>div").removeClass("container-fluid").addClass("container");
        } else {
            $("body>div").removeClass("container").addClass("container-fluid");
        }
    });
    $("[clear]").click(function () {
        $("#fc>form").empty();
    });
    $("[higher]").click(function () {
        var pad = $("#fc > form > div.form-group").css("padding-bottom");
        debug(pad);
        pad = parseInt(pad);
        pad += 15;
        $("#fc > form > div.form-group").css("padding-bottom", pad + "px");
    });
    $("[lower]").click(function () {
        var pad = $("#fc > form > div.form-group").css("padding-bottom");
        debug(pad);
        pad = parseInt(pad);
        pad -= 15;
        $("#fc > form > div.form-group").css("padding-bottom", pad + "px");
    });
    $("[source]").click(function () {
        $(".modal").remove();
        var a = $("#fc").clone().removeClass("ui-sortable");
        $(a).find("form").removeClass("ui-sortable");
        clear(a);
        $("body").append("<div class='modal fade'><div class='modal-dialog modal-lg'><div class='modal-content'><div class='modal-header'>源码</div> <div class='modal-body'><textarea style='min-height: 640px;' class='form-control' id='textarea'></textarea></div></div></div></div>");
        $("#textarea").val($(a).html());
        $('.modal').modal('show');
    });
    $("[preview]").click(function () {
        $(".modal").remove();
        var a = $("#fc").clone().removeClass("ui-sortable");
        clear(a);
        $("body").append("<div class='modal fade'><div class='modal-dialog modal-lg'><div class='modal-content'><div class='modal-header'>预览</div> <div class='modal-body'>" + $(a).html() + "</div></div></div></div>");
        initData();
        $('.modal').modal('show');
    });
    $("[download]").click(function () {
        var html = $("html").clone();
        $(html).find("body").removeAttr("style");
        var a = $("#fc").clone().removeClass("ui-sortable");
        $(a).find("form").removeClass("ui-sortable");
        clear(a);
        $(html).find("div.container,div.container-fluid").empty().append($(a).html()).before("<br>\n");
        $(html).find("[hide]").remove();
        $(html).find("body").append("<script>\n$(function(){\n    $('[datetime]').datetimepicker({\n" +
            "        showTodayButton: true,\n" +
            "        showClear: true,\n" +
            "        locale: 'zh_CN',\n" +
            "        format: 'YYYY-MM-DD HH:mm:ss'\n" +
            "    });\n" +
            "    $('[date]').datetimepicker({\n" +
            "        showTodayButton: true,\n" +
            "        showClear: true,\n" +
            "        locale: 'zh_CN',\n" +
            "        format: 'YYYY-MM-DD'\n" +
            "    });\n" +
            "    $('[time]').datetimepicker({\n" +
            "        showTodayButton: true,\n" +
            "        showClear: true,\n" +
            "        locale: 'zh_CN',\n" +
            "        format: 'HH:mm:ss'\n" +
            "    });\n})\n</script>\n");
        html = "<html>\n" + $(html).html() + "\n</html>";
        var eleLink = document.createElement('a');
        eleLink.download = "build.html";
        eleLink.style.display = 'none';
        var blob = new Blob([html], {type: 'text/html;charset=utf-8;'});
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
    });
})
