





window.onload = (event)=>{
var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceContainer')
 //console.log(HorizonticalMenuTemplateSchema,actionSpaceElementInstanceIndom)
var newMenu = new Entity(headerModelSchemaV1,actionSpaceElementInstanceIndom);
//console.log(newMenu.input);
//console.log(newMenu.output);
//var newIconBar = new Entity(iconBar,actionSpaceElementInstanceIndom)
var actionSpace35 = new Entity(actionSpaceModel, actionSpaceElementInstanceIndom)


var autoSuggestCard = new Entity(itemListModelSchema, document.getElementById('editor'));
if(localStorage.getItem('UserSpreadsheetID'+localStorage.getItem('emailID')) !== null){
    Credentials.actions(event,'LOGGED IN');
}
}
