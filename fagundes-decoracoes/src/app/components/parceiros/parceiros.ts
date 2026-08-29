import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-parceiros',
  imports: [CommonModule],
  templateUrl: './parceiros.html',
  styleUrl: './parceiros.scss',
})
export class Parceiros {
  parceiros = [
    'cea.png', 'Cenibra.png', 'FSFX.png', 'Globo.png', 'oboticario.png',
    'Pitagoras.png', 'Riachuelo.png', 'UFV.png', 'Unileste.jpg', 'Usiminas.png'
  ];
}
