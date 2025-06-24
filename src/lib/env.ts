export function assertEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

function normalizeKey(value: string): string {
  const replaced = value.replace(/\\n/g, '\n')
  return replaced.includes('BEGIN') ? replaced : Buffer.from(replaced, 'base64').toString('utf8')
}

export const env = {
  firebase: {
    projectId: assertEnv('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID),
    clientEmail: assertEnv('FIREBASE_CLIENT_EMAIL', process.env.FIREBASE_CLIENT_EMAIL),
    privateKey: normalizeKey(assertEnv('FIREBASE_PRIVATE_KEY', process.env.FIREBASE_PRIVATE_KEY)),
  },
  telegram: {
    botToken: assertEnv('TELEGRAM_BOT_TOKEN', process.env.TELEGRAM_BOT_TOKEN),
    groupId: process.env.TELEGRAM_GROUP_ID,
  },
}
