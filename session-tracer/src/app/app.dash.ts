import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-dash',
    templateUrl: './app.dash.html',
    styleUrls: ['./app.dash.css']
})
export class AppDashComponent implements OnInit  {
    title = 'app';

    constructor(
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getWebsite();
    }

    getWebsite(): void {
        const url = this.route.snapshot.paramMap.get('url');
        console.log(this.route.snapshot);
        console.log(url);
        const myObject = document.getElementById('my-object');
        myObject.setAttribute('data', url);
    }
}
