function myFunction(){
    // var spreadsheet = SpreadsheetApp.openById("1i0lTzOKLampB1d9hSiCbGgjjXchANmuIrHPATs4CXAY");
    // spreadsheet.copy("Copy"+spreadsheet.getName());
  }
  function doGet(e){
    try{
      var model,result;
      var data = JSON.parse(JSON.stringify(e.parameter));
      if(e.queryString.includes('SpreadsheetId')){
         model = getData;
         result = engine.processReq(model,data);
      }else if(e.queryString.includes('Form')&&operate.isEqual(e.parameter.Form,'invoiceForm')){
         model = getData;
         var params = {
           "SpreadsheetId":"1ffczYrBikoQ49ijbqRHrAkZc0mJl4Ezb9fHfeocstmw",
           "NamedRange":"FormsV2!A2:O63"
         }
         result = engine.processReq(model,params);
      }else if(e.queryString.includes('Username')){
          model = SignInRequestModel;
          result = engine.processReq(model,data);
      }else if(e.queryString.includes('SearchFolderName')){
          model = searchFolder;
          result = engine.processReq(model,data);
      }
      return result.flowRequest[Object.keys(result.flowRequest)[Object.keys(result.flowRequest).length - 1]];
    }catch(err){
      var message = 'Encountered an error.Try Again..Thank You for your patience !';
      return ContentService.createTextOutput(JSON.stringify(
        {'result':'error','output':message,'error':err.err.message}))
            .setMimeType(ContentService.MimeType.JSON);
    }
  }
  function doPost(e){
    try{
        var data = JSON.parse(e.postData.contents);
        var model;
        if(Object.keys(data).length === 1){
          model = invoiceForm;
        }else if(Object.keys(data).length === 3){
          model = sendData;
        }else if(Object.keys(data).length === 2){
           model = SignUpRequestModel;
           model.flowRequest[4].arguments[0].push(data.Username,data.Password);
        }
        var result = engine.processReq(model,data);
        return result.flowRequest[Object.keys(result.flowRequest)[Object.keys(result.flowRequest).length - 1]];
     }catch(err){
      return ContentService.createTextOutput(JSON.stringify(
        {'result':'error','output':'Encountered an error.Try Again..Thank You for your patience !','error':err.message,}))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  