
function doGet(e){
  try{
    var model,result;var engine2 = new ActionEngine();
    if(e.queryString.includes('SpreadsheetId')){
       model = getData;
       model.flowRequest[0].arguments.push(e.parameter.SpreadsheetId)
       model.flowRequest[1].arguments.push(e.parameter.NamedRange);
       result = engine2.processReq(model);
        return ContentService.createTextOutput(JSON.stringify(
      {'result':'Success','output':result[result.length-1]}))
          .setMimeType(ContentService.MimeType.JSON);
    }else if(e.queryString.includes('Form')){
       model = getData;
       model.flowRequest[0].arguments.push("1ffczYrBikoQ49ijbqRHrAkZc0mJl4Ezb9fHfeocstmw");
       if(operate.isEqual(e.parameter.Form,'invoiceForm'))
            model.flowRequest[1].arguments.push("FormsV2!A2:O63");
       result = engine2.processReq(model);
       return ContentService.createTextOutput(JSON.stringify(
      {'result':'Success','output':result[result.length-1]}))
          .setMimeType(ContentService.MimeType.JSON); 
    }else if(e.queryString.includes('Username')){
        model = SignInRequestModel;
        model.flowRequest[2].callBack.arguments.push(e.parameter.Username);
        model.flowRequest[5].arguments.push(e.parameter.Password);
        result = engine2.processReq(model);
        return result[result.length -1];
    }
  }catch(err){
    var message = 'Encountered an error.Try Again..Thank You for your patience !';
    if(e.parameter.SpreadsheetId){
        message = 'Entered Wrong Range. Try Once Again ..';
    }
    return ContentService.createTextOutput(JSON.stringify(
      {'result':'error','output':message,'error':err.message,}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}
function doPost(e){
  try{
      var data = JSON.parse(e.postData.contents);
      var model;
      if(Object.keys(data).length === 1){
        model = invoiceForm;
        model.flowRequest[1].arguments.push(data.array.length); model.flowRequest[1].arguments.push(data.array[0].length);
        model.flowRequest[1].callBack.arguments.push(data.array);
      }else if(Object.keys(data).length === 3){
        model = sendData;
        model.flowRequest[0].arguments.push(data.SpreadsheetId);model.flowRequest[0].callBack.arguments.push(data.SheetName);
        model.flowRequest[1].arguments.push(data.array.length); model.flowRequest[1].arguments.push(data.array[0].length);
        model.flowRequest[1].callBack.arguments.push(data.array);
      }else if(Object.keys(data).length === 2){
         model = SignUpRequestModel;
         model.flowRequest[2].callBack.arguments.push(data.Username);
         model.flowRequest[3].arguments.push([data.Username,data.Password]);
      }
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
