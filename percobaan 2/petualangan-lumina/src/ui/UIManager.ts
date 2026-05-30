import { TouchOverlay } from './TouchOverlay';
import { HotbarUI } from './HotbarUI';
import { Inventory } from '../inventory/Inventory';
import { Hotbar } from '../inventory/Hotbar';
import { CraftingUI } from './CraftingUI';
import { CraftingSystem } from '../crafting/CraftingSystem';
import { DialogueUI } from './DialogueUI';
import { InteractionPromptUI } from './InteractionPromptUI';
import { BimoMessageUI } from './BimoMessageUI';
import { DialogueSystem } from '../dialogue/DialogueSystem';
import { PerformanceUI } from './PerformanceUI';
import { PerformanceManager } from '../core/PerformanceManager';
import { QuestSystem } from '../quests/QuestSystem';
import { PuzzleSystem } from '../puzzles/PuzzleSystem';
import { QuestTrackerUI } from './QuestTrackerUI';
import { PuzzleUI } from './PuzzleUI';

export class UIManager {
  private overlay: TouchOverlay;
  private craftingUI: CraftingUI | null = null;
  public dialogueUI: DialogueUI | null = null;
  public interactionPromptUI: InteractionPromptUI | null = null;
  public bimoMessageUI: BimoMessageUI | null = null;
  public performanceUI: PerformanceUI;
  public questTrackerUI: QuestTrackerUI | null = null;
  public puzzleUI: PuzzleUI | null = null;

  constructor() {
    this.overlay = new TouchOverlay();
    this.performanceUI = new PerformanceUI();
  }

  public initInventoryUI(inventory: Inventory, hotbar: Hotbar) {
    new HotbarUI(inventory, hotbar);
  }

  public initCraftingUI(craftingSystem: CraftingSystem) {
    this.craftingUI = new CraftingUI(craftingSystem, this);
  }

  public initDialogueUI(dialogueSystem: DialogueSystem) {
    this.dialogueUI = new DialogueUI(() => {
      dialogueSystem.advance();
    });
    this.interactionPromptUI = new InteractionPromptUI();
    this.bimoMessageUI = new BimoMessageUI();

    dialogueSystem.setCallbacks(
      (speaker, text) => {
        this.dialogueUI?.show(speaker, text);
        this.interactionPromptUI?.hide();
        // Hide crafting if open
        if (this.craftingUI && !document.getElementById('crafting-panel')?.classList.contains('hidden')) {
          this.craftingUI.togglePanel();
        }
      },
      () => {
        this.dialogueUI?.hide();
      }
    );
  }

  public initQuestUI(questSystem: QuestSystem) {
    this.questTrackerUI = new QuestTrackerUI(questSystem);
  }

  public initPuzzleUI(puzzleSystem: PuzzleSystem, onPuzzleClosed: () => void) {
    this.puzzleUI = new PuzzleUI(puzzleSystem, onPuzzleClosed);
  }

  public toggleCraftingPanel() {
    if (this.craftingUI) {
      this.craftingUI.togglePanel();
    }
  }

  public showNotification(message: string) {
    this.overlay.showNotification(message);
  }

  public setTargetBlockName(name: string) {
    this.overlay.updateTargetInfo(name);
  }

  public updateMiningProgress(progress: number) {
    this.overlay.updateMiningProgress(progress);
  }

  public update(_deltaTime: number, _elapsedTime: number, _fps: number = 0) {
    this.overlay.updateDebugInfo('--', window.innerWidth, window.innerHeight);
  }

  public updatePerformance(perfManager: PerformanceManager) {
    this.performanceUI.updateFPS(
      perfManager.getCurrentFps(),
      perfManager.getAverageFps(),
      perfManager.isLowEndMode
    );
  }
}

