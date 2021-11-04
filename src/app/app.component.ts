import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {csvToJson} from 'convert-csv-to-json'

declare let $: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  name = 'Angular';
  data_array;
  headerData = [];

  ngOnInit() {

    this.getData()
    setTimeout(function () {
      $(function () {
        $('#hackathon').DataTable();
      });
    }, 100);
     
  }
  

  constructor(public httpClient: HttpClient){}

  getData(){
    this.httpClient.get('assets/tenants_and_products.csv', { responseType: 'text' }).subscribe(
      data => {
            this.data_array = this.csvJSON(data);
      }
    );
   
  }




   csvJSON(csv){
    var lines=csv.split("\n");
  
    var result = [];

    var headers=lines[0].split(",");
    this.headerData = headers;
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    return result
  }


  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

}
