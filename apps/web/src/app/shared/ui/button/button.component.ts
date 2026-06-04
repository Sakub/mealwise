import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  DANGER = 'DANGER',
}

export enum ButtonType {
  BUTTON = 'BUTTON',
  SUBMIT = 'SUBMIT',
  RESET = 'RESET',
}

@Component({
  selector: 'app-ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public readonly variant = input<ButtonVariant>(ButtonVariant.PRIMARY);
  public readonly type = input<ButtonType>(ButtonType.BUTTON);
  public readonly isDisabled = input(false);

  public buttonVariantClass = computed(() => {
    let className = 'ui-button';
    switch (this.variant()) {
      case ButtonVariant.PRIMARY:
        className += '--primary';
        break;
      case ButtonVariant.SECONDARY:
        className += '--secondary';
        break;
      case ButtonVariant.DANGER:
        className += '--danger';
        break;
      default:
        className += '--primary';
    }

    return className;
  });
}
