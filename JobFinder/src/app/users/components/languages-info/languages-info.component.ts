import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageInfo } from '../../models/cv';
import { BasicValueModel } from '../../../core/models';

@Component({
  selector: 'jf-languages-info',
  templateUrl: './languages-info.component.html'
})
export class LanguagesInfoComponent implements OnInit {

  languageTypes = input.required<BasicValueModel[]>();
  languageLevels = input.required<BasicValueModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() languagesInfoData: LanguageInfo[] = [];
  @Output() emitLanguagesInfo = new EventEmitter<LanguageInfo[]>();

  languagesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.addForms();
  }

  get lf() {
    return this.languagesForm.controls;
  }

  get l() {
    return this.lf['languagesInfoArray'] as FormArray<FormGroup>;
  }

  addNewLanguageInfoForm(): FormGroup<any> {

    const formGroup: FormGroup<any> = this.formBuilder.group({
      id: ['', []],
      cvId: ['', []],
      languageType: ['', [Validators.required]],
      comprehension: ['', [Validators.required]],
      speaking: ['', [Validators.required]],
      writing: ['', [Validators.required]]
    });

    this.l.push(formGroup);

    return formGroup;
  }

  removeLastLanguageInfoForm(): void {
    if (this.l.length === 1) {
      return;
    }
    this.l.removeAt(this.l.length - 1);
  }

  emitData(): void {
    const data: LanguageInfo[] = this.languagesForm.value.languagesInfoArray;
    this.setNewLanguagesDataId(data);
    this.setTheFullModel(data);
    this.emitLanguagesInfo.emit(data);
  }

  private setNewLanguagesDataId = (educationsData: LanguageInfo[]): void => {
    educationsData.forEach((element: LanguageInfo) => {
      if (!element.id) {
        element.id = 0;
      }
    });
  }

  private setTheFullModel = (educationsData: LanguageInfo[]): void => {
    educationsData.forEach((element: LanguageInfo) => {
      debugger;
      element.languageType = this.languageTypes().filter(x => x.value === element.languageType.value)[0];

    });
  }

  private initializeForm(): void {
    this.languagesForm = this.formBuilder.group({
      languagesInfoArray: new FormArray<FormGroup>([])
    });
  }

  private addForms = (): void => {
    if (this.languagesInfoData.length > 0) {
      this.languagesInfoData.forEach((languagesInfoData: LanguageInfo) => {
        const formGroup: FormGroup<any> = this.addNewLanguageInfoForm();
        formGroup.controls['id'].setValue(languagesInfoData.id);
        formGroup.controls['languageType'].setValue(languagesInfoData.languageType.value);
        formGroup.controls['comprehension'].setValue(languagesInfoData.comprehension.value);
        formGroup.controls['speaking'].setValue(languagesInfoData.speaking.value);
        formGroup.controls['writing'].setValue(languagesInfoData.writing.value);
      });
    } else {
      this.addNewLanguageInfoForm();
    }
  }
}
