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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}