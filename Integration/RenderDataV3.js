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
var sysHeader = info['spreadsheet']['headers'];
var userHeader = info['spreadsheet']['headers'];
var emailID;
var systemDataSheet = '1PDvlaFdYJW6CW3TAxgxbqxCa3nFKr-Xi4c33eLlB24I';
var key = 'AIzaSyCw0qzjxyZFZuLrvcVPsHv0vqTin9nVugc';
class Flow{
    static async loadData(event){
    
    event.preventDefault();
    userHeader['Authorization'] = Authorization.authToken(window.location.href);
    var getEmail = await HttpService.fetchRequest('https://www.googleapis.com/oauth2/v2/userinfo',HttpService.requestBuilder("GET",userHeader));
    if(!getEmail.error){
            emailID = getEmail.email;
            console.log("Email id of user is " + emailID);
    }
    if(localStorage.getItem('UserSpreadsheetID'+emailID)!== null){
        document.getElementById('note').innerText = 'Wait for few seconds....Yu are soon directed to a page';
        var response = await Credentials.actions(event,"REDIRECTING");
       
        if(!response.error){
            window.location.href = 'http://127.0.0.1:5500/indexActionSpace_V5.html';//'https://kgayatri15.github.io/SheetJSONHTMLFlow/indexActionSpace_V5.html';
        }else{
            Flow.renderSignUpForm(event);     
        }
    }else{
        Flow.renderSignUpForm(event);
    }
    }
    static async renderSignUpForm(event){
        document.getElementById('note').innerText = "If you don't have an account.Sign Up now !";
        event.preventDefault();
        var signupUrl = info['spreadsheet']['url'] +'/'+systemDataSheet+'/values/Views&Form!A2:N9?key='+key;
        var responseJSON = await HttpService.fetchRequest(signupUrl,HttpService.requestBuilder("GET"),sysHeader);
        if(!responseJSON.error){
            console.log("Login Response" + responseJSON);
            var signupJSON = mutate.arr2Object(responseJSON.values,responseJSON.values[0],{});
            console.log("The JSON " + signupJSON);
        }
        var signupForm = new Entity(signupJSON,document.getElementById('signupform'));
        console.log(signupForm);
    }
    static async renderActionSpace(){
        console.log("Rendering ActionSpace");
        var actionSpaceURL = info['spreadsheet']['url'] +'/'+systemDataSheet+'/values/Views&Form!A23:Y49?key='+key;
        var responseJSON = await HttpService.fetchRequest(actionSpaceURL,HttpService.requestBuilder("GET"),sysHeader);
        if(!responseJSON.error){
            console.log("Action Space Response" + responseJSON);
            var actionSpaceJSON = mutate.arr2Object(responseJSON.values,responseJSON.values[0],{});
            console.log("The JSON " + actionSpaceJSON);
        }
        var actionSpace = new Entity(actionSpaceJSON,{});
        console.log(actionSpace);
        var json = {
            "actionSpace":actionSpace,
            "basiclayout":actionSpaceJSON
        }
        return json;
    }
    static async submitSignUpForm(event){
        event.preventDefault();
        if(localStorage.getItem('UserSpreadsheetID'+emailID) === undefined || localStorage.getItem('UserSpreadsheetID'+emailID) === null)
                await Credentials.actions(event,"CREATE");
        console.log('emailID',emailID);
        var json = {
                    "credentials":{
                        'emailID':emailID,
                        'username':document.getElementById('username').value,
                        'password':document.getElementById('password').value
                    }
        }
        console.log(JSON.stringify(json));
        var output = mutate.Obj2(json, []);
        console.log(output);
        var response = await Credentials.actions(event,"SIGNUP",output);
        if(!response.error){
            window.location.href = 'http://127.0.0.1:5500/indexActionSpace_V5.html';//'https://kgayatri15.github.io/SheetJSONHTMLFlow/indexActionSpace_V5.html';
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
            case "SIGNUP":{
                var url1 = url + '/'+  localStorage.getItem('UserSpreadsheetID'+emailID) +'/values/Sheet1!G1:H1000';
                var data = await HttpService.fetchRequest(url1,HttpService.requestBuilder("GET",userHeader));
                var range ,array;
                if(!data.values && !data.error){
                    range = "Sheet1!A1:" + arr[output[0].length -1] + (output.length);
                    array = output;
                }else if(!data.error){
                    if(data.values.filter(e=> e[0] === output[1][6]).length > 0){
                        alert('Email id already exists');
                        break;
                    }
                    range = "Sheet1!A" + (data.values.length + 1) + ":" + arr[output[0].length -1]+ (data.values.length + 1);
                    array = [output[1]];
                }else{
                    alert('Got an error. Try Once Again!');
                    break;
                }
                url = url +'/'+localStorage.getItem('UserSpreadsheetID'+emailID)+'/values/' + range +':append?valueInputOption=USER_ENTERED';
                body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":array
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
                    var url2 = info['spreadsheet']['url'] +'/' + localStorage.getItem('UserSpreadsheetID'+emailID) + '/values/Sheet2!A1:B1000';
                    var response2 = await HttpService.fetchRequest(url2,HttpService.requestBuilder("GET",userHeader));
                    var row = 1;
                    if(!response2.error){
                        if(response2.values)
                            row = response2.values.length + 1;
                        var range = 'Sheet2!A' + row + ':C' + row;
                        var uri = info['spreadsheet']['url'] +'/'+ localStorage.getItem('UserSpreadsheetID'+emailID) +'/values/' + range +':append?valueInputOption=USER_ENTERED';
                        body = {
                        "range":range,
                        "majorDimension":"ROWS",
                        "values":[[emailID,"Successful Attempt",new Date()]]
                        }
                        response =await HttpService.fetchRequest(uri,HttpService.requestBuilder("POST",userHeader,JSON.stringify(body))); 
                    }
                }
                break;
            }
        }
        return response;
    }
}
