// utils/bannedWords.ts

const bannedWords = [
  'anal',
  'anus',
  'arse',
  'ass',
  'asshole',
  'bastard',
  'bitch',
  'blowjob',
  'bollock',
  'boner',
  'boob',
  'bugger',
  'bum',
  'butt',
  'clit',
  'cock',
  'crap',
  'cunt',
  'damn',
  'dick',
  'dildo',
  'dyke',
  'fag',
  'faggot',
  'fuck',
  'hell',
  'homo',
  'jerk',
  'kike',
  'nigger',
  'penis',
  'piss',
  'prick',
  'pussy',
  'rape',
  'shit',
  'slut',
  'tit',
  'twat',
  'vagina',
  'whore',
]

export default bannedWords

export function containsBannedWords(value: string) {
  const lower = value.toLowerCase()
  return bannedWords.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(lower))
}
