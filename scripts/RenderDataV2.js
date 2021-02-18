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
var url = info['spreadsheet']['url'];
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
        }
        if(localStorage.getItem(emailID+'UserSpreadsheetID')  !== null){
             this.renderLoginForm(event);
        }else{
            console.log(SignUpSchema);
            var json2Array = mutate.Obj2(SignUpSchema ,[]);
            console.log("The 2D Array :- "+ json2Array);
            var array2JSON = mutate.arr2Object(json2Array,json2Array[0],{});
            console.log("The JSON from 2D array :- ");
            console.log(json2Array);
            var outputE = new Entity(array2JSON, document.getElementById('loadform'));
            console.log("outputElement", outputE)
             this.renderSignUpForm(event);
         }
    }
    static async renderLoginForm(event){
        event.preventDefault();
        console.log("Rendering Login form");
        if(localStorage.getItem('SignUpForm') === null){
            var range = 'Views&Form!A13:N21';
            var renderUrl = url + '/'+ systemDataSheet +'/values/' + range +':append?valueInputOption=USER_ENTERED';
            var response1 = await HttpService.fetchRequest(renderUrl,HttpService.requestBuilder("GET",header));
            console.log(response1);
            var array2JSON = mutate.arr2Object(response1.values,response1.values[0],{});
            console.log(array2JSON);
            localStorage.setItem('LoginForm',array2JSON);
        }
        var loginForm = new Entity(localStorage.getItem('LoginForm'),document.getElementById('loadform'))
        console.log(loginForm);
    }
    static async renderSignUpForm(event){
        console.log("Rendering SignUp form");
        event.preventDefault();
        if(localStorage.getItem('SignUpForm') === null){
            var range = 'Views&Form!A2:N10';
            var renderUrl = url + '/'+ systemDataSheet +'/values/' + range +':append?valueInputOption=USER_ENTERED';
            var response1 =  await HttpService.fetchRequest(renderUrl,HttpService.requestBuilder("GET",header));
            console.log(response1);
            var array2JSON = mutate.arr2Object(response1.values,response1.values[0],{});
            console.log(array2JSON);
            localStorage.setItem('SignUpForm',array2JSON);
        }
        var signupform = new Entity(localStorage.getItem('SignUpForm'),document.getElementById('load'))
        console.log(signupform);
    }
    static async submitSignUpForm(event){
        // var response1 = await Operations
        // var row = Spreadsheet.
        var emailID = document.getElementById('emailid');
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var arr = [[emailID,username,password]];
        console.log(arr);
        event.preventDefault();
    }
    static async submitLoginForm(event){
        event.preventDefault();
    }
}
class Spreadsheet{
    static async Operations(event,type,url,header,data,range){
        event.preventDefault();var response;
        if(range !== undefined && arr !== undefined){
            var body = {
                "range":range,
                "majorDimension":"ROWS",
                "values":data
            }
            response = await HttpService.fetchRequest(url,HttpService.requestBuilder(type,header,body));
        }else if(range !== undefined){
            var body = {
                "properties":{
                    "title":data
                },  
            }
            response = await HttpService.fetchRequest(url,HttpService.requestBuilder(type,header,body));
        }else{
            response = await HttpService.fetchRequest(url,HttpService.requestBuilder(type,header));
        }
        return response;
    }
}