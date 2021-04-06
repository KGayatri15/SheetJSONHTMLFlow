var getData = {
  'flowRequest':[{
     objectModel:SpreadsheetApp,
        method:"getActiveSpreadsheet",
        callBack:{
             method:"getSheetByName",
             arguments:["registeredActorDatabase"]
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
             arguments:["registeredActorDatabase"]
        },
  },{
    objectModel:"fromPrevious[0]",
     method:'appendRow',
     arguments:[[1,2,3]]//include data in the inside array
  }]
}
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
function doGet(e){
try{
  var model = SignInRequestModel;
  model.flowRequest[2].callBack.arguments.push(e.parameter.Username);
  model.flowRequest[5].arguments.push(e.parameter.Password);
  var engine2 = new ActionEngine();
  var result = engine2.processReq(model);
  return result[result.length -1];
}catch(err){
  return ContentService.createTextOutput(JSON.stringify(
    {'result':'error','output':'Encountered an error.Try Again..Thank You for your patience !','error':err.message,}))
        .setMimeType(ContentService.MimeType.JSON);
}
}
function doPost(e){
try{
    var data = JSON.parse(e.postData.contents);
    var model = SignUpRequestModel;
    model.flowRequest[2].callBack.arguments.push(data.Username);
    model.flowRequest[3].arguments.push([data.Username,data.Password]);
    console.log(model);
    var engine1 = new ActionEngine();
    var result = engine1.processReq(model);
    console.log(result);
    return result[result.length -1];
 }catch(err){
  return ContentService.createTextOutput(JSON.stringify(
    {'result':'error','output':'Encountered an error.Try Again..Thank You for your patience !','error':err.message,}))
    .setMimeType(ContentService.MimeType.JSON);
}
}
