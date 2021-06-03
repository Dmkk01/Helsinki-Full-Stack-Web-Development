import React, { useState } from 'react'


const Statistics = (props) => {
  return (
    <>
      <p> good: {props.values[0]}</p>
      <p> neutral: {props.values[1]}</p>
      <p> bad: {props.values[2]}</p>
      <p> all: {props.functions[0](props.values[0], props.values[1], props.values[2])}</p>
      <p> average: {props.functions[1](props.values[0], props.values[1], props.values[2])}</p>
      <p> positive: {props.functions[2](props.values[0], props.values[1], props.values[2])}</p>
    </>
  )
}
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
      <Statistics values={[good, neutral, bad]} functions={[sum, average, positive]}/>

    </div>
  )
}

export default App