import {gql, makeVar, TypePolicies} from '@apollo/client'
import {LevelName} from '../schema/types-and-hooks'

export const localTypeDefs = gql`
  extend type Query {
    currentLessonId: String
    dictation(lessonId: Int!, sceneIdx: Int!): String
  }
  extend type Mutation {
    updateDictation(id: ID!): String
  }
  extend type WordNoteCursorPage {
    hasMore: Boolean
  }
  extend type LessonCursorPage {
    hasMore: Boolean
  }
  extend type Lesson {
    videoLevelLabel: String
  }
  extend type Course {
    videoLevelLabel: String
  }
`

export const currentLessonIdVar = makeVar<any>(null)
export const dictationsVar = makeVar<any>({})
export const recordsVar = makeVar<any>({})

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      currentLessonId: {
        read(_, {variables}) {
          if (variables.id) {
            return variables.id
          }

          return currentLessonIdVar()
        },
      },
      dictation: {
        read(_, {variables}) {
          console.log({variables})

          const {sceneIdx} = variables
          const lessonId = currentLessonIdVar()

          return dictationsVar()[`${lessonId}:${sceneIdx}`] || ''
        },
      },
      records: {
        read(_, {variables}) {
          console.log({variables})

          const {sceneIdx} = variables
          const lessonId = currentLessonIdVar()

          return recordsVar()[`${lessonId}:${sceneIdx}`] || []
        },
      },
      moreNotes: {
        merge(existing, incoming, {readField, args}) {
          const nodes = args.cursor && existing ? {...existing.nodes} : {}
          incoming.nodes.forEach((node) => {
            const idx = readField('_id', node)
            nodes[idx as number] = node
          })

          return {
            cursor: incoming.cursor,
            hasMore: incoming.nodes.length === args.size,
            nodes,
          }
        },

        read(existing) {
          if (existing) {
            return {
              cursor: existing.cursor,
              hasMore: existing.hasMore,
              nodes: Object.values(existing.nodes),
            }
          }
        },
      },
      moreCompletedLessons: {
        merge(existing, incoming, {readField, args}) {
          const nodes = args.cursor && existing ? {...existing.nodes} : {}
          incoming.nodes.forEach((node) => {
            const idx = readField('_id', node)
            nodes[idx as number] = node
          })

          return {
            cursor: incoming.cursor,
            hasMore: incoming.nodes.length === args.size,
            nodes,
          }
        },

        read(existing) {
          if (existing) {
            return {
              cursor: existing.cursor,
              hasMore: existing.hasMore,
              nodes: Object.values(existing.nodes),
            }
          }
        },
      },
    },
  },
  Mutation: {
    fields: {
      updateDictation: {
        read(...args) {
          console.log('read', args)
        },
        merge(...args) {
          console.log('merge', args)
        },
      },
    },
  },
  LessonProgress: {
    fields: {
      datetimes: {
        read(datetimes) {
          return datetimes.map((d) => new Date(d))
        },
      },
    },
  },
  User: {
    fields: {
      // userLevelName: {
      //   read(userLevelName) {
      //     return levelMap[userLevelName]
      //   },
      // },
    },
  },
  Lesson: {
    fields: {
      videoLevelLabel: {
        read(_, {readField}) {
          const level = readField('videoLevel') as LevelName
          return levelLabel[level]
          // return levelLabel[userLevelName]
        },
      },
    },
  },
  Course: {
    fields: {
      videoLevelLabel: {
        read(_, {readField}) {
          const level = readField('videoLevel') as LevelName
          return levelLabel[level]
        },
      },
    },
  },
}

const levelMap = {
  UpperBeginner: 'UpperBeginner',
  'Upper-beginner': 'UpperBeginner',
  Elementary: 'UpperBeginner',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
}
const levelLabel = {
  [LevelName.UpperBeginner]: 'Upper-beginner',
  [LevelName.Intermediate]: 'Intermediate',
  [LevelName.Advanced]: 'Advanced',
}
