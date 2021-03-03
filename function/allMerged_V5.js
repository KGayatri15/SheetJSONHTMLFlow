var actionSpaceSchema = {


}

class actionState {
    static initState(e) {
        var nodes = [];
        //currentState = e.type;
        document.documentElement.querySelectorAll('*').forEach(function (node) {
            node.setAttribute("currentstate", "inDom"); node.setAttribute("prevstate", "");
            //  console.log(node);
        });
    }
    static changeState(e) {
        var targetElement = e.target;       //console.log("changing state for event");
        let currentState = targetElement.getAttribute('currentstate'); //console.log("current state", currentState);  //console.log("prev state",prevState);
        let prevState = targetElement.getAttribute('prevstate');
        if (prevState === currentState) {
            targetElement.setAttribute('currentstate', e.type); //console.log(prevState);
        } else {
            targetElement.setAttribute('prevstate', currentState); //console.log(prevState);
            targetElement.setAttribute('currentstate', e.type); //console.log(prevState);
            // console.log("New State",targetElement);
        }
        ehhEvent.conductEvent(e);
        //console.log(targetElement.getAttributes(prevstate));

    }
}
//console.log("app", app)
class ActionEvent {
    constructor(elements4Event, entity) {
        this._events = {};
        this._elements = elements4Event;
      //  this.on('click', e => this.handleEvent(e));
      //  this.createListeners(entity);
        //  console.log(elements4Event)
        this.on('selection', e => this.onSelection(e));
        this.on('change', e => this.onSelection(e));

        this.on('keypress', e => this.onKeyPress(e));
        this.on('keyup', e => this.onKeyUp(e));
        this.on('handleEvent', e => this.handleEvent(e));
        this.on('insertText', e => this.insertText(e));
        this.on('delButtonClicked', e => this.del(e));

    }

    createListeners(entity) {
       // console.log(entity)
        let events = dataHelpers.find(window, 'on')
      //  console.log(events)
        events.forEach((evt) => {
       //     console.log(evt.substring(2))
            this.on(evt.substring(2), e => this.handleEvent(e));
            //window[evt] = this.handleEvent
        })
  //  console.clear()
    }
    addListener(eventName, fn) {
        this._events[eventName] = this._events[eventName] || [];
        this._events[eventName].push(fn);
        return this;
    }
    on(eventName, fn) {
        return this.addListener(eventName, fn);
    }
    emit(eventName, ...args) {
        let fns = this._events[eventName];
        //  console.log("Emitted",eventName)
        if (!fns) return false;
        fns.forEach((f) => {
            f(...args);
        });
        return true;
    }
   
}
class Entity { 
    constructor(input, output) {
        console.log("entity",input,output)
        this.input = input;
        this.output = output;
        this.entity = process.processReq(input, output);
    }
    static create(input, output, key, value, callback, callbackClass) {
       //  console.log('create request for ',output,key)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
            // var response = Object.create(output.constructor.prototype)
            if (operate.isInt(parseInt(key))) {
                console.log("check me")
                var response = document.createElement('option');
            }
            else {
                // console.log(operate.is())
                var response = document.createElement(key);
            }

            // Entity.set(input, response, 'id', key + entityIndex.next().value);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            //   console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            // console.log("create request for ", input, output, key, value)

            response = new Object()

            //response = key;
            //response.set(value,key)
            //var response = document.createElement(key);
            if (value) {
                //    process.iterateObj(value,response,key,value)
            }
            // entity.set(input, response, 'id', key + index.next().value);
        }
        if (!response) console.log("no response", output);
        return response;
    }
    static append(input, output, key, value, callback, callbackClass) {
        // console.log('appending', input,output)

        if (operate.is(output).includes("HTML")) { //Only HTML creation
            var response = output.appendChild(input);
        }
        if (operate.is(output).includes("Object")) { //Only HTML creation
            // console.log("append request for ",input,output)     
            output[key] = input;
            var response = output;
            //var response = document.createElement(key);

        }
        if (operate.is(output).includes("Array")) { //Only HTML creation
            // console.log("append request for ",input,output)     
            output.push(input);
            var response = output;
            //var response = document.createElement(key);

        }



        // console.log('appended',response)
        return response;
    }
    static set(input, output, key, value, callback, callbackClass) {
        //  console.log("setting",key, value,"in",output)
        if (operate.is(output).includes("HTML")) { //Only HTML creation
           
            if (operate.isInsideArray(key, htmlAttributesListV2)) {
                
                
                output.setAttribute(key, value)
                if (key == "innerText") {
                    console.log("setting", key, value, "in", output)
                }
            } else {
               // console.log("set", key, value, "in", output)

                //var buffer = output;
                output[key] = input[key];
                //buffer=output;
            }

        }
        return output;
    }


    /**
     * 
     */
    static insert(str, index, value) {
        var response = str.substr(0, index) + value + str.substr(index);
        //  console.log("inserted",response)
        return response;

    }

    

}

class ActionController extends ActionEvent {
    constructor(model, view, actionEvent) {
        super()
        this.model = model
        this.view = view
        this.actionEvent = actionEvent
     //   window.addEventListener('change', e => this.emit('change', e));
        //window.addEventListener('event', e => this.emit('click', e))
        window.addEventListener('storage', e => this.emit('handleEvent', e));
        window.addEventListener('mouseover', e => this.emit('handleEvent', e));
        window.addEventListener('click', e => this.emit('handleEvent', e));
        window.addEventListener('keypress', e => this.emit('handleEvent', e));
        window.addEventListener('keyup', e => this.emit('handleEvent', e));
    }

    handleEvent(event) {
       // console.log(event.type)
        switch (event.type) {
            case 'click':
                this.onClick(event);
               //  console.log("click", event.type, event.target)
                break;
            case 'selectstart':
                //console.log("selectstart", event.type, event.target)
                break;
            case 'keypress':
                //  this.emit('keypress', event)
                  this.onKeyPress(event)
                // console.log("keypress", event.type, event.target)
                break;
            case 'keyup':
                this.onKeyUp(event)
                //  console.log("message", event.type, event.target)
                break;
            case 'mouseover':
                this.onMouseOver(event);
                //console.log("mouseover", event.type, event.target)
                break;
            case 'storage':
                console.log("storage", event.type, event.target)
                console.log(Object.keys(actionStorageInstance.entity))

                break;
            default:
            // console.log("I don't know such values",event.type);
        }
        // console.log("handler", event.type, event.target.getAttribute('name'))
        //  window.postMessage()

        //filter the registerd events paired with Target

    }
    onKeyPress(entity) {
        console.log("key pressed")
        var currentSelection = window.getSelection();     
        var focusText = currentSelection.anchorNode.data;
        var focusTextEntity = entity.target.textContent; //Pure text
        var focusEntityInnerText = entity.target.innerText; // Rendered Text
        // console.log("focusEntityInnerText", currentSelection);
        var currentCaret = currentSelection.anchorOffset;
        if (entity.key == 'Enter') {
            return;
        }
/// Directly entering the key In the view
        entity.preventDefault(entity);
        var response = currentSelection.anchorNode.data.substr(0, currentSelection.anchorOffset) + entity.key + currentSelection.anchorNode.data.substr(currentSelection.anchorOffset);
       currentSelection.anchorNode.data = response;
       Caret.moveCaret(window, currentCaret +1);
    }
    onKeyUp(entity) { 
        console.log("key was up")
    }
    onClick(event) {
        //   console.log("clicked On", entity.target)
        /**
         * check if the target entity has any click or data - command set, if yes, then process it.
         */
        console.log("Clicked" + event.target.hasAttribute('data-command'));
        if (event.target.hasAttribute("data-command")) { 
            var dataCommandT = event.target.getAttribute('data-command');
            console.log(dataCommandT);
            var commandJSOn = JSON.parse(dataCommandT);
            console.log( "Command "+ JSON.stringify(commandJSOn));
            switch (commandJSOn[0].command) {
                case 'new':
                    this.new1(event);
                    //  console.log("new", event.type, event.target)
                    break;
                case 'save':
                    this.save(event);
                    //console.log("selectstart", event.type, event.target)
                    break;
                case 'cloud':
                    //  this.emit('keypress', event)
                    this.load(event)
                    // console.log("keypress", event.type, event.target)
                    break;
                case 'download':
                    this.download(event)
                    break;
                case 'delete':
                    this.delete(event)
                    break;
                case 'logout':
                    this.logout(event)
                    break;
                case 'keyup':
                    this.onKeyUp(event)
                    //  console.log("message", event.type, event.target)
                    break;
                case 'mouseover':
                    this.onMouseOver(event);
                    //console.log("mouseover", event.type, event.target)
                    break;
                case 'storage':
                    console.log("storage", event.type, event.target)
                    console.log(Object.keys(actionStorageInstance.entity))
                    break;
                default:
                // console.log("I don't know such values",event.type);
            }


            
           // this.save(event);
            //console.log(entity.target.getAttribute('data'), typeof (json))
         //   var dataCommandT = entity.target.data-command;
           // var dataCommandT = entity.target.getAttribute('data-command');
           // var commandJSOn = JSON.parse(dataCommandT);
        //    window[commandArray[0].call];
          //  console.log(commandJSOn)    

            // if (commandJSOn[0].class) { 
            //     console.log(commandJSOn)    
            //     var actionClass =  'commandJSOn[0].class' ;
            //     console.log(actionClass, typeof actionClass);
            //     var actionMethod = commandJSOn[0].method;
            //     console.log(actionMethod, typeof actionMethod);

            //     var actionArg1 = commandJSOn[0].arg1;
            //     console.log(actionArg1, typeof actionArg1);
            //     var actionArguments = {
            //        // actionClass.actionMethod.actionArg1.call()
                    
            //     }

            //   //  var output = window[JSON.parse(actionArg1)]
            //   //  console.log(output)

            //    // var Action = process.act(actionClass, actionMethod, actionArg1, commandJSOn[0].arg2);
            // }
          //  
           // dataCommandT.call();
//            'data': `command `,
  //              StorageHelper.saveToStorage(document.getElementById('actionContent').getAttribute('name'), document.getElementById('sampleNote#1').innerHTML)

            //func.call([thisArg[, arg1, arg2, ...argN]])
        }
        if (event.target.classList.contains('editable')) { 
           // console.log("clickedOn", entity.target.id, entity.target.classList.contains('editable')) // TO check if it's content
            event.target.setAttribute('contentEditable', 'true');
            //entity.target.setAttribute('State', "contentEditable");
        }

      //  var currentSelection = window.getSelection();
      //
       // console.log(currentSelection);
       // var focusText = currentSelection.anchorNode.data;
      //  var focusTextEntity = entity.target.textContent; //Pure text
       // var focusEntityInnerText = entity.target.innerText; // Rendered Text
        // console.log("focusEntityInnerText", currentSelection);
       // var currentCaret = currentSelection.anchorOffset;
       
//entity.target.setSelectionRange(currentSelection,0)


    }
    onMouseOver(event) { 
        if (event.target.id) { 
            event.target.setAttribute('State', "mouseover");
            
        }
        if (event.target.classList.contains('editable')) { 
            
            event.target.previousElementSibling.style = 'visibility:visible'
            
            console.log(event.target.previousElementSibling.innerHTML)
            //event.target.previousElementSibling('visibility',true)

//console.log("yo")
        }
    }
    new1(event) { 
        console.log("New One");
     //   var item = document.getElementById('editor');
    //    var newentity = document.createElement('ol');
    //    new Entity(actionUserContent,newentity);
        this.view.updateTitle(actionStoryTemplate.name);
        this.view.updateText(actionUserContent[0]['innerHTML']);
    //    item.replaceChild(newentity , item.childNodes[1]);
    }
    save(event) { 
        var entityName = this.view.getTitle();
        console.log(entityName);
        var entityValue = this.view.getText();
        StorageHelper.saveToStorage(entityName, entityValue);
    }
    load(event) {
        const entityName = window.prompt('Enter name of the Action Story you want to load','');
        const entitytValue = StorageHelper.getFromStorage(entityName);
        console.log(entityName + ":::::"+entitytValue);
        if(entitytValue !== null){
           this.view.updateTitle(entityName);
           this.view.updateText(entitytValue);
           console.log("Loaded successfully");
        }else{
            alert(entityName + " doesn't exist");
        }
    }
    delete(event){
        const entityName = window.prompt('Enter name of the Action Story you want to delete','');
        console.log("entityName:- " + entityName);
        const entitytValue = StorageHelper.getFromStorage(entityName);
        console.log(entityName + ":::::"+entitytValue);
        if(entitytValue !== null){
            StorageHelper.removeFromStorage(entityName);
           console.log("Deleted successfully");
        }else{
            alert(entityName + " doesn't exist");
        }
    }
    download(event){
        const entityName = window.prompt('Enter name of the Action Story you want to download','');
        console.log("entityName:- " + entityName);
        const entitytValue = StorageHelper.getFromStorage(entityName);
        console.log(entityName + ":::::"+entitytValue);
        if(entitytValue !== null){
            StorageHelper.export(entityName,entitytValue);
           console.log("Downloaded successfully");
        }else{
            alert(entityName + " doesn't exist");
        }
    }
    async logout(event){
    console.log("Logout");
    event.preventDefault();
    if(localStorage.getItem('LoginEhh'+localStorage.getItem('emailID')) === 'true'){
        localStorage.removeItem('LoginEhh'+localStorage.getItem('emailID'));
        alert('Logged out through ehh');
    }else if(localStorage.getItem('LoginEhhGoogle'+localStorage.getItem('emailID')) === 'true'){
        localStorage.removeItem('LoginEhhGoogle'+localStorage.getItem('emailID'));
        var response = await Credentials.actions(event,"LOGOUT");
        if(!response.error){
            console.log("You have been logged out successfully");
        }
        alert('Logged out through ehh Google');
    }
    localStorage.removeItem('emailID');
    window.location.href = '../'; 
    }
}
class ActionView {
    constructor(entity, element) {
        console.log("Request for new View ", entity, element);
        this._actionView = new Entity(entity, element);
        //  console.log(" new View ", this._actionView.entity);
    }
    updateView(event,key,value) {
      
    }
    updateTitle(name){
        document.getElementById('loadedRouteTitle').innerText = name;  
    }
    getTitle(){
        return document.getElementById('loadedRouteTitle').innerText;
    }
    updateText(data){
        document.getElementsByTagName('block')[0].innerHTML = data;
    }
    getText(){
        return document.getElementsByTagName('block')[0].innerHTML;
    }
}
class StorageHelper {
    constructor(entity) { 
       StorageHelper.saveToStorage(entity.name, entity);    //Can we store Objects  
        this.entity = this.getStorage();
    }
     static saveToStorage(key, data) {
         localStorage.setItem(key, JSON.stringify(data));    
    }

    static getFromStorage(key) {
        if(key){
            let data = localStorage.getItem(key)
            return JSON.parse(data);
        }else{
            return window.localStorage;  
        }
       
    }
    static removeFromStorage(key){
        localStorage.removeItem(key);
    }

    static clearStorage() {
        localStorage.clear()
    }
    static export(fileName, json) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(json, null, 2)], {
            type: "application/json"
        }));
        a.setAttribute("download", `${fileName}.json`);
        document.body.appendChild(a);
        a.click();
    }
}


/**
 * @file get/set caret position and insert text
 * @author islishude
 * @license MIT
 */
class Caret {
    /**
     * get/set caret position
     * @param {HTMLColletion} target
     */
    constructor(target) {
        this.isContentEditable = target && target.contentEditable
        this.target = target
        //console.log("CaretCreated ",target.tagName);
    }


    static moveCaret(win, charCount) {
        var sel, range;
        if (win.getSelection) {
            // IE9+ and other browsers
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var textNode = sel.focusNode;
                var newOffset = sel.focusOffset + charCount;
                sel.collapse(textNode, Math.min(textNode.length, newOffset));
            }
        } else if ((sel = win.document.selection)) {
            // IE <= 8
            if (sel.type != "Control") {
                range = sel.createRange();
                range.move("character", charCount);
                range.select();
            }
        }
    }

  
}

function getCaretCoordinates() {
    let x = 0,
        y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
            const range = selection.getRangeAt(0).cloneRange();
            range.collapse(true);
            const rect = range.getClientRects()[0];
            if (rect) {
                x = rect.left;
                y = rect.top;
            }
        }
    }
    return { x, y };
}


// var actionSpaceElement = document.getElementById('actionSpace1');
// //console.log(actionSpaceElement);
// const actionEntity = new Entity(basicLayout, {});
// const actionViewInstance = new ActionView(basicLayout, actionSpaceElement);
// const actionEventInstance = new ActionEvent(actionSpaceElement, window);
// const actionSpaceInstanceApp = new ActionController(actionEntity, actionViewInstance, actionEventInstance);



// // console.log("actionSpaceInstanceApp : >>>>>", actionSpaceInstanceApp)
// // console.log("actionSpaceInstanceView : >>>>>", actionViewInstance._actionView.entity)
// // console.log("actionSpaceInstanceView.inner HTML : >>>>>", actionSpaceInstanceApp)


// var actionSpaceviewInstanceName = actionViewInstance._actionView.entity.getAttribute('id')
// console.log(actionSpaceviewInstanceName);

// var storageEntityModel = {
//     name: actionSpaceviewInstanceName,
//     id: 'actionSpaceviewInstanceName_InLocalStorage_1',
//     innerHTML: actionViewInstance._actionView.entity.innerHTML,
//     storageClass: "localStorage",
//     innerText: actionViewInstance._actionView.entity.innerHTML
// }
// var actionStorageInstance = new StorageHelper(storageEntityModel)

// var bindedHTML = document.createElement("bindedHtml");

// Object.keys(localStorage).forEach((entity) => {
//     // console.log(entity, JSON.parse(localStorage[entity]).id)
//     var newElement = document.createElement("a");

//     newElement.innerText = JSON.parse(localStorage[entity]).name;
//     newElement.setAttribute('name', JSON.parse(localStorage[entity]).name) ;
//     newElement.setAttribute('data-command', `[{"command":"load","entity": "actionContent","value":"innerHTML"}]`);
//     bindedHTML.appendChild(newElement);
// })
// console.log(bindedHTML);
// document.getElementById('leftSidebar').appendChild(bindedHTML);
// // const actionSpaceApp = new ActionController(), new ActionView(basicLayout, actionSpaceElement), new ActionEvent(actionSpaceElement,window))
// // console.log("actionSpaceApp", actionSpaceApp)


// // if condition() is true then this and
