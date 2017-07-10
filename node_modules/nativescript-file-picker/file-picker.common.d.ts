import definition = require("nativescript-file-picker");
export declare class FilePicker implements definition.FilePicker {
    private _allowMultiple;
    private _allowCreateDir;
    private _mode;
    private _singleClick;
    private _startPath;
    show(): void;
    allowMultiple: boolean;
    allowCreateDir: boolean;
    mode: number;
    singleClick: boolean;
    startPath: string;
}
