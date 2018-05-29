import { TalentCalculatorState } from '../talent-calculator.reducer';
import {
  Talent,
  Glyph
} from '../../../../components/body/pages/talent-calculator/models/talents.model';
import { urlMap } from './talent-url.map';

/**
 * Return true iff glyph can be added to glyphState at index.
 * @param glyphState current state of glyphs represented as list of glyphs
 * @param glyph Glyph
 * @param index index of glyph in glyphState
 */
export function canAddGlyph(
  glyphState: Glyph[],
  glyph: Glyph,
  index: number
): boolean {
  // 1. Cannot add glyph if glyph already equipped.
  if (glyphState.find(g => g && g.id === glyph.id)) {
    console.log(`${glyph.name} is already equipped.`);
    return false;
  }

  // 2. Cannot add glyph if already have 3 of glyph.type equipped where unless replacing 1 of them (in index)
  const count = glyphState.reduce(
    (total, g) => (total = g && glyph.type === g.type ? total + 1 : 0),
    0
  );

  if (
    count === 3 &&
    glyphState[index] &&
    glyphState[index].type !== glyph.type
  ) {
    console.log(`Cannot add glyph too many glyphs of type ${glyph.type}.`);
    return false;
  }

  // 3. Cannot add minor glyph to indexes [0, 1, 2] && major glyph to indexes [3, 4, 5]
  if ((glyph.type === 2 && index < 3) || (glyph.type === 1 && index > 2)) {
    console.log(`Cannot add glyph of type ${glyph.type} at that slot.`);
    return false;
  }

  return true;
}

/**
 * Return true iff a point can be added to talent.
 * @param state current talent calculator state
 * @param talent current Talent point is being added to
 */
export function canAddPoint(
  state: TalentCalculatorState,
  talent: Talent
): boolean {
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

/**
 * Return true iff a point can be removed from talent.
 * @param state current talent calculator state
 * @param talent current Talent point is being removed from
 */
export function canRemovePoint(
  state: TalentCalculatorState,
  talent: Talent
): boolean {
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

/**
 * Return talentPointsArray (array representation of current talent state)
 * @param t encoded talent url param
 */
export function decodeTalentUrlParam(t: string): number[] | null {
  t = reverseMinifyUrl(t);
  if (!t) {
    return null;
  }

  let result = '';

  for (let i = 0; i < t.length; i++) {
    result += urlMap.toInt[t[i]];
  }

  return result.split('').map(x => parseInt(x, 10));
}

/**
 * Return an encoded talent url param
 * @param pointsArray talentPointsArray (array representation of current talent state)
 */
export function getTalentUrlParam(pointsArray: number[]): string {
  const t = pointsArray.join('');
  let result = '';

  for (let i = 0; i < t.length; i += 2) {
    const t_first = t[i];
    const t_sec = t[i + 1] || '0';

    const t_comb = t_first + t_sec;

    result = result + urlMap.toChar[t_comb];
  }

  const trimmedResult = removeTrailingZeros(result);

  return minifyUrl(trimmedResult);
}

// further minify url by grouping I's
function minifyUrl(e: string): string {
  let result = '';
  let counter = 0;

  for (let i = 0; i < e.length; i++) {
    if (e[i] !== 'I') {
      result = result + e[i];
      counter = 0;
    } else {
      counter++;
      if (counter === 1) {
        result = result + e[i];
      } else if (counter === 2) {
        result = result + counter;
      } else if (counter < 11) {
        result = result.substring(0, result.length - 1) + counter;
      } else {
        result = result.substring(0, result.length - 2) + counter;
      }
    }
  }

  return result;
}

// reverse the minifyEncoded result
function reverseMinifyUrl(e) {
  let result = '';

  for (let i = 0; i < e.length; i++) {
    if (e[i] !== 'I') {
      result = result + e[i];
    } else {
      if (isNaN(e[i + 1])) {
        // only 1 I
        result = result + e[i];
      } else {
        let count_I = e[i + 1];
        if (!isNaN(e[i + 2])) {
          count_I = count_I + e[i + 2];
          i++;
        }
        i++;

        result = result + Array(parseInt(count_I, 10) + 1).join('I');
      }
    }
  }

  return result;
}

// removes the trailing I's at the end of url, that are not needed.
function removeTrailingZeros(s: string): string {
  if (!s) {
    return '';
  }
  const len = s.length;
  let i = len - 1;

  while (i >= 0 && s[i] === 'I') {
    i--;
  }

  return s.substring(0, i + 1);
}
