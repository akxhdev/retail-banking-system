import { Attribute, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.css'],
})
export class TabHeaderComponent implements OnInit {
  constructor(@Attribute('title') public title: string) {}

  ngOnInit(): void {}
}
