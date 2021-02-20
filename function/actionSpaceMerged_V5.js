var actionSpaceSchema = {


}

//console.log("app", app)
class ActionView {
    constructor(entity, element) {
        console.log("Request for new View ", entity, element);
        this._actionView = new Entity(entity, element);
      //  console.log(" new View ", this._actionView.entity);
    }
    updateView() { 


    }

}
class ActionController {
    constructor(model, view,actionEvent) {
        this.model = model
        this.view = view
        this.actionEvent = actionEvent
    }
}


class ActionEvent {
    constructor(elements4Event) {
        this._events = {};
        this._elements = elements4Event;
        //  console.log(elements4Event)
        this.on('selection', e => this.onSelection(e));
        this.on('change', e => this.onSelection(e));

        this.on('keypress', e => this.onKeyPress(e));
        this.on('keyup', e => this.onKeyUp(e));
        this.on('click', e => this.onClick(e));
        this.on('insertText', e => this.insertText(e));
        this.on('delButtonClicked', e => this.del(e));

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
async function loadActionSpace(){
var actionSpaceElement = document.getElementById('actionSpace#1');
console.log(actionSpaceElement);
var response =await Flow.renderActionSpace();
console.log(response);
const actionSpaceApp = new ActionController(response.actionSpace, new ActionView(response.basiclayout, actionSpaceElement), new ActionEvent(actionSpaceElement));
console.log("actionSpaceApp", actionSpaceApp)


}
