import lazyLoading from './lazyLoading'
export default (routers, data, mode) => {
    if ('menu' == mode) {
        generaMenu(routers, data)
    } else {
        generaRouter(routers, data);
    }
}
function generaRouter(routers, routerData) {
    for (var key in routerData) {
        var menu = routerData[key];
        menu.component = lazyLoading(menu.componentSrc)
        routers.push(menu);
    }
}
function generaMenu(routers,userMenus) {
    for (let i = 0; i < userMenus[0].childrenNode.length; i++) {
        let item = userMenus[0].childrenNode[i];
        if (item.childrenNode) {
            for (let j = 0; j < item.childrenNode.length; j++) {
                let subItem = item.childrenNode[j];
                let menu = {
                    path: subItem.router,
                    name: subItem.resourceName,
                    componentSrc: subItem.component,
                    component: ''
                };
                menu.component = lazyLoading(subItem.component);
                routers.push(menu);
            }
        }
    }
}
