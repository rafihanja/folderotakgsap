export class DialogueUI {
  private panel: HTMLElement;
  private speakerEl: HTMLElement;
  private textEl: HTMLElement;

  constructor(onAdvance: () => void) {
    this.panel = document.createElement('div');
    this.panel.id = 'dialogue-panel';
    this.panel.className = 'dialogue-panel hidden';

    this.speakerEl = document.createElement('div');
    this.speakerEl.className = 'dialogue-speaker';

    this.textEl = document.createElement('div');
    this.textEl.className = 'dialogue-text';

    const hintEl = document.createElement('div');
    hintEl.className = 'dialogue-hint';
    hintEl.innerText = 'Tap / Space / Enter to continue';

    this.panel.appendChild(this.speakerEl);
    this.panel.appendChild(this.textEl);
    this.panel.appendChild(hintEl);

    // Advance on tap
    this.panel.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      onAdvance();
    });

    document.getElementById('ui-overlay')?.appendChild(this.panel);
  }

  public show(speaker: string, text: string) {
    this.speakerEl.innerText = speaker;
    this.textEl.innerText = text;
    this.panel.classList.remove('hidden');
  }

  public hide() {
    this.panel.classList.add('hidden');
  }
}
