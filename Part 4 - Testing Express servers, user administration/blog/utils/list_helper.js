var _ = require('lodash');

const dummy = (blogs) => {
    const x = 1
    return x
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, value) => {
        return total + value.likes
    }, 0)
}

const favouriteBlog = (blogs) => {
    const value = blogs.reduce(
        (max, each) => (each.likes > max ? each.likes : max),
        blogs[0].likes
      );
    const result = blogs.find(x => x.likes === value)
    return result
}

const mostBlogs = (blogs) => {
    const author = _
        .chain(blogs)
        .countBy('author')
        .map((blogs, author) => ({ author, blogs }))
        .sortBy('blogs')
        .last()
        .value()
    return author
}

const mostLikes = (blogs) => {
    const likes = _
        .chain(blogs)
        .groupBy('author')
        .map((obj, key) => ({ 'author': key, 'likes': _.sumBy(obj, 'likes') }))
        .sortBy('likes')
        .last()
        .value()
    return likes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}