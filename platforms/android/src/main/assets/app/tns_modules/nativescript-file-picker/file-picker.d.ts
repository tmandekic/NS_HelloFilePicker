import common = require("./file-picker.common");
import { Mode } from "file-picker";
export declare var Modes: Mode;
export declare class FilePicker extends common.FilePicker {
    show(): Promise<{}>;
    private setIntent();
}
