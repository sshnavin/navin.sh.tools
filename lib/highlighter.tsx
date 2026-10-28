import {
  getSingletonHighlighterCore,
  type HighlighterCore,
} from "@shikijs/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

// ---------------------------------------------------------------------------
// Language map — only the languages we need, loaded on first use.
// ---------------------------------------------------------------------------
const languages: Record<string, () => Promise<unknown>> = {
  bash:       () => import("shiki/langs/shellscript.mjs"),
  css:        () => import("shiki/langs/css.mjs"),
  diff:       () => import("shiki/langs/diff.mjs"),
  html:       () => import("shiki/langs/html.mjs"),
  javascript: () => import("shiki/langs/javascript.mjs"),
  json:       () => import("shiki/langs/json.mjs"),
  jsx:        () => import("shiki/langs/jsx.mjs"),
  markdown:   () => import("shiki/langs/markdown.mjs"),
  python:     () => import("shiki/langs/python.mjs"),
  sql:        () => import("shiki/langs/sql.mjs"),
  tsx:        () => import("shiki/langs/tsx.mjs"),
  typescript: () => import("shiki/langs/typescript.mjs"),
  yaml:       () => import("shiki/langs/yaml.mjs"),
}

const aliases: Record<string, string> = {
  js:          "javascript",
  md:          "markdown",
  py:          "python",
  sh:          "bash",
  shell:       "bash",
  shellscript: "bash",
  ts:          "typescript",
  yml:         "yaml",
  zsh:         "bash",
}

// ---------------------------------------------------------------------------
// Singleton — getSingletonHighlighterCore manages the instance internally.
// Themes are loaded upfront; languages are loaded on first use.
// ---------------------------------------------------------------------------
function getHighlighter(): Promise<HighlighterCore> {
  return getSingletonHighlighterCore({
    themes: [
      import("shiki/themes/github-light.mjs"),
      import("shiki/themes/github-dark.mjs"),
    ],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  })
}

function resolveLanguage(lang: string): string | null {
  const name = lang.toLowerCase()
  if (name in languages) return name
  return aliases[name] ?? null
}

// ---------------------------------------------------------------------------
// Public API
//
// Returns a highlighted HTML string (a full <pre><code>…</code></pre> block)
// or null for unrecognised languages. The caller renders it with
// dangerouslySetInnerHTML — no React node iteration needed.
//
// Dual-theme output uses --shiki-light / --shiki-dark CSS custom properties,
// matching the existing text-(--shiki-light) dark:text-(--shiki-dark) classes.
// ---------------------------------------------------------------------------
export async function codeToHtmlHighlighted(
  code: string,
  lang: string
): Promise<string | null> {
  const resolvedLang = resolveLanguage(lang)
  if (!resolvedLang) return null

  const shiki = await getHighlighter(
  )

  if (!shiki.getLoadedLanguages().includes(resolvedLang)) {
    await shiki.loadLanguage(languages[resolvedLang] as Parameters<HighlighterCore["loadLanguage"]>[0])
  }

  return shiki.codeToHtml(code, {
    lang: resolvedLang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })
}
