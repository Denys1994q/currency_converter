import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'converter';
    posts: any = []

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {
        this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe({
            next: (data: any) => {
                this.posts = data.slice(0,10);
            }  
        })
    }

}
