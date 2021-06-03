import React, { useState } from 'react'

const Statistic = ({text, value}) => {
  return (
    <p> {text}: {value}</p>
  )
}
const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}> text </button>
  )
}
const Statistics = (props) => {
  if (props.functions[0](props.values[0], props.values[1], props.values[2]) === 0) {
    return (
      <p> No feedback given</p>
    )
  }
  else {
    return (
      <>
        <Statistic text="good" value={props.values[0]}/>
        <Statistic text="neutral" value={props.values[1]}/>
        <Statistic text="bad" value={props.values[2]}/>
        <Statistic text="all" value={props.functions[0](props.values[0], props.values[1], props.values[2])}/>
        <Statistic text="average" value={props.functions[1](props.values[0], props.values[1], props.values[2])}/>
        <Statistic text="positive" value={props.functions[2](props.values[0], props.values[1], props.values[2])}/>
      </>
    )
  }
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
  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> Give feedback</h1>
      <Button text="good" handleClick={handleGood}/>
      <Button text="neutral" handleClick={handleNeutral}/>
      <Button text="bad" handleClick={handleBad}/>
      <h1> Statistics</h1>
      <Statistics values={[good, neutral, bad]} functions={[sum, average, positive]}/>

    </div>
  )
}

export default App