import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import './markdown-styles.css'

interface MarkdownExampleProps {
    title: string
    markdown: string
}

const MarkdownExample: React.FC<MarkdownExampleProps> = ({ title, markdown }) => {
    return (
        <div className="mb-6 border rounded-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 font-medium border-b">
                {title}
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                <div className="p-4 font-mono text-sm whitespace-pre-wrap">{markdown}</div>
                <div className="p-4 markdown-preview">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export function MarkdownCheatsheet() {
    const examples = [
        {
            title: 'Headings',
            markdown: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`,
        },
        {
            title: 'Emphasis',
            markdown: `*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_`,
        },
        {
            title: 'Lists',
            markdown: `Unordered List:
- Item 1
- Item 2
  - Item 2a
  - Item 2b

Ordered List:
1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b`,
        },
        {
            title: 'Links',
            markdown: `[Link Text](https://example.com)

[Link with Title](https://example.com "Link Title")

<https://example.com> (Automatic URL)`,
        },
        {
            title: 'Images',
            markdown: `![Alt Text](https://via.placeholder.com/150 "Image Title")

[![Linked Image](https://via.placeholder.com/150)](https://example.com)`,
        },
        {
            title: 'Code',
            markdown: `Inline code: \`const example = "hello world"\`

Code block:
\`\`\`javascript
function greeting(name) {
  return \`Hello, \${name}!\`
}

console.log(greeting("World"))
\`\`\``,
        },
        {
            title: 'Blockquotes',
            markdown: `> This is a blockquote
> 
> It can span multiple lines

> Nested blockquotes
>> Like this`,
        },
        {
            title: 'Tables',
            markdown: `| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Left         | Center         | Right         |`,
        },
        {
            title: 'Horizontal Rules',
            markdown: `Above the line

---

Below the line

***

Also works with asterisks`,
        },
        {
            title: 'Task Lists',
            markdown: `- [x] Completed task
- [ ] Incomplete task
- [ ] Another task`,
        },
        {
            title: 'Strikethrough',
            markdown: `~~This text is strikethrough~~`,
        },
    ]

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Markdown Cheatsheet</h1>
            <p className="mb-6">
                This cheatsheet shows how to use Markdown syntax to format your blog posts. The left column shows the Markdown
                syntax, and the right column shows how it will be rendered.
            </p>

            {examples.map((example, index) => (
                <MarkdownExample key={index} title={example.title} markdown={example.markdown} />
            ))}

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Tips for Writing Good Markdown</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Use headings to structure your content</li>
                    <li>Break up long paragraphs for better readability</li>
                    <li>Use lists to organize related items</li>
                    <li>Include relevant images to illustrate your points</li>
                    <li>Use code blocks for code snippets with proper syntax highlighting</li>
                    <li>Preview your content before publishing</li>
                </ul>
            </div>
        </div>
    )
}

export default MarkdownCheatsheet
