import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  submitted = false;
  readonly contactForm;

  constructor(formBuilder: FormBuilder) {
    this.contactForm = formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?88)?01[3-9]\d{8}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitMessage(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Bite & Blend contact message:', this.contactForm.getRawValue());
    this.submitted = true;
    this.contactForm.reset();
  }
}
