const pluginTailwindCSS = require('eleventy-plugin-tailwindcss')
const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')

const markdownOptions = {
  html: true,
  breaks: false,
  linkify: true,
}

module.exports = function (eleventyConfig) {
  const isProduction = process.env.NODE_ENV == 'production'

  // Copy assets
  eleventyConfig.addPassthroughCopy('src/assets')

  // Tailwind
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: 'src/styles/main.css',
    dest: 'assets',
    keepFolderStructure: false,
    minify: isProduction,
    watchEleventyWatchTargets: true,
  })

  // Markdown
  setupMarkdown(eleventyConfig)

  // Minify HTML in production
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (isProduction && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  // Custom filters
  eleventyConfig.addShortcode('paragraph', function (text, classes) {
    return text
      .split('\n\n')
      .map(par => `<p class="${classes}">${par}</p>`)
      .join('\n')
  })

  eleventyConfig.addFilter('markdown', function (text) {
    const md = markdownIt(markdownOptions)
    return md.render(text)
  })

  eleventyConfig.addFilter('debug', obj => {
    console.log('DEBUG', obj)
  })

  eleventyConfig.addFilter('docsNavGroupItems', function (group, collection) {
    return collection.filter(x => x.data.group == group)
  })
}

const setupMarkdown = config => {
  const linkAnchorOptions = {
    permalink: true,
    permalinkAttrs: () => ({ 'aria-label': 'Anchor' }),
    permalinkClass: 'header-anchor',
    permalinkSymbol: '#',
    permalinkBefore: true,
  }

  const md = markdownIt(markdownOptions).use(
    require('markdown-it-anchor'),
    linkAnchorOptions
  )

  config.setLibrary('md', md)
  config.addFilter('markdown', markdown => {
    return md.render(markdown)
  })
}
