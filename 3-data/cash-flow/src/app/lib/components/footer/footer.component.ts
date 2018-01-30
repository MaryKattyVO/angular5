import { Component, OnInit } from "@angular/core";

@Component({
  selector: "cf-footer",
  template: `
    <footer>
      <a href="https://academia-binaria.com/categories/Tutorial/Angular/">Tutorial</a> developed by <a href="https://twitter.com/albertobasalo">Alberto Basalo</a>
    </footer>
  `,
  styles: [
    `
    footer{
      border-top: .1rem solid;
      text-align: center;
    }
  `
  ]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
