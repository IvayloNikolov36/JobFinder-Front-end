import { Component, effect, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageInfoInput } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-languages-info',
  templateUrl: './languages-info.component.html'
})
export class LanguagesInfoComponent implements OnInit {

  languageTypes = input.required<BasicModel[]>();
  languageLevels = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() languagesInfoData: LanguageInfoInput[] = [];
  @Output() emitLanguagesInfo = new EventEmitter<LanguageInfoInput[]>();

  languagesForm!: FormGroup;
  languageTypesData!: BasicModel[];
  languageLevelsData!: BasicModel[];

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.languageTypesData = this.languageTypes();
      this.languageLevelsData = this.languageLevels();
    });
   }

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
    const data: any[] = this.languagesForm.value.languagesInfoArray;
    const languageInfo: LanguageInfoInput[] = this.transformData(data);
    this.emitLanguagesInfo.emit(languageInfo);
  }

  private transformData = (data: any[]): LanguageInfoInput[] => {
    const langugageInfos = data.map((element: any) => {
      const languageInfo: LanguageInfoInput = {} as LanguageInfoInput;
      languageInfo.id = element.id;
      if (!element.id) {
        languageInfo.id = 0;
      }
      languageInfo.cvId = element.cvId;
      languageInfo.languageType = this.languageTypesData.filter(lt => lt.id === element.languageType.id)[0];
      languageInfo.comprehensionLevel = this.languageLevelsData.filter(ll => ll.id === element.comprehensionLevel.id)[0];
      languageInfo.speakingLevel = this.languageLevelsData.filter(ll => ll.id === element.speakingLevel.id)[0];
      languageInfo.writingLevel = this.languageLevelsData.filter(ll => ll.id === element.writingLevel.id)[0];

      return languageInfo;
    });

    return langugageInfos;
  }

  private initializeForm(): void {
    this.languagesForm = this.formBuilder.group({
      languagesInfoArray: new FormArray<FormGroup>([])
    });
  }

  private addForms = (): void => {
    if (this.languagesInfoData.length > 0) {
      this.languagesInfoData.forEach((languagesInfoData: LanguageInfoInput) => {
        const formGroup: FormGroup<any> = this.addNewLanguageInfoForm();
        formGroup.controls['id'].setValue(languagesInfoData.id);
        formGroup.controls['languageType'].setValue(languagesInfoData.languageType.id);
        formGroup.controls['comprehension'].setValue(languagesInfoData.comprehensionLevel.id);
        formGroup.controls['speaking'].setValue(languagesInfoData.speakingLevel.id);
        formGroup.controls['writing'].setValue(languagesInfoData.writingLevel.id);
      });
    } else {
      this.addNewLanguageInfoForm();
    }
  }
}
