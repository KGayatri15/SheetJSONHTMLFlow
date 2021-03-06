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
        this.on('submit',e =>this.formSubmit(e));
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
        window.addEventListener('submit',e =>this.emit('handleEvent',e));
        // var forms =  document.querySelectorAll('form');
        // console.log("No of forms :- " + forms.length);
        // forms.forEach(form =>{
        //      form.addEventListener('onSubmit',this.formSubmit,false);
        //  })
        
    }
    handleEvent(event) {
       // console.log(event.type)
        switch (event.type) {
            case 'click':
                this.onClick(event);break;
            case 'submit':
                this.formSubmit(event);break;
            case 'selectstart':break;
            case 'keypress':
                  this.onKeyPress(event);break;
            case 'keyup':
                this.onKeyUp(event);break;
            case 'mouseover':
                this.onMouseOver(event);break;
            case 'storage':
                console.log("storage", event.type, event.target);
                console.log(Object.keys(actionStorageInstance.entity));
                break;
            default:
        }
    }
    formSubmit(event){
        event.preventDefault();
        console.log('Target ID :- '+ event.target.getAttribute('id'));
        switch(event.target.getAttribute('id')){
            case 'get':
                Sync.get(event);break;    
            case 'set':
                Sync.send(event);break;
            case 'signup':
                ASC_Credentials.signup(event);break;  
            case 'signin':
                ASC_Credentials.signin(event);break;        
        }
    }
    onKeyPress(entity) {
        console.log("key pressed")
        console.log(entity.key + ":::: key pressed");
        var currentSelection = window.getSelection();    
//        console.log("Current selection :-" + currentSelection.toString()); 
        var focusText = currentSelection.anchorNode.data;
//        console.log("Focus text :-" + focusText);
        var focusTextEntity = entity.target.textContent; //Pure text
//        console.log("FocusTextEntity :-" + focusTextEntity);
        var focusEntityInnerText = entity.target.innerText; // Rendered Text
 //       console.log("focusEntityInnerText :-" + focusEntityInnerText);
        // console.log("focusEntityInnerText", currentSelection);
        var currentCaret = currentSelection.anchorOffset;
        if (entity.key) {
            return;
        }
        // if(entity.key == 'Enter'){return;}
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
        /**
         * check if the target entity has any click or data - command set, if yes, then process it.
         */
        console.log( "Clicked" + event.target);
        if (event.target.hasAttribute("data-command")) { 
            var dataCommandT = event.target.getAttribute('data-command');
            console.log(dataCommandT);
            var commandJSOn = JSON.parse(dataCommandT);
 //           console.log( "Command "+ JSON.stringify(commandJSOn));
            switch (commandJSOn[0].command) {
//invoice sheet
                case 'NewItem':
                    this.NewItem(event);break;
                case 'RemoveItem':
                    this.RemoveItem(event);break;
                case 'SubmitInvoice':
                    this.SubmitInvoice(event);break;
//home page
                case 'signup':
                    window.location.href='./html/signup.html';break;
                case 'signin':
                    window.location.href='./html/signin.html';break;
                case 'google':
                    Authorization.oAuth(event,'json');break;
//sheet
                case 'view':
                    ActionView.showModal(commandJSOn[0].entity);break;
                case 'get':
                    Sync.get(event);console.log(event.target);break;    
                case 'set':
                    Sync.send(event);console.log(event.target);break;
//File System
                case 'FSOpenDirectory':
                    processFS.OpenDirectory(event);break;
                case 'FSNew':
                    processFS.NewFile(event);break;
                case 'FSOpen':
                    processFS.readFile(event);break;
                case 'FS_Save':
                    processFS.saveFile(event);break;
                case 'FS_SaveAs':
                    processFS.saveAsFile(event);break;
                case 'file':
                    this.file(event);break;
                // case 'caret':
                //     this.caret(event);break;
// local storage
                case 'new':
                    this.new1(event);break;
                case 'save':
                    this.save(event);break;
                case 'cloud':
                    this.load(event);break;
                case 'download':
                    this.download(event);break;
                case 'delete':
                    this.delete(event);break;
                case 'logout':
                    this.logout(event);break;
                case 'keyup':
                    this.onKeyUp(event);break;
                case 'mouseover':
                    this.onMouseOver(event);break;
                case 'storage':
                    console.log("storage", event.type, event.target)
                    console.log(Object.keys(actionStorageInstance.entity))
                    break;
                default:
                // console.log("I don't know such values",event.type);
            }   
        }
        if (event.target.classList.contains('editable')) { 
           // console.log("clickedOn", entity.target.id, entity.target.classList.contains('editable')) // TO check if it's content
            event.target.setAttribute('contentEditable', 'true');
            //entity.target.setAttribute('State', "contentEditable");
        }

    }
    // async caret(event){
    //     event.preventDefault();
    //     console.log('In caret' + event.target.classList);
    //     event.target.classList.toggle('caret-down');
    //     var parent = event.target.parentElement;
    //     parent.querySelector('.nested').classList.toggle('active');
    // }
    onMouseOver(event) { 
        if (event.target.id) { 
            event.target.setAttribute('State', "mouseover");          
        }
        if (event.target.classList.contains('editable')) {          
            event.target.previousElementSibling.style = 'visibility:visible';         
            console.log(event.target.previousElementSibling.innerHTML);
        }
    }
    async SubmitInvoice(event){
        event.preventDefault();
        var scriptURL = 'https://script.google.com/macros/s/AKfycbyOIui5vCTPoBWqGM7iFXH54XHJUyW4-7eKVUpV_ljyntW00uEYYNkqtD5CVsjtDoT8cQ/exec';
        var children = document.getElementById('tbody').childNodes;
        var InvoiceItems = [];
        var DocNumber = document.getElementById('DocNumber').textContent;
        for(var i = 0;i < children.length ; i++){
            var item = [DocNumber,document.getElementsByClassName('Description')[i].textContent,document.getElementsByClassName('Amount')[i].textContent,
                        document.getElementsByClassName('DetailType')[i].textContent,document.getElementsByClassName('Ref')[i].textContent,
                        document.getElementsByClassName('Account')[i].textContent,document.getElementsByClassName('LineStatus')[i].textContent,];
            InvoiceItems.push(item);
        }
        var json = {'array':InvoiceItems};
        
        var response = await HttpService.fetchRequest(scriptURL,HttpService.requestBuilder("POST",undefined,JSON.stringify(json)));
        alert(response.output);
        console.log(InvoiceItems);
        DocNumber.textContent = uid();
    }
    RemoveItem(event){
        event.preventDefault();
        var Id = 'tr' + event.target.getAttribute('id');console.log(Id);
        var element = document.getElementById(Id);
        element.parentNode.removeChild(element);
    }
    NewItem(event){
        event.preventDefault();
        var ItemId = uid();
        newItemJSON['td1']['a']['id'] = ItemId;newItemJSON['id'] = 'tr'+ ItemId;
        var json = {};json[ItemId] = newItemJSON;
        var newItem = new Entity(json,document.getElementById('tbody'));
    }
    async file(event){
        event.preventDefault();
        var handleDirFile = await indexDB.get(event.target.getAttribute('id'));
        processFS.Open(event,handleDirFile);
    }
    new1(event) { 
        console.log("New One");
     //   var item = document.getElementById('editor');
    //    var newentity = document.createElement('ol');
    //    new Entity(actionUserContent,newentity);
        ActionView.updateTitle(actionStoryTemplate.name);
        ActionView.updateText(actionUserContent[0]['innerHTML']);
    //    this.view.updateText(actionUserContent[0]['innerHTML']);
    //    item.replaceChild(newentity , item.childNodes[1]);
    }
    save(event) { 
        var entityName = ActionView.getTitle();
        console.log(entityName);
        var entityValue = ActionView.getText();
        StorageHelper.saveToStorage(entityName, entityValue);
    }
    load(event) {
        const entityName = window.prompt('Enter name of the Action Story you want to load','');
        const entitytValue = StorageHelper.getFromStorage(entityName);
        console.log(entityName + ":::::"+entitytValue);
        if(entitytValue !== null){
           ActionView.updateTitle(entityName);
           ActionView.updateText(entitytValue);
        //   this.view.updateText(entitytValue);
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
    static preLoader(){
        document.querySelector('.loader').style.visibility = "visible";
        document.querySelector('actionSpaceHolderElement').style.visibility = "hidden";
    }
    static showModal(id){
        document.getElementById(id).style.display = 'block';
    }
    static show(){
        document.querySelector('.loader').style.visibility = "hidden";
        document.querySelector('actionSpaceHolderElement').style.visibility = "visible";
    }
    static modal(event){
        event.preventDefault();
        var modal1 = document.getElementById('getForm');
        var modal2 = document.getElementById('setForm');
        if(event.target === modal1){
            modal1.style.display = "none";
        }else if(event.target === modal2){
            modal2.style.display = "none";
        }
    }
   
    static updateTitle(name){
        document.getElementById('loadedRouteTitle').innerText = name;  
    }
    static getTitle(){
        return document.getElementById('loadedRouteTitle').innerText;
    }
    static updateText(data){
        document.getElementsByTagName('block')[0].innerHTML = data;
    }
    static updateInnerText(data){
        document.getElementsByTagName('block')[0].innerText = data;
    }
    static getText(){
        return document.getElementsByTagName('block')[0].innerText;
    }
    static getinnerHTML(){
        return document.getElementsByTagName('block')[0].innerHTML;
    }
    static displayImage(data){
        var block = document.getElementsByTagName('block')[0];
        block.innerHTML = '';
        block.append(data);
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


