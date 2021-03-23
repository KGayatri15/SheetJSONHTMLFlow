const scriptURL =  'https://script.google.com/macros/s/AKfycbypkHMPSzyvEYF4BwzpN_5owBqNn_mFSTyz188C_UjrzmDuTU1Y-r9s91a25SRPj7qgpA/exec';
class ASC_Credentials{
    static async LoadData(event){
        event.preventDefault();
        var params = {'form':document.title};
        var response = await HttpService.fetchRequest(HttpService.urlBuilder(scriptURL,params) ,HttpService.requestBuilder("GET"));
        if(response.result == 'success'){
                  var json = mutate.arr2Object(response.output,response.output[0],{});
                  var form = new Entity(json,document.getElementsByTagName('body')[0]);
        }
    }
    static async signin(event){
        event.preventDefault();
        var params = {
            'EmailId':document.getElementById('email').value,
            'Password':document.getElementById('password').value
        };
        var response = await HttpService.fetchRequest(HttpService.urlBuilder(scriptURL,params),HttpService.requestBuilder("GET"));
        if(response.result == 'success'){
                alert(response.output);
                localStorage.setItem('LoginEhh'+document.getElementById('email').value,true);
                window.location.href = './indexActionSpace_V5Treeview.html';
        }else if(response.result == 'failed'){
                alert(response.output);
        }else{
                alert('Encountered an error.Try Again..Thank You for your patience !');
        }
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }
    static async signup(event){
        event.preventDefault();
        var json = {
            'EmailId':document.getElementById('email').value,
            'Password':document.getElementById('psw').value,
            'Username':document.getElementById('username').value
        };
        var response = await HttpService.fetchRequest(scriptURL,HttpService.requestBuilder("POST",undefined,JSON.stringify(json)));
        if(response.result == 'success'){
             console.log('Registered Successfully');
             localStorage.setItem('LoginEhh'+document.getElementById('email').value,true);
             window.location.href = './indexActionSpace_V5Treeview.html';
          }else if(response.result == 'failed'){
            console.log('User already exists Sign In to your account');
            window.location.href = './signin.html';
          }else{
            console.log('Encountered an error.Try Again..Thank You for your patience !');
        }
        document.getElementById('email').value = '';
        document.getElementById('psw').value = '';
        document.getElementById('username').value = '';
    
    }
}