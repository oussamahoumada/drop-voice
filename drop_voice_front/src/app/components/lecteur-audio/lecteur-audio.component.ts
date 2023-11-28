import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lecteur-audio',
  templateUrl: './lecteur-audio.component.html',
  styleUrls: ['./lecteur-audio.component.css'],
})
export class LecteurAudioComponent {
  @Input() audioUrl: string | undefined;
}
