import { Component, signal, type WritableSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ButtonComponent, ButtonType, ButtonVariant } from './button.component';

@Component({
  imports: [ButtonComponent],
  template: `
    <app-ui-button [variant]="variant()" [type]="type()" [isDisabled]="disabled()">
      {{ label() }}
    </app-ui-button>
  `
})
class ButtonHostComponent {
  public readonly variant: WritableSignal<ButtonVariant> = signal(ButtonVariant.PRIMARY);
  public readonly type: WritableSignal<ButtonType> = signal<ButtonType>(ButtonType.BUTTON);
  public readonly disabled: WritableSignal<boolean> = signal(false);
  public readonly label: WritableSignal<string> = signal('Plan meals');
}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHostComponent);
    fixture.detectChanges();
  });

  it('renders projected content and defaults to primary styling', () => {
    const button = getButton();

    expect(button.textContent?.trim()).toBe('Plan meals');
    expect(button.classList.contains('ui-button--primary')).toBe(true);
    expect(button.type).toBe('button');
  });

  it('applies the secondary variant', () => {
    fixture.componentInstance.variant.set(ButtonVariant.SECONDARY);
    fixture.detectChanges();

    expect(getButton().classList.contains('ui-button--secondary')).toBe(true);
  });

  it('applies the danger variant', () => {
    fixture.componentInstance.variant.set(ButtonVariant.DANGER);
    fixture.detectChanges();

    expect(getButton().classList.contains('ui-button--danger')).toBe(true);
  });

  it('passes native button type and disabled state through', () => {
    fixture.componentInstance.type.set(ButtonType.SUBMIT);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const button = getButton();

    expect(button.type).toBe('submit');
    expect(button.disabled).toBe(true);
  });

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  }
});
