import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-upload';

  files:Array<File> = []
  constructor(private httpclient:HttpClient){

  }

  upload(event: any){
    const file =  event.target.files[0]
    console.log(file)

    const formdata = new FormData();
    formdata.append('file', file)

    this.httpclient.post('http://localhost:4000/file', formdata)
    .subscribe((data) => {
      console.log(data)
    },
    (error)=>{
      console.error(error)
    })
  }

  uploadMultiple(event:any){
    const files:FileList =  event.target.files
    const formdata = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      
      formdata.append('files', file)
    }


    this.httpclient.post('http://localhost:4000/multifiles', formdata)
    .subscribe((data) => {
      console.log(data)
    },
    (error)=>{
      console.error(error)
    })
  }
}
