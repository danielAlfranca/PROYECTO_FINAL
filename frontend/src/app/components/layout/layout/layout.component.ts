import { Component, OnInit, AfterViewInit, ViewChild,ElementRef } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [    
        query(':enter, :leave', style({ position:'absolute' , left:0, right:0 }),{ optional: true }),
        group([ 
          query(':enter', [
            style({ scale: '0', padding:'0'}),
            animate('0.5s ease-in-out', style({ scale: 1, padding:'0', position:'static'})),
            
          ],{ optional: true }),
          query(':leave', [
            style({ 'scale': '1' }),
            animate('0.5s ease-in-out', style({  scale: '0'}))],
            { optional: true }),
        ])
      ])
    ])
   ]
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

  getState(outlet:any) {

    return outlet.activatedRouteData;
  }

}
