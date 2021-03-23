var Authorize = {
    'json':{
        'url':'https://accounts.google.com/o/oauth2/v2/auth',
        'params':{
            'client_id': '1053381465878-vb5nntqvopdnbag9f060pon9d7qh81j4.apps.googleusercontent.com',
            'redirect_uri': 'https://kgayatri15.github.io/SheetJSONHTMLFlow/html/application.html',//'http://127.0.0.1:5500/html/application.html',
            'scope': "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email",
            'state': 'ActionSpaceEditor',
            'include_granted_scopes': 'true',
            'prompt':'consent',
            'response_type': 'token'
        }
    }
}
class Authorization{
    static oAuth(event,data){
        event.preventDefault();console.log("In oAuth()");
        var service = HttpService.urlBuilder(Authorize[data]['url'],Authorize[data]['params']);
        console.log(service);
        window.location.href = service;

    }
    static authToken(uri){
        var service = HttpService.unbuildEndodedUri(uri);
        var token = service['token_type'] +" "+service['access_token'];
        console.log("Authorization:--- " + token);
        return token;
    }
}
