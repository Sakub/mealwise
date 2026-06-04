import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent, ButtonVariant } from './shared/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public readonly ButtonVariant = ButtonVariant;
}
