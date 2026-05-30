import { QuestSystem } from '../quests/QuestSystem';

export class QuestTrackerUI {
  private container: HTMLElement;
  private questSystem: QuestSystem;

  constructor(questSystem: QuestSystem) {
    this.questSystem = questSystem;

    this.container = document.createElement('div');
    this.container.id = 'quest-tracker-ui';
    // Positioned safely avoiding hotbar/joystick
    this.container.className = 'fixed top-16 right-4 bg-black/60 p-3 rounded-lg text-white pointer-events-none z-10 w-64 border border-yellow-500/50 shadow-lg';
    this.container.style.display = 'none';

    document.body.appendChild(this.container);

    this.questSystem.events.subscribe(() => {
      this.render();
    });
    
    this.render();
  }

  private render() {
    const activeQuests = this.questSystem.getActiveQuests();
    
    if (activeQuests.length === 0) {
      this.container.style.display = 'none';
      return;
    }

    this.container.style.display = 'block';
    
    let html = '';
    for (const quest of activeQuests) {
      html += `<div class="mb-3 last:mb-0">
        <h3 class="text-sm font-bold text-yellow-400 mb-1">${quest.title}</h3>
        <ul class="text-xs text-gray-200 space-y-1">`;
      
      for (const obj of quest.objectives) {
        const isDone = obj.currentCount >= obj.requiredCount;
        const colorClass = isDone ? 'text-green-400' : 'text-gray-200';
        const checkbox = isDone ? '☑' : '☐';
        html += `<li class="${colorClass}">${checkbox} ${obj.description} (${obj.currentCount}/${obj.requiredCount})</li>`;
      }

      html += `</ul></div>`;
    }

    this.container.innerHTML = html;
  }
}
