import { Component, OnInit, AfterViewInit, ViewChild,ElementRef } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  isLogin=true;
  @ViewChild('appWrapper') appWrapper!:ElementRef<HTMLElement>;

  constructor(private appConfig:AppConfigService) { }

  ngOnInit(): void {

    this.appConfig.queries.$dataUpdates.subscribe(e=>{ this.isLogin = false; })
  }

  ngAfterViewInit(): void {
      
  }

}
