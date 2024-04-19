const CLAUDE_API_URL =
  'https://api.anthropic.com/v1/messages'

export interface ClaudeMessage {
  role: 'assistant' | 'user'
  content: string
}

function getExpectedEndCharacter(text: string) {
  switch (text[0]) {
    case '{':
      return '}'
    case '[':
      return ']'
    default:
      throw new Error(
        'unexpected character at start of content'
      )
  }
}

async function makeClaudeRequest(
  system: string,
  messages: ClaudeMessage[],
  apiKey: string
) {
  const headers = {
    'Anthropic-Version': '2023-06-01',
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
  }

  const body = JSON.stringify({
    max_tokens: 4096,
    model: 'claude-3-opus-20240229',
    messages,
    system,
  })

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers,
      body,
    })

    if (!response.ok) {
      console.error(await response.text())
      throw new Error(
        `HTTP error! status: ${response.status}`
      )
    }

    const data = await response.json()

    let content = data.content?.[0]?.text

    if (!content || typeof content !== 'string') {
      throw new Error(
        'No content found in the API response'
      )
    }

    return content
  } catch (error) {
    console.error('Error calling Claude API:', error)
    throw error
  }
}

export async function sendPromptToClaude(
  system: string,
  messages: ClaudeMessage[],
  apiKey: string
): Promise<any> {
  let content = await makeClaudeRequest(
    system,
    messages,
    apiKey
  )

  if (!content || typeof content !== 'string') {
    throw new Error('No content found in the API response')
  }

  let assembledContent = content
  let trimmedContent = content.trim()

  const expectedEndCharacter =
    getExpectedEndCharacter(trimmedContent)

  while (
    trimmedContent[trimmedContent.length - 1] !==
    expectedEndCharacter
  ) {
    messages.push(
      {
        role: 'assistant',
        content,
      },
      {
        role: 'user',
        content: 'Please continue from where you left off.',
      }
    )
    console.log(
      `Did not find matching end of generated JSON (${JSON.stringify(expectedEndCharacter)}), requesting page ${(messages.length + 1) / 2}...`
    )
    content = await makeClaudeRequest(
      system,
      messages,
      apiKey
    )
    if (!content || typeof content !== 'string') {
      throw new Error(
        'No content found in the API response'
      )
    }
    trimmedContent = content.trim()
    assembledContent += content
    console.log(`... got page ${(messages.length + 1) / 2}`)
  }

  return JSON.parse(assembledContent)
}
