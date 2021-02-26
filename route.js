var activeRoutes = Array.from(document.querySelectorAll('[route]'));
function navigate(event){
    var route = event.target.attributes[0].value;
    var routeInfo = ActionSpaceRouter.routes.filter((r)=>{
        return r.path === route;
    })[0];
    if(!routeInfo){console.log('No Route information');}
    else{
        window.history.pushState({},routeInfo.name,routeInfo.path);
    }
}

//add event listeners
activeRoutes.forEach(r =>{
    route.addEventListener('click',navigate,false);
})

var Router = (name,routes)=>{
    return{
        name:name,
        routes:routes
    }
};
var ActtionSpaceRouter = new Router('ehh',[
    {
        path:'/index.html',
        name:"start"
    },
    {
        path:'/application.html',
        name:"login"
    },
    {
        path:'/signup.html',
        name:"signup"
    },
    {
        path:'/indexActionSpace_V5Treeview.html',
        name:"actionSpace"
    }
])
