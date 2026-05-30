import type { QuestDefinition } from './QuestData';
import { QuestObjectiveType } from './QuestObjectiveType';
import { ItemType } from '../items/ItemType';
import { BlockType } from '../voxel/BlockType';

export const QUEST_DEFINITIONS: Record<string, QuestDefinition> = {
  welcome_lumina: {
    id: 'welcome_lumina',
    title: 'Welcome to Lumina',
    description: 'Talk to Kakek to learn about this world.',
    giverNpcId: 'kakek',
    objectives: [
      {
        id: 'talk_to_kakek',
        type: QuestObjectiveType.TalkToNPC,
        description: 'Talk to Kakek',
        targetId: 'kakek',
        requiredCount: 1,
        currentCount: 0
      }
    ],
    rewards: [
      {
        type: 'bimo_message',
        message: 'Great! You have met Kakek. He seems wise.'
      }
    ],
    nextQuestId: 'repair_bridge'
  },
  repair_bridge: {
    id: 'repair_bridge',
    title: 'Repair the Broken Bridge',
    description: 'Gather wood and craft a Bridge Block to cross the river.',
    giverNpcId: 'kakek', // Given right after Welcome is done
    objectives: [
      {
        id: 'gather_wood',
        type: QuestObjectiveType.CollectItem,
        description: 'Collect Wood',
        targetId: ItemType.WoodBlock,
        requiredCount: 5,
        currentCount: 0
      },
      {
        id: 'craft_bridge',
        type: QuestObjectiveType.CraftItem,
        description: 'Craft Bridge Block',
        targetId: ItemType.BridgeBlock,
        requiredCount: 1,
        currentCount: 0
      },
      {
        id: 'place_bridge',
        type: QuestObjectiveType.PlaceBlock,
        description: 'Place Bridge over River',
        targetId: BlockType.Bridge.toString(), // Wait, BlockType enum is numeric. We need to cast to string.
        requiredCount: 1,
        currentCount: 0
      }
    ],
    rewards: [
      {
        type: 'unlock_area',
        areaId: 'outer_platform'
      },
      {
        type: 'bimo_message',
        message: 'You repaired the bridge! Now we can explore further.'
      }
    ],
    nextQuestId: 'crystal_spark'
  },
  crystal_spark: {
    id: 'crystal_spark',
    title: 'The Crystal Spark',
    description: 'Help the Explorer solve a puzzle to get the ancient crystal.',
    giverNpcId: 'explorer',
    objectives: [
      {
        id: 'solve_puzzle',
        type: QuestObjectiveType.SolvePuzzle,
        description: 'Solve the Explorer\'s Puzzle',
        targetId: 'crystal_puzzle_1',
        requiredCount: 1,
        currentCount: 0
      }
    ],
    rewards: [
      {
        type: 'item',
        itemType: ItemType.CrystalShard,
        quantity: 1
      },
      {
        type: 'bimo_message',
        message: 'Amazing! You solved the puzzle and got a Diamond!'
      }
    ]
  }
};
