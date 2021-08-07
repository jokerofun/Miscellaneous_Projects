import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  phoneNumbers: string[] = ['+359', '+435', '+677'];
  @ViewChild('form')
  htmlForm: NgForm;
  model ={}
  constructor() { }

  ngOnInit() {
  }

  register(formData) {
    if(!this.htmlForm.invalid) {
      this.htmlForm.reset();
    }
  }

}
