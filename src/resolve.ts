import { performance } from 'perf_hooks'
import { GeckoElement, GeckoResolvedElement } from '.'
import { sendPromptToClaude } from './claude-ai'
import { GeckoDataPromptElement } from './tags/DataPrompt'
import { GeckoRootElement } from './tags/Root'
import { formatMilliseconds } from './util/formatMilliseconds'

const options = process.env.OPTIONS
  ? process.env.OPTIONS.split(' ')
  : []
const { CLAUDE_API_KEY } = process.env
const noCache = options.includes('--no-cache')

let totalGenerationCount = 0
let totalGenerationTime = 0

export function printResolveSummary() {
  if (totalGenerationCount > 0) {
    console.log(
      `Generated ${totalGenerationCount} feature${totalGenerationCount === 1 ? '' : 's'} with AI, total time ${formatMilliseconds(totalGenerationTime)}`
    )
  }
}

function ensureClaudeAPIKey() {
  if (
    typeof CLAUDE_API_KEY !== 'string' ||
    !CLAUDE_API_KEY ||
    CLAUDE_API_KEY.length < 40
  ) {
    throw new Error(
      `required environment variable missing or invalid: CLAUDE_API_KEY`
    )
  }
}

async function resolvePrompt(
  prompt: GeckoDataPromptElement
): Promise<GeckoResolvedElement[]> {
  ensureClaudeAPIKey()
  const { input, type } = prompt.props

  const start = performance.now()
  console.log(
    `Generating with AI: ${JSON.stringify(input)}...`
  )

  const systemText = `You are a JSON factory. You only generate valid JSON objects or arrays using all of your available knowledge. Assume the user is building a software application with the JSON you create. The JSON you create must conform exactly to the user provided TypeScript Type. You might be generating a single object, an array, or an array of objects. Check the TypeScript type to discern between those cases. If your output would exceed the ouput token limit, send as much as you can, and the user will continue to ask for additional chunks until complete.`

  const promptText = `Please provide valid JSON text, without any additional text or explanations, for the following TypeScript Type and Description:

TypeScript Type: ${type}

Description: ${input}
`

  const response = await sendPromptToClaude(
    systemText,
    [{ role: 'user', content: promptText }],
    CLAUDE_API_KEY!,
    !noCache
  )

  const resolvedChildren = prompt.props
    .children!.map((fn) => fn(response) as GeckoElement)
    .flat(Infinity) as GeckoResolvedElement[]

  const end = performance.now()
  const time = end - start
  totalGenerationCount++
  totalGenerationTime += time
  console.log(`... done! (${formatMilliseconds(time)})`)

  return resolvedChildren
}

async function resolveElement(
  element: GeckoElement | string
): Promise<
  | (GeckoResolvedElement | string)[]
  | GeckoResolvedElement
  | string
> {
  if (typeof element === 'string') {
    return [element]
  }
  switch (element.type) {
    case 'prompt:data':
      return resolvePrompt(
        element as GeckoDataPromptElement
      )
    default:
      if (
        !('children' in element.props) ||
        typeof element.props.children === 'string' ||
        (Array.isArray(element.props.children) &&
          !element.props.children?.length)
      ) {
        return element
      }
      const children = (
        Array.isArray(element.props.children)
          ? element.props.children
          : [element.props.children]
      ).filter((x) => typeof x !== 'undefined')
      const resolvedChildren = (await Promise.all(
        children.map(resolveElement)
      )) as GeckoResolvedElement[]
      return {
        ...element,
        props: {
          ...element.props,
          children: resolvedChildren.flat(Infinity),
        },
      } as GeckoResolvedElement
  }
}

export async function resolve(
  root: GeckoRootElement
): Promise<GeckoRootElement> {
  return resolveElement(root) as Promise<GeckoRootElement>
}
