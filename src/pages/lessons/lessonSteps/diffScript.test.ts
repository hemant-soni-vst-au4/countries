import {diffText} from './diffScript'

let s1 = 'You and me, we made a vow'
let s2 = 'you and me.we  made vow.'

const script =
  "it's out of order. Yes, I can read the sign. I'm just pondering the implications."
const dictation =
  " it's out of order,yes i  can read the sign? \nI'm just pondering the implication."

let result = diffText(s1, s2)
result

result = diffText(script, dictation)

result
