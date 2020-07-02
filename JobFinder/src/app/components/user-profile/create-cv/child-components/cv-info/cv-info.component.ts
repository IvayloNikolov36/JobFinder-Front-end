import { CvCreate } from './../../../../../core/models/cv/cv-create';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cv-info',
  templateUrl: './cv-info.component.html',
  styleUrls: ['./cv-info.component.css']
})
export class CvInfoComponent implements OnInit {
  urlPicPattern = /^(http(s)?:\/\/)(.+)\.(jp(e)?g)$/;
  cvInfoForm: FormGroup;

  @Output() emitCvInfoData = new EventEmitter<CvCreate>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cvInfoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      pictureUrl: ['', [Validators.required, Validators.pattern(this.urlPicPattern)]]
    });
  }

  get f() {
    return this.cvInfoForm.controls;
  }

  emitData() {
    this.emitCvInfoData.emit(this.cvInfoForm.value);
  }

}
