/**
 * Created by wupeng5 on 2017/7/10.
 */


export default class ConfigData {
    static out(){

        var data = [
            {path :"/",component:"Books",isDefault:true},
            {path :"/person",component:"Person"},
            {path :"/books",component:"Books"},
            {path :"/PersonSave/:tag/:id",component:"PersonSave"}
        ]

        return data;
    }
}

