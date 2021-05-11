var sheetName = 'RegisteredActorDatabase';
var formSheetName = 'Forms';
var scriptProperties = PropertiesService.getScriptProperties();
function initialSetup() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProperties.setProperty('key',spreadsheet.getId());
}
function doGet(e){
  try{
    var openSpreadsheet = SpreadsheetApp.openById(scriptProperties.getProperty('key'));
    var result,message,sheet,array;
    if(Object.keys(e.parameter).length === 1){
      sheet = openSpreadsheet.getSheetByName(formSheetName);
      var range;
      e.parameter.form == 'SignUp'?range = 'A2:U20':range = 'A23:R33';
      array = sheet.getRange(range).getValues();
      result = 'success';message = array;
    }else{
      sheet = openSpreadsheet.getSheetByName(sheetName);
      array = sheet.getRange(1,1,sheet.getLastRow()).getValues();
      var rowNo = array.findIndex(email => {return email == e.parameter.EmailId;}) + 1;
      if(rowNo > 1){
        var password = sheet.getRange(rowNo,3).getValue();
        if(password == e.parameter.Password){
            result = 'success';message = 'Correct Credentials :-)';
        }else{
            result = 'failed';message = 'Incorrect password !';
        }
      }else{//EmailId doesn't exist
        result = 'failed';message = 'An account with emailID ' + e.parameter.EmailId + " doesn't exist";
      }
    }
    return ContentService
          .createTextOutput(JSON.stringify({'result':result,'output':message}))
          .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService
          .createTextOutput(JSON.stringify({'result':'error','output':'Encountered an error.Try Again..Thank You for your patience !','error':err.message,}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}
function doPost(e){
  try{
    // var openSpreadsheet = SpreadsheetApp.openById(scriptProperties.getProperty('key'));
    // var sheet = openSpreadsheet.getSheetByName(sheetName);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    var data = JSON.parse(e.postData.contents);
    var unique = sheet.getRange(1,1,sheet.getLastRow()).createTextFinder(data.EmailId).findAll();//.matchCase(true);
    var result = 'failed',message = 'User already exists Sign In to your account';
    if(unique.length === 0){
      var append = sheet.appendRow([data.EmailId,data.Username,data.Password]);
      result = 'success',message = 'You have been registered successfully';
    }
    return ContentService
            .createTextOutput(JSON.stringify({'result':result,'output':message}))
            .setMimeType(ContentService.MimeType.JSON)
  }catch(err){
    return ContentService
          .createTextOutput(JSON.stringify({'result':'error','output':'Encountered an error.Try Again..Thank You for your patience !','error':err.message}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}
