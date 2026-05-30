import { PuzzleSystem } from '../puzzles/PuzzleSystem';
import type { PuzzleDefinition } from '../puzzles/PuzzleData';

export class PuzzleUI {
  private container: HTMLElement;
  private puzzleSystem: PuzzleSystem;
  private onClosed: () => void;
  public isActive: boolean = false;

  constructor(puzzleSystem: PuzzleSystem, onClosed: () => void) {
    this.puzzleSystem = puzzleSystem;
    this.onClosed = onClosed;

    this.container = document.createElement('div');
    this.container.id = 'puzzle-ui';
    this.container.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 hidden';

    document.body.appendChild(this.container);
  }

  public showPuzzle(puzzleId: string) {
    const puzzle = this.puzzleSystem.getPuzzle(puzzleId);
    if (!puzzle) return;

    this.isActive = true;
    this.container.classList.remove('hidden');
    this.render(puzzle);
  }

  public hide() {
    this.isActive = false;
    this.container.classList.add('hidden');
    this.onClosed();
  }

  private render(puzzle: PuzzleDefinition) {
    let choicesHtml = '';
    for (const choice of puzzle.choices) {
      choicesHtml += `<button class="puzzle-choice-btn w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors border-2 border-blue-400" data-id="${choice.id}">${choice.text}</button>`;
    }

    this.container.innerHTML = `
      <div class="bg-gray-800 border-4 border-yellow-500 p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl relative pointer-events-auto">
        <button id="puzzle-close-btn" class="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 rounded-full border-2 border-white font-bold text-xl hover:bg-red-400">X</button>
        <h2 class="text-2xl font-bold text-yellow-400 mb-2 text-center">${puzzle.title}</h2>
        <div class="bg-black/50 p-4 rounded-lg mb-6 border border-gray-600">
          <p class="text-white text-lg text-center">${puzzle.question}</p>
        </div>
        <div class="space-y-3">
          ${choicesHtml}
        </div>
        ${puzzle.hint ? `<p class="mt-4 text-sm text-gray-400 text-center italic">Hint: ${puzzle.hint}</p>` : ''}
      </div>
    `;

    // Bind events
    const closeBtn = document.getElementById('puzzle-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('pointerdown', (e) => { e.stopPropagation(); this.hide(); });
    }
    
    const btns = this.container.querySelectorAll('.puzzle-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        const choiceId = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (choiceId) {
          const success = this.puzzleSystem.submitAnswer(puzzle.id, choiceId);
          if (success) {
            this.hide();
          } else {
            // Wrong answer feedback
            const target = e.currentTarget as HTMLElement;
            target.classList.remove('bg-blue-600', 'border-blue-400');
            target.classList.add('bg-red-600', 'border-red-400', 'animate-shake');
            setTimeout(() => {
              target.classList.remove('animate-shake');
            }, 500);
          }
        }
      });
    });
  }
}
