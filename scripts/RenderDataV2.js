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
            var emailID = getEmail.email;
            console.log("Email id of user is " + emailID);
            console.log(localStorage.getItem(emailID+'UserSpreadsheetID'));
        }
    await this.renderLoginForm(event);
    await this.renderSignUpForm(event);
        
    }
    static async renderLoginForm(event){
        event.preventDefault();
        console.log("Rendering Login form :-> ");
        var loginUrl = info['spreadsheet']['url'] +'/' + systemDataSheet +'/values/Views&Form!A13:N20?key='+key;
        var responseJSON = await HttpService.fetchRequest(loginUrl,HttpService.requestBuilder("GET"),sysHeader);
        if(!responseJSON.error){
            console.log("SignUp Response" + responseJSON);
            var loginJSON = mutate.arr2Object(responseJSON.values,responseJSON.values[0],{});
            console.log("The JSON " + loginJSON);
        }
        var loginForm = new Entity(loginJSON,document.getElementById('loginform'))
        console.log(loginForm);
    }
    static async renderSignUpForm(event){
        console.log("Rendering SignUp form");
        event.preventDefault();
        var signupUrl = info['spreadsheet']['url'] +'/'+systemDataSheet+'/values/Views&Form!A2:N10?key='+key;
        var responseJSON = await HttpService.fetchRequest(signupUrl,HttpService.requestBuilder("GET"),sysHeader);
        if(!responseJSON.error){
            console.log("Login Response" + responseJSON);
            var signupJSON = mutate.arr2Object(responseJSON.values,responseJSON.values[0],{});
            console.log("The JSON " + signupJSON);
        }
        var signupForm = new Entity(signupJSON,document.getElementById('signupform'));
        console.log(signupForm);
    }
    static async submitSignUpForm(event){
        event.preventDefault();
        // if(localStorage.getItem(emailID+'UserSpreadsheetID') !== undefined || localStorage.getItem(emailID+'UserSpreadsheetID') === null)
        //         await Credentials.actions(event,"CREATE");
        var output = [document.getElementById('emailid').value,document.getElementById('username').value,document.getElementById('password').value];
         Credentials.actions(event,"SIGNUP",output);
    }
    static async submitLoginForm(event){
        event.preventDefault();
        var output = [document.getElementById('Remailid').value,document.getElementById('Rpassword').value];
        Credentials.actions(event,"LOGIN",output);
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
                        "title":'UserDataSheet'
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
                localStorage.setItem(emailID+'UserSpreadsheetID', response.spreadsheetId);
                break;
            }
            case "SIGNUP":{
                var getUrl = url + '/'+  systemDataSheet +'/values/r!A1:B1000?key='+key;
                var data = await HttpService.fetchRequest(getUrl,HttpService.requestBuilder("GET",sysHeader));
                var range;
                if(!data.error){
                    if(data.values.filter(e=> e[6] === output[0]).length > 0){
                        alert('An account with Email ID' + output[0] + 'already exists');
                        break;
                    }
                    range = "registeredActorDatabase!A" + (data.values.length + 1) + ":C"+ (data.values.length + 1);
                }else{
                    alert("Got an error. Couldn't register.Try Once Again.");
                    break;
                }
                url = url +'/'+systemDataSheet+'/values/' + range +':append?key='+key +'&valueInputOption=USER_ENTERED';
                body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":[output]
                }
                response =await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",sysHeader,JSON.stringify(body))); 
                if(!response.error)
                    alert('Registered successfully');
                break;
            }
            case "LOGIN":{
                    url = url + '/'+systemDataSheet+'/values/registeredActorDatabase!A1:C1000?key='+key;
                    response =await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",sysHeader));
                    console.log(response.values);
                    if(!response.values.length === 1)
                        alert('No Users exist');
                    else{
                        var range,update,row;
                        var email = response.values.filter(e=>e[0] === output[0]);
                        if(email.length === 0){
                            alert("User doesn't exist with this Email-id :- "+ output[0]);
                        }else{
                            console.log("header" + sysHeader);
                             var getUrl = info['spreadsheet']['url'] +'/' + systemDataSheet + '/values/SystemActorLog!A1:B1000?key='+key;
                             var getData = await HttpService.fetchRequest(getUrl,HttpService.requestBuilder("GET",sysHeader));
                             row = getData.values.length + 1;
                             range = 'SystemActorLog!A' + row + ':C' + row;
                            if(response.values.filter(e=>e[0] === output[0] && e[2] === output[1]).length > 0){
                                alert('Correct Credentials :-)');
                                update = [[output[0],"Successful Attempt",new Date()]];
                             }else{
                                alert('Wrong Password .Try Again !');
                                update = [[output[0],"Failed Attempt",new Date()]];
                             }
                             var logurl = info['spreadsheet']['url'] +'/'+systemDataSheet +'/values/' + range +':append?valueInputOption=USER_ENTERED&key='+key;
                             body = {
                                 "range":range,
                                 "majorDimension":"ROWS",
                                 "values":update
                             }
                             var response3 =await HttpService.fetchRequest(logurl,HttpService.requestBuilder("POST",sysHeader,JSON.stringify(body))); 
                             console.log("Response 2 of Login:->" + response3);
                        }
                    }
                    break;
            }
        }
        return response;
    }
}
