const scriptURL =  'https://script.google.com/macros/s/AKfycbyBbBgEC4j8EmmDSD2SepsX315iu27Q2po0yt6I7vujKh6VHGuwgHDugd1WqCfPLz7dsw/exec';
class ASC_Credentials{
    static async LoadData(event){
        event.preventDefault();
        var params = {'form':document.title};
        var response = await HttpService.fetchRequest(HttpService.urlBuilder(scriptURL,params) ,HttpService.requestBuilder("GET"));
        if(response.result == 'success'){
                  var json = mutate.arr2Object(response.output,response.output[0],{});
                  var body = document.getElementsByTagName('body')[0];
                  var form = new Entity(json,{});
                  var formViewInstance = new ActionView(json,body);
                  var formEventInstance = new ActionEvent(body,window);
                  var formControllerInstance = new ActionController(form,formViewInstance,formEventInstance);
        }
    }
    static async signin(event){
        event.preventDefault();
        var params = {
            'EmailId':document.getElementById('email').value,
            'Password':document.getElementById('password').value
        };
        var response = await HttpService.fetchRequest(HttpService.urlBuilder(scriptURL,params),HttpService.requestBuilder("GET"));
        alert(response.output);
        if(response.result == 'success'){     
                localStorage.setItem('emailID',document.getElementById('email').value);
                localStorage.setItem('LoginEhh'+localStorage.getItem('emailID'),true);
                window.location.href = './indexActionSpace_V5Treeview.html';
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
        alert(response.output);
        if(response.result == 'success'){
             localStorage.setItem('emailID',document.getElementById('email').value);
             localStorage.setItem('LoginEhh'+localStorage.getItem('emailID'),true);
             window.location.href = './indexActionSpace_V5Treeview.html';
          }else if(response.result == 'failed'){
            window.location.href = './signin.html';
          }
        document.getElementById('email').value = '';
        document.getElementById('psw').value = '';
        document.getElementById('username').value = '';
    
    }
}