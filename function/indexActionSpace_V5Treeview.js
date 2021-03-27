





async function load(event){
event.preventDefault();
ActionView.preLoader();
var getForm =  document.getElementById('getForm');
var getData = new Entity(GetDataFromSheet,{});
var getDataViewInstance = new ActionView(GetDataFromSheet , getForm);
var getDataEventInstance = new ActionEvent(getForm,window);
var getDataControllerInstance = new ActionController(GetDataFromSheet,getDataViewInstance,getDataEventInstance);

var setForm = document.getElementById('setForm');
var sendData = new Entity(SendDataToSheet, {});
var sendDataViewInstance = new ActionView(SendDataToSheet, setForm);
var sendDataEventInstance = new ActionView(setForm, window);
var sendDataControllerInstance = new ActionController(SendDataToSheet,sendDataViewInstance,sendDataEventInstance);

var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceContainer')
//console.log(HorizonticalMenuTemplateSchema,actionSpaceElementInstanceIndom)
var header = new Entity(headerModelSchemaV1,actionSpaceElementInstanceIndom);
//console.log(newMenu.input);
//console.log(newMenu.output);
var workspace = new Entity(sidebarJSON, actionSpaceElementInstanceIndom);
//var newIconBar = new Entity(iconBar,actionSpaceElementInstanceIndom)
var actionSpace35 = new Entity(actionSpaceModel, {});
var actionViewInstance = new ActionView(actionSpaceModel,actionSpaceElementInstanceIndom);
var actionEventInstance = new ActionEvent(actionSpaceElementInstanceIndom,window);
var actionSpaceControllerInstance = new ActionController(actionSpace35,actionViewInstance,actionEventInstance); 
//var autoSuggestCard = new Entity(itemListModelSchema, document.getElementById('editor'));
//Adding Shortcuts 
Shortcut.add('Ctrl+S',processFS.saveFile);
Shortcut.add('F12',processFS.saveAsFile);
Shortcut.add('Ctrl+O',processFS.readFile);
setInterval(async()=>{
  if(localStorage.getItem('ActiveFile') !== ActionView.getinnerHTML()){
    await localStorage.setItem('ActiveFile',ActionView.getinnerHTML());
    console.log('Updated Active File');
  }
  if(localStorage.getItem('ActiveFileName') !== ActionView.getTitle()){
    await localStorage.setItem('ActiveFileName',ActionView.getTitle());
  }
},9000);
var data = localStorage.getItem('ActiveFileName');
if(data){
  ActionView.updateText(localStorage.getItem('ActiveFile'));
  ActionView.updateTitle(localStorage.getItem('ActiveFileName'));
}
ActionView.show();
}
