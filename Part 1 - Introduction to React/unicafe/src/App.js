import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = (p1, p2, p3) => {
    return p1 + p2 + p3
  }
  const average = (p1, p2, p3) => {
    if (good === 0 && neutral === 0 && bad === 0 ) return 0
    else return (p1 - p3)/sum(p1,p2,p3)
  }
  const positive = (p1, p2, p3) => {
    if (good === 0 && neutral === 0 && bad === 0 ) return 0
    else return p1/sum(p1, p2, p3)
  }

  return (
    <div>
      <h1> Give feedback</h1>
      <button onClick={ () => setGood(good + 1)}> good </button>
      <button onClick={ () => setNeutral(neutral + 1)}> bad </button>
      <button onClick={ () => setBad(bad + 1)}> neutral </button>
      <h1> Statistics</h1>
      <p> good: {good}</p>
      <p> neutral: {neutral}</p>
      <p> bad: {bad}</p>
      <p> all: {sum(good, neutral, bad)}</p>
      <p> average: {average(good, neutral, bad)}</p>
      <p> positive: {positive(good, neutral, bad)}</p>
    </div>
  )
}

export default App