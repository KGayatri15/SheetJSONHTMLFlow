class process {
    static processReq(input, output, key, value) {
     //   console.log(input, output)
     console.log(operate.is(input) + " :->   ");
        if (operate.is(input) === 'Object') {
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'Array') {
            var buffer = process.iterateObj(input, output, key);
        } else if (operate.is(input) === 'String') {
            console.log('String >>>', key, value);
            //Entity.set(input,this.output,key,value);           
        }
        return buffer;
    }
    static iterateObj(input, output) {
        for (var key in input) {
            var value = input[key];
            //console.log("found",key,input[key])
            if (operate.is(value) === 'Object') {
                // console.log("Object",output);
                var buffer = Entity.create(input, output, value.name);
                process.iterateObj(input[key], buffer, key, value)
                Entity.append(buffer, output);
            } else if (operate.is(value) === 'Array') {
                //  console.log("foundArray", key)
                var buffer = Entity.create(input, output, key);
                process.iterateArr(input[key], buffer, key, value)
                Entity.append(buffer, output);
                // console.log('Array',key, value, buffer);
            } else if (operate.is(value) === 'String' || operate.is(value) === 'Boolean') {
                //  console.log('String',key, value,output);
                Entity.set(input, output, key, value);
                //Entity.set(input,this.entity,key,value);           
            }

        }
        // console.log('Iterate Objoutput',output)
        return output;
    }
    static iterateArr(input, output, key, value, callback, callbackClass) {
        //  console.log("Iterating Array", input, output, key, value);

        for (var i = 0; i < input.length; i++) {
            //console.log("Object found in array", input[i]);

            if (operate.is(input[i]) === 'Object') { //console.log("Object in array",response)

                var response = Entity.create(input[i], output, input[i].name);
                process.iterateObj(input[i], response, input[i].name,)
                Entity.append(response, output);

            } else if (operate.is(input[i]) === 'Array') { // console.log("found Array", key, input[key])

            } else if (operate.is(input[i]) == 'String') { //  console.log("found property, Set Attributes in output", key, input[key])

                // Entity.set(input,output,key,input[key])
            } else {

                //  console.log("stray found")
            }
            //console.log(callbackClass,callback)
            //   console.log(key, input[key])
            //var response = operate.isNotEmpty(callback) ? conductor.conduct(input, output, key, input[key], callback, callbackClass) : null;
            if (operate.isNotEmpty(callback)) {

                //  var response = conductor.conduct(input, output, key, input[key], callback, callbackClass);

            }
        }
        // console.log("iterator Array response", response);
        return response;
    }
    static act(callbackClass,method, a, b, c, d,) {
        console.log(callbackClass, method, a, b, c, d)
       // eval(callbackClass.callback(a, b))
//        var response = callbackClass[method](a);
        console.log("act response",response)
        return response;
    }
    
    

}
function getEntityType(entity) {
    console.log("Entity" + entity);
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}
var row = new Array('ehhid', 'd', 'parent', 'entity', "typeOf", "path");

class mutate { 

    static fillEmptyDepth(input, output) {
        // console.log("filling gap",input,output)
        for (var j = 1; j <= output[0].length - input.length; j++) {
            input.push("");
        }
        return input;
    }
    
    //this function primarly check for the presence of a keys in any an array, if not present and options [ returns false and update and return position]
    static validateNupdate(input, output) {

        if (output[0].indexOf(input) === -1 && typeof input !== null && typeof input !== undefined) {
           output[0].push(input);
        }
        // console.log(output[0], input);
        return output;
    }
    static createRow(input, output, previousRow, currentKey, d, path) {
        var id = output.length;
        var newRow = [id, d, previousRow[3], currentKey, input?.constructor.name, path];
        return newRow;
    }

    static updateRow(input, output, previousRow, currentRow, currentKey, d, path) {
        mutate.fillEmptyDepth(currentRow, output)
        // console.log("current Key in updation",currentKey,input,currentRow,previousRow)
        //Adding the inputValue in the currentRow at the index of the currentKey, also deletes an empty space from before.
        currentRow.splice(output[0].indexOf(currentKey), 1, input);
        //  console.log("updated Row",currentRow)
        return currentRow;
    }
    static setEntity(input, output, key) { 
       var  outputType = getEntityType(output);
      //  console.log(outputType);
        switch (output?.constructor) { 
            case Object:
                output[key] = input[key];
            case Array:
                if (key) {
                    output.push(input[key])
                } else { 
                    output.push(input);
                }
            case String:
                default:
        }

        return output;
    }
    static Obj2(input, output, previousRow, currentRow, currentKey, d, path, parent) {
        if (!previousRow) {
            mutate.setEntity(row, output);
            
            previousRow = output[0];
            //  parent = "root";
          //  console.log(previousRow);
            path = '';
        };
        if (!d) { var d = 0; }
        d = d + 1;
        switch (input?.constructor) {
            case Object:
                path = path + '.' + previousRow[3];
                mutate.processObj(input, output, previousRow, currentRow, currentKey, d, path, previousRow[3]);
            case Array:
           
                path = path + '.' + previousRow[3];
                mutate.processArr(input, output, previousRow, currentRow, currentKey, d, path, previousRow[3]);
            default:
            // return
        }
        //  console.log(output)
        return output;
    }
    static processObj(input, output, previousRow, currentRow, currentKey, d, path, parent) {
        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;
            if (getEntityType(input[key]) === 'Object' || getEntityType(input[key]) === 'Array') {
                // console.log(path)
                var currentRow = mutate.createRow(input[key], output, previousRow, key, d, path, previousRow[3]);
                mutate.setEntity(currentRow, output);
                mutate.Obj2(input[key], output, currentRow, currentRow, currentKey, d, path, currentRow[3]);

            } else if (getEntityType(input[key]) === 'String' || getEntityType(input[key]) === 'Function' || getEntityType(input[key]) === 'Boolean'|| getEntityType(input[key])=== 'Number') {
                mutate.validateNupdate(key, output);
                mutate.updateRow(input[key], output, previousRow, previousRow, key, d, path);
            } else {
                //   console.log("errand", key, input[key],typeof key)
            }
        }
        return output;
    }
    static processArr(input, output, previousRow, currentRow, currentKey, d, path, parent) {
        for (var i = 0; i < input.length; i++) {
            if (typeof input[i] === "object" && input[i] !== null) {
                if (typeof currentRow[3] === 'undefined') {
                    //      console.log(currentRow)   
                    
                    mutate.updateRow(currentKey, output, previousRow, currentRow, 'root', d, path);
                 //   console.log("Finding Array Values", previousRow)
                } else {
                   // console.log("Finding Array Values",currentRow)

                    var currentRow = mutate.createRow(input[i], output, previousRow, previousRow[3] + i, d, path);
                    mutate.setEntity(currentRow, output);
//                    output.push(currentRow);
                }
                mutate.Obj2(input[i], output, currentRow, currentRow, currentKey, d, path);

            } else {
                //creating Value Row for Array Parent
                var currentRow = mutate.createRow(input[i], output, previousRow, input[i], d, path);
                mutate.setEntity(currentRow, output);
           //     console.log(currentRow)
              //  output.push(currentRow);
            }
        }
        return output
    }
    static arr2Object (input ,parent,output){
        for(var j in input){ 
         var index;      
          if(input[j][2] === parent[3]&&((input[j][5].includes(parent[5]) && parseInt(input[j][1]) === 1+ parseInt(parent[1]))||((input[j][1]=== "1"||input[j][1]===1)&&parent[1]==="d"))){
            if(parent[4] === "Array" && (input[j][4] === "String"|| input[j][4] === "Number")){
              output.unshift(input[j][3]);
            }else if(input[j][4] === "Object"){
                var obj = {};
                if(input[j].length > 6){
                    for(var k = 6;k < input[j].length;k++){
                        if(input[j][k] !== "")
                            obj[input[0][k]] = input[j][k];
                    }
                }
                if(parent[4]=== "Array"){
                        var index = input[j][3].replace(input[j][2],"");
                        output[index] = obj;
                }else
                        output[input[j][3]] = obj;
            }else if(input[j][4] === "Array"){
              output[input[j][3]] = [];
            }
            if(input[j][4] === "Object" && parent[4] === "Array")
                this.arr2Object(input,input[j],output[index]);
            else
                this.arr2Object(input,input[j],output[input[j][3]]);
          }
        }
        return output;
      }
}

class conductor {
    //this function calls a callback function with a and b parameter. Conducted Routes have to be registered before else will throw error.
    //  on param = [ anyEvent ]
  
    //    //arr.every(callback(element[, index[, array]])[, thisArg])
    static every1(methods, arg1) {
        var self = this;
        return methods.every(function (method) {
        //    console.log(method.method, arg1, method.arguments)
            return operate[method.method](arg1, method.arguments);
        });
    }

    static conductForEachFlow(a, b, options) {


    }
}


class operate {

    // operate to check if the input is not null or undefined to be added
    static isEmpty(argA) { return Object.keys(argA).length === 0 ? true : false }
    static isNotEmpty(argA) { return argA !== '' && argA !== null && typeof argA !== 'undefined' ? true : false }
    //returs the data Type of the input.
    static is(argA) {
      //  console.log(argA);
        return Object.getPrototypeOf(argA).constructor.name;
    }
    static isInt(argA) { return Number.isInteger(argA); }
    static isNumber(argA) { return Number.parseFloat(argA).toString() !== 'NaN' }
    static isString(argA) { return typeof argA === 'string' ? true : false }
    /**
     * returns if the input is a key/value in the object options.argB
     * @param {*} argA
     * @param {*} argB  is required to be not empty
     * 
     */
    static isInsideArray(argA, argB) {
       // console.log("IsInside", argA, argB);
        return argB.indexOf(argA) > -1 ? true : false;
    }
    //curently works only for string numbers
    static isEqualStrict(argA, argB) { return argA === argB ? true : false; }
    //for array's one sided value existence check, return true if each element of a is present in b
    static isGreaterThan(argA, argB) { return argA > argB ? true : false }
    static isGreaterthanOrEqual(argA, argB) { return argA => argB ? true : false }
    static isSmallerthan(argA, argB) { return argA < argB ? true : false }
    static isSmallerthanOrEqual(argA, argB) { return argA <= argB ? true : false }
    static instanceof(argA, argB) { return console.log("work in process"); }
    //validate 2 Object, with key's and values
    static isSameObject(argA, argB) {

        return console.log("work in process");
    }
    //check if argB has all the keys from argA // only for array.
    static hasAllof(argA, argB) { return argA.every(function (value) { console.log(value, argB); return operate.isIn(value, argB) }); }
    static arrayIncludes(argA, argB) { return argA.includes(function (value) { return operate.isIn(value, argB); }); }
    //Check for bothArgument to be Number and Integer to be added.
    static isInRangeNumbers(argA, argB) { return argA.every(function (value) { return operate.isGreaterthanOrEqual(value, argB.min) && operate.isSmallerthanOrEqual(value, argB.max); }); }
    //return true if all items are the same in two unordered Array need to add a return of mismatch values as option.
    static isSameArray(argA, argB) {
        argA.sort(); argB.sort(); if (argA.length !== argB.length) return false;
        for (let i = 0; i < argA.length; i++) { if (argA[i] !== argB[i]) return false; } return true;
    }
    // Returns if a value is an array
    static isArray(value) { return value && Array.isArray(value) && typeof value === 'object' && value.constructor === Array; }
    // Returns if a value is a static
    static isstatic(value) { return typeof value === 'static'; }
    // Returns if a value is an object
    static isObject(value) { return value && typeof value === 'object' && value.constructor === Object; }
    static isHTML(argA) { return operate.is(argA).includes("HTML") }
    // Returns if a value is null
    static isNull(value) { return value === null; }
    // Returns if a value is undefined 
    static isUndefined(value) { return typeof value === 'undefined'; }
    // Returns if a value is a boolean 
    static isBoolean(value) { return typeof value === 'boolean'; }
    //Returns if a value is a regexp
    static isRegExp(value) { return value && typeof value === 'object' && value.constructor === RegExp; }
    // Returns if value is an error object
    static isError(value) { return value instanceof Error && typeof value.message !== 'undefined'; }
    // Returns if value is a date object
    static isDate(value) { return value instanceof Date; }
    //Returns if the value is a Prototyp
    static isPrototype(value) { console.log(Object.getPrototypeOf(value) === prototype1); }
    // Returns if a Symbol
    static isSymbol(value) { return typeof value === 'symbol'; }
    //This function validates a valid Url, Returns True or false
    static isValidUrl(string) { try { new URL(string); } catch (_) { return false; } return true; }
    static isValidJSONString(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }
    /**
     *  * Returns true if the given test value is an array containing at least one object; false otherwise.
     * */
    static isObjectArray_(argA) {
        for (var i = 0; i < argA.length; i++) {
            if (operate.isObject(argA[i])) {
                return true;
            }
        }
        return false;
    }
    static isChild(argA, argB) { }
    static isParent(argA, argB) { }
    static isEven(argA) { return numbers.every(function (e) { return e % 2 == 0; }); }
    static isOdd(argA) { return numbers.every(function (e) { return Math.abs(e % 2) == 1; }); }
    /**
     * 
     * @param {*} argA This is the input argument, it has to be a string operate.enforce(operate.isString(value), true)
     * @param {*} Object The Object to search this string in .
     * @param {*} options Currently there are 3 optional Parameters.
     *  options.Recurse : true [true,false] Work In progress
     * optoins.filter()
     * options.Lookin : keys [keys, values, all]
     * 
     */
   
}

var reqest = {
    method: 'get',// [ get,set,create,put,delete,filter, iterate,]
    entity: {
        entityIdentifier: '	ObjectID',
        entityModel: 'document',
        entityLocation: 'currentTab',
        entityType: 'HTML',
        entityName: "NameofEntity",
        entityId: 'entityId',
        entityLocation: 'Dom',
        entityServiceClass: "Particular Class which has it's Crud operators, for eg. document is one service class, similarly SpreadsheetApp is a service class in AppScript and ActionEntity is a service classfor any entity in actionSpace "
    },
    //a generic Optional Parameter for every method in across classes		
    options: {
        recurse: true, // operate.isoneof(value,[true,false])
        'and': {

        }


    }
}

class dataHelpers {

    static find(entity, keyTofind) {
        //console.log("finding", keyTofind, "in", entity);
        var result = Object.keys(entity).filter(function (key, index, self) {
            return !key.indexOf(keyTofind);
        });
        return result;
    }


}


function isIn(argA, entity, options) {
    var valuesArray = Object.values(entity)
    var result = Object.values(entity).filter(function (key, index, self) {
      //  console.log(argA,!key.prefix.indexOf(argA), key.prefix)
        if (!key.keyIdentifier.indexOf(argA) === true) {
           // console.log("tentative match found",key)
            if (argA.length === key.keyIdentifier.length) { 
              //  console.log("matchFound", key.prefix)    //To get strict Match To be enabled using options.
                var response = true;
              //  return true;
            }  
        }
        return !key.keyIdentifier.indexOf(argA);
    });
   // console.log("result",result);
    return result;

}
function uid() {
    let timmy = Date.now().toString(36).toLocaleUpperCase();
    let randy = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
    randy = randy.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
    return ''.concat(timmy, '-', randy);
}  

/**
 * AutComplete
 */

class AutoComplete {
    static checkSuggestion(keyword, editor) {
      //  console.log("keyword In testing",keyword,typeof keyword)
        keyword = this.removeSpecialCharacters(keyword.trim());
        if (this._isContains(snippets, keyword)) {

             console.log("editor",editor)
            for (let i = 0; i < snippets.length; ++i) {

                const obj = snippets[i];
                // console.log(obj.prefix+" "+keyword)

                if (obj.prefix === keyword.trim()) {

                   // console.log(editor.innerText.substring(0, editor.innerText.length - keyword.trim().length))

                    console.log("Found",obj.prefix);
                   // Caret.insertInTextarea(obj.body)
                    return true;
                    // this.setCaretToEnd(editor)
                }
            }
        } else {
         //   console.log("Nope");
            return false;
        }
    }

    static removeSpecialCharacters(keyword) {
        // console.log(keyword)
        const desired = keyword.replace(/[^\w\s]/gi, '');
        // console.log(desired.trim())
        return desired
    }

    static _isContains(json, value) {
        // console.log(value.trim())
        let contains = false;
        Object.keys(json).some(key => {
            contains = typeof json[key] === 'object' ? this._isContains(json[key], value.trim()) : json[key] === value.trim();
            return contains;
        });
        return contains;
    }

    static setCaretToEnd(target) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(target);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        target.focus();
        range.detach(); // optimization

        // set scroll to the end if multiline
        target.scrollTop = target.scrollHeight;
    }
}


function* createIndex() {
    let number = 1;
    while (true)
        yield number++;
}