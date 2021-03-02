
window.onload = ()=>{
    console.log("DOM Content Loaded");
    var activeRoutes = Array.from(document.querySelectorAll('[route]'));
    console.log(activeRoutes);
    function navigate(event){
        var route = event.target.attributes[0].value;
        var routeInfo = ActionSpaceRouter.routes.filter((r)=>{
            return r.path === route;
        })[0];
        if(!routeInfo){console.log('No Route information');}
        else{
          
            window.history.pushState({},routeInfo.name,routeInfo.path);
            console.log(window.history);
        }
    }
   //add event listeners
    activeRoutes.forEach(route =>{
        route.addEventListener('click',navigate,false);
    })
    var Router = function(name,routes){
        return{
            name:name,
            routes:routes
        }
    };
    var ActionSpaceRouter = new Router('ehh',[
        {
            path:'/index.html',
            name:"Home Page"
        },
        {
            path:'/application.html',
            name:"Login"
        },
        {
            path:'/signup.html',
            name:"Sign Up"
        },
        {
            path:'/indexActionSpace_V5Treeview.html',
            name:"Action Space Editor"
        }
    ]);
    // console.log(ActionSpaceRouter);
    // var currentPath = window.location.pathname;
    // console.log(currentPath);
    // if(currentPath === '/index.html'){
    //     console.log("In root page");
    // }else{
    //     var route = ActionSpaceRouter.routes.filter(r=>{
    //         return r.path === currentPath
    //     })[0];
    //     console.log(route);
    // }
}

