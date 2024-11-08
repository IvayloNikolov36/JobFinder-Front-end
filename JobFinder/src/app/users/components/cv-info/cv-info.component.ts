import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvCreate } from '../../models/cv';


@Component({
  selector: 'jf-cv-info',
  templateUrl: './cv-info.component.html'
})
export class CvInfoComponent {

  @Output() emitCvInfoData: EventEmitter<CvCreate> = new EventEmitter<CvCreate>();

  readonly urlPicPattern: RegExp = /^(http(s)?:\/\/)(.+)\.(jp(e)?g)$/;
  cvInfoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cvInfoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      pictureUrl: ['', [Validators.required, Validators.pattern(this.urlPicPattern)]]
    });
  }

  emitData() {
    this.emitCvInfoData.emit(this.cvInfoForm.value);
  }
}
