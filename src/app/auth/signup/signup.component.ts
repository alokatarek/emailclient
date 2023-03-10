import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );
  constructor(
    private matchPassword: MatchPassword,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this._authService.signup(this.authForm.value).subscribe({
      next: response=> {
        this._router.navigateByUrl('/inbox')
      },
      error: err=> {
        if(!err.status) {
          this.authForm.setErrors({noConnection: true})
        }else {
          this.authForm.setErrors({unknownError: true})
        }
      }
    })
  }
}
