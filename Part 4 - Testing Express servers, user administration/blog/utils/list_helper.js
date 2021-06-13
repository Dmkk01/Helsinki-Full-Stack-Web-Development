const dummy = (blogs) => {
    const x = 1
    return x
  }

const totalLikes = (blogs) => {
    return blogs.reduce((total, value) => {
        return total + value.likes
    }, 0)
}
  
  module.exports = {
    dummy,
    totalLikes
  }