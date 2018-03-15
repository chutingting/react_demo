import About from './about.jsx';
import Home from './home.jsx';
import CkPage from './ckPage.jsx';

export default class RouterCtl{
    constructor(){
        this.allRouters =[
            {path:'/ckPage',comp:CkPage},
            {path:'/about',comp:About},
            {path:'/home',comp:Home}
        ]
    }
    getComponentsByName(name){
        var res = null;
        this.allRouters.map(item=>{
            if(item.path == name){
                res = item.comp;
            }
        })
        if(res == null){
            res = About;
        }
        return res;
    }
}