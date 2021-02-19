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
var header = info['spreadsheet']['headers'];
var userToken,emailID;
var systemDataSheet = '1PDvlaFdYJW6CW3TAxgxbqxCa3nFKr-Xi4c33eLlB24I';
class Flow{
    static async loadData(event){
    event.preventDefault();
    userToken = Authorization.authToken(window.location.href);
    header['Authorization'] = userToken;
    console.log(header);
    var response = await HttpService.fetchRequest('https://www.googleapis.com/oauth2/v2/userinfo',HttpService.requestBuilder("GET",header));
        if(!response.error){
            emailID = response.email;
            console.log("Email id of user is " + emailID);
            console.log(localStorage.getItem(emailID+'UserSpreadsheetID'));
        }
        await this.renderLoginForm(event);
        await this.renderSignUpForm(event);
        
    }
    static async renderLoginForm(event){
        event.preventDefault();
        console.log("Rendering Login form");
        var loginForm = new Entity(LoginSchema,document.getElementById('load'))
        console.log(loginForm);
    }
    static async renderSignUpForm(event){
        console.log("Rendering SignUp form");
        event.preventDefault();
        var signupform = new Entity(SignUpSchema,document.getElementById('loadform'))
        console.log(signupform);
    }
    static async submitSignUpForm(event){
        event.preventDefault();
        if(localStorage.getItem(emailID+'UserSpreadsheetID') !== undefined || localStorage.getItem(emailID+'UserSpreadsheetID') === null)
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
                        "title":'DataSheet'
                    }, 
                }
                response = await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body)));
                if(!response.error){
                    var url3 = url + '/' + response.spreadsheetId + ':batchUpdate';
                    var body2 = {
                        "requests":[{
                                addSheet: {
                                  properties: {
                                    title: "Sheet2",
                                  }
                                }
                        }]
                    }
                    var response2 = await HttpService.fetchRequest(url3,HttpService.requestBuilder("POST",header,JSON.stringify(body2)));
                    console.log(response2);
                }
                localStorage.setItem(emailID+'UserSpreadsheetID', response.spreadsheetId);
                break;
            }
            case "SIGNUP":{
                console.log("Array values:->" + output);
                var url1 = url + '/'+  localStorage.getItem(emailID+'UserSpreadsheetID') +'/values/Sheet1!A1:J1000';
                var data = await HttpService.fetchRequest(url1,HttpService.requestBuilder("GET",header));
                var range ,array;
                if(!data.values && !data.error){
                    range = "Sheet1!A1:" + arr[output[0].length -1] + (output.length);
                    array = output;
                }else if(!data.error){
                    if(data.values.filter(e=> e[6] === output[1][6]).length > 0){
                        alert('Email id already exists');
                        break;
                    }
                    var id = data.values[0].length + 1;
                    range = "Sheet1!A" + (data.values.length + 1) + ":" + arr[output[0].length -1]+ id;
                    array = [output[1]];
                }
                url = url +'/'+localStorage.getItem(emailID+'UserSpreadsheetID')+'/values/' + range +':append?valueInputOption=USER_ENTERED';
                body = {
                    "range":range,
                    "majorDimension":"ROWS",
                    "values":array
                }
                response =await HttpService.fetchRequest(url,HttpService.requestBuilder("POST",header,JSON.stringify(body))); 
                if(!response.error)
                    alert('Registered successfully');
                break;
            }
            case "LOGIN":{
                    url = url + '/'+localStorage.getItem(emailID+'UserSpreadsheetID') +'/values/Sheet1!A1:J1000';
                    response =await HttpService.fetchRequest(url,HttpService.requestBuilder("GET",header));
                    console.log(response.values);
                    if(!response.values)
                        alert('No Users exist');
                    else{
                        var range,update,row;
                        var email = response.values.filter(e=>e[6] === output[0]);
                        if(email.length === 0){
                            alert("User doesn't exist with this Email-id");
                        }else{
                            console.log("header" + header);
                             var url2 = info['spreadsheet']['url'] +'/' + localStorage.getItem(emailID+'UserSpreadsheetID') + '/values/Sheet2!A1:C1000';
                             var response1 = await HttpService.fetchRequest(url2,HttpService.requestBuilder("GET",header));
                             if(response1.values === undefined)
                                row = 1;
                            else
                                row = response1.values.length + 1;
                             range = 'Sheet2!A' + row + ':C' + row;
                            if(response.values.filter(e=>e[6] === output[0] && e[8] === output[1]).length > 0){
                                alert('Correct Credentials :-)');
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
                             var response3 =await HttpService.fetchRequest(uri,HttpService.requestBuilder("POST",header,JSON.stringify(body))); 
                             console.log("Response 2 of Login:->" + response3);
                        }
                    }
                    break;
            }
        }
        return response;
    }
}
