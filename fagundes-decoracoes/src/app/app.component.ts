import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Sobre } from './components/sobre/sobre';
import { Servicos } from './components/servicos/servicos';
import { GaleriaAnimacao } from './components/galeria-animacao/galeria-animacao';
import { Metodologia } from './components/metodologia/metodologia';
import { Avaliacoes } from './components/avaliacoes/avaliacoes';
import { Galeria } from './components/galeria/galeria';
import { Footer } from './components/footer/footer';
import { Parceiros } from './components/parceiros/parceiros';
import { Localizacao } from './components/localizacao/localizacao';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Sobre, Servicos, GaleriaAnimacao, Metodologia, Avaliacoes, Galeria, Parceiros, Localizacao, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'fagundes-decoracoes';
}
