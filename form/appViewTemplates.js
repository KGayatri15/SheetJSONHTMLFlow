var invoiceJSON = {
    'invoice':{
        'name':'div',
        'class':'invoice',
    'header':{
        'name':'header',
        'h1':{
            'name':'h1',
            'textContent':'Invoice'
        },
        'address':{
            'name':'address',
            'contenteditable':'',
            'Name':{
                'name':'p',
                'textContent':'Geeta Baweja'
            }, 
            'Place':{
                'name':'p',
                'innerHTML':'Connaught Place, Delhi<br> India',
            },
            'pincode':{
                'name':'p',
                'textContent':'110001'
            },
        },
    },
    'article':{
        'name':'article',
            'h1':{
             'name':'h1',
             'textContent':'Recipient',
            },
            'address':{
            'name':'address',
            'contenteditable':'',
                'p':{
                    'name':'p',
                    'innerHTML':'Flat,House No.,Building,Company<br>Colony,Street,Sector<br>Town/City, State<br>Pincode',
                }
            },
            'meta':{
                'name':'table',
                'class':'meta',
                'tr1':{
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'Due Date'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'9th April 2021'
                        }
                    }
                },
                'tr2':{
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'Balance'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span1':{
                            'name':'span',
                            'id':'prefix',
                            // 'contenteditable':'true',
                            'textContent':'Rs. ',
                        },
                        'span2':{
                            'name':'span',
                            'textContent':'600.00'
                        }
                    }
                },
                'tr3':{
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'Doc Number'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span':{
                            'name':'span',
                            'id':'DocNumber',
                             'contenteditable':'',
                            'textContent':'101138'
                        }
                    }
                },
                'tr4':{
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'Status'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span':{
                            'name':'span',
                            // 'contenteditable':'',
                            'textContent':'Payable'
                        }
                    }
                },
            },
            'inventory':{
                'name':'table',
                'class':'inventory',
                'thead':{
                    'name':'thead',
                    'tr':{
                        'name':'tr',
                        'th1':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Description',
                            } 
                        },
                        'th2':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Amount',
                            } 
                        },
                        'th3':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Detail Type',
                            } 
                        },
                        'th4':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Ref',
                            } 
                        },
                        'th5':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Account',
                            } 
                        },
                        'th6':{
                            'name':'th',
                            'span':{
                                'name':'span',
                                'contenteditable':'',
                                'textContent':'Line Status',
                            } 
                        },
                    }
                },
                'tbody':{
                    'name':'tbody',
                    'id':'tbody',
                    'trCustom':{
                        'name':'tr',
                        'id':'trCustom',
                        'td1':{
                            'name':'td',
                            'a':{
                                'name':'a',
                                'id':'Custom',
                                'class':'cut',
                                'textContent':'-',
                                'data-command': `[{"command":"RemoveItem"}]`,
                            },
                            'span':{
                                'name':'span',
                                'class':'Description',
                                'contenteditable':'',
                                'textContent':'Sample Expense'
                            }
                        },
                        'td2':{
                            'name':'td',
                            'span1':{
                                'name':'span',
                                'data-prefix':'',
                                'textContent':'Rs. '
                            },
                            'span2':{
                                'name':'span',
                                'class':'Amount',
                                'contenteditable':'',
                                'textContent':'600.00'
                            }
                        },
                        'td3':{
                            'name':'td',
                            'span2':{
                                'name':'span',
                                'class':'DetailType',
                                'contenteditable':'',
                                'textContent':'Expense Detail'
                            }
                        },
                        'td4':{
                            'name':'td',
                            'span2':{
                                'name':'span',
                                'class':'Ref',
                                'contenteditable':'',
                                'textContent':'DEF234'
                            }
                        },
                        'td5':{
                            'name':'td',
                            'span':{
                                'name':'span',
                                'class':'Account',
                                'contenteditable':'',
                                'textContent':'EFG345'
                            }
                        },
                        'td6':{
                            'name':'td',
                            'span2':{
                                'name':'span',
                                'class':'LineStatus',
                                'contenteditable':'',
                                'textContent':'Billable'
                            }
                        }
                    }
                }
            },
            'add':{
                'name':'a',
                'class':'add',
                'textContent':'+',
                'data-command': `[{"command":"NewItem"}]`,
            },
            'balance':{
                'name':'table',
                'class':'balance',
                'tr1':{
                    'name':'tr',
                    'th':{
                        'name':'th',
                        'span':{
                            'name':'span',
                            'contenteditable':'',
                            'textContent':'Total Amount'
                        }
                    },
                    'td':{
                        'name':'td',
                        'span1':{
                            'name':'span',
                            'data-prefix':'',
                            'textContent':'Rs. '
                        },
                        'span2':{
                            'name':'span',
                            'textContent':'600.00'
                        }
                    }
                },
            },
           
        },
        'submit':{
            'name':'button',
            'full-width':'',
            'textContent':"Submit Invoice",
            'data-command': `[{"command":"SubmitInvoice"}]`,
        }
    }
}
var newItemJSON ={
        'name':'tr',
        'id':'',
        'td1':{
            'name':'td',
            'a':{
                'name':'a',
                'class':'cut',
                'textContent':'-',
                'data-command': `[{"command":"RemoveItem"}]`,
            },
            'span':{
                'name':'span',
                'class':'Description',
                'contenteditable':'',
                'textContent':''
            }
        },
        'td2':{
            'name':'td',
            'span1':{
                'name':'span',
                'data-prefix':'',
                'textContent':'Rs. '
            },
            'span2':{
                'name':'span',
                'class':'Amount',
                'contenteditable':'',
                'textContent':''
            }
        },
        'td3':{
            'name':'td',
            'span2':{
                'name':'span',
                'class':'DetailType',
                'contenteditable':'',
                'textContent':''
            }
        },
        'td4':{
            'name':'td',
            'span2':{
                'name':'span',
                'class':'Ref',
                'contenteditable':'',
                'textContent':''
            }
        },
        'td5':{
            'name':'td',
            'span':{
                'name':'span',
                'class':'Account',
                'contenteditable':'',
                'textContent':''
            }
        },
        'td6':{
            'name':'td',
            'span2':{
                'name':'span',
                'class':'LineStatus',
                'contenteditable':'',
                'textContent':''
            }
        }
}
var GetDataFromSheet = {
    'form':{
        'name':'form',
        'class':'modal-content animate',
        'id':'get',
        'h1':{
            'name':'h1',
            'innerText':'Get Data from Sheet'
        },
        'labelFileID':{
            'name':'label',
            'b':{
                'name':'b',
                'innerText':'File ID of Spreadsheet'
            }
        },
        'inputFileID':{
            'name':'input',
            'type':'text',
            'placeholder':'Enter FileID of spreadsheet',
            'id':'fileID',
            'required':true
        },
        'labelName':{
            'name':'label',
            'b':{
                'name':'b',
                'innerText':'Name of the sheet'
            }
        },
        'inputName':{
            'name':'input',
            'type':'text',
            'placeholder':'Enter Name of the Sheet',
            'id':'sheetName',
            'required':true
        },
        'labelRange':{
            'name':'label',
            'b':{
                'name':'b',
                'innerText':'Range'
            }
        },
        'inputRange':{
            'name':'input',
            'type':'text',
            'placeholder':'Enter Range',
            'id':'range',
            'required':true
        },
        'submit':{
            'name':'input',
            'type':'submit',
            'class':'button btn',
            'value':'Get',
        },
    }
}
var SendDataToSheet = {
    'form':{
        'name':'form',
        'class':'modal-content animate',
        'id':'set',
        'h1':{
            'name':'h1',
            'innerText':'Send Data to Sheet'
        },
        'label1':{
            'name':'label',
            'b':{
                'name':'b',
                'innerText':'File ID of Spreadsheet'
            }
        },
        'input1':{
            'name':'input',
            'type':'text',
            'placeholder':'Enter FileID of spreadsheet',
            'id':'file-ID',
            'required':'true'
        },
        'label2':{
            'name':'label',
            'b':{
                'name':'b',
                'innerText':'Name of the sheet'
            }
        },
        'input2':{
            'name':'input',
            'type':'text',
            'placeholder':'Enter Name of the Sheet',
            'id':'sheet_Name',
            'required':'true'
        },
        'input4':{
            'name':'input',
            'type':'submit',
            'class':'button btn',
            'value':'Send',
        },
    }
}
var SignUpJSON = {
    'form':{
    'name':'form',
    'class':'modal-content',
    'id':'signup',
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
    // 'onsubmit':"login(event);",
    'id':'signin',
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
        'data-command': `[{"command":"signup"}]`,
        'class':'button btn',
        'innerText':'SignUp with ehh'
    },
    'signin':{
        'name':'button',
        'data-command': `[{"command":"signin"}]`,
        'class':'button btn',
        'innerText':'Sign In ehh'
    },
    'google':{
        'name':'button',
        'data-command': `[{"command":"google"}]`,
        'class':'button btn',
        'style':'background-color: #dd4b39;',
        'i':{
            'name':'i',
             'class':'fa fa-google fa-fw'
        },
        'innerText':'Sign In with Google+'
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
                'innerText':'Get Data',
                'data-command': `[{"command":"view","entity":"getForm"}]`,
            },
            'setData':{
                'name':'button',
                'data-command': `[{"command":"view","entity":"setForm"}]`,
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
                'data-command': `[{"command":"FSOpenDirectory"}]`,
            },
            'New':{
                'name':'button',
                'innerText':'New',
                'data-command': `[{"command":"FSNew"}]`,
            },
            'Open':{
                'name':'button',
                'innerText':'Open a File(Ctrl + O)',
                'data-command': `[{"command":"FSOpen"}]`,
            },
            'Save':{
                'name':'button',
                'innerText':'Save (Ctrl + S)',
                'data-command': `[{"command":"FS_Save"}]`,
            },
            'Save As':{
                'name':'button',
                'innerText':'Save as(F12)',
                'data-command': `[{"command":"FS_SaveAs"}]`,
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
                            'data-command': `[{"command":"caret"}]`,
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
        'data-command': `[{"command":"caret"}]`,
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
     'innerText':'',
     //innerText - name of the file
     'data-command': `[{"command":"file"}]`,
}