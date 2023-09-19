import { Component, OnInit, HostBinding } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadtrackerService } from 'src/app/shared/helpers/service/leadtracker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('class')
  class: string = 'full-height'
  loginForm!: UntypedFormGroup;
  constructor(
    private loginService: LeadtrackerService,
    private _router: Router,
    private _forms: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this._forms.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    let form = {
      username: 'partner@cied.eu',
      password: '2WsR+LcYhzvc?#y',
      device_id: 'fgdg'
    }
  }

  login() {
    let form = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
      device_id: 'fgdg'
    }
    this.loginService.login(form).subscribe(res => {
      sessionStorage.setItem('token',res.data.token);
      sessionStorage.setItem('userid',res.data.id);
      this._router.navigate(['dashboard']);
    })
  }

}
