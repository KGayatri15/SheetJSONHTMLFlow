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
var emailID,login = false;
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
        if(localStorage.getItem(emailID+'UserSpreadsheetID') === undefined || localStorage.getItem(emailID+'UserSpreadsheetID') === null)
                await Credentials.actions(event,"CREATE");
        var json = {
                    "credentials":{
                        'emailID':document.getElementById('emailid').value,
                        'username':document.getElementById('username').value,
                        'password':document.getElementById('password').value
                    }
        }
        var output = mutate.Obj2(json, []);
        console.log(output);
         Credentials.actions(event,"SIGNUP",output);
    }
    static async submitLoginForm(event){
        event.preventDefault();
        var output = [document.getElementById('Remailid').value,document.getElementById('Rpassword').value];
        var response = await Credentials.actions(event,"LOGIN",output);
        if(login === true&& !response.error){
            console.log("Perfect login");
            window.location.href = ''
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
                var url1 = url + '/'+  localStorage.getItem(emailID+'UserSpreadsheetID') +'/values/Sheet1!G1:H1000';
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
                url = url +'/'+localStorage.getItem(emailID+'UserSpreadsheetID')+'/values/' + range +':append?valueInputOption=USER_ENTERED';
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
            case "LOGIN":{
                url = url + '/'+localStorage.getItem(emailID+'UserSpreadsheetID') +'/values/Sheet1!G2:I1000';
                    data =await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",userHeader));
                    console.log(data.values);
                    if(!data.values)
                        alert('No Users exist');
                    else{
                        var range,update,row;
                        var email = data.values.filter(e=>e[0] === output[0]);
                        if(email.length === 0){
                            alert("User doesn't exist with this Email-id");
                        }else{
                             var url2 = info['spreadsheet']['url'] +'/' + localStorage.getItem(emailID+'UserSpreadsheetID') + '/values/Sheet2!A1:B1000';
                             var response1 = await HttpService.fetchRequest(url2,HttpService.requestBuilder("GET",userHeader));
                             if(response1.values === undefined)
                                row = 1;
                            else
                                row = response1.values.length + 1;
                             range = 'Sheet2!A' + row + ':C' + row;
                            if(data.values.filter(e=>e[0] === output[0] && e[2] === output[1]).length > 0){
                                alert('Correct Credentials :-)');
                                login = true;
                                 update = [[output[0],"Successful Attempt",new Date()]];
                             }else{
                                 alert('Wrong Password .Try Again !');
                                 update = [[output[0],"Failed Attempt",new Date()]];
                             }
                             var uri = info['spreadsheet']['url'] +'/'+ localStorage.getItem(emailID+'UserSpreadsheetID') +'/values/' + range +':append?valueInputOption=USER_ENTERED';
                             body = {
                                 "range":range,
                                 "majorDimension":"ROWS",
                                 "values":update
                             }
                             response =await HttpService.fetchRequest(uri,HttpService.requestBuilder("POST",userHeader,JSON.stringify(body))); 
                             console.log("Response 2 of Login:->" + response);
                        }
                    }
                    break;
            }
        }
        return response;
    }
}
