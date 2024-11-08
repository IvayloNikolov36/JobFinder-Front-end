import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOptionsType } from '../../../models/select-options-type';
import { Observable } from 'rxjs';
import { LanguageInfo } from '../../models/cv';


@Component({
  selector: 'jf-languages-info',
  templateUrl: './languages-info.component.html'
})
export class LanguagesInfoComponent {

  @Input() languageTypes!: Observable<SelectOptionsType[]>;
  @Input() languageLevels!: Observable<SelectOptionsType[]>;
  @Output() emitLanguagesInfo = new EventEmitter<LanguageInfo[]>();

  languagesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.languagesForm = this.formBuilder.group({
      languagesInfoArray: new FormArray<FormGroup>([])
    });

    this.addNewLanguageInfoForm();
  }

  addNewLanguageInfoForm() {
    this.l.push(this.formBuilder.group({
      languageType: ['', [Validators.required]],
      comprehension: ['', [Validators.required]],
      speaking: ['', [Validators.required]],
      writing: ['', [Validators.required]]
    }));
  }

  removeLastLanguageInfoForm() {
    if (this.l.length === 1) {
      return;
    }
    this.l.removeAt(this.l.length - 1);
  }

  get lf() {
    return this.languagesForm.controls;
  }

  get l() {
    return this.lf['languagesInfoArray'] as FormArray<FormGroup>;
  }

  emitData() {
    this.emitLanguagesInfo.emit(this.languagesForm.value.languagesInfoArray);
  }
}
