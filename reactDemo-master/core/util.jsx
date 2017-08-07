
export default class Util{
    //constructor(a) {
    //    super(a);
    //}
    static getProperties(arr){
        var res = [];
        if(!arr || arr.length == 0){
            return res;
        }
        for(var i in arr[0]){
            res.push(i);
        }
        return res;
    }
    static fetchAjax(url,method,data){
        var _url = url;
        if(typeof url == "function"){
            _url = url();
        }
        if(_url.indexOf('?') == -1){
            _url = url + "?ran="+Math.random();
        }else{
            _url = url+ "&ran="+Math.random();
        }

        var options = {};
        //headers: {
        //    'Accept': 'application/json',
        //        'Content-Type': 'application/json'
        //},
        if(method.toLowerCase() == "get"){
            options = {
                method:"GET",
                credentials:'include'
            };
        }
        if(method.toLowerCase() == "post"){
            if(data){
                options = {
                    method:"POST",
                    credentials:'include',
                    body:JSON.stringify(data)
                };
            }else{
                options = {
                    method:"POST",
                    credentials:'include'
                };
            }
        }

        return fetch(_url, options).then(d =>d.json());
        //fetch(_url, options).then(d =>d.json()).then(function(data){
        //    if(cb){
        //        cb(data);
        //    }
        //}).catch(function(error){
        //    console.log(error);
        //    alert("ajax请求失败,url:"+_url);
        //});
    }
    static cloneObj(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return null;
    }

    //为每行记录添加唯一主键
    static addId(data){
        for(var i=0;i<data.length;i++){
            data[i].__tmpId = Math.ceil(Math.random()*10000000000000000);
        }
        return data;
    }

    //根据主键获取当前对象(数组)
    static getObjectByIds(ids,data){
        var res = [];
        var tmp = data;
        for(var i=0;i<ids.length;i++){
            for(var k=0;k<tmp.length;k++){
                if(tmp[k].__tmpId == ids[i]){
                    res.push(tmp[k]);
                    break;
                }
            }
        }
        return res;
    }

    static getItemsByFieldValues(field,vals,arr){
        var res = [];
        vals.map(function(val){
            arr.map(function(item){
                if(item[field].indexOf(val) != -1){
                    res.push(item);
                }
            })
        })
        return res;
    }

    //获取数组某行的属性的集合
    static getFieldVals(field,arr){
        var res = [];
        arr.map(function(item){
            return res.push(item[field]);
        })
        return res;
    }

    static dealData(data){
        data.map(item=>{
            item.ck = false;
            item.__tmpId = Math.ceil(Math.random()*10000000000000000);
        });
        return data;
    }
}