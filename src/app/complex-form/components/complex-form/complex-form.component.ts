import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';
import { validValidator } from '../../validators/valid.validator';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-complex-form',
  standalone: false,
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit {
  loading: boolean = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;
  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;
  constructor(private formBuilder: FormBuilder, private complexFormService: ComplexFormService) { }
  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }
  private setPhoneValidators(showPhone: boolean): void {
    if (showPhone) {
      this.phoneCtrl.addValidators([Validators.required, Validators.pattern(/^\d{10}$/)]);
    }
    else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }
  private setEmailValidators(showEmail: boolean): void {
    if (showEmail) {
      this.emailCtrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCtrl.addValidators([Validators.required, Validators.email]);
    }
    else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  }
  private initFormObservables(): void {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmail => this.setEmailValidators(showEmail))
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap((showPhone) => this.setPhoneValidators(showPhone))
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.emailCtrl.value && this.confirmEmailCtrl.value)
    );
    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.passwordCtrl.value && this.confirmPasswordCtrl.value && this.loginInfoForm.hasError('confirmEqual'))
    );
  }
  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this.formBuilder.control('email');
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'
    },
    );
    this.phoneCtrl = this.formBuilder.control('');

    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });

  }
  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }

  onSubmitForm(): void {
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap((saved) => {
        this.loading = false;
        if (saved) {
          this.resetForm();
        }
        else {
          console.error('Erreur lors de la sauvegarde des données');

        }

      })
    ).subscribe();

  }
  private resetForm(): void {
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
  }
  getFormControlText(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    }
    else if (ctrl.hasError('email')) {
      return 'Merci d\'entrer une adresse email valide';
    }
    else if (ctrl.hasError('pattern')) {
      return 'Le numéro de téléphone doit contenir 10 chiffres';
    }
    else if (ctrl.hasError('confirmEqual')) {
      return 'Les champs ne correspondent pas';
    }
    else {
      return 'Ce champ contient une erreur';
    }
  }


}
