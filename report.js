function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => a[1] - b[1])
    return pagesArr
}
module.exports = {
    sortPages
}