export class InteractionPromptUI {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'interaction-prompt';
    this.element.className = 'interaction-prompt hidden';
    document.getElementById('ui-overlay')?.appendChild(this.element);
  }

  public show(targetName: string) {
    this.element.innerText = `[E] Talk to ${targetName}`;
    this.element.classList.remove('hidden');
  }

  public hide() {
    this.element.classList.add('hidden');
  }
}
