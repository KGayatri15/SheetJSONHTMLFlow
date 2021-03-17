





async function load(event){
event.preventDefault();
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
  if(localStorage.getItem('ActiveFile') !== ActionView.getText()){
    await localStorage.setItem('ActiveFile',ActionView.getText);
    await localStorage.setItem('ActiveFileName',ActionView.getTitle());
    console.log('Updated Active File');
  }
},9000);
var data = localStorage.getItem('ActiveFileName');
if(data)
  ActionView.updateText(localStorage.getItem('ActiveFile'));
  ActionView.updateTitle(localStorage.getItem('ActiveFileName'));
}
