"use strict";
var common = require("./file-picker.common");
var utils = require("utils/utils");
var appModule = require("application");
var FILE_CODE = 3554;
exports.Modes = {
    MODE_FILE: 0,
    MODE_DIR: 1,
    MODE_FILE_AND_DIR: 2,
    MODE_NEW_FILE: 3
};
var FilePicker = (function (_super) {
    __extends(FilePicker, _super);
    function FilePicker() {
        _super.apply(this, arguments);
    }
    FilePicker.prototype.show = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = [];
            var intent = _this.setIntent();
            var previousResult = appModule.android.onActivityResult;
            
            appModule.android.foregroundActivity.onActivityResult = function (requestCode, resultCode, data) {
                console.log("onActivityResult-ed in code: " + resultCode);
                appModule.android.onActivityResult = previousResult;
                //In the NoNonsense-FilePicker  it acts differently for api > 16 and api< 16 but as
                //nativescript not supports api < 16 yet, I removed that part :) .
                if (requestCode == FILE_CODE && resultCode == android.app.Activity.RESULT_OK) {
                    if (data.getBooleanExtra(com.nononsenseapps.filepicker.FilePickerActivity.EXTRA_ALLOW_MULTIPLE, false)) {
                        var clipData = data.getClipData();
                        if (clipData != null) {
                            for (var i = 0; i < clipData.getItemCount(); i++) {
                                var uri = clipData.getItemAt(i).getUri();
                                result.push(uri);
                            }
                            resolve(result);
                        }
                    }
                    else {
                        var uri = data.getData();
                        result.push(uri);
                        resolve(result);
                    }
                }
            };
            appModule.android.foregroundActivity.startActivityForResult(intent, FILE_CODE);
        });
    };
    ;
    FilePicker.prototype.setIntent = function () {
        var i = new android.content.Intent(utils.ad.getApplicationContext(), com.nononsenseapps.filepicker.FilePickerActivity.class);
        //if you don't set, it will be default.
        if (this.allowMultiple)
            i.putExtra(com.nononsenseapps.filepicker.FilePickerActivity.EXTRA_ALLOW_MULTIPLE, this.allowMultiple);
        if (this.allowCreateDir)
            i.putExtra(com.nononsenseapps.filepicker.FilePickerActivity.EXTRA_ALLOW_CREATE_DIR, this.allowCreateDir);
        if (this.singleClick)
            i.putExtra(com.nononsenseapps.filepicker.FilePickerActivity.EXTRA_SINGLE_CLICK, this.singleClick);
        if (this.mode)
            i.putExtra(com.nononsenseapps.filepicker.FilePickerActivity.EXTRA_MODE, this.mode);
        if (this.startPath)
            i.putExtra(com.nononsenseapps.filepicker.FilePickerActivity.EXTRA_START_PATH, this.startPath);
        return i;
    };
    return FilePicker;
}(common.FilePicker));
exports.FilePicker = FilePicker;
//# sourceMappingURL=file-picker.js.map