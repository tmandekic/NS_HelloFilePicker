var Observable = require("data/observable").Observable;
var nativescript_file_picker_1 = require("nativescript-file-picker");

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    }

    viewModel.onOpenFileManager = function (args){
        console.log("opening file manager");
        var filepicker = new nativescript_file_picker_1.FilePicker();
        filepicker.allowMultiple = true;
        filepicker
            .show()     
            .then(function (args) {
                console.log("selected file");
                console.log(args);
                var filePath = "" + args[0];
                console.log(filePath);
            })
            .catch(callError);
    }

    function call1(){
        console.log("calling 1");
    }

    function callError(args){
        console.log("error:" + args);
    }

    return viewModel;
}

exports.createViewModel = createViewModel;