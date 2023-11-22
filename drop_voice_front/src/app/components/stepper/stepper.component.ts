import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {

  constructor(private _formBuilder: FormBuilder, private audioRecorderService: NgAudioRecorderService, private sanitizer: DomSanitizer) {}

  selectedImage?: File;
  selectedImageName?: string;

  audioForm: FormGroup = this._formBuilder.group({
    audioCtrl: ['', Validators.required],
    titleCtrl: ['', Validators.required],
    themeCtrl: ['Musique', Validators.required],
    imageCtrl: ['', Validators.required]
  });

  isLinear: boolean = false;
  fileUrl: SafeResourceUrl|null = null;

  startRecording() {
    this.audioRecorderService.startRecording();
  }

  onImageSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.audioForm.patchValue({ imageCtrl: file });
    this.selectedImageName = file ? file.name : undefined;
  }
  
  stopRecording() {
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      if (output instanceof Blob) {
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(output));
      }
      this.audioForm.patchValue({ audioCtrl: output });
      console.log(output)
    }).catch(errorCase => {
      console.error(errorCase)
    });
  }

  submitForm() {
    console.log(this.audioForm.value);
  }
}
