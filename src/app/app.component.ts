import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cats-n-facts';
  errorMessage = "";
  catImage: any;
  catFact: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.GenerateCatAndFact();
  }

  GenerateCatAndFact() {
    this.GetImage().subscribe(data => {
      this.CreateImageFromBlob(data);
    }, error => {
      this.errorMessage = error;
    });

    this.GetFact().subscribe(data => {
      this.catFact = data.data;
    }, error => {
      this.errorMessage = error;
    });
  }

  GetImage(): Observable<Blob> {
    const headers = {
      'Content-Type': 'image/*',
      'Accept': 'image/*'
    }
    return this.http.get('https://cataas.com/cat?fontSize=12&fontColor=white&type=square', { headers: headers, responseType: 'blob' });
  }

  GetFact(): Observable<any> {
    return this.http.get('https://meowfacts.herokuapp.com/');
  }

  CreateImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.catImage = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }
}
