import {storageHelper} from './utils/storageHelper'

export async function fetchApi(input: RequestInfo, init?: RequestInit) {
  const token = await storageHelper.getNativeStorage('token')
  const opts = init || {headers: {}}
  return await fetch(process.env.REACT_APP_API_URL + input, {
    ...opts,
    headers: {
      ...opts.headers,
      'Content-Type': 'application/json',
      accesstoken: token?.data,
    },
  }).then((res) => res.json())
}

export async function fetchSuggestedCurriculum() {
  const res = await fetchApi('/lesson/suggested-curriculum/')
  return res.data
}

export async function userProfile() {
  const res = await fetchApi('/user/get-profile')
  return res.data
}

export async function fetchCourses() {
  const res = await fetchApi(`/lesson/my-course`)
  return res.data
}

export async function fetchSearchLessons(
  page: number = 1,
  videoLevel: string,
  day: string,
  searchKeyWord: string,
) {
  const res = await fetchApi(`/lesson/search-lessons/${page}`, {
    method: 'POST',
    body: JSON.stringify({
      videoLevel,
      day,
      searchKeyWord,
    }),
  })
  console.log({res})
  return res.data
}
