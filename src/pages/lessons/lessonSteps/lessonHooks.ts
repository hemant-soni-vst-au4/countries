import {gql} from '@apollo/client'
import {currentLessonIdVar} from '../../../apollo/apollo-client'
import {useGetLessonDeatilQuery} from '../../../schema/types-and-hooks'

export const GET_DICTATION = gql`
  query getDictation($lessonId: Int!, $sceneIdx: Int!) {
    dictation(lessonId: $lessonId, sceneIdx: $sceneIdx) @client
  }
`

export function useCurrentLesson() {
  const {data} = useGetLessonDeatilQuery({
    variables: {
      id: currentLessonIdVar(),
    },
    fetchPolicy: 'cache-only',
  })
  return data.lesson
}
