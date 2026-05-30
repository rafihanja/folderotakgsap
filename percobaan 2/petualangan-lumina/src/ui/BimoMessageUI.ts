export class BimoMessageUI {
  private element: HTMLElement;
  private textEl: HTMLElement;
  private timeoutId: number | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'bimo-bubble';
    this.element.className = 'bimo-bubble hidden';

    const speakerEl = document.createElement('div');
    speakerEl.className = 'bimo-speaker';
    speakerEl.innerText = 'Bimo';

    this.textEl = document.createElement('div');
    this.textEl.className = 'bimo-text';

    this.element.appendChild(speakerEl);
    this.element.appendChild(this.textEl);

    document.getElementById('ui-overlay')?.appendChild(this.element);
  }

  public showMessage(text: string, durationMs: number = 5000) {
    this.textEl.innerText = text;
    this.element.classList.remove('hidden');

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.hide();
    }, durationMs);
  }

  public hide() {
    this.element.classList.add('hidden');
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
