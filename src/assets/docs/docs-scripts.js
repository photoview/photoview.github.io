// Table of Contents
;(() => {
  const content = document.querySelector('#primary-content')
  const contentToc = document.querySelector('#content-toc')

  const headings = content.querySelectorAll('h2, h3, h4, h5, h6')
  const headingLinks = Array.from(contentToc.querySelectorAll('li a'))

  let currentHeading

  findCurrentHeading()
  document.addEventListener('scroll', findCurrentHeading)

  function headingChanged() {
    headingLinks.forEach(link => link.classList.remove('active'))
    const newActiveLink = headingLinks.find(
      link => new URL(link).hash.substr(1) == currentHeading.id
    )
    newActiveLink.classList.add('active')
  }

  function findCurrentHeading() {
    let newHeading = null

    for (let i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top >= 10) {
        if (i == 0) {
          newHeading = headings[i]
        } else {
          newHeading = headings[i - 1]
        }
        break
      }
    }

    if (newHeading == null && headings.length > 0) {
      newHeading = headings[headings.length - 1]
    }

    if (newHeading != currentHeading) {
      currentHeading = newHeading
      headingChanged()
    }
  }
})()

// Searchbox
;(() => {
  let searchActivated = false
  const searchOverlay = document.querySelector('#search-overlay')
  const resultsBox = document.querySelector('#search-results-box')
  const searchInput = document.querySelector('#search-field')
  const navSearchInput = document.querySelector('#nav-search-field')
  const dimmer = document.querySelector('#search-dimmer')

  let searchData = null
  const getSearchData = async () => {
    if (searchData !== null) return searchData

    const res = await fetch('/search-data.json')
    const data = await res.json()

    searchData = data
    return searchData
  }

  document.addEventListener('keypress', e => {
    if (e.key == '/') {
      navSearchInput.focus()
      e.preventDefault()
      e.stopPropagation()
    }
  })

  const openSearchbox = () => {
    if (searchActivated) return
    searchActivated = true
    document.body.classList.add('overflow-hidden')
    searchOverlay.classList.remove('hidden')
    searchInput.focus()

    if (searchData == null) buildSearchResults()
  }

  const closeSearchbox = e => {
    if (!searchActivated) return
    searchActivated = false
    document.body.classList.remove('overflow-hidden')
    searchOverlay.classList.add('hidden')

    e.preventDefault()
    e.stopPropagation()
  }

  navSearchInput.addEventListener('focus', openSearchbox)

  searchOverlay.addEventListener('keydown', e => {
    if (e.key == 'Escape') closeSearchbox(e)
  })

  searchInput.addEventListener('input', e => {
    buildSearchResults(e.target.value.toLowerCase())
  })

  dimmer.addEventListener('click', closeSearchbox)

  async function buildSearchResults(query) {
    const data = await getSearchData()
    console.log(data)

    const resultsElm = document.createElement('ul')
    resultsElm.classList.add('search-results-list')

    for (const page of data) {
      const pageElm = document.createElement('li')
      pageElm.classList.add('search-results-page')

      const sectionsElm = document.createElement('ul')
      sectionsElm.classList.add('search-results-page-section')

      let foundSections = false

      for (const section of page.sections) {
        if (query) {
          if (!section.content.toLowerCase().includes(query)) {
            if (section.heading) {
              if (!section.heading.toLowerCase().includes(query)) {
                continue
              }
            } else {
              continue
            }
          }
        }

        foundSections = true

        const sectionElm = document.createElement('li')
        const sectionLinkElm = document.createElement('a')
        sectionLinkElm.href = section.link
        sectionLinkElm.onclick = () => closeSearchbox()
        sectionElm.appendChild(sectionLinkElm)

        if (section.heading) {
          const headingElm = document.createElement('div')
          headingElm.classList.add('search-results-section-heading')
          headingElm.innerText = section.heading
          sectionLinkElm.appendChild(headingElm)
        }

        const contentElm = document.createElement('div')
        contentElm.classList.add('search-results-section-content')
        contentElm.innerText = section.content
        sectionLinkElm.appendChild(contentElm)

        sectionsElm.appendChild(sectionElm)
      }

      if (foundSections) {
        const pageTitleElm = document.createElement('a')
        pageTitleElm.innerText = page.article.title
        pageTitleElm.href = page.article.url
        pageTitleElm.classList.add('search-results-page-title')

        pageElm.appendChild(pageTitleElm)
        pageElm.appendChild(sectionsElm)
      }

      resultsElm.appendChild(pageElm)
    }

    resultsBox.replaceChildren(resultsElm)
  }
})()
