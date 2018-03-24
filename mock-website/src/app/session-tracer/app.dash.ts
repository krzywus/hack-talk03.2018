import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-dash',
    templateUrl: './app.dash.html',
    styleUrls: ['./app.dash.css']
})
export class AppDashComponent implements OnInit, AfterViewInit  {

   @ViewChild('myObject') iframe: ElementRef;

   private index = 0;
    private current_data: any;
  private doc: Document | Window;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getWebsite();
    }

    getWebsite(): void {
        const url = this.route.snapshot.paramMap.get('url');
        let actions = this.route.snapshot.paramMap.get('actions');
        const myObject = document.getElementById('myObject');
        myObject.setAttribute('src', url);
        this.current_data = JSON.parse(actions)[0].user_actions;
        // console.log(this.current_data);
        this.index = 0;
        const btn = document.getElementById('next');
        btn.onclick = (e: Event) => {
            this.next();
        };
    }

    next(): void {
        if (this.index < this.current_data.length) {
            this.highlight(decodeURIComponent(this.current_data[this.index].id));
            this.index += 1;
        } else {
            this.index = 0;
        }
    }

  ngAfterViewInit() {
    this.doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
  }

    highlight(xpath: string): void {
      console.log(xpath);
        function getElementByXpath(path, doc) {
            return <HTMLElement>doc.evaluate(
                path,
                doc,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
        }

        const frame = document.getElementById('myObject');
        let innerDoc = (frame.contentWindow || frame.contentDocument);
        if (innerDoc.document) {
            innerDoc = innerDoc.document;
        }
        // console.log(innerDoc);
        // console.log(xpath);
        const el = getElementByXpath(xpath, innerDoc);
        // console.log(el);
        el.style.border = 'thick solid red';
      //   function getElementByXpath(path, doc) {
      //       return <HTMLElement>doc.evaluate(
      //           path,
      //           doc,
      //           null,
      //           XPathResult.FIRST_ORDERED_NODE_TYPE,
      //           null).singleNodeValue;
      //   }
      // const frame = document.getElementById('myObject');
      // const innerDoc = this.doc;
      // // console.log(innerDoc);
      // //   console.log(xpath);
      //   const el = getElementByXpath(xpath, innerDoc);
      //   console.log(el);
      //   el.style.border = 'thick solid red';
      //   el.style.width = '10px';

    }


}
