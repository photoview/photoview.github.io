const MarkdownIt = require('markdown-it')
const MarkdownItPlainText = require('markdown-it-plain-text')
const slugify = require('slugify')

function stripContent(markdownText) {
  const md = new MarkdownIt()
  md.use(MarkdownItPlainText)

  md.render(markdownText)
  let plainText = md.plainText

  plainText = [/{%.*%}/g, /```.*/g].reduce(
    (acc, match) => acc.replaceAll(match, ''),
    plainText
  )

  return plainText.trim()
}

class SearchData {
  data() {
    return {
      permalink: 'search-data.json',
    }
  }

  render(data) {
    const articles = data.collections.docs

    let result = articles.map(article => {
      const headings = [
        ...article.template.inputContent
          .replaceAll(/```(.|\n)+?```/g, '') // Remove code blocks
          .matchAll(/^#+\s?(.*)$/gm),
      ]

      if (headings.length == 0) return null

      let content = article.template.inputContent

      const sections = []

      sections.push({
        heading: article.title,
        link: `${article.url}`,
        content: stripContent(
          content
            .slice(0, content.indexOf(headings[0][0]))
            .replaceAll(/\-{3}.*\-{3}/gs, '')
        ),
      })

      content = content.slice(
        content.indexOf(headings[0][0]) + headings[0][0].length
      )

      for (let i = 0; i < headings.length - 1; i++) {
        const offset = content.indexOf(headings[i + 1][0])
        const headingContent = content.slice(0, offset)
        content = content.slice(offset + headings[i + 1][0].length)

        sections.push({
          heading: headings[i][1],
          link: `${article.url}#${slugify(headings[i][1].toLowerCase())}`,
          content: stripContent(headingContent),
        })
      }

      sections.push({
        heading: headings[headings.length - 1][1],
        link: `${article.url}#${slugify(
          headings[headings.length - 1][1].toLowerCase()
        )}`,
        content: stripContent(content),
      })

      return {
        article: {
          title: article.data.title,
          url: article.url,
        },
        sections,
      }
    })

    result = result.filter(x => x != null)

    return JSON.stringify(result)
  }
}

module.exports = SearchData
