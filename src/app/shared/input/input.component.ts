import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() label: string= ''
  @Input() controlName: any;
  @Input() inputType: string= '';
  @Input() controlType = 'input';
  constructor() { }

  ngOnInit(): void {
  }

  showErrors() {
    const {dirty, errors}= this.controlName;

    return dirty && errors;
  }

}
