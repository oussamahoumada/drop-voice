import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private audioRecorderService: NgAudioRecorderService,
    private sanitizer: DomSanitizer,
    private mapService: MapService
  ) {
  }

  selectedImage?: File;
  selectedImageName?: string;

  audioForm: FormGroup = this._formBuilder.group({
    audioCtrl: ['', Validators.required],
    titleCtrl: ['', Validators.required],
    themeCtrl: ['Musique', Validators.required],
    imageCtrl: ['', Validators.required],
    latitude: [''],
    longitude: ['']
  });

  isLinear: boolean = false;
  fileUrl: SafeResourceUrl|null = null;

  public startRecording(): void
  {
    this.audioRecorderService.startRecording();
  }

  public onImageSelected(event: any): void
  {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.audioForm.patchValue({ imageCtrl: file });
    this.selectedImageName = file ? file.name : undefined;
  }
  
  public stopRecording(): void
  {
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

  public submitForm(): void
  {
    if (this.audioForm.valid) {
      this.mapService.getCurrentPosition().subscribe(map => {
        this.audioForm.patchValue({ latitude: map.latitude})
        this.audioForm.patchValue({ longitude: map.longitude})
        console.log(this.audioForm.value);
      })

    } else {
      alert('Veuillez completer le formulaire');
    }
  }
}
