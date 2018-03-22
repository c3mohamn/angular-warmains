export enum Classes {
  Warrior = 1,
  Paladin,
  Hunter,
  Rogue,
  Priest,
  Deathknight,
  Shaman,
  Mage,
  Warlock,
  Monk, // Placeholder for 10
  Druid
}

export enum ClassesColors {
  Warrior = '#C79C6E',
  Paladin = '#F58CBA',
  Hunter = '#ABD473',
  Rogue = '#FFF569',
  Priest = '#FFFFFF',
  Deathknight = '#C41F3B',
  Shaman = '#0070DE',
  Mage = '	#69CCF0',
  Warlock = '#9482C9',
  Druid = '#FF7D0A',
  Monk = '#00FF96',
  Demonhunter = '#A330C9'
}

export class ClassesSpecs {
  Warrior: string[] = ['arms', 'fury', 'protection'];
  Paladin: string[] = ['holy', 'protection', 'retribution'];
  Hunter: string[] = ['beastmastery', 'marksmanship', 'survival'];
  Rogue: string[] = ['assassination', 'combat', 'subtlety'];
  Priest: string[] = ['discipline', 'holy', 'shadow'];
  Deathknight: string[] = ['blood', 'frost', 'unholy'];
  Shaman: string[] = ['elemental', 'enhancement', 'restoration'];
  Mage: string[] = ['arcane', 'fire', 'frost'];
  Warlock: string[] = ['affliction', 'demonology', 'destruction'];
  Druid: string[] = ['balance', 'feral', 'restoration'];

  constructor() { }

  public getClassSpec(classId: number, treeId: number) {
    return this[Classes[classId]][treeId];
  }
}
