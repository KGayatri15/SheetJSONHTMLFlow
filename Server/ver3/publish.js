function publish(){
    var ParentDeploy = document.querySelector('[data-tt="Deploy this project"]');
    ParentDeploy.firstChild.firstChild.click();
    var newDeployment = document.querySelector('[class="z80M1 FwR7Pc"]');
    var replaceNewDeployment = document.createElement("div");
    for(var i =0;i < newDeployment.attributes.length;i++){
      var nodeName  = newDeployment.attributes.item(i).nodeName;
      var nodeValue = newDeployment.attributes.item(i).nodeValue;
      replaceNewDeployment.setAttribute(nodeName, nodeValue);
    }
    replaceNewDeployment.innerHTML = newDeployment.innerHTML;
    newDeployment.parentNode.replaceChild(replaceNewDeployment,newDeployment);
 //   newDeployment.setAttribute("class",'z80M1 FwR7Pc qs41qe');
    newDeployment.click();
 //   var ParentNewDeployment = document.querySelector('[class="XvhY1d"]');//
 //   var newDeployment = ParentNewDeployment.firstChild.querySelector('[class="z80M1 FwR7Pc"]')
 //   newDeployment.setAttribute('tabindex',0);
   var deployButton = document.querySelector('[jscontroller="soHxf"]');
   deployButton.click()
}
function publish2(){
   ParentDeploy = document.querySelector('[data-tt="Deploy this project"]');
   await ParentDeploy.firstChild.firstChild.click();
   parentDropDown = document.querySelector('[class="XvhY1d"]');
   newDeployment = document.querySelector('[aria-label="New deployment"]');
   replaceElementV2(newDeployment,document.createElement("div"));
   newDeploymentV2 = document.querySelector('[aria-label="New deployment"]');
   await newDeploymentV2.setAttribute("class",'z80M1 FwR7Pc qs41qe');
   newDeploymentV2.click();
   //newDeployment click not working 
   //settings
   settings = document.querySelector('[data-tooltip="Enable deployment types"]');
   settings.click();
   Webapp = document.querySelector('[aria-label="Web app"]');
   // Webapp.click();
   replaceElementV2(Webapp,document.createElement("button"));
   WebappV2 = document.querySelector('[aria-label="Web app"]');
   WebappV2.click();
   //Webapp click not working
   Description = document.querySelector('[class="VfPpkd-fmcmS-wGMbrd "]');//jslog="94977; track:click"
   Description.value = "DeployClientNode";
   //deploy project
   deployProject = document.querySelector('[jsname="XFIHU"]');
   deployProject.click();
}
function replaceElementV2(original,replace){
   for (var i =0;i < original.attributes.length;i++){
      nodeName  = original.attributes.item(i).nodeName;
      nodeValue = original.attributes.item(i).nodeValue;
      replace.setAttribute(nodeName, nodeValue);
    }
    replace.innerHTML = newDeployment.innerHTML;
    original.parentNode.replaceChild(replace,original);
}

//427
// _.QS=function(a,b,c,d,e,f,g,h,l,n,p,r,t,u,x,z,B,D,F){
//    f='<span jsslot class="'+_.Q("z80M1")+(_.O(n)||_.O(l)?" "+_.Q("NmX0eb"):"")+(p?" "+_.Q("N2RpBe"):"")+(r?" "+_.Q("RDPZE"):"")+(d?" "+_.Q("HGVH5"):"")+(u?" "+_.Q(u):"")+'" jsaction="click:'+_.Q("o6ZaF")+(null==D||D?"(preventDefault=true)":"")+"; mousedown:"+_.Q("lAhnzb")+"; mouseup:"+_.Q("Osgxgf")+"; mouseenter:"+_.Q("SKyDAe")+"; mouseleave:"+_.Q("xq3APb")+";touchstart:"+(_.Q("jJiBRc")+"; touchmove:"+_.Q("kZeBdd")+"; touchend:"+_.Q("VfAz8")+'(preventMouseEvents=true)" jsname="')+
