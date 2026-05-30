export type DialogueLine = {
  speaker: string;
  text: string;
};

export type NPCData = {
  id: string;
  name: string;
  role: string;
  dialogueLines: DialogueLine[];
};

export const NPC_DEFINITIONS: Record<string, NPCData> = {
  pak_ramu: {
    id: 'pak_ramu',
    name: 'Pak Ramu',
    role: 'Village Builder',
    dialogueLines: [
      { speaker: 'Pak Ramu', text: 'Ah, a new helper! Welcome to Lumina.' },
      { speaker: 'Pak Ramu', text: 'This bridge has been broken for a while.' },
      { speaker: 'Pak Ramu', text: 'Someday, we will repair it with strong blocks and smart planning.' },
      { speaker: 'Pak Ramu', text: 'For now, try gathering wood and stone around the island.' }
    ]
  },
  nara: {
    id: 'nara',
    name: 'Nara',
    role: 'Explorer Guide',
    dialogueLines: [
      { speaker: 'Nara', text: 'Hi there! This is Lumina, a world built from blocks and bright ideas.' },
      { speaker: 'Nara', text: 'You can look around, collect resources, craft items, and build your own path.' },
      { speaker: 'Nara', text: 'Try walking around the village and meeting everyone.' },
      { speaker: 'Nara', text: 'Bimo seems to like you already.' }
    ]
  },
  tiko: {
    id: 'tiko',
    name: 'Tiko',
    role: 'Crystal Caretaker',
    dialogueLines: [
      { speaker: 'Tiko', text: 'These crystals store tiny sparks of Lumina energy.' },
      { speaker: 'Tiko', text: 'If you break a crystal block, you may collect a crystal shard.' },
      { speaker: 'Tiko', text: 'Crystal shards will be useful later for special crafting.' },
      { speaker: 'Tiko', text: 'Be careful with the ridge. The island has gaps.' }
    ]
  }
};
