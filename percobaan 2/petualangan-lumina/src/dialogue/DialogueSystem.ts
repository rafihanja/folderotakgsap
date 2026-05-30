import type { NPCData } from '../npc/NPCData';

type DialogueState = {
  npc: NPCData | null;
  lineIndex: number;
  isActive: boolean;
};

export class DialogueSystem {
  private state: DialogueState = {
    npc: null,
    lineIndex: 0,
    isActive: false,
  };

  private onLineChanged: ((speaker: string, text: string) => void) | null = null;
  private onDialogueEnded: (() => void) | null = null;

  public setCallbacks(onLineChanged: (speaker: string, text: string) => void, onDialogueEnded: () => void) {
    this.onLineChanged = onLineChanged;
    this.onDialogueEnded = onDialogueEnded;
  }

  public startDialogue(npc: NPCData) {
    if (!npc || npc.dialogueLines.length === 0) return;

    this.state.npc = npc;
    this.state.lineIndex = 0;
    this.state.isActive = true;

    this.emitCurrentLine();
  }

  public advance() {
    if (!this.state.isActive || !this.state.npc) return;

    this.state.lineIndex++;

    if (this.state.lineIndex >= this.state.npc.dialogueLines.length) {
      this.closeDialogue();
    } else {
      this.emitCurrentLine();
    }
  }

  public closeDialogue() {
    this.state.isActive = false;
    this.state.npc = null;
    this.state.lineIndex = 0;

    if (this.onDialogueEnded) {
      this.onDialogueEnded();
    }
  }

  public isActive(): boolean {
    return this.state.isActive;
  }

  private emitCurrentLine() {
    if (this.state.npc && this.onLineChanged) {
      const line = this.state.npc.dialogueLines[this.state.lineIndex];
      this.onLineChanged(line.speaker, line.text);
    }
  }
}
