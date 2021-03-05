var arr = ['A','B','C','D','E','F','G','H','I','J','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var data = {
    'spreadsheet':{
        'url':'https://sheets.googleapis.com/v4/spreadsheets/',
        'headers':{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    },
}
var url = data['spreadsheet']['url'];
var header = data['spreadsheet']['headers'];
header['Authorization'] = localStorage.getItem('Authorization');
class Sync{
    static async get(event){
        event.preventDefault();
        var range = document.getElementById('sheetName').value + "!" + document.getElementById('range').value;
        var geturl = url + document.getElementById('fileID').value +'/values/' + range;
        var response = await HttpService.fetchRequest(geturl,HttpService.requestBuilder("GET",header)); 
        console.log("response :- " + response);
        if(!response.error){
             var json = mutate.arr2Object(response.values ,response.values[0],{});
             console.log(json);
             ActionView.updateTitle(json["ActionStory"]['title']);
             ActionView.updateText(json["ActionStory"]['ActionContent']);
            //  setInterval(() => {
            //      //update text and title
            //  },300000);A5:H7
            // var div = document.createElement('div');
            // var data = new Entity(json,div);
            // ActionView.updateText(div.innerHTML);
            
        }

    }
    static async send(event){
        event.preventDefault();
        var geturl = url + document.getElementById('file-id').value +'/values/' + document.getElementById('sheet_Name').value ;
        var response = await HttpService.fetchRequest(geturl,HttpService.requestBuilder("GET",header));
        if(!response.error){
            var json = {
                "ActionStory":{
                    "title": ActionView.getTitle(),
                    "ActionContent":ActionView.getText(),
                }
            }
            var output = mutate.Obj2(json,[]);
            var row = response.values.length + 2;
            var range = document.getElementById('sheet_Name').value + "!A" + row  + ":" +  arr[output[0].length -1] + (output.length + row);
            console.log("Range:- " + range);
            var posturl = url +  document.getElementById('file-id').value +'/values/' + range + ':append?valueInputOption=USER_ENTERED';
            var body = {
                "range":range,
                "majorDimension":"ROWS",
                "values":output
            }
            var response2 = await HttpService.fetchRequest(posturl,HttpService.requestBuilder("POST",header,JSON.stringify(body)));
            if(!response2.error){
                alert('Sent Data successfully');
            }
        }
       
    }
}