var SignUpRequestModel = {
    'flowRequest':[
    {//0
        objectModel:SpreadsheetApp,
        method:"getActiveSpreadsheet",
        callBack:{
             method:"getSheetByName",
             arguments:["registeredActorDatabase"]
         },
    },{//1
        objectModel:"fromPrevious[0]",
        method:'getRange',
        arguments:[1,1,{objectModel:"fromPrevious[0]",method:'getLastRow',}],
         callBack:{
            method:'getValues', 
        }
    },{//2
        objectModel:operate,
        method:'TwoD_OneD',
        arguments:["fromPrevious[1]"],
        callBack:{
          method:'indexOf',
          arguments:[]//Username
        }
    },
    {//3
        validator:{
            method:'isGreaterThan',
            arguments:["fromPrevious[2]",-1],
            output:false,
        },
        objectModel:'fromPrevious[0]',
        method:'appendRow',
        arguments:[]//[,'gh','bhjbdjhD'] 
    },{//4
      validator:{
        method:'isEqual',
        arguments:["fromPrevious[3]",null],
        output:true
      },
      objectModel:ContentService,
      method:'createTextOutput',
      arguments:[JSON.stringify({'result':'Failed','output':'User already exists'})],
      callBack:{
        method:'setMimeType',
        arguments:[ContentService.MimeType.JSON]
      },
      exit:true
    },
    {//5
      validator:{
        method:'isEqual',
        arguments:["fromPrevious[3]",null],
        output:false
      },
      objectModel:ContentService,
      method:'createTextOutput',
      arguments:[JSON.stringify({'result':'Success','output':'Registered Successfully'})],
      callBack:{
        method:'setMimeType',
        arguments:[ContentService.MimeType.JSON]
      }
    }
]};
var invoiceForm = {
  'flowRequest':[
  {//0
     objectModel:SpreadsheetApp,
        method:"getActiveSpreadsheet",
        callBack:{
             method:"getSheetByName",
             arguments:["invoiceForm"]
        },
  },{//1
    objectModel:"fromPrevious[0]",
    method:'getRange',
    arguments:[{objectModel:operate,
                method:'add',
                arguments:[{objectModel:"fromPrevious[0]",method:'getLastRow'}, 1]
              },1],//include row,column of data array
    callBack:{
      method:'setValues',
      arguments:[]//data
    }
  },{//2
      objectModel:ContentService,
      method:'createTextOutput',
      arguments:[JSON.stringify({'result':'Success','output':'Invoice Registered Successfully'})],
      callBack:{
        method:'setMimeType',
        arguments:[ContentService.MimeType.JSON]
      }
    }
]};
var sendData = {
  'flowRequest':[
  {//0
     objectModel:SpreadsheetApp,
        method:"openById",
        arguments:[],//Id of spreadsheet
        callBack:{
             method:"getSheetByName",
             arguments:[]//Sheet Name
        },
  },{//1
    objectModel:"fromPrevious[0]",
    method:'getRange',
    arguments:[{objectModel:operate,
                method:'add',
                arguments:[{objectModel:"fromPrevious[0]",method:'getLastRow'}, 1]
              },1],//include row,column of data array
    callBack:{
      method:'setValues',
      arguments:[]//data
    }
  },{//2
      objectModel:ContentService,
      method:'createTextOutput',
      arguments:[JSON.stringify({'result':'Success','output':'Data Exported Successfully'})],
      callBack:{
        method:'setMimeType',
        arguments:[ContentService.MimeType.JSON]
      }
    }
]
};
var SignInRequestModel = {
    'flowRequest':[
    {//0
        objectModel:SpreadsheetApp,
        method:"getActiveSpreadsheet",
        callBack:{
            method:'getSheetByName',
            arguments:["registeredActorDatabase"]
        },
    },{//1
        objectModel:"fromPrevious[0]",
        method:'getRange',
        arguments:[1,1,{objectModel:"fromPrevious[0]",method:'getLastRow'}],
        callBack:{
             method:'getValues',
         }
    },{//2
        objectModel:operate,
        method:'TwoD_OneD',
        arguments:["fromPrevious[1]"],
        callBack:{
          method:'indexOf',
          arguments:[]//emailID
        } 
    },
    {//3
      validator:{
          method:'isGreaterThan',
          arguments:["fromPrevious[2]",-1],
          output:false,
      },
      objectModel:ContentService,
      method:'createTextOutput',
      arguments:[JSON.stringify({'result':'Failed','output':"User doesn't exist. Sign Up now"})],
      callBack:{
        method:'setMimeType',
        arguments:[ContentService.MimeType.JSON]
      },
      exit:true
    },
    //if result[2] is greater than -1 else Email Id doesn't exist
    {//4
        validator:{
            method:'isGreaterThan',
            arguments:["fromPrevious[2]",-1],
            output:true,
        },
        objectModel:"fromPrevious[0]",
        method:"getRange",
        arguments:[{objectModel:operate,method:'add',arguments:["fromPrevious[2]", 1]} ,2],
        callBack:{
             method:'getValue',
         }
    },{//5
        objectModel:operate,
        method:'isEqual',
        arguments:["fromPrevious[4]"],//password to be included
    },{//6
      validator:{
        method:'isEqual',
        arguments:["fromPrevious[5]",true],
        output:true
      },
      objectModel:ContentService,
      method:'createTextOutput',
      arguments:[JSON.stringify({'result':'Success','output':'Correct Credentials! . Redirecting you to the application'})],
      callBack:{
        method:'setMimeType',
        arguments:[ContentService.MimeType.JSON]
      },
      exit:true
    },{//7
      validator:{
        method:'isEqual',
        arguments:["fromPrevious[5]",true],
        output:false
      },
      objectModel:ContentService,
      method:'createTextOutput',
      arguments:[JSON.stringify({'result':'Failed','output':'Incorrect Password. Try Again'})],
      callBack:{
        method:'setMimeType',
        arguments:[ContentService.MimeType.JSON]
      },
      exit:true
    }  
]};
var getData = {
  'flowRequest':[{
     objectModel:SpreadsheetApp,
     method:"openById",
     arguments:[]//SpreadsheetId
  },{
    objectModel:"fromPrevious[0]",
        method:'getRange',
        arguments:[],//example arguments:["Sheet1!A1:C10"]
         callBack:{
            method:'getValues', 
        }
  },
]};