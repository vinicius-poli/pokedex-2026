import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { ListagemFavoritos } from './pokemon/favoritos/listagem-favoritos';

@Component({
  imports: [Navbar, RouterOutlet, ListagemFavoritos],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}