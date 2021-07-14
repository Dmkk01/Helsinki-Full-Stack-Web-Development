export const calculateBmi = (height: number, weight: number): string => {
    const result = weight / (height / 100)**2;    
    if (result < 15) {
        return 'Very severely underweight'
    }
    else if (result < 16) {
        return 'Severely underweight'
    }
    else if (result < 18.5) {
        return 'Underweight'
    }
    else if (result < 25) {
        return 'Normal (healthy weight)'
    }
    else if (result < 30) {
        return 'Overweight'
    }
    else if (result < 35) {
        return 'Obese Class I (Moderately obese)'
    }
    else if (result < 40) {
        return 'Obese Class II (Severely obese)'
    }
    else {
        return 'Obese Class III (Very severely obese)'
    }
}


interface processArguments {
    value1: number;
    value2: number;
  }

const parseArguments = (args: Array<string>): processArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}
  
  try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }
