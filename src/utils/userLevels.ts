export const userLevels = {
  UpperBeginner: 'Upper Beginner',
  'Upper-beginner': 'Upper Beginner',
  Elementary: 'Upper Beginner',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
}

export const getOldUserLevel = (level: string) =>
  level.toLocaleLowerCase() === 'upper-beginner' ? 'Elementary' : level

export const fromOldUserLevel = (level: string) => userLevels[level]
