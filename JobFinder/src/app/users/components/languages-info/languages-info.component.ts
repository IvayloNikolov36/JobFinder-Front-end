import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LanguageInfo } from '../../models/cv';
import { BasicValueModel } from '../../../core/models';


@Component({
  selector: 'jf-languages-info',
  templateUrl: './languages-info.component.html'
})
export class LanguagesInfoComponent implements OnInit {

  languageTypes = input.required<BasicValueModel[]>();
  languageLevels = input.required<BasicValueModel[]>();
  @Output() emitLanguagesInfo = new EventEmitter<LanguageInfo[]>();

  languagesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.addNewLanguageInfoForm();
  }

  get lf() {
    return this.languagesForm.controls;
  }

  get l() {
    return this.lf['languagesInfoArray'] as FormArray<FormGroup>;
  }

  addNewLanguageInfoForm(): void {
    this.l.push(this.formBuilder.group({
      languageType: ['', [Validators.required]],
      comprehension: ['', [Validators.required]],
      speaking: ['', [Validators.required]],
      writing: ['', [Validators.required]]
    }));
  }

  removeLastLanguageInfoForm(): void {
    if (this.l.length === 1) {
      return;
    }
    this.l.removeAt(this.l.length - 1);
  }

  emitData(): void {
    this.emitLanguagesInfo.emit(this.languagesForm.value.languagesInfoArray);
  }

  private initializeForm(): void {
    this.languagesForm = this.formBuilder.group({
      languagesInfoArray: new FormArray<FormGroup>([])
    });
  }
}
