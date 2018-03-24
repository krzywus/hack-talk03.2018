import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {element} from 'protractor';

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
        const xpath = this.route.snapshot.paramMap.get('xpath');
        const myObject = document.getElementById('my-object');
        myObject.setAttribute('data', url);
    }

    highlight(xpath: string): void {
        function getElementByXpath(path) {
            return <HTMLElement>document.evaluate(
                path,
                document.getElementById('my-object'),
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
        }
        getElementByXpath(xpath).style.border = 'thick solid red';

    }


}
