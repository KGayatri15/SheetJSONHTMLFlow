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
            var div = document.createElement('div');
            var data = new Entity(json,div);
            ActionView.updateText(div.innerHTML);
        }
    }
}