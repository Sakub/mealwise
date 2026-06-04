import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  type InputSignal,
  type Signal,
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
  public readonly variant: InputSignal<ButtonVariant> = input<ButtonVariant>(ButtonVariant.PRIMARY);
  public readonly type: InputSignal<ButtonType> = input<ButtonType>(ButtonType.BUTTON);
  public readonly isDisabled: InputSignal<boolean> = input(false);

  public readonly buttonVariantClass: Signal<string> = computed(() => {
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
