var SignUpJSON = {
    'form':{
    'name':'form',
    'class':'modal-content',
    'onsubmit':"submitData(event);",
    'container':{
        'name':'div',
        'class':'container',
        'h1':{
            'name':'h1',
            'innerText':'Sign Up',
        },
        'p1':{
            'name':'p',
            'innerText':'Please fill in this form to create an account.',
        },
        'hr':{'name':'hr'},
        'labelEmail':{
            'name':'label',
            'for':'email',
            'innerHTML':'<b>Email</b>',
        },
        'inputEmail':{
            'name':'input',
            'type':'email',
            'id':'email',
            'required':'true',
            'placeholder':'Enter Email',
        },
        'labelUsername':{
            'name':'label',
            'for':'username',
            'innerHTML':'<b>Username</b>',
        },
        'inputUsername':{
            'name':'input',
            'type':'text',
            'id':'username',
            'required':'true',
            'placeholder':'Enter Username',
        },
        'labelPsw':{
            'name':'label',
            'for':'psw',
            'innerHTML':'<b>Password</b>',
        },
        'inputPasw':{
            'name':'input',
            'type':'password',
            'id':'psw',
            'required':'true',
            'minlength':'5',
            'placeholder':'Enter Password',
        },
        'label':{
            'name':'label',
            'checkbox':{
                'name':'input',
                'type':'checkbox',
                'checked':'checked',
                'style':'margin-bottom:15px',
                'innerText':'Remember me'
            }
        },
        'p2':{
            'name':'p',
            'innerText':'Already have an account ?',
            'a':{
                'name':'a',
                'href':'./signin.html',
                'style':'color:dodgerblue',
                'innerText':'Sign In'
            }
        },
        'clearfix':{
            'name':'div',
            'class':'clearfix',
            'submit':{
                'name':'input',
                'type':'submit',
                'class':'signupbtn',
                'value':'Sign Up'
            },
            'reset':{
                'name':'input',
                'type':'reset',
                'class':'cancelbtn',
                'value':'Cancel'
            },
        }
    }
}
}
var SignInJSON = {
    'form':{
    'name':'form',
    'class':'modal-content',
    'onsubmit':"login(event);",
    'container':{
        'name':'div',
        'class':'container',
        'h1':{
            'name':'h1',
            'innerText':'Sign In',
        },
        'inputEmail':{
            'name':'input',
            'type':'text',
            'id':'email',
            'required':'true',
            'placeholder':'Enter Email',
        },
        'inputPassword':{
            'name':'input',
            'type':'password',
            'id':'password',
            'required':'true',
            'minlength':'5',
            'placeholder':'Enter Password',
        },
        'submit':{
            'name':'input',
            'type':'submit',
            'class':'signin',
            'value':'Sign In'
        },
        'p2':{
            'name':'p',
            'innerText':'Already have an account ?',
            'a':{
                'name':'a',
                'href':'./signup.html',
                'style':'color:dodgerblue',
                'innerText':'Sign Up'
            }
        },
    }
    }
}
var indexJSON = {
    'name':'div',
    'signup':{
        'name':'button',
        'onclick':"window.location.href='./html/signup.html';",
        'class':'ehh btn',
        'innerText':'SignUp with ehh'
    },
    'signin':{
        'name':'button',
        'onclick':"window.location.href='./html/signin.html';",
        'class':'ehh btn',
        'innerText':'Sign In ehh'
    },
    'google':{
        'name':'button',
        'onclick':"Authorization.oAuth(event,'json');",
        'class':'google btn',
        'i':{
            'name':'i',
             'class':'fa fa-google fa-fw'
        },
        'innerText':'Sign In with Google+'
    }
}
var basicLayout = {
    actionSpace: {
        name: 'div',
        class: "actionSpace",
        // innerText: "ActionSpace",
        header: {
            'name': 'div',
            'desc': 'This is a horizontical bar, more functionality of this bar to be added',
            'id': 'header',
            'class': 'box header',
            //  'innerText':"header",
            'brand': {
                'name': 'div',
                'desc': 'This is a horizontical bar, more functionality of this bar to be added',
                'id': 'brand',
                'innerText': "[ everything happens here ]",
                'class': 'brand'
            },
            'input': {
                'name': 'input',
                'desc': 'This is a horizontical bar, more functionality of this bar to be added',
                'id': 'actionSearch',
                'placeholder': "search here...",
                'class': 'searchBar'
            },
            'actionLinkBar': [
                {
                    'name': 'a',
                    'desc': 'this leads to actionPage',
                    'id': 'action button',
                    'innerText': "action",
                    'class': 'tabBtn',
                    'data': 'action',
                    'href': "#action",

                },
                {
                    'name': 'a',
                    'desc': 'this leads to actionPage',
                    'id': 'people button',
                    'innerText': "people",
                    'class': 'tabBtn',
                    'data': 'people',
                    'href': "#people",

                }, {
                    'name': 'a',
                    'desc': 'this leads to actionPage',
                    'id': 'people button',
                    'innerText': "settings",
                    'class': 'tabBtn',
                    'data': 'setting',
                    'href': "#settings",
                },



            ],


        },
        leftSidebar: {
            name: "div",
            class: "box leftSidebar ",
            //     innerText: "left-sidebar", 
            id: 'leftSidebar'
        },
        actionSpaceEditor: {
            toolList: [
                {
                    name: 'button',
                    id: "add",
                    class: "material-icons",
                    'innerText': "add",
                    //'onclick': "document.execCommand('bold',false,null)",
                    'data-command': `[{"command":"new","entity": "actionContent","value":"innerHTML"}]`,
                    // 'data': `process.act(entity, insertBreakAtPoint, document)`,
                },
                {
                    name: 'button',
                    id: "save",
                    class: "material-icons",
                    'innerText': "save",
                    //'data': '[{ "call": "StorageHelper.saveToStorage(document.getElementById(actionContent).getAttribute(name),document.getElementById(actionContent).innerHTMl)" }]',
                    'data-command': `[{"command":"save","entity": "actionContent","value":"innerHTML","name":"actionContent.firstSibling.getAttribute('id')"}]`,


                },
                //'onclick': `StorageHelper.saveToStorage(,`,

                {
                    name: 'button',
                    id: "format_bold",
                    class: "material-icons",
                    'innerText': "format_bold",
                    'onclick': "document.execCommand('bold',false,null)"
                    // 'data': `process.act(entity, insertBreakAtPoint, document)`,

                },
                {
                    name: 'button',
                    id: "format_italic",
                    class: 'material-icons',
                    'innerText': 'format_italic',
                    'data-cmd': 'italic',
                    'data': "process.act('italic', false, null, execCommand(), document)",
                }, {
                    name: 'button',
                    id: "underline",
                    class: 'material-icons',
                    'innerText': 'format_underline',
                    'data-cmd': 'underline',
                    'onclick': ""
                },
                {
                    name: 'button',
                    id: "delete",
                    class: 'material-icons',
                    'innerText': "delete"
                },
                {
                    name: 'select',
                    id: "delete",
                    innerHTML: `<select name="cars" id="cars">
                   <option value="rich text view">rich text view</option>
                   <option value="Code">code view</option>
                   <option value="opel">tree view</option>
                   <option value="output Preview">output Preview</option>
                 </select>`

                },


            ],
            editor: [
                {
                    actionContentTitle: {
                        name: 'div',
//                        innerText: actionStorySample.name,

                    },
                    name: 'actionStory',
                    'class': 'actionStory',
  //                  'actionContent': actionStorySample,
                    // mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
                    //  output: ['self', 'output'],
                    state: 'idle', //['selectable','selected','editable','inEdit','draggable','inDrag','locked','hidden']
                    id: "actionStory"
                },

            ],

        },
        rightSidebar: {
            name: "div",
            class: "box rightSidebar",
            innerText: ""
        },

        footer: {
            name: "div",
            class: "footer",
            innerHTML: `made with 🧠 & 🧡, < br > during 🌧️ at <b>shunya.ek</b>, goa, india.< br >with help from google & the world-wide - web tech community.`
        }
    }



}
var actionStoryTemplate = {
    "name": 'actionStoryTemplate_title',
    "id": 'actionStoryTemplate',
    innerHTML: actionUserContent,
    //textContent: "this is a template actionStory",
    class: 'editable actionContent',
    'before': 'name',
     contentEditable: true
}

var headerModelSchemaV1 = {
    header: {
        'name': 'ul',
        'desc': 'This is a horizontical bar, more functionality of this bar to be added',
        'id': 'header',
        'class':'header',
        //  'innerText':"header",
        'brand': {
            'name': 'span',
            'desc': 'This is a horizontical bar, more functionality of this bar to be added',
            'id': 'brand',
            'textContent': "[ everything happens here ]",
            'class': 'brand'
        },
        'input': {
            'name': 'input',
            'desc': 'This is a horizontical bar, more functionality of this bar to be added',
            'id': 'actionSearch',
            'placeholder': "search here...",
            'class': 'searchBar',
            'autocomplete': "off"
        },
        'menu': {
            "name": "menu",
            'id': "topmenu",
            'class': 'row',
            "span": [
                {
                    'name': 'a',
                    'href': '#action',
                    'textContent': 'action',
                },
                {
                    'name': 'a',
                    'href': '#people',
                    'textContent': 'People'
                },
                {
                    'name': 'a',
                    'href': '#setting',
                    'textContent': 'setting'
                },
                {
                    'name': 'a',
                    'href': '#about',
                    'textContent': 'about',

                },
                // {
                //     'name': 'button',
                //     'class': "material-icons",
                //     'textContent': 'more_vert',

                // }, 
            ]

        },
        'br1':{
            'name':'br',
        },
        'sheet':{
            'name':'GoogleSheet',
            'innerText':'Google Sheet :- ',
            'getData': {
                'name':'button',
                // 'class':'button',
                'onclick':"document.getElementById('get').style.display='block'",
               // 'style':'width:10%;',
                'innerText':'Get Data'
            },
            'setData':{
                'name':'button',
                // 'class':'button',
                 'onclick':"document.getElementById('send').style.display='block'",
               // 'style':'width:10%;',
                'innerText':'Send Data'
            }
        },
        'br2':{
            'name':'br',
        },
        'File System':{
            'name':'FileSystem',
            'innerText':'Local File System :-',
            'OpenDirectory':{
                'name':'button',
                'innerText':'Open a Directory',
                'onclick':'processFS.OpenDirectory(event);'
            },
            'New':{
                'name':'button',
                'innerText':'New',
                'onclick':'processFS.NewFile(event);'
            },
            'Open':{
                'name':'button',
                'innerText':'Open a File(Ctrl + O)',
                'onclick':'processFS.readFile(event);'
            },
            'Save':{
                'name':'button',
                'innerText':'Save (Ctrl + S)',
                'onclick':'processFS.saveFile(event);'
            },
            'Save As':{
                'name':'button',
                'innerText':'Save as(F12)',
                'onclick':'processFS.saveAsFile(event);'
            }
        }
    }
}

var iconBar = {
   // 'name': "iconBar",
   // 'style':"visibility:hidden",
  //  'id': 'iconBar',
  //  'class': "material-icons",
  //  'textContent': 'drag_indicator',
    "iconBarTools":[
    {
        'name': 'button',
        'class': "material-icons",
        'id': "add",
        'innerText': "add",
        'data-command': `[{"command":"new","entity": "actionContent","value":"innerHTML"}]`,
    },
    {
        'name': 'button',
        'class': "material-icons",
        'id': "save",
        'innerText': "save",
        'data-command': `[{"command":"save","entity": "actionContent","value":"innerHTML","name":"loadedRouteTitle"}]`,
    },
    {
        'name': 'button',
        'id': "cloud",
        'class': 'material-icons',
        'innerText': "cloud",
        'data-command': `[{"command":"cloud"}]`
    },
    {
        'name': 'button',
        'id': "download",
        'class': 'material-icons',
        'innerText': "download",
        'data-command': `[{"command":"download"}]`
    },
    {
        'name': 'button',
        'id': "delete",
        'class': 'material-icons',
        'innerText': "delete",
        'data-command': `[{"command":"delete"}]`
    },
    {
        'name':'button',
        'id':'logout',
        'class':'material-icons',
        'innerText':"logout",
        'data-command':`[{"command":"logout"}]`
    }
    ]
}

var richTextBar = {
      'name': "div",
    //   'id': 'richTextBar',
    // 'class': "material-icons",
    "iconBarTools": [
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'notes',
        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'title'
        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'insert_photo'
        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'code',

        },
          {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'attach_file',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'horizontal_rule',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'find_replace',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'grid_4x4',

        },
    ]
}

var actionSpaceModel = {
    'actionSpace': {
        //RouteNavBar to be added.
        name: "section",
        id: "actionSpace",
        'class':'editor',
        'iconBar': iconBar,
        "loadedRouteTitle": {
            "name": "div",
            'id':"loadedRouteTitle",
            "contentEditable":"true",
            'textContent': actionStoryTemplate.name
        },
     //   'textContent': "yo",
       // 'toolbar': iconBar,
        'editor': {
            // 'richTextBar': richTextBar,
            'name': 'div',
            'id': "editor",
            //'contentEditable':'true',
            "ol": [
                {  
                    'name':'contentBlock',
                    'id':'contentBlock',
                    'textContent': actionStoryTemplate.innerHTML
                },
],      
        },
       //bottom bar like textNote to be added.
    }
}

var HorizonticalMenuTemplateSchema = {
        'menu': {
            "name": "topmenu",
            'id':"topmenu",
            "li": [
                {'name': 'a',
                    'href': '#action',  
                    'textContent': 'action',
                },
                {
                    'name': 'a',
                    'href': '#people',
                    'textContent': 'People'
                },
                {
                    'name': 'a',
                    'href': '#setting',
                    'textContent': 'setting'
                },
                {
                    'name': 'a',
                    'href': '#about',
                    'textContent': 'about',
                  
                },
                  {
                      'name': 'button',
                     'class': "material-icons",
                      'textContent': 'more_vert',
    
                }
            ]
           
        }
    
    }
var sidebar = {
    'iconBar': {
        "name": "ul",
        "menu": [
            {
                'name': 'button',
                'class': "material-icons",
                'href': '#action',
                'innertext': 'add',
            },
            {
                'name': 'button',
                'href': '#people',
                'class': "material-icons",
                'innerText': 'publish'
            },
            {
                'name': 'button',
                'href': '#setting',
                'class': "material-icons",
                'innerText': 'save'
            },
            {
                'name': 'button',
                'class': "material-icons",
                'innerText': 'delete',

            }
        ]

    }

}

var blockModelSchema= {
    "name": "div",
    "id": "blockModelSchma",
    "blockType":"html"
}

var typeOfBlocks = ["richtext,json,tree,html,javascript,table,image,link,divider,style,script,@mention,embed,button,breadcrumb,annotation"]
//should always be wrapped around a List/collection
var itemModelSchema = {
    "name": "div",
    'class': "card",
    "item": [
        {
            "name": "li",
            'class': "card",
            "textContent" :"Item1",
            "innerItem": [


            ]
        },
        {
            "name": "li",
            'class': "card",
            "textContent": "Item1 Description",
            "innerItem": [


            ]
        },
    ]
}
var itemListModelSchema = {
    itemList: {
        name: "ol",
        id: "itemListModelSchema",
      //  "class": "material-icons",
        "textContent":"shortcut",
        "li": itemModelSchema,
    }
}
    //hotKeyAutoSuggestItemModelSchema
var hotKeyAutoSuggestItemViewSchema = [
    {
        'name': 'span',
        "id": "listItemIcon",
        'class': "material-icons",
        'textContent': 'shortcut',
    },
    {
        'name': 'span',
        "id": "listItemId",
        'textContent': '! html',
    },
    {
        'name': 'div',
        "id": "listItemId",
        'textContent': 'List Item Content',
    },
]

var sidebarJSON = {
    // 'sidebar':{
        'name':'div',
        'class':'row',
        'menu':{
            'name':'div',
            'class':'sidebar col-md-4',
            'frontEnd':{
                'name':'ul',
                'id':'frontEnd',
                'workspace':{
                        'name':'li',
                        'span':{
                            'name':'span',
                            'class':'caret',
                            'innerText':'Workspace'
                        },
                        'list':{
                            'name':'ul',
                            'class':'nested',
                            'id':'workspace',
                        }
                }
            }
        }
  //  }
};
var directoryJSON = {
    'li':{
    'name':'li',
    'span':{
        'name':'span',
        'class':'caret',
        'innerText':'', //inner Text will be included
    },
    'list':{
        'name':'ul',
        'class':'nested',
        'id':'' //id - Unique ID with which directory handle of this folder can ke retrieved from indexDB
    }
    }
}
var fileJSON = {
    'name':'li',
    'id':'', //id - Unique ID with which file handle of this file retrieved from indexDB
     'class':'file',//used for opening file
     'innerText':''
     //innerText - name of the file
}

var richtextToolBarButtonModel = [
        {
        name: 'select',
        id: 'TextThemeStyleList',
        class: 'toolTip',
        data:"Select Text + Choose a text Style, or save a new style...",
        option: [
            {
                name: 'option',
                id: 'TextThemeStyleitem1',
                textContent: "H1",
                class: "H1",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "H2",
                class: "H2",
            },

            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "H3",
                class: "H3",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "Select Text and Save a new Template",
                
            },

        ]
        },
         {
        name: 'select',
        id: 'TextFontList',
        class: 'toolTip',
        data: "Select font style",
        option: [
            {
                name: 'option',
                id: 'TextThemeStyleitem1',
                textContent: "Helvitica",
                class: "selectText",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "Arial",
                class: "H2",
            },

            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "H3",
                class: "H3",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "Select Text and Save a new Template",

            },

        ]
    }

]


