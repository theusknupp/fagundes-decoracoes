import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

interface Review {
  author: string;
  photoUrl: string;
  date: string;
  text: string;
}

@Component({
  selector: 'app-avaliacoes',
  imports: [CommonModule],
  templateUrl: './avaliacoes.html',
  styleUrl: './avaliacoes.scss',
})
export class Avaliacoes {
  reviews: Review[] = [
    {
      author: 'Carlos Eduardo',
      photoUrl: 'https://ui-avatars.com/api/?name=Carlos+Eduardo&background=0D8ABC&color=fff',
      date: '1 semana atrás',
      text: 'Trabalho impecável! Contratei a Fagundes para fazer o forro de gesso acartonado e a iluminação da minha clínica. O acabamento ficou perfeito e entregaram antes do prazo previsto. Recomendo de olhos fechados!'
    },
    {
      author: 'Mariana Silva',
      photoUrl: 'https://ui-avatars.com/api/?name=Mariana+Silva&background=e74c3c&color=fff',
      date: '3 meses atrás',
      text: 'Excelentes profissionais. Fizeram toda a parte de isolamento acústico e drywall do meu estúdio. A diferença no som é absurda e a equipe deixou tudo muito limpo no final da obra.'
    },
    {
      author: 'Roberto Almeida',
      photoUrl: 'https://ui-avatars.com/api/?name=Roberto+Almeida&background=f8c146&color=fff',
      date: '5 meses atrás',
      text: 'Fizemos a reforma do nosso escritório comercial com eles. Instalação de pisos elevados e divisórias. Atendimento nota 10 desde o orçamento até a entrega das chaves.'
    }
  ];
}
