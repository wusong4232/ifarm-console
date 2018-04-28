import lazyLoading from './lazyLoading'
export default (routers,data) => {
  generaMenu(routers,data)
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
                    component: ''
                };
                menu.component = lazyLoading(subItem.component);
                routers.push(menu);
            }
        }
    }
}
