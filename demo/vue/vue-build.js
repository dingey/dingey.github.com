//初始化vue组件
function initVue(id) {
    new Vue({
        el: id,
        data: function () {
            return {
                centerDialogVisible: false,
                form: {
                    name: '',
                    region: '',
                    tags: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    imageUrl: ''
                }
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    })
}

//初始化左边控件区
initVue('#app')

var count = 0;

function getCount() {
    return count++;
}

//右边预览区拖动排序
function initDrag() {
    $("#show>form").sortable();//表单行排序
    //$("#show>form>div.el-form-item").sortable();//表单行内元素排序
}

function replaceLabel(str, n) {
    return str.substr(0, str.indexOf("label=")) + "label=\"" + n + "\"" + str.substr(str.indexOf(">"));
}

function replaceSize(str, n) {
    return str.substr(0, str.indexOf(">")) + " size=\"" + n + "\"" + str.substr(str.indexOf(">"));
}

function replaceValue(str, n) {
    let htm = str.substr(0, str.indexOf(">") + 1);
    let v = n.split(/[\s\n]/);
    if (str.indexOf("el-select") != -1) {
        htm += "<el-select v-model=\"form.region\"" + (str.indexOf("multiple") != -1 ? " multiple " : "") + " placeholder=\"请选择\">\n";
        for (var i = 0; i < v.length; i++) {
            htm += "<el-option label=\"" + v[i] + "\" value=\"" + v[i] + "\"></el-option>\n";
        }
        htm += "</el-select>\n";
    } else if (str.indexOf("el-checkbox-group") != -1) {
        htm += "<el-checkbox-group v-model=\"form.type\">\n";
        for (var i = 0; i < v.length; i++) {
            htm += "<el-checkbox label=\"" + v[i] + "\" value=\"" + v[i] + "\"></el-checkbox>\n";
        }
        htm += "</el-checkbox-group>\n";
    } else if (str.indexOf("el-radio-group") != -1) {
        htm += "<el-radio-group v-model=\"form.type\">\n";
        for (var i = 0; i < v.length; i++) {
            htm += "<el-radio label=\"" + v[i] + "\" value=\"" + v[i] + "\"></el-radio>\n";
        }
        htm += "</el-radio-group>\n";
    } else {
        htm += str.substr(str.indexOf(">") + 1);
        return htm;
    }
    return htm + "</el-form-item>";
}

//左边双击到右边
$(function () {
    $("#left>div").click(function () {
        var o = eval($(this).attr("p"));
        o = o.replace("<el-form-item ", "<el-form-item sid='" + getCount() + "' ");

        layer.open({
            title: '设置值',
            area: ['450px', 'auto'],

            content: ' <div style="width: 420px;  margin-left:7px; margin-top:10px;">'
                + '<div>'
                + '<span style="width: 42px">标签</span>'
                + '<input id="inputLabel" type="text" style="width: 360px">'
                + '</div>'
                + '<div>'
                + '<span style="width: 42px">大小</span>'
                + '<select id="inputSize" style="width: 360px">'
                + '<option value="">无</option>'
                + '<option value="mini">小</option>'
                + '<option value="medium">中</option>'
                + '<option value="large">大</option>'
                + '</select>'
                + '</div>'
                + '<div style="margin-top: 10px">'
                + '<span style="width: 42px">选值</span>'
                + '<textarea id="inputValue" style="width: 360px;height: 100px;" placeholder="多个值换行分隔"></textarea>'
                + '</div>'
                + '</div>'
            ,
            btn: ['保存', '取消'],
            btn1: function (index, layero) {
                if ($("#inputLabel").val() != '') {
                    o = replaceLabel(o, $("#inputLabel").val());
                }
                if ($("#inputSize").val() != '') {
                    o = replaceSize(o, $("#inputSize").val());
                }
                if ($("#inputValue").val() != '') {
                    o = replaceValue(o, $("#inputValue").val());
                }
                console.log(o);
                $("#right").append(o);
                var form = $("#right").clone().removeAttr("id");
                $("#show").empty().append(form);
                initVue('#show');
                initDrag();
                layer.close(index);
            },
            btn2: function (index, layero) {
                layer.close(index);
            }
        });

    })
});

//预览区修改标签名称
function labelEdit() {
    $("#show label.el-form-item__label").dblclick(function () {
        let v = prompt("请输入标签名称：", $(this).html());
        console.log(v);
        $(this).html(v);
        let sid = $(this).parent().attr("sid");
        $("#right").find("[sid=" + sid + "]").attr("label", v);
    });
}

function clearAll() {
    $("#right").empty();
    $("#show").empty();
}

function down() {
    let htm = "<!DOCTYPE html>\n" +
        "<html>\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <link rel=\"stylesheet\" href=\"https://unpkg.com/element-ui/lib/theme-chalk/index.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"https://dingey.github.io/demo/vue/vue-form.css\">\n"+
        "</head>\n" +
        "<body>\n" +
        "<div id=\"app\">\n" +
        "    <el-row>\n"+
        "        <el-col :span=\"16\" :offset=\"4\">\n"+
        "            <el-form ref=\"form\" :model=\"form\" label-width=\"80px\">\n";
    $("#show>form>div.el-form-item").each(function () {
        let sid = $(this).attr("sid");
        $("#right>el-form-item").each(function () {
            if (sid!=undefined&&$(this).attr("sid") == sid) {
                htm += $(this).clone().removeAttr("sid").prop("outerHTML");
            }
        })
    });
    htm += "            </el-form>\n" +
        "        </el-col>\n"+
        "    </el-row>\n"+
        "</div>\n" +
        "</body>\n"+
        "<script src=\"https://unpkg.com/vue/dist/vue.js\"></script>\n" +
        "<script src=\"https://unpkg.com/element-ui@2.9.1/lib/index.js\"></script>\n" +
        "<script>\n" +
        "new Vue({\n" +
        "        el: \"#app\",\n" +
        "        data: function () {\n" +
        "            return {\n" +
        "                form: {\n" +
        "                    name: '',\n" +
        "                    region: '',\n" +
        "                    date1: '',\n" +
        "                    date2: '',\n" +
        "                    delivery: false,\n" +
        "                    type: [],\n" +
        "                    resource: '',\n" +
        "                    desc: ''\n" +
        "                }\n" +
        "            }\n" +
        "        },\n" +
        "        methods: {\n" +
        "            handleAvatarSuccess(res, file) {\n" +
        "                this.imageUrl = URL.createObjectURL(file.raw);\n" +
        "            },\n" +
        "            beforeAvatarUpload(file) {\n" +
        "                const isJPG = file.type === 'image/jpeg';\n" +
        "                const isLt2M = file.size / 1024 / 1024 < 2;\n" +
        "\n" +
        "                if (!isJPG) {\n" +
        "                    this.$message.error('上传头像图片只能是 JPG 格式!');\n" +
        "                }\n" +
        "                if (!isLt2M) {\n" +
        "                    this.$message.error('上传头像图片大小不能超过 2MB!');\n" +
        "                }\n" +
        "                return isJPG && isLt2M;\n" +
        "            },\n" +
        "            handleRemove(file, fileList) {\n" +
        "                console.log(file, fileList);\n" +
        "            },\n" +
        "            handlePictureCardPreview(file) {\n" +
        "                this.dialogImageUrl = file.url;\n" +
        "                this.dialogVisible = true;\n" +
        "            }\n" +
        "        }" +
        "    })" +
        "</script>\n" +
        "</html>";
    console.log(htm);
    var eleLink = document.createElement('a');
    eleLink.download = "build.html";
    eleLink.style.display = 'none';
    var blob = new Blob([htm], {type: 'text/html;charset=utf-8;'});
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
}
