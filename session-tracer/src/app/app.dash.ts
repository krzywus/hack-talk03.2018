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
        myObject.setAttribute('src', url);
        const btn = document.getElementById('next');
        btn.onclick = (e: Event) => { this.highlight(xpath); };
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
        const innerDoc = (frame.contentWindow || frame.contentDocument);
        if (innerDoc.document)innerDoc = innerDoc.document;
        console.log(innerDoc);
        console.log(xpath);
        const el = getElementByXpath(xpath, innerDoc);
        console.log(el);
        el.style.border = 'thick solid red';

    }


}
