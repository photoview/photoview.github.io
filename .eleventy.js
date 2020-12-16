const pluginTailwindCSS = require('eleventy-plugin-tailwindcss')
const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')
const Image = require('@11ty/eleventy-img')
const path = require('path')

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

  // Optimize images
  eleventyConfig.addAsyncShortcode(
    'optimizedImage',
    async function (src, alt, attrs = '') {
      if (!path.isAbsolute(src)) {
        src = path.join(path.dirname(this.page.inputPath), src)
      } else {
        src = path.join('.', src)
      }

      if (alt === undefined) {
        throw new Error(`Missing \`alt\` on image shortcode from: ${src}`)
      }

      let stats = await Image(src, {
        widths: [640, null],
        formats: ['webp', 'jpeg'],
        outputDir: './_site/assets/images',
        urlPath: '/assets/images/',
      })
      let lowestSrc = stats['jpeg'][0]
      let sizes = '100vw' // Make sure you customize this!

      // Iterate over formats and widths
      return `<picture ${attrs} >
      ${Object.values(stats)
        .map(imageFormat => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map(entry => entry.srcset)
            .join(', ')}" sizes="${sizes}">`
        })
        .join('\n')}
        <img
          src="${lowestSrc.url}"
          alt="${alt}">
        </picture>`
    }
  )

  // Minify HTML in production
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
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
  eleventyConfig.addShortcode('paragraph', (text, classes) => {
    return text
      .split('\n\n')
      .map(par => `<p class="${classes}">${par}</p>`)
      .join('\n')
  })

  eleventyConfig.addFilter('markdown', text => {
    const md = markdownIt(markdownOptions)
    return md.render(text)
  })

  eleventyConfig.addFilter('debug', obj => {
    console.log('DEBUG', obj)
  })

  eleventyConfig.addFilter('docsNavGroupItems', (group, collection) => {
    return collection.filter(x => x.data.group == group)
  })
}

const setupMarkdown = eleventyConfig => {
  const linkAnchorOptions = {
    permalink: true,
    permalinkAttrs: () => ({ 'aria-label': 'Anchor' }),
    permalinkClass: 'header-anchor',
    permalinkSymbol: '',
    permalinkBefore: true,
  }

  const md = markdownIt(markdownOptions).use(
    require('markdown-it-anchor'),
    linkAnchorOptions
  )

  eleventyConfig.setLibrary('md', md)
  eleventyConfig.addFilter('markdown', markdown => {
    return md.render(markdown)
  })
}
