import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MapService } from 'src/app/services/map.service';
import { ThemeApiService } from 'src/app/services/theme-api.service';
import { ThemeInterface } from 'src/app/interfaces/theme/theme-interface';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  public selectedImage?: File;
  public selectedImageName?: string;

  public isLinear: boolean = false;
  public fileUrl: SafeResourceUrl|null = null;

  public themes:ThemeInterface[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private audioRecorderService: NgAudioRecorderService,
    private sanitizer: DomSanitizer,
    private mapService: MapService,
    private themeService: ThemeApiService
  ) {
  }

  ngOnInit(): void
  {
    this.themeService.getThemes().subscribe(response => {
      console.log(response)
      
      this.themes = response;
    })
  }

  audioForm: FormGroup = this._formBuilder.group({
    audioCtrl: ['', Validators.required],
    titleCtrl: ['', Validators.required],
    themeCtrl: ['', Validators.required],
    imageCtrl: ['', Validators.required],
    latitude: [''],
    longitude: ['']
  });

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
