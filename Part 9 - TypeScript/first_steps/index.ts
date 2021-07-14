import express from 'express';
import {calculateBmi} from './calculateBmi';
import {exerciseCalculator} from "./exerciseCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;
  console.log(weight);
  console.log(height);
  if(!height || !weight) {
    res.status(404).send({ error: '"malformatted parameters"' });
  }
  else {
    const numberHeight = parseInt(height);
    const numberWeight = parseInt(weight);
    const response = {
      weight: weight,
      height: height,
      bmi: calculateBmi(numberHeight, numberWeight)
    };
    res.send(response);
  }
  
});

app.post('/exercises', (req, res) => {
  const { exercise, target } = req.body;
  if (!exercise || !target) {
    res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (
    !exercise.every((de) => !isNaN(Number(de))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  res.json(
    exerciseCalculator(
      exercise.map((de: string) => Number(de)),
      Number(target)
    )
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});