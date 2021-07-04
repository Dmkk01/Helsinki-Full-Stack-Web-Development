interface result {
    period: number,
    days: number,
    success: boolean,
    rating: number,
    ratingDesc: string,
    target: number,
    average: number
}

const exerciseCalculator = (values: number[], target: number): result => {
    
    const days = values.filter(a => a != 0 )
    const total = values.reduce((a, b) => a + b, 0);
    const average = total / values.length
    const rating = (): number => {
        if (average <= 1) return 1
        else if (average <= 2) return 2
        else return 3
    }
    const desc = (): string => {
        switch(rating()) {
            case 1:
                return 'could be done better'
            case 2:
                return 'not too bad but could be better'
            case 3:
                return 'good job'
            default:
                return 'none'
        }
    }
    return {
        period: values.length,
        days: days.length,
        success: average >= target,
        rating: rating(),
        ratingDesc: desc(),
        target: target,
        average: average
    }
}
interface processArgumentss {
    numbers: number[];
    target: number;
}

const parseArgumentss = (args: Array<string>): processArgumentss => {
    if (args.length < 5) throw new Error('Not enough arguments');
    const values = [];
    for (var i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            values.push(Number(args[i]))
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    if (!isNaN(Number(args[2]))) {
        return {
            numbers: values,
            target: Number(args[2])
          }
    } else {
        throw new Error('Provided values were not numbers!');
    }

  }
  try {
    const { numbers, target } = parseArgumentss(process.argv);
    console.log(exerciseCalculator(numbers, target));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }

