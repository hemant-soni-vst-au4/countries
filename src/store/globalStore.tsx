import create from 'zustand'

export const languageStore = create((set, get) => ({
  language: 'en',
}))

export const libraryStore = create<{
  category: any
}>((set, get) => ({
  category: 'General',
  setCategory: (category) => set({ category }),
  //count: () => get().username.length,
}))
export const authenticationStore = create<{
  authComponentState: string
  userName: string
  userEmail: string
}>((set, get) => ({
  authComponentState: 'auth',
  userName: '',
  userEmail: '',
  // setUserName: (userName) => set({ userName }),
  // setUserEmail: (useEmail) => set({ useEmail }),
  // setAuthComponentState: (authComponentState) => set({ authComponentState }),
}))


