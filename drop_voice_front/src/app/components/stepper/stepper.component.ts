import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { MapService } from 'src/app/services/map.service';
import { getCurrentDate } from 'src/app/helpers/date_formatter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeApiService } from 'src/app/services/theme-api.service';
import { DropDataService } from 'src/app/services/drop-data.service';
import { ThemeInterface } from 'src/app/interfaces/theme/theme-interface';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  @ViewChild('recordButton') recordButton!: ElementRef;

  public selectedImage?: File;
  public selectedImageName?: string;

  public isRecording: boolean = false;

  public isLinear: boolean = false;
  public fileUrl: SafeResourceUrl | null = null;

  public themes: ThemeInterface[] = [];

  public image: any;
  public audio: any;

  constructor(
    private _formBuilder: FormBuilder,
    private audioRecorderService: NgAudioRecorderService,
    private sanitizer: DomSanitizer,
    private mapService: MapService,
    private themeService: ThemeApiService,
    private dropService: DropDataService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.themeService.getThemes().subscribe((response) => {
      this.themes = response;
    });
  }

  audioForm: FormGroup = this._formBuilder.group({
    audio_url: ['audio.mp3', Validators.required],
    audio: ['', Validators.required],
    title: ['', Validators.required],
    theme: ['', Validators.required],
    image_url: ['image.jpg', Validators.required],
    image: ['', Validators.required],
    date: [getCurrentDate(), Validators.required],
    latitude: [''],
    longitude: [''],
    ref_user: this.cookieService.get('id'),
  });

  public startRecording(): void {
    this.audioRecorderService.startRecording();
    this.isRecording = true;
  }

  public onImageSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    let reader = new FileReader();

    this.selectedImageName = file ? file.name : undefined;
    reader.readAsDataURL(event.target.files[0]);

    const id: string = 'id' + Math.random().toString(16).slice(2);
    this.audioForm.patchValue({ image_url: id + event.target.files[0].name });

    reader.onload = (event: any) => {
      this.image = event.target.result;
      this.audioForm.patchValue({ image: event.target.result });
    };
  }

  public stopRecording(): void
  {
    this.isRecording = false;

    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      if (output instanceof Blob) {
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(output)
        );

        let reader = new FileReader();
        reader.readAsDataURL(output);

        reader.onload = (event: any) => {
          this.audio = event.target.result;
          const id: string = 'id' + Math.random().toString(16).slice(2) + '.mp3';
          this.audioForm.patchValue({ audio: event.target.result });
          this.audioForm.patchValue({ audio_url: id });
        }

        this.audioForm.patchValue({ audioCtrl: output });
        console.log(output)
      }
    }).catch(errorCase => {
      console.error(errorCase)
    });
  }

  public submitForm(): void {
    if (this.audioForm.valid) {
      this.mapService.getCurrentPosition().subscribe((map) => {
        this.audioForm.patchValue({ latitude: map.latitude });
        this.audioForm.patchValue({ longitude: map.longitude });
        console.log(this.audioForm.value);
        this.dropService
          .postDrop(this.audioForm.value)
          .subscribe({
            next: (response: string) => {
              if (response === 'success') {
                Swal.fire('Success', 'Votre enregistrement à été bien sauvegardé', 'success');
              } else {
                Swal.fire('error', 'Une erreur est survenue', 'error');
              }
            }
          });
      });
    } else {
      alert('Veuillez remplir le formulaire');
    }
  }
}
