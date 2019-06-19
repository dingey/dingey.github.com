const TEXT = "<el-form-item label=\"活动名称\">\n" +
    "            <el-input v-model=\"form.name\"></el-input>\n" +
    "        </el-form-item>";
const NUM = "<el-form-item label=\"数字\">\n" +
    "            <el-input-number v-model=\"form.num\"></el-input-number>\n" +
    "        </el-form-item>";
const SELECT = "<el-form-item label=\"活动区域\">\n" +
    "            <el-select v-model=\"form.region\" placeholder=\"请选择活动区域\">\n" +
    "                <el-option label=\"区域一\" value=\"shanghai\"></el-option>\n" +
    "                <el-option label=\"区域二\" value=\"beijing\"></el-option>\n" +
    "            </el-select>\n" +
    "        </el-form-item>";
const MSELECT = "<el-form-item label=\"多选标签\" p=\"MSELECT\">\n" +
    "                        <el-select v-model=\"form.tags\" multiple placeholder=\"请选择\">\n" +
    "                            <el-option label=\"黄金糕\" value=\"黄金糕\"></el-option>\n" +
    "                            <el-option label=\"双皮奶\" value=\"双皮奶\"></el-option>\n" +
    "                        </el-select>\n" +
    "                    </el-form-item>";
const TIME = " <el-form-item label=\"时间\">\n" +
    "            <el-col :span=\"11\">\n" +
    "                <el-date-picker type=\"datetime\" placeholder=\"开始时间\" v-model=\"form.date1\"\n" +
    "                                style=\"width: 100%;\"></el-date-picker>\n" +
    "            </el-col>\n" +
    "            <el-col class=\"line\" :span=\"2\">-</el-col>\n" +
    "            <el-col :span=\"11\">\n" +
    "                <el-date-picker type=\"datetime\" placeholder=\"结束时间\" v-model=\"form.date2\"\n" +
    "                                style=\"width: 100%;\"></el-date-picker>\n" +
    "            </el-col>\n" +
    "        </el-form-item>";

const SWITCH = "        <el-form-item label=\"即时配送\">\n" +
    "            <el-switch v-model=\"form.delivery\"></el-switch>\n" +
    "        </el-form-item>";
const CHECKBOX = "        <el-form-item label=\"活动性质\">\n" +
    "            <el-checkbox-group v-model=\"form.type\">\n" +
    "                <el-checkbox label=\"美食/餐厅线上活动\" name=\"type\"></el-checkbox>\n" +
    "                <el-checkbox label=\"地推活动\" name=\"type\"></el-checkbox>\n" +
    "            </el-checkbox-group>\n" +
    "        </el-form-item>";

const RADIO = "        <el-form-item label=\"特殊资源\">\n" +
    "            <el-radio-group v-model=\"form.resource\">\n" +
    "                <el-radio label=\"线上品牌商赞助\"></el-radio>\n" +
    "                <el-radio label=\"线下场地免费\"></el-radio>\n" +
    "            </el-radio-group>\n" +
    "        </el-form-item>";
const TEXTAREA = "        <el-form-item label=\"备注\">\n" +
    "            <el-input type=\"textarea\" v-model=\"form.desc\"></el-input>\n" +
    "        </el-form-item>";
const BTN = "        <el-form-item>\n" +
    "            <el-button type=\"primary\">确定</el-button>\n" +
    "            <el-button>取消</el-button>\n" +
    "        </el-form-item>";
const UPLOAD="                    <el-form-item label=\"头像\" p=\"UPLOAD\">\n" +
    "                        <el-upload\n" +
    "                                class=\"avatar-uploader\"\n" +
    "                                action=\"https://jsonplaceholder.typicode.com/posts/\"\n" +
    "                                :show-file-list=\"false\"\n" +
    "                                :on-success=\"handleAvatarSuccess\"\n" +
    "                                :before-upload=\"beforeAvatarUpload\">\n" +
    "                            <img v-if=\"form.imageUrl\" :src=\"form.imageUrl\" class=\"avatar\">\n" +
    "                            <i v-else class=\"el-icon-plus avatar-uploader-icon\"></i>\n" +
    "                        </el-upload>\n" +
    "                    </el-form-item>";
const UPLOAD2="                    <el-form-item label=\"照片墙\" p=\"UPLOAD2\">\n" +
    "                        <el-upload\n" +
    "                                action=\"https://jsonplaceholder.typicode.com/posts/\"\n" +
    "                                list-type=\"picture-card\"\n" +
    "                                :on-preview=\"handlePictureCardPreview\"\n" +
    "                                :on-remove=\"handleRemove\">\n" +
    "                            <i class=\"el-icon-plus\"></i>\n" +
    "                        </el-upload>\n" +
    "                    </el-form-item>";
