export enum ClassNames {
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

export enum ClassColors {
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

export const ClassSpecs = {
  Warrior: ['arms', 'fury', 'protection'],
  Paladin: ['holy', 'protection', 'retribution'],
  Hunter: ['beastmastery', 'marksmanship', 'survival'],
  Rogue: ['assassination', 'combat', 'subtlety'],
  Priest: ['discipline', 'holy', 'shadow'],
  Deathknight: ['blood', 'frost', 'unholy'],
  Shaman: ['elemental', 'enhancement', 'restoration'],
  Mage: ['arcane', 'fire', 'frost'],
  Warlock: ['affliction', 'demonology', 'destruction'],
  Druid: ['balance', 'feral', 'restoration']
};
