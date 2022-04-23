import {gql} from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type AudioRecordResult = {
  __typename?: 'AudioRecordResult'
  audioAsBase64?: Maybe<Scalars['String']>
  audioUrl?: Maybe<Scalars['String']>
  sampleRate?: Maybe<Scalars['Int']>
  stt?: Maybe<SpeechToTextResult>
}

export type Course = {
  __typename?: 'Course'
  _id: Scalars['ID']
  createdAt: Scalars['String']
  introduction: Scalars['String']
  isSingle: Scalars['String']
  lessonCount: Scalars['Int']
  lessonTopicId: Scalars['String']
  lessons: Array<Lesson>
  subLessons: Array<Scalars['JSON']>
  tags: Scalars['String']
  title?: Maybe<Scalars['String']>
  topicDetails: Scalars['JSON']
  topicTitle: Scalars['String']
  updatedAt: Scalars['String']
  videoLevel: LevelName
  videoLevelLabel?: Maybe<Scalars['String']>
  youtubeId: Scalars['String']
}

export type Cred = {
  userPlatform: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type DictionaryResult = {
  __typename?: 'DictionaryResult'
  entry: Scalars['String']
  meaning: DictionaryResultMeaning
  ipa: Scalars['String']
}

export type DictionaryResultMeaning = {
  __typename?: 'DictionaryResultMeaning'
  korean: Scalars['String']
  noun: Scalars['String']
  verb: Scalars['String']
  adverb: Scalars['String']
  adjective: Scalars['String']
}

export type Lesson = {
  __typename?: 'Lesson'
  _id: Scalars['ID']
  completedAt?: Maybe<Scalars['DateTime']>
  course?: Maybe<Course>
  courseId: Scalars['String']
  createdAt: Scalars['String']
  day?: Maybe<Scalars['String']>
  endTime: Scalars['String']
  introduction?: Maybe<Scalars['String']>
  isCompleted?: Maybe<Scalars['Boolean']>
  isDraft: Scalars['Boolean']
  isMy?: Maybe<Scalars['Boolean']>
  isSaved?: Maybe<Scalars['Boolean']>
  isSingle?: Maybe<Scalars['String']>
  lessonId: Scalars['String']
  lessonName: Scalars['String']
  lessonTopicId: Scalars['String']
  phrases?: Maybe<Array<Phrase>>
  savedCreatedAt?: Maybe<Scalars['String']>
  scenes: Array<Scene>
  /** @deprecated don't use anymore */
  srtFile?: Maybe<Scalars['String']>
  startTime: Scalars['String']
  subCreatedAt: Scalars['String']
  /** @deprecated wrong naming */
  subLessonId: Scalars['String']
  subUpdatedAt: Scalars['String']
  tags?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['String']
  videoLevel?: Maybe<LevelName>
  videoLevelLabel?: Maybe<Scalars['String']>
  videoType?: Maybe<Scalars['String']>
  youtubeId: Scalars['String']
}

export type LessonCursorPage = {
  __typename?: 'LessonCursorPage'
  cursor?: Maybe<Scalars['String']>
  hasMore?: Maybe<Scalars['Boolean']>
  nodes: Array<Lesson>
}

export type LessonPage = {
  __typename?: 'LessonPage'
  total: Scalars['Float']
  totalLessons: Scalars['Float']
  data: Array<Lesson>
}

export type LessonProgress = {
  __typename?: 'LessonProgress'
  totalCount: Scalars['Int']
  datetimes: Array<Scalars['DateTime']>
  counts: Array<LessonProgressCount>
}

export type LessonProgressCount = {
  __typename?: 'LessonProgressCount'
  type: Scalars['String']
  count: Scalars['Int']
  datetimes: Array<Scalars['DateTime']>
}

export type LessonReport = {
  message: Scalars['String']
  scene: Scalars['Float']
  step: Scalars['String']
  lessonName: Scalars['String']
  userPlatform: Scalars['String']
}

export type Level = {
  __typename?: 'Level'
  _id: Scalars['ID']
  name: Scalars['String']
}

export enum LevelName {
  UpperBeginner = 'UpperBeginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export type Meaning = {
  __typename?: 'Meaning'
  lang: Scalars['String']
  meaning: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addToMyLesson?: Maybe<Lesson>
  /** return ID */
  deleteNote: Scalars['String']
  login?: Maybe<Scalars['String']>
  reportLessonIssue?: Maybe<Scalars['Boolean']>
  setLessonCompleted?: Maybe<Lesson>
  setLessonSaved?: Maybe<Lesson>
  setLevel: User
  setNote?: Maybe<Scalars['String']>
  updateDictation?: Maybe<Scalars['String']>
  uploadProfilePicture: User
}

export type MutationAddToMyLessonArgs = {
  lessonId: Scalars['String']
}

export type MutationDeleteNoteArgs = {
  id: Scalars['String']
}

export type MutationLoginArgs = {
  cred: Cred
}

export type MutationReportLessonIssueArgs = {
  report: LessonReport
}

export type MutationSetLessonCompletedArgs = {
  lessonId: Scalars['String']
}

export type MutationSetLessonSavedArgs = {
  isSave: Scalars['Boolean']
  lessonId: Scalars['String']
}

export type MutationSetLevelArgs = {
  levelName: LevelName
}

export type MutationSetNoteArgs = {
  wordData: WordData
}

export type MutationUpdateDictationArgs = {
  id: Scalars['ID']
}

export type MutationUploadProfilePictureArgs = {
  imageBase64: Scalars['String']
}

export type NativeLanguage = {
  __typename?: 'NativeLanguage'
  _id: Scalars['ID']
  languageKey: Scalars['String']
  languageName: Scalars['String']
}

export type Phrase = {
  __typename?: 'Phrase'
  word: Scalars['String']
  meaning: Scalars['String']
  meanings: Array<Meaning>
}

export type Query = {
  __typename?: 'Query'
  completedLessons: Array<Lesson>
  course?: Maybe<Course>
  currentLessonId?: Maybe<Scalars['String']>
  dictation?: Maybe<Scalars['String']>
  dictionary?: Maybe<DictionaryResult>
  draftLessons?: Maybe<LessonPage>
  getNotes?: Maybe<WordNotePage>
  healthCheck?: Maybe<Scalars['String']>
  lesson?: Maybe<Lesson>
  levels?: Maybe<Array<Level>>
  moreCompletedLessons: LessonCursorPage
  moreNotes?: Maybe<WordNoteCursorPage>
  myCourses?: Maybe<Array<Course>>
  newUploadLessons?: Maybe<LessonPage>
  popularLessons?: Maybe<LessonPage>
  profile?: Maybe<User>
  progressState: LessonProgress
  records?: Maybe<Array<Maybe<AudioRecordResult>>>
  savedLessons?: Maybe<LessonPage>
  subscription?: Maybe<Subscription>
  todayLesson?: Maybe<Lesson>
  user?: Maybe<User>
  userGuide: UserGuide
}

export type QueryCompletedLessonsArgs = {
  end?: Maybe<Scalars['DateTime']>
  start?: Maybe<Scalars['DateTime']>
}

export type QueryCourseArgs = {
  id: Scalars['String']
}

export type QueryDictationArgs = {
  sceneIdx: Scalars['Int']
}

export type QueryDictionaryArgs = {
  search: Scalars['String']
}

export type QueryDraftLessonsArgs = {
  page?: Maybe<Scalars['Int']>
}

export type QueryGetNotesArgs = {
  size?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export type QueryLessonArgs = {
  id: Scalars['String']
}

export type QueryMoreCompletedLessonsArgs = {
  size: Scalars['Int']
  cursor?: Maybe<Scalars['String']>
}

export type QueryMoreNotesArgs = {
  size: Scalars['Int']
  cursor?: Maybe<Scalars['String']>
}

export type QueryMyCoursesArgs = {
  size?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export type QueryNewUploadLessonsArgs = {
  videoLevel: LevelName
  day: Scalars['String']
  page?: Maybe<Scalars['Int']>
}

export type QueryPopularLessonsArgs = {
  page?: Maybe<Scalars['Int']>
}

export type QueryRecordsArgs = {
  sceneIdx: Scalars['Int']
}

export type QuerySavedLessonsArgs = {
  page?: Maybe<Scalars['Int']>
}

export type QueryTodayLessonArgs = {
  day: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type Scene = {
  __typename?: 'Scene'
  start: Scalars['Float']
  end: Scalars['Float']
  langs: Scalars['JSON']
}

export type SpeechToTextResult = {
  __typename?: 'SpeechToTextResult'
  error?: Maybe<Scalars['Boolean']>
  confidence?: Maybe<Scalars['Float']>
  transcript?: Maybe<Scalars['String']>
  percent?: Maybe<Scalars['Float']>
}

export type Subscription = {
  __typename?: 'Subscription'
  type: Scalars['String']
}

export type User = {
  __typename?: 'User'
  _id: Scalars['ID']
  status?: Maybe<Scalars['String']>
  currentPackage?: Maybe<Scalars['String']>
  subscriptionType?: Maybe<Scalars['String']>
  completedLesson?: Maybe<Scalars['Int']>
  subscriptionLesson?: Maybe<Scalars['Int']>
  trialLessonLimit?: Maybe<Scalars['Int']>
  extraSubscriptionLesson?: Maybe<Scalars['Int']>
  isLevel?: Maybe<Scalars['Boolean']>
  isAdmin?: Maybe<Scalars['Boolean']>
  signupType?: Maybe<Scalars['String']>
  fullName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  platform?: Maybe<Scalars['String']>
  userLevelId?: Maybe<Scalars['String']>
  userLevelName?: Maybe<LevelName>
  stripeSandBoxCustomerId?: Maybe<Scalars['String']>
  stripeLiveCustomerId?: Maybe<Scalars['String']>
  subscriptionProductId?: Maybe<Scalars['String']>
  androidPurchaseToken?: Maybe<Scalars['String']>
  iOSPurchaseToken?: Maybe<Scalars['String']>
  subTitleLanguage?: Maybe<Scalars['String']>
  userSubscriptionStartDate?: Maybe<Scalars['String']>
  userSubscriptionEndDate?: Maybe<Scalars['String']>
  profilePic?: Maybe<Scalars['String']>
  nativeLanguage?: Maybe<NativeLanguage>
  isPasswordExists?: Maybe<Scalars['Boolean']>
  total?: Maybe<Scalars['Float']>
}

export type UserGuide = {
  __typename?: 'UserGuide'
  introduction: Scalars['String']
  youtubeId: Scalars['String']
}

export type WordData = {
  word: Scalars['String']
  meaning: Scalars['String']
  kor: Scalars['String']
  noun: Scalars['String']
  verb: Scalars['String']
  adv: Scalars['String']
  adj: Scalars['String']
}

export type WordNote = {
  __typename?: 'WordNote'
  _id: Scalars['ID']
  userId: Scalars['String']
  word: Scalars['String']
  meaning: Scalars['String']
  kor: Scalars['String']
  noun: Scalars['String']
  verb: Scalars['String']
  adv: Scalars['String']
  adj: Scalars['String']
  createdAt: Scalars['DateTime']
}

export type WordNoteCursorPage = {
  __typename?: 'WordNoteCursorPage'
  cursor?: Maybe<Scalars['String']>
  hasMore?: Maybe<Scalars['Boolean']>
  nodes: Array<WordNote>
}

export type WordNotePage = {
  __typename?: 'WordNotePage'
  page: Scalars['Float']
  size: Scalars['Float']
  total: Scalars['Float']
  totalPage: Scalars['Float']
  data: Array<WordNote>
}

export type GetProfileQueryVariables = Exact<{[key: string]: never}>

export type GetProfileQuery = {__typename?: 'Query'} & {
  profile?: Maybe<
    {__typename?: 'User'} & Pick<
      User,
      | '_id'
      | 'status'
      | 'completedLesson'
      | 'subscriptionLesson'
      | 'currentPackage'
      | 'subscriptionType'
      | 'trialLessonLimit'
      | 'isLevel'
      | 'isAdmin'
      | 'signupType'
      | 'fullName'
      | 'email'
      | 'platform'
      | 'userLevelId'
      | 'userLevelName'
      | 'stripeSandBoxCustomerId'
      | 'stripeLiveCustomerId'
      | 'extraSubscriptionLesson'
      | 'subscriptionProductId'
      | 'subTitleLanguage'
      | 'userSubscriptionStartDate'
      | 'userSubscriptionEndDate'
      | 'profilePic'
      | 'total'
    > & {
        nativeLanguage?: Maybe<
          {__typename?: 'NativeLanguage'} & Pick<
            NativeLanguage,
            '_id' | 'languageKey' | 'languageName'
          >
        >
      }
  >
}

export type PopularLessonsQueryVariables = Exact<{[key: string]: never}>

export type PopularLessonsQuery = {__typename?: 'Query'} & {
  popularLessons?: Maybe<
    {__typename?: 'LessonPage'} & Pick<LessonPage, 'total' | 'totalLessons'> & {
        data: Array<
          {__typename?: 'Lesson'} & Pick<
            Lesson,
            | 'subLessonId'
            | 'lessonName'
            | 'srtFile'
            | 'startTime'
            | 'endTime'
            | 'createdAt'
            | 'updatedAt'
            | 'lessonId'
            | 'videoLevel'
            | 'videoLevelLabel'
            | 'youtubeId'
            | 'title'
            | 'introduction'
            | 'tags'
            | 'isSingle'
            | 'day'
            | 'savedCreatedAt'
            | 'isCompleted'
          >
        >
      }
  >
}

export type LessonFieldsFragment = {__typename?: 'Lesson'} & Pick<
  Lesson,
  | '_id'
  | 'subLessonId'
  | 'lessonName'
  | 'srtFile'
  | 'startTime'
  | 'endTime'
  | 'createdAt'
  | 'updatedAt'
  | 'lessonId'
  | 'videoLevel'
  | 'videoLevelLabel'
  | 'videoType'
  | 'youtubeId'
  | 'title'
  | 'introduction'
  | 'tags'
  | 'isSingle'
  | 'day'
  | 'savedCreatedAt'
  | 'isCompleted'
>

export type DashboardLessonFieldsFragment = {__typename?: 'Lesson'} & Pick<
  Lesson,
  '_id' | 'lessonName' | 'videoLevel' | 'videoLevelLabel' | 'videoType' | 'youtubeId'
>

export type MyCoursesQueryVariables = Exact<{
  page: Scalars['Int']
}>

export type MyCoursesQuery = {__typename?: 'Query'} & {
  myCourses?: Maybe<
    Array<
      {__typename?: 'Course'} & Pick<
        Course,
        | '_id'
        | 'title'
        | 'introduction'
        | 'youtubeId'
        | 'videoLevel'
        | 'videoLevelLabel'
        | 'topicTitle'
        | 'lessonCount'
      >
    >
  >
}

export type GetDashboardQueryVariables = Exact<{
  day: Scalars['String']
  videoLevel: LevelName
}>

export type GetDashboardQuery = {__typename?: 'Query'} & {
  todayLesson?: Maybe<{__typename?: 'Lesson'} & DashboardLessonFieldsFragment>
  popularLessons?: Maybe<
    {__typename?: 'LessonPage'} & Pick<LessonPage, 'total' | 'totalLessons'> & {
        data: Array<{__typename?: 'Lesson'} & DashboardLessonFieldsFragment>
      }
  >
  savedLessons?: Maybe<
    {__typename?: 'LessonPage'} & Pick<LessonPage, 'total' | 'totalLessons'> & {
        data: Array<{__typename?: 'Lesson'} & DashboardLessonFieldsFragment>
      }
  >
  myCourses?: Maybe<
    Array<
      {__typename?: 'Course'} & Pick<
        Course,
        | '_id'
        | 'title'
        | 'introduction'
        | 'youtubeId'
        | 'videoLevel'
        | 'videoLevelLabel'
        | 'topicTitle'
        | 'lessonCount'
      >
    >
  >
  newUploadLessons?: Maybe<
    {__typename?: 'LessonPage'} & Pick<LessonPage, 'total' | 'totalLessons'> & {
        data: Array<{__typename?: 'Lesson'} & DashboardLessonFieldsFragment>
      }
  >
}

export type GetDashboardDraftLessonsQueryVariables = Exact<{[key: string]: never}>

export type GetDashboardDraftLessonsQuery = {__typename?: 'Query'} & {
  draftLessons?: Maybe<
    {__typename?: 'LessonPage'} & Pick<LessonPage, 'total' | 'totalLessons'> & {
        data: Array<{__typename?: 'Lesson'} & LessonFieldsFragment>
      }
  >
}

export type GetLessonDeatilQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetLessonDeatilQuery = {__typename?: 'Query'} & Pick<
  Query,
  'currentLessonId'
> & {
    lesson?: Maybe<
      {__typename?: 'Lesson'} & Pick<
        Lesson,
        | '_id'
        | 'lessonId'
        | 'courseId'
        | 'youtubeId'
        | 'lessonName'
        | 'isSaved'
        | 'isCompleted'
        | 'title'
        | 'tags'
        | 'videoLevel'
        | 'videoLevelLabel'
        | 'introduction'
        | 'isMy'
      > & {
          scenes: Array<{__typename?: 'Scene'} & Pick<Scene, 'start' | 'end' | 'langs'>>
          phrases?: Maybe<
            Array<
              {__typename?: 'Phrase'} & Pick<Phrase, 'word' | 'meaning'> & {
                  meanings: Array<
                    {__typename?: 'Meaning'} & Pick<Meaning, 'lang' | 'meaning'>
                  >
                }
            >
          >
        }
    >
  }

export type SetLessonSavedMutationVariables = Exact<{
  id: Scalars['String']
  isSave: Scalars['Boolean']
}>

export type SetLessonSavedMutation = {__typename?: 'Mutation'} & {
  setLessonSaved?: Maybe<{__typename?: 'Lesson'} & Pick<Lesson, '_id' | 'isSaved'>>
}

export type SetLessonCompletedMutationVariables = Exact<{
  lessonId: Scalars['String']
}>

export type SetLessonCompletedMutation = {__typename?: 'Mutation'} & {
  setLessonCompleted?: Maybe<
    {__typename?: 'Lesson'} & Pick<Lesson, '_id' | 'isCompleted'>
  >
}

export type GetCourseQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetCourseQuery = {__typename?: 'Query'} & {
  course?: Maybe<
    {__typename?: 'Course'} & Pick<
      Course,
      | '_id'
      | 'tags'
      | 'title'
      | 'introduction'
      | 'topicTitle'
      | 'videoLevel'
      | 'videoLevelLabel'
      | 'youtubeId'
    > & {
        lessons: Array<
          {__typename?: 'Lesson'} & Pick<Lesson, '_id' | 'lessonName' | 'completedAt'> & {
              scenes: Array<{__typename?: 'Scene'} & Pick<Scene, 'start' | 'end'>>
            }
        >
      }
  >
}

export type AddToMyLessonMutationVariables = Exact<{
  lessonId: Scalars['String']
}>

export type AddToMyLessonMutation = {__typename?: 'Mutation'} & {
  addToMyLesson?: Maybe<{__typename?: 'Lesson'} & Pick<Lesson, '_id' | 'isMy'>>
}

export type SetNoteMutationVariables = Exact<{
  wordData: WordData
}>

export type SetNoteMutation = {__typename?: 'Mutation'} & Pick<Mutation, 'setNote'>

export type ReportLessonIssueMutationVariables = Exact<{
  report: LessonReport
}>

export type ReportLessonIssueMutation = {__typename?: 'Mutation'} & Pick<
  Mutation,
  'reportLessonIssue'
>

export type SearchDictionaryQueryVariables = Exact<{
  search: Scalars['String']
}>

export type SearchDictionaryQuery = {__typename?: 'Query'} & {
  dictionary?: Maybe<
    {__typename?: 'DictionaryResult'} & Pick<DictionaryResult, 'entry' | 'ipa'> & {
        meaning: {__typename?: 'DictionaryResultMeaning'} & Pick<
          DictionaryResultMeaning,
          'korean' | 'noun' | 'verb' | 'adverb' | 'adjective'
        >
      }
  >
}

export type GetDictationQueryVariables = Exact<{
  sceneIdx: Scalars['Int']
}>

export type GetDictationQuery = {__typename?: 'Query'} & Pick<Query, 'dictation'>

export type GetRecordsQueryVariables = Exact<{
  sceneIdx: Scalars['Int']
}>

export type GetRecordsQuery = {__typename?: 'Query'} & {
  records?: Maybe<
    Array<
      Maybe<
        {__typename?: 'AudioRecordResult'} & Pick<
          AudioRecordResult,
          'audioAsBase64' | 'audioUrl' | 'sampleRate'
        > & {
            stt?: Maybe<
              {__typename?: 'SpeechToTextResult'} & Pick<
                SpeechToTextResult,
                'error' | 'confidence' | 'transcript' | 'percent'
              >
            >
          }
      >
    >
  >
}

export type GetNotesQueryVariables = Exact<{
  size: Scalars['Int']
  page: Scalars['Int']
}>

export type GetNotesQuery = {__typename?: 'Query'} & {
  getNotes?: Maybe<
    {__typename?: 'WordNotePage'} & Pick<
      WordNotePage,
      'page' | 'size' | 'total' | 'totalPage'
    > & {
        data: Array<
          {__typename?: 'WordNote'} & Pick<WordNote, '_id' | 'word' | 'meaning'>
        >
      }
  >
}

export type MoreNotesQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>
  size: Scalars['Int']
}>

export type MoreNotesQuery = {__typename?: 'Query'} & {
  moreNotes?: Maybe<
    {__typename?: 'WordNoteCursorPage'} & Pick<
      WordNoteCursorPage,
      'cursor' | 'hasMore'
    > & {
        nodes: Array<
          {__typename?: 'WordNote'} & Pick<
            WordNote,
            '_id' | 'word' | 'meaning' | 'kor' | 'noun' | 'verb' | 'adv' | 'adj'
          >
        >
      }
  >
}

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteNoteMutation = {__typename?: 'Mutation'} & Pick<Mutation, 'deleteNote'>

export type GerReviewCompletedLessonsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>
  size: Scalars['Int']
}>

export type GerReviewCompletedLessonsQuery = {__typename?: 'Query'} & {
  moreCompletedLessons: {__typename?: 'LessonCursorPage'} & Pick<
    LessonCursorPage,
    'cursor' | 'hasMore'
  > & {
      nodes: Array<
        {__typename?: 'Lesson'} & Pick<
          Lesson,
          | '_id'
          | 'lessonName'
          | 'completedAt'
          | 'videoLevel'
          | 'videoLevelLabel'
          | 'videoType'
          | 'youtubeId'
        >
      >
    }
}

export type UploadProfilePictureMutationVariables = Exact<{
  imageBase64: Scalars['String']
}>

export type UploadProfilePictureMutation = {__typename?: 'Mutation'} & {
  uploadProfilePicture: {__typename?: 'User'} & Pick<User, '_id' | 'profilePic'>
}

export type GetUserProgressQueryVariables = Exact<{[key: string]: never}>

export type GetUserProgressQuery = {__typename?: 'Query'} & {
  progressState: {__typename?: 'LessonProgress'} & Pick<
    LessonProgress,
    'totalCount' | 'datetimes'
  > & {
      counts: Array<
        {__typename?: 'LessonProgressCount'} & Pick<LessonProgressCount, 'type' | 'count'>
      >
    }
}

export type GetLevelsQueryVariables = Exact<{[key: string]: never}>

export type GetLevelsQuery = {__typename?: 'Query'} & {
  levels?: Maybe<Array<{__typename?: 'Level'} & Pick<Level, '_id' | 'name'>>>
}

export type SetLevelMutationVariables = Exact<{
  levelName: LevelName
}>

export type SetLevelMutation = {__typename?: 'Mutation'} & {
  setLevel: {__typename?: 'User'} & Pick<User, '_id' | 'userLevelId' | 'userLevelName'>
}

export type GetUserGuideQueryVariables = Exact<{[key: string]: never}>

export type GetUserGuideQuery = {__typename?: 'Query'} & {
  userGuide: {__typename?: 'UserGuide'} & Pick<UserGuide, 'introduction' | 'youtubeId'>
}

export const LessonFieldsFragmentDoc = gql`
  fragment LessonFields on Lesson {
    _id
    subLessonId
    lessonName
    srtFile
    startTime
    endTime
    createdAt
    updatedAt
    lessonId
    videoLevel
    videoLevelLabel @client
    videoType
    youtubeId
    title
    introduction
    tags
    isSingle
    day
    savedCreatedAt
    isCompleted
  }
`
export const DashboardLessonFieldsFragmentDoc = gql`
  fragment DashboardLessonFields on Lesson {
    _id
    lessonName
    videoLevel
    videoLevelLabel @client
    videoType
    youtubeId
  }
`
export const GetProfileDocument = gql`
  query getProfile {
    profile {
      _id
      status
      completedLesson
      subscriptionLesson
      currentPackage
      subscriptionType
      trialLessonLimit
      isLevel
      isAdmin
      signupType
      fullName
      email
      platform
      userLevelId
      userLevelName
      stripeSandBoxCustomerId
      stripeLiveCustomerId
      extraSubscriptionLesson
      subscriptionProductId
      subTitleLanguage
      userSubscriptionStartDate
      userSubscriptionEndDate
      profilePic
      nativeLanguage {
        _id
        languageKey
        languageName
      }
      total
    }
  }
`

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    options,
  )
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    options,
  )
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>
export type GetProfileQueryResult = Apollo.QueryResult<
  GetProfileQuery,
  GetProfileQueryVariables
>
export const PopularLessonsDocument = gql`
  query popularLessons {
    popularLessons {
      total
      totalLessons
      data {
        subLessonId
        lessonName
        srtFile
        startTime
        endTime
        createdAt
        updatedAt
        lessonId
        videoLevel
        videoLevelLabel @client
        youtubeId
        title
        introduction
        tags
        isSingle
        day
        savedCreatedAt
        isCompleted
      }
    }
  }
`

/**
 * __usePopularLessonsQuery__
 *
 * To run a query within a React component, call `usePopularLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularLessonsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePopularLessonsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PopularLessonsQuery,
    PopularLessonsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<PopularLessonsQuery, PopularLessonsQueryVariables>(
    PopularLessonsDocument,
    options,
  )
}
export function usePopularLessonsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PopularLessonsQuery,
    PopularLessonsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<PopularLessonsQuery, PopularLessonsQueryVariables>(
    PopularLessonsDocument,
    options,
  )
}
export type PopularLessonsQueryHookResult = ReturnType<typeof usePopularLessonsQuery>
export type PopularLessonsLazyQueryHookResult = ReturnType<
  typeof usePopularLessonsLazyQuery
>
export type PopularLessonsQueryResult = Apollo.QueryResult<
  PopularLessonsQuery,
  PopularLessonsQueryVariables
>
export const MyCoursesDocument = gql`
  query myCourses($page: Int!) {
    myCourses(page: $page) {
      _id
      title
      introduction
      youtubeId
      videoLevel
      videoLevelLabel @client
      topicTitle
      lessonCount
    }
  }
`

/**
 * __useMyCoursesQuery__
 *
 * To run a query within a React component, call `useMyCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCoursesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useMyCoursesQuery(
  baseOptions: Apollo.QueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<MyCoursesQuery, MyCoursesQueryVariables>(
    MyCoursesDocument,
    options,
  )
}
export function useMyCoursesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<MyCoursesQuery, MyCoursesQueryVariables>(
    MyCoursesDocument,
    options,
  )
}
export type MyCoursesQueryHookResult = ReturnType<typeof useMyCoursesQuery>
export type MyCoursesLazyQueryHookResult = ReturnType<typeof useMyCoursesLazyQuery>
export type MyCoursesQueryResult = Apollo.QueryResult<
  MyCoursesQuery,
  MyCoursesQueryVariables
>
export const GetDashboardDocument = gql`
  query getDashboard($day: String!, $videoLevel: LevelName!) {
    todayLesson(day: $day) {
      ...DashboardLessonFields
    }
    popularLessons {
      total
      totalLessons
      data {
        ...DashboardLessonFields
      }
    }
    savedLessons {
      total
      totalLessons
      data {
        ...DashboardLessonFields
      }
    }
    myCourses(size: 3) {
      _id
      title
      introduction
      youtubeId
      videoLevel
      videoLevelLabel @client
      topicTitle
      lessonCount
    }
    newUploadLessons(day: $day, videoLevel: $videoLevel) {
      total
      totalLessons
      data {
        ...DashboardLessonFields
      }
    }
  }
  ${DashboardLessonFieldsFragmentDoc}
`

/**
 * __useGetDashboardQuery__
 *
 * To run a query within a React component, call `useGetDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardQuery({
 *   variables: {
 *      day: // value for 'day'
 *      videoLevel: // value for 'videoLevel'
 *   },
 * });
 */
export function useGetDashboardQuery(
  baseOptions: Apollo.QueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetDashboardQuery, GetDashboardQueryVariables>(
    GetDashboardDocument,
    options,
  )
}
export function useGetDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDashboardQuery,
    GetDashboardQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetDashboardQuery, GetDashboardQueryVariables>(
    GetDashboardDocument,
    options,
  )
}
export type GetDashboardQueryHookResult = ReturnType<typeof useGetDashboardQuery>
export type GetDashboardLazyQueryHookResult = ReturnType<typeof useGetDashboardLazyQuery>
export type GetDashboardQueryResult = Apollo.QueryResult<
  GetDashboardQuery,
  GetDashboardQueryVariables
>
export const GetDashboardDraftLessonsDocument = gql`
  query getDashboardDraftLessons {
    draftLessons {
      total
      totalLessons
      data {
        ...LessonFields
      }
    }
  }
  ${LessonFieldsFragmentDoc}
`

/**
 * __useGetDashboardDraftLessonsQuery__
 *
 * To run a query within a React component, call `useGetDashboardDraftLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDraftLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDraftLessonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardDraftLessonsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetDashboardDraftLessonsQuery,
    GetDashboardDraftLessonsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<
    GetDashboardDraftLessonsQuery,
    GetDashboardDraftLessonsQueryVariables
  >(GetDashboardDraftLessonsDocument, options)
}
export function useGetDashboardDraftLessonsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDashboardDraftLessonsQuery,
    GetDashboardDraftLessonsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<
    GetDashboardDraftLessonsQuery,
    GetDashboardDraftLessonsQueryVariables
  >(GetDashboardDraftLessonsDocument, options)
}
export type GetDashboardDraftLessonsQueryHookResult = ReturnType<
  typeof useGetDashboardDraftLessonsQuery
>
export type GetDashboardDraftLessonsLazyQueryHookResult = ReturnType<
  typeof useGetDashboardDraftLessonsLazyQuery
>
export type GetDashboardDraftLessonsQueryResult = Apollo.QueryResult<
  GetDashboardDraftLessonsQuery,
  GetDashboardDraftLessonsQueryVariables
>
export const GetLessonDeatilDocument = gql`
  query getLessonDeatil($id: String!) {
    currentLessonId @client
    lesson(id: $id) {
      _id
      lessonId
      courseId
      youtubeId
      lessonName
      isSaved
      isCompleted
      title
      tags
      videoLevel
      videoLevelLabel @client
      introduction
      isMy
      scenes {
        start
        end
        langs
      }
      phrases {
        word
        meaning
        meanings {
          lang
          meaning
        }
      }
    }
  }
`

/**
 * __useGetLessonDeatilQuery__
 *
 * To run a query within a React component, call `useGetLessonDeatilQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonDeatilQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonDeatilQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLessonDeatilQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLessonDeatilQuery,
    GetLessonDeatilQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetLessonDeatilQuery, GetLessonDeatilQueryVariables>(
    GetLessonDeatilDocument,
    options,
  )
}
export function useGetLessonDeatilLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLessonDeatilQuery,
    GetLessonDeatilQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetLessonDeatilQuery, GetLessonDeatilQueryVariables>(
    GetLessonDeatilDocument,
    options,
  )
}
export type GetLessonDeatilQueryHookResult = ReturnType<typeof useGetLessonDeatilQuery>
export type GetLessonDeatilLazyQueryHookResult = ReturnType<
  typeof useGetLessonDeatilLazyQuery
>
export type GetLessonDeatilQueryResult = Apollo.QueryResult<
  GetLessonDeatilQuery,
  GetLessonDeatilQueryVariables
>
export const SetLessonSavedDocument = gql`
  mutation setLessonSaved($id: String!, $isSave: Boolean!) {
    setLessonSaved(lessonId: $id, isSave: $isSave) {
      _id
      isSaved
    }
  }
`
export type SetLessonSavedMutationFn = Apollo.MutationFunction<
  SetLessonSavedMutation,
  SetLessonSavedMutationVariables
>

/**
 * __useSetLessonSavedMutation__
 *
 * To run a mutation, you first call `useSetLessonSavedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLessonSavedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLessonSavedMutation, { data, loading, error }] = useSetLessonSavedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isSave: // value for 'isSave'
 *   },
 * });
 */
export function useSetLessonSavedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetLessonSavedMutation,
    SetLessonSavedMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<SetLessonSavedMutation, SetLessonSavedMutationVariables>(
    SetLessonSavedDocument,
    options,
  )
}
export type SetLessonSavedMutationHookResult = ReturnType<
  typeof useSetLessonSavedMutation
>
export type SetLessonSavedMutationResult = Apollo.MutationResult<SetLessonSavedMutation>
export type SetLessonSavedMutationOptions = Apollo.BaseMutationOptions<
  SetLessonSavedMutation,
  SetLessonSavedMutationVariables
>
export const SetLessonCompletedDocument = gql`
  mutation setLessonCompleted($lessonId: String!) {
    setLessonCompleted(lessonId: $lessonId) {
      _id
      isCompleted
    }
  }
`
export type SetLessonCompletedMutationFn = Apollo.MutationFunction<
  SetLessonCompletedMutation,
  SetLessonCompletedMutationVariables
>

/**
 * __useSetLessonCompletedMutation__
 *
 * To run a mutation, you first call `useSetLessonCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLessonCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLessonCompletedMutation, { data, loading, error }] = useSetLessonCompletedMutation({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useSetLessonCompletedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetLessonCompletedMutation,
    SetLessonCompletedMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    SetLessonCompletedMutation,
    SetLessonCompletedMutationVariables
  >(SetLessonCompletedDocument, options)
}
export type SetLessonCompletedMutationHookResult = ReturnType<
  typeof useSetLessonCompletedMutation
>
export type SetLessonCompletedMutationResult = Apollo.MutationResult<SetLessonCompletedMutation>
export type SetLessonCompletedMutationOptions = Apollo.BaseMutationOptions<
  SetLessonCompletedMutation,
  SetLessonCompletedMutationVariables
>
export const GetCourseDocument = gql`
  query getCourse($id: String!) {
    course(id: $id) {
      _id
      tags
      title
      introduction
      topicTitle
      videoLevel
      videoLevelLabel @client
      youtubeId
      lessons {
        _id
        lessonName
        completedAt
        scenes {
          start
          end
        }
      }
    }
  }
`

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCourseQuery(
  baseOptions: Apollo.QueryHookOptions<GetCourseQuery, GetCourseQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetCourseQuery, GetCourseQueryVariables>(
    GetCourseDocument,
    options,
  )
}
export function useGetCourseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(
    GetCourseDocument,
    options,
  )
}
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>
export type GetCourseLazyQueryHookResult = ReturnType<typeof useGetCourseLazyQuery>
export type GetCourseQueryResult = Apollo.QueryResult<
  GetCourseQuery,
  GetCourseQueryVariables
>
export const AddToMyLessonDocument = gql`
  mutation addToMyLesson($lessonId: String!) {
    addToMyLesson(lessonId: $lessonId) {
      _id
      isMy
    }
  }
`
export type AddToMyLessonMutationFn = Apollo.MutationFunction<
  AddToMyLessonMutation,
  AddToMyLessonMutationVariables
>

/**
 * __useAddToMyLessonMutation__
 *
 * To run a mutation, you first call `useAddToMyLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToMyLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToMyLessonMutation, { data, loading, error }] = useAddToMyLessonMutation({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useAddToMyLessonMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddToMyLessonMutation,
    AddToMyLessonMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<AddToMyLessonMutation, AddToMyLessonMutationVariables>(
    AddToMyLessonDocument,
    options,
  )
}
export type AddToMyLessonMutationHookResult = ReturnType<typeof useAddToMyLessonMutation>
export type AddToMyLessonMutationResult = Apollo.MutationResult<AddToMyLessonMutation>
export type AddToMyLessonMutationOptions = Apollo.BaseMutationOptions<
  AddToMyLessonMutation,
  AddToMyLessonMutationVariables
>
export const SetNoteDocument = gql`
  mutation setNote($wordData: WordData!) {
    setNote(wordData: $wordData)
  }
`
export type SetNoteMutationFn = Apollo.MutationFunction<
  SetNoteMutation,
  SetNoteMutationVariables
>

/**
 * __useSetNoteMutation__
 *
 * To run a mutation, you first call `useSetNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNoteMutation, { data, loading, error }] = useSetNoteMutation({
 *   variables: {
 *      wordData: // value for 'wordData'
 *   },
 * });
 */
export function useSetNoteMutation(
  baseOptions?: Apollo.MutationHookOptions<SetNoteMutation, SetNoteMutationVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<SetNoteMutation, SetNoteMutationVariables>(
    SetNoteDocument,
    options,
  )
}
export type SetNoteMutationHookResult = ReturnType<typeof useSetNoteMutation>
export type SetNoteMutationResult = Apollo.MutationResult<SetNoteMutation>
export type SetNoteMutationOptions = Apollo.BaseMutationOptions<
  SetNoteMutation,
  SetNoteMutationVariables
>
export const ReportLessonIssueDocument = gql`
  mutation reportLessonIssue($report: LessonReport!) {
    reportLessonIssue(report: $report)
  }
`
export type ReportLessonIssueMutationFn = Apollo.MutationFunction<
  ReportLessonIssueMutation,
  ReportLessonIssueMutationVariables
>

/**
 * __useReportLessonIssueMutation__
 *
 * To run a mutation, you first call `useReportLessonIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportLessonIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportLessonIssueMutation, { data, loading, error }] = useReportLessonIssueMutation({
 *   variables: {
 *      report: // value for 'report'
 *   },
 * });
 */
export function useReportLessonIssueMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReportLessonIssueMutation,
    ReportLessonIssueMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    ReportLessonIssueMutation,
    ReportLessonIssueMutationVariables
  >(ReportLessonIssueDocument, options)
}
export type ReportLessonIssueMutationHookResult = ReturnType<
  typeof useReportLessonIssueMutation
>
export type ReportLessonIssueMutationResult = Apollo.MutationResult<ReportLessonIssueMutation>
export type ReportLessonIssueMutationOptions = Apollo.BaseMutationOptions<
  ReportLessonIssueMutation,
  ReportLessonIssueMutationVariables
>
export const SearchDictionaryDocument = gql`
  query searchDictionary($search: String!) {
    dictionary(search: $search) {
      entry
      meaning {
        korean
        noun
        verb
        adverb
        adjective
      }
      ipa
    }
  }
`

/**
 * __useSearchDictionaryQuery__
 *
 * To run a query within a React component, call `useSearchDictionaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDictionaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDictionaryQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchDictionaryQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchDictionaryQuery,
    SearchDictionaryQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<SearchDictionaryQuery, SearchDictionaryQueryVariables>(
    SearchDictionaryDocument,
    options,
  )
}
export function useSearchDictionaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchDictionaryQuery,
    SearchDictionaryQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<SearchDictionaryQuery, SearchDictionaryQueryVariables>(
    SearchDictionaryDocument,
    options,
  )
}
export type SearchDictionaryQueryHookResult = ReturnType<typeof useSearchDictionaryQuery>
export type SearchDictionaryLazyQueryHookResult = ReturnType<
  typeof useSearchDictionaryLazyQuery
>
export type SearchDictionaryQueryResult = Apollo.QueryResult<
  SearchDictionaryQuery,
  SearchDictionaryQueryVariables
>
export const GetDictationDocument = gql`
  query getDictation($sceneIdx: Int!) {
    dictation(sceneIdx: $sceneIdx) @client
  }
`

/**
 * __useGetDictationQuery__
 *
 * To run a query within a React component, call `useGetDictationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDictationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDictationQuery({
 *   variables: {
 *      sceneIdx: // value for 'sceneIdx'
 *   },
 * });
 */
export function useGetDictationQuery(
  baseOptions: Apollo.QueryHookOptions<GetDictationQuery, GetDictationQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetDictationQuery, GetDictationQueryVariables>(
    GetDictationDocument,
    options,
  )
}
export function useGetDictationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDictationQuery,
    GetDictationQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetDictationQuery, GetDictationQueryVariables>(
    GetDictationDocument,
    options,
  )
}
export type GetDictationQueryHookResult = ReturnType<typeof useGetDictationQuery>
export type GetDictationLazyQueryHookResult = ReturnType<typeof useGetDictationLazyQuery>
export type GetDictationQueryResult = Apollo.QueryResult<
  GetDictationQuery,
  GetDictationQueryVariables
>
export const GetRecordsDocument = gql`
  query getRecords($sceneIdx: Int!) {
    records(sceneIdx: $sceneIdx) @client {
      audioAsBase64
      audioUrl
      sampleRate
      stt {
        error
        confidence
        transcript
        percent
      }
    }
  }
`

/**
 * __useGetRecordsQuery__
 *
 * To run a query within a React component, call `useGetRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecordsQuery({
 *   variables: {
 *      sceneIdx: // value for 'sceneIdx'
 *   },
 * });
 */
export function useGetRecordsQuery(
  baseOptions: Apollo.QueryHookOptions<GetRecordsQuery, GetRecordsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetRecordsQuery, GetRecordsQueryVariables>(
    GetRecordsDocument,
    options,
  )
}
export function useGetRecordsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRecordsQuery, GetRecordsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetRecordsQuery, GetRecordsQueryVariables>(
    GetRecordsDocument,
    options,
  )
}
export type GetRecordsQueryHookResult = ReturnType<typeof useGetRecordsQuery>
export type GetRecordsLazyQueryHookResult = ReturnType<typeof useGetRecordsLazyQuery>
export type GetRecordsQueryResult = Apollo.QueryResult<
  GetRecordsQuery,
  GetRecordsQueryVariables
>
export const GetNotesDocument = gql`
  query getNotes($size: Int!, $page: Int!) {
    getNotes(size: $size, page: $page) {
      page
      size
      total
      totalPage
      data {
        _id
        word
        meaning
      }
    }
  }
`

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *      size: // value for 'size'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetNotesQuery(
  baseOptions: Apollo.QueryHookOptions<GetNotesQuery, GetNotesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options)
}
export function useGetNotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetNotesQuery, GetNotesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(
    GetNotesDocument,
    options,
  )
}
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>
export type GetNotesLazyQueryHookResult = ReturnType<typeof useGetNotesLazyQuery>
export type GetNotesQueryResult = Apollo.QueryResult<
  GetNotesQuery,
  GetNotesQueryVariables
>
export const MoreNotesDocument = gql`
  query moreNotes($cursor: String, $size: Int!) {
    moreNotes(cursor: $cursor, size: $size) {
      cursor
      hasMore @client
      nodes {
        _id
        word
        meaning
        kor
        noun
        verb
        adv
        adj
      }
    }
  }
`

/**
 * __useMoreNotesQuery__
 *
 * To run a query within a React component, call `useMoreNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoreNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoreNotesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useMoreNotesQuery(
  baseOptions: Apollo.QueryHookOptions<MoreNotesQuery, MoreNotesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<MoreNotesQuery, MoreNotesQueryVariables>(
    MoreNotesDocument,
    options,
  )
}
export function useMoreNotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MoreNotesQuery, MoreNotesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<MoreNotesQuery, MoreNotesQueryVariables>(
    MoreNotesDocument,
    options,
  )
}
export type MoreNotesQueryHookResult = ReturnType<typeof useMoreNotesQuery>
export type MoreNotesLazyQueryHookResult = ReturnType<typeof useMoreNotesLazyQuery>
export type MoreNotesQueryResult = Apollo.QueryResult<
  MoreNotesQuery,
  MoreNotesQueryVariables
>
export const DeleteNoteDocument = gql`
  mutation deleteNote($id: String!) {
    deleteNote(id: $id)
  }
`
export type DeleteNoteMutationFn = Apollo.MutationFunction<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteNoteMutation,
    DeleteNoteMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(
    DeleteNoteDocument,
    options,
  )
}
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>
export const GerReviewCompletedLessonsDocument = gql`
  query gerReviewCompletedLessons($cursor: String, $size: Int!) {
    moreCompletedLessons(cursor: $cursor, size: $size) {
      cursor
      hasMore @client
      nodes {
        _id
        lessonName
        completedAt
        videoLevel
        videoLevelLabel @client
        videoType
        youtubeId
      }
    }
  }
`

/**
 * __useGerReviewCompletedLessonsQuery__
 *
 * To run a query within a React component, call `useGerReviewCompletedLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGerReviewCompletedLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGerReviewCompletedLessonsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGerReviewCompletedLessonsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GerReviewCompletedLessonsQuery,
    GerReviewCompletedLessonsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<
    GerReviewCompletedLessonsQuery,
    GerReviewCompletedLessonsQueryVariables
  >(GerReviewCompletedLessonsDocument, options)
}
export function useGerReviewCompletedLessonsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GerReviewCompletedLessonsQuery,
    GerReviewCompletedLessonsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<
    GerReviewCompletedLessonsQuery,
    GerReviewCompletedLessonsQueryVariables
  >(GerReviewCompletedLessonsDocument, options)
}
export type GerReviewCompletedLessonsQueryHookResult = ReturnType<
  typeof useGerReviewCompletedLessonsQuery
>
export type GerReviewCompletedLessonsLazyQueryHookResult = ReturnType<
  typeof useGerReviewCompletedLessonsLazyQuery
>
export type GerReviewCompletedLessonsQueryResult = Apollo.QueryResult<
  GerReviewCompletedLessonsQuery,
  GerReviewCompletedLessonsQueryVariables
>
export const UploadProfilePictureDocument = gql`
  mutation uploadProfilePicture($imageBase64: String!) {
    uploadProfilePicture(imageBase64: $imageBase64) {
      _id
      profilePic
    }
  }
`
export type UploadProfilePictureMutationFn = Apollo.MutationFunction<
  UploadProfilePictureMutation,
  UploadProfilePictureMutationVariables
>

/**
 * __useUploadProfilePictureMutation__
 *
 * To run a mutation, you first call `useUploadProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfilePictureMutation, { data, loading, error }] = useUploadProfilePictureMutation({
 *   variables: {
 *      imageBase64: // value for 'imageBase64'
 *   },
 * });
 */
export function useUploadProfilePictureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables
  >(UploadProfilePictureDocument, options)
}
export type UploadProfilePictureMutationHookResult = ReturnType<
  typeof useUploadProfilePictureMutation
>
export type UploadProfilePictureMutationResult = Apollo.MutationResult<UploadProfilePictureMutation>
export type UploadProfilePictureMutationOptions = Apollo.BaseMutationOptions<
  UploadProfilePictureMutation,
  UploadProfilePictureMutationVariables
>
export const GetUserProgressDocument = gql`
  query getUserProgress {
    progressState {
      totalCount
      datetimes
      counts {
        type
        count
      }
    }
  }
`

/**
 * __useGetUserProgressQuery__
 *
 * To run a query within a React component, call `useGetUserProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProgressQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserProgressQuery,
    GetUserProgressQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetUserProgressQuery, GetUserProgressQueryVariables>(
    GetUserProgressDocument,
    options,
  )
}
export function useGetUserProgressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserProgressQuery,
    GetUserProgressQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetUserProgressQuery, GetUserProgressQueryVariables>(
    GetUserProgressDocument,
    options,
  )
}
export type GetUserProgressQueryHookResult = ReturnType<typeof useGetUserProgressQuery>
export type GetUserProgressLazyQueryHookResult = ReturnType<
  typeof useGetUserProgressLazyQuery
>
export type GetUserProgressQueryResult = Apollo.QueryResult<
  GetUserProgressQuery,
  GetUserProgressQueryVariables
>
export const GetLevelsDocument = gql`
  query getLevels {
    levels {
      _id
      name
    }
  }
`

/**
 * __useGetLevelsQuery__
 *
 * To run a query within a React component, call `useGetLevelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLevelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLevelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLevelsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLevelsQuery, GetLevelsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetLevelsQuery, GetLevelsQueryVariables>(
    GetLevelsDocument,
    options,
  )
}
export function useGetLevelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLevelsQuery, GetLevelsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetLevelsQuery, GetLevelsQueryVariables>(
    GetLevelsDocument,
    options,
  )
}
export type GetLevelsQueryHookResult = ReturnType<typeof useGetLevelsQuery>
export type GetLevelsLazyQueryHookResult = ReturnType<typeof useGetLevelsLazyQuery>
export type GetLevelsQueryResult = Apollo.QueryResult<
  GetLevelsQuery,
  GetLevelsQueryVariables
>
export const SetLevelDocument = gql`
  mutation setLevel($levelName: LevelName!) {
    setLevel(levelName: $levelName) {
      _id
      userLevelId
      userLevelName
    }
  }
`
export type SetLevelMutationFn = Apollo.MutationFunction<
  SetLevelMutation,
  SetLevelMutationVariables
>

/**
 * __useSetLevelMutation__
 *
 * To run a mutation, you first call `useSetLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLevelMutation, { data, loading, error }] = useSetLevelMutation({
 *   variables: {
 *      levelName: // value for 'levelName'
 *   },
 * });
 */
export function useSetLevelMutation(
  baseOptions?: Apollo.MutationHookOptions<SetLevelMutation, SetLevelMutationVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<SetLevelMutation, SetLevelMutationVariables>(
    SetLevelDocument,
    options,
  )
}
export type SetLevelMutationHookResult = ReturnType<typeof useSetLevelMutation>
export type SetLevelMutationResult = Apollo.MutationResult<SetLevelMutation>
export type SetLevelMutationOptions = Apollo.BaseMutationOptions<
  SetLevelMutation,
  SetLevelMutationVariables
>
export const GetUserGuideDocument = gql`
  query getUserGuide {
    userGuide {
      introduction
      youtubeId
    }
  }
`

/**
 * __useGetUserGuideQuery__
 *
 * To run a query within a React component, call `useGetUserGuideQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserGuideQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserGuideQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserGuideQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserGuideQuery, GetUserGuideQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetUserGuideQuery, GetUserGuideQueryVariables>(
    GetUserGuideDocument,
    options,
  )
}
export function useGetUserGuideLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserGuideQuery,
    GetUserGuideQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetUserGuideQuery, GetUserGuideQueryVariables>(
    GetUserGuideDocument,
    options,
  )
}
export type GetUserGuideQueryHookResult = ReturnType<typeof useGetUserGuideQuery>
export type GetUserGuideLazyQueryHookResult = ReturnType<typeof useGetUserGuideLazyQuery>
export type GetUserGuideQueryResult = Apollo.QueryResult<
  GetUserGuideQuery,
  GetUserGuideQueryVariables
>
