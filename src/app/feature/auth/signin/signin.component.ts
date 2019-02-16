import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthRequest } from '../model/auth-request';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.authService.login(new AuthRequest(form.value.username, form.value.password) )
      .subscribe(
        logged => {
          console.log(`${logged.username} logged in successfuly.`);
          this.router.navigate(['/']);
        },
        error => console.log('There was an error logging the user.')
      );
  }

}
