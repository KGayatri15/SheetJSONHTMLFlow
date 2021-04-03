var getData = {
    'flowRequest':[{
       objectModel:SpreadsheetApp,
          method:"getActiveSpreadsheet",
          callBack:{
               method:"getSheetByName",
               arguments:["SheetName"]
          },
    },{
      objectModel:"fromPrevious[0]",
          method:'getRange',
          arguments:[1,1,{objectModel:"fromPrevious[0]",method:'getLastRow',}],//example arguments:["A1:C10"]
           callBack:{
              method:'getValues', 
          }
    }]
  }
var setData = {
    'flowRequest':[{
       objectModel:SpreadsheetApp,
          method:"getActiveSpreadsheet",
          callBack:{
               method:"getSheetByName",
               arguments:["SheetName"]
          },
    },{
      objectModel:"fromPrevious[0]",
       method:'appendRow',
       arguments:[[1,2,3]]//include data in the inside array
    }]
  }
var SignUpRequestModel = {
    'flowRequest':[
    {
        objectModel:SpreadsheetApp,
        method:"getActiveSpreadsheet",
        callBack:{
             method:"getSheetByName",
             arguments:["registeredActorDatabase"]
         },
    },{
        objectModel:"fromPrevious[0]",
        method:'getRange',
        arguments:[1,1,{objectModel:"fromPrevious[0]",method:'getLastRow',}],
         callBack:{
            method:'getValues', 
        }
    },{
        objectModel:operate,
        method:'TwoD_OneD',
        arguments:["fromPrevious[1]"],
        callBack:{
          method:'indexOf',
          arguments:['ghsbjad@gmail.com']
        }
    },
    // if fromPrevious[3] is 1 then this request proceeds
    {
        validator:{
            method:'isGreaterThan',
            arguments:["fromPrevious[2]",-1],
            output:false,
        },
        objectModel:'fromPrevious[0]',
        method:'appendRow',
        arguments:[['ghsbjad@gmail.com','gh','bhjbdjhD']]
    },{
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
      }
    },
    {
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
]}
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
          arguments:['g@gmail.com']
        } 
    },
    //if result[2] is greater than -1 else Email Id doesn't exist
    {
        validator:{
            method:'isGreaterThan',
            arguments:["fromPrevious[2]",-1],
            output:true,
        },
        objectModel:"fromPrevious[0]",
        method:"getRange",
        arguments:[{objectModel:operate,method:'add',arguments:["fromPrevious[2]", 1]} ,3],
        callBack:{
             method:'getValue',
         }
    },{
        objectModel:operate,
        method:"isEqual",
        arguments:["fromPrevious[3]","12345"]
    }
    //if result is true then Correct Credentials or else wrong Password
]}
function myFunction() {
  var engine = new ActionEngine();
  var SignUp = engine.processReq(SignInRequestModel);
  console.log(SignUp);
}
