import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {element} from 'protractor';

@Component({
    selector: 'app-dash',
    templateUrl: './app.dash.html',
    styleUrls: ['./app.dash.css']
})
export class AppDashComponent implements OnInit {
    title = 'app';
    private index = 0;
    private current_data: any;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getWebsite();
    }

    getWebsite(): void {
        const url = this.route.snapshot.paramMap.get('url');
        let actions = this.route.snapshot.paramMap.get('actions');
        const myObject = document.getElementById('my-object');
        myObject.setAttribute('src', url);
        this.current_data = JSON.parse(actions);
        this.index = 0;
        const btn = document.getElementById('next');
        btn.onclick = (e: Event) => {
            this.next();
        };
    }

    next(): void {
        if (this.index < this.current_data.length) {
            this.highlight(this.current_data[this.index]);
            this.index += 1;
        } else {
            this.index = 0;
        }
    }


    highlight(xpath: string): void {
        function getElementByXpath(path, doc) {
            return <HTMLElement>doc.evaluate(
                path,
                doc,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
        }

        const frame = document.getElementById('my-object');
        let innerDoc = (frame.contentWindow || frame.contentDocument);
        if (innerDoc.document) {
            innerDoc = innerDoc.document;
        }
        console.log(innerDoc);
        console.log(xpath);
        const el = getElementByXpath(xpath, innerDoc);
        console.log(el);
        el.style.border = 'thick solid red';

    }


}
