var arr = ['A','B','C','D','E','F','G','H','I','J','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var info = {
    'spreadsheet':{
        'url':'https://sheets.googleapis.com/v4/spreadsheets',
        'headers':{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    },
}
var userHeader = info['spreadsheet']['headers'];
var emailID;
class Flow{
    static async loadData(event){
    event.preventDefault();
    userHeader['Authorization'] = Authorization.authToken(window.location.href);
    var getEmail = await HttpService.fetchRequest( 'https://www.googleapis.com/oauth2/v2/userinfo',HttpService.requestBuilder("GET",userHeader));
     if(!getEmail.error){
             emailID = getEmail.email;
            localStorage.setItem('emailID' , emailID);
            localStorage.setItem('Authorization',userHeader['Authorization']);
    }
    console.log(localStorage.getItem('UserSpreadsheetID'+localStorage.getItem('emailID')));
    document.getElementById('note').innerHTML = '<h1>You are being directed to the dashboard,Thank You for your patience !</h1>';
    var response;
    if(localStorage.getItem('UserSpreadsheetID'+localStorage.getItem('emailID'))!== null){
        response = await Credentials.actions(event,"REDIRECTING");
    }else{
        var response1 = await Credentials.actions(event,"CREATE");
        if(!response1.error)
            response = await Credentials.actions(event,"SIGNIN",[[localStorage.getItem('emailID'),'Login with Google']]);
    }
    if(!response.error){
        localStorage.setItem('LoginEhhGoogle'+localStorage.getItem('emailID') ,true);
        window.location.href = './indexActionSpace_V5Treeview.html';
    }
    }
}
class Credentials{
    static async actions(event,type,output){
        event.preventDefault();var body,response;
        var url = info['spreadsheet']['url'];
        switch(type){
            case "CREATE":{
                body = {
                    "properties":{
                        "title":'ActionSpaceEditor_UserDataSheet'
                    }, 
                }
                response = await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",userHeader,JSON.stringify(body)));
                if(!response.error){
                    var url2 = url + '/' + response.spreadsheetId + ':batchUpdate';
                    var body2 = {
                        "requests":[{
                                addSheet: {
                                  properties: {
                                    title: "Sheet2",
                                  }
                                }
                        }]
                    }
                    var response2 = await HttpService.fetchRequest(url2,HttpService.requestBuilder("POST",userHeader,JSON.stringify(body2)));
                    console.log(response2);
                }
                localStorage.setItem('UserSpreadsheetID'+emailID, response.spreadsheetId);
                localStorage.setItem('UrlLink',response.spreadsheetUrl);
                break;
            }
            case "SIGNIN":{
                var range = "Sheet1!A1:B1";
                url = url +'/'+localStorage.getItem('UserSpreadsheetID'+emailID)+'/values/' + range +':append?valueInputOption=USER_ENTERED';
                body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":output
                }
                response =await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",userHeader,JSON.stringify(body))); 
                if(!response.error)
                    alert('Registered successfully');
                break;
            }
            case 'REDIRECTING':{
                var url1 = url + '/'+  localStorage.getItem('UserSpreadsheetID'+emailID) +'/values/Sheet1!G1:H1000';
                var data = await HttpService.fetchRequest(url1,HttpService.requestBuilder("GET",userHeader));
                console.log(emailID + ":data:->"+data);
                if(data.values.filter(e=> e[0] === emailID).length > 0){
                   response = data;
                }
                break;
            }
            case 'LOGGED IN':{
                console.log('Logged In');
                console.log(localStorage.getItem('UserSpreadsheetID'+localStorage.getItem('emailID')));
                var url2 = info['spreadsheet']['url'] +'/' + localStorage.getItem('UserSpreadsheetID'+localStorage.getItem('emailID')) + '/values/Sheet2!A1:B1000';
                if(!userHeader.hasOwnProperty('Authorization')){
                    userHeader['Authorization'] = localStorage.getItem('Authorization');
                }
                var response2 = await HttpService.fetchRequest(url2,HttpService.requestBuilder("GET",userHeader));
                console.log("Response2 :-> "+response2);
                var row = 1;
                if(!response2.error){
                    if(response2.values)
                        row = response2.values.length + 1;
                    var range = 'Sheet2!A' + row + ':C' + row;
                    localStorage.setItem('Row',row);
                    var uri = info['spreadsheet']['url'] +'/'+ localStorage.getItem('UserSpreadsheetID'+localStorage.getItem('emailID')) +'/values/' + range +':append?valueInputOption=USER_ENTERED';
                    body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":[[localStorage.getItem('emailID'),"Successful Attempt",new Date()]]
                    }
                    response =await HttpService.fetchRequest(uri,HttpService.requestBuilder("POST",userHeader,JSON.stringify(body))); 
                }
                break;
            }
            case 'LOGOUT':{
                if(!userHeader.hasOwnProperty('Authorization')){
                    userHeader['Authorization'] = localStorage.getItem('Authorization');
                }
                console.log("Row is : " + localStorage.getItem('Row'));
                var range = 'Sheet2!D'+localStorage.getItem('Row') + ':E'+localStorage.getItem('Row');
                url = url + '/'+  localStorage.getItem('UserSpreadsheetID'+localStorage.getItem('emailID')) +'/values/' + range +':append?valueInputOption=USER_ENTERED';
                body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":[[new Date(),'']]
                }
                response = HttpService.fetchRequest(url,HttpService.requestBuilder("POST",userHeader,JSON.stringify(body)));
            }
        }
        return response;
    }
}
