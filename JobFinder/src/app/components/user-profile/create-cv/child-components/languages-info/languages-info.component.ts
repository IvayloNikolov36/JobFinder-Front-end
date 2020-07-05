import { SelectOptionsType } from './../../../../../core/models/common/select-options-type';
import { Observable } from 'rxjs';
import { LanguageInfo } from './../../../../../core/models/cv/language-info';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-languages-info',
  templateUrl: './languages-info.component.html',
  styleUrls: ['./languages-info.component.css']
})
export class LanguagesInfoComponent implements OnInit {
  languagesForm: FormGroup;

  @Input() languageTypes: Observable<SelectOptionsType[]>;
  @Input() languageLevels: Observable<SelectOptionsType[]>;
  @Output() emitLanguagesInfo = new EventEmitter<LanguageInfo[]>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.languagesForm = this.formBuilder.group({
      languagesInfoArray: new FormArray([])
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
    return this.lf.languagesInfoArray as FormArray;
  }

  emitData() {
    this.emitLanguagesInfo.emit(this.languagesForm.value.languagesInfoArray);
  }

}
