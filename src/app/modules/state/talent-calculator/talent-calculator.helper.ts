import { TalentCalculatorState } from './talent-calculator.reducer';
import { Talent } from '../../../components/body/pages/talent-calculator/models/talents.model';

export function canAddPoint(state: TalentCalculatorState, talent: Talent) {
  let canAdd = true;

  if (talent.curRank === talent.maxRank) {
    console.log(`${talent.name} is already maxed.`);
    canAdd = false;
  } else if (state.meta.totalPoints === 71) {
    console.log('No points left to use.');
    canAdd = false;
  } else if (state.meta.preview[talent.tree] < 5 * talent.row) {
    console.log(`This talent requires ${talent.row * 5} points`);
    canAdd = false;
  } else if (
    talent.requires &&
    state.talents[talent.requires].curRank !==
      state.talents[talent.requires].maxRank
  ) {
    console.log(
      `This talent requires max points in talent ${
        state.talents[talent.requires].name
      }`
    );
    canAdd = false;
  }

  return canAdd;
}

export function canRemovePoint(state: TalentCalculatorState, talent: Talent) {
  let canRemove = true;
  const lastActiveRow = state.meta.lastActiveRow[talent.tree];

  if (talent.curRank === 0) {
    console.log(`${talent.name} has no talents points to remove.`);
    canRemove = false;
  } else if (talent.allows) {
    talent.allows.forEach(id => {
      if (state.talents[id].curRank > 0) {
        console.log(
          `This talent is a prequisite for ${state.talents[id].name}.`
        );
        canRemove = false;
      }
    });
  }
  if (talent.row !== lastActiveRow) {
    // do something
    let i = 0;
    while (lastActiveRow - i > talent.row) {
      if (
        sumRows(lastActiveRow - i, state.meta.treeRows[talent.tree]) <=
        (lastActiveRow - i) * 5
      ) {
        console.log(`This talent is required for row ${lastActiveRow - i}`);
        return false;
      }
      i++;
    }
  }

  function sumRows(lastRow: number, rows: number[]) {
    if (lastRow === 0) {
      return rows[0];
    }

    let sum = 0;
    let i = lastRow - 1;

    while (i >= 0) {
      sum += rows[i];
      i -= 1;
    }

    console.log(sum);

    return sum;
  }

  return canRemove;
}
