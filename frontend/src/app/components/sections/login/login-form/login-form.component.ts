import { Component, OnInit , Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() query = new EventEmitter()

  section = 0;
  email!:string;
  password!:string;


  constructor() { }


  newQuery(){

    this.query.emit({

      email:this.email,
      password:this.password,
      type: this.section == 0 ? 'login':'register'

    })
  }



}
