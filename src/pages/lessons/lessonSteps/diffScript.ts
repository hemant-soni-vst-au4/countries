import bestSubSequence from 'fast-array-diff/dist/diff/lcs'

export interface Change {
  value: string
  added?: boolean
  removed?: boolean
}

export function diffArr<T>(
  a: T[],
  b: T[],
  compareFunc: (ia: T, ib: T) => boolean = (ia: T, ib: T) => ia === ib,
): Change[] {
  const list = []
  bestSubSequence(
    a,
    b,
    compareFunc,
    (type, oldArr, oldStart, oldEnd, newArr, newStart, newEnd) => {
      if (type === 'add') {
        for (let i = newStart; i < newEnd; ++i) {
          // ret.added.push(newArr[i]);
          list.push({value: newArr[i], added: true})
        }
      } else if (type === 'remove') {
        for (let i = oldStart; i < oldEnd; ++i) {
          // ret.removed.push(oldArr[i]);
          list.push({value: oldArr[i], removed: true})
        }
      } else {
        for (let i = newStart; i < newEnd; ++i) {
          list.push({value: newArr[i]})
        }
      }
    },
  )
  return list
}

export const replaceApostrophe = (str: string) =>
  str
    .replace(/”/g, '"')
    .replace(/“/g, '"')
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
// .replace(/[\u2013\u2014]/g, '-')
// .replace(/[\u2026]/g, '...')

const normalizeWord = (w) => replaceApostrophe(w.replace(/[\s,.?]/, '').toLowerCase())

function compareWord(wa, wb) {
  if (wb === '') return false
  if (wa === ' ' && wb === ' ') return true
  return normalizeWord(wa) === normalizeWord(wb)
}

export function diffText(oldString: string, newString: string): Change[] {
  const oldArr = oldString.replace(/\s\s+/g, ' ').split(/( )/g)
  const newArr = newString.replace(/\s\s+/g, ' ').split(/( )/g)
  return diffArr(oldArr, newArr, compareWord)
}

// diffText(
//   'Who are you? My name is Andy Sacks. I’m good',
//   "who is are you by my name is Andy sacs. I'm good",
// ) //?

// diffText('Who are you? My name is Andy Sacks. I’m good', '') //?
// diffText('They buy more guns', 'they more') //?
