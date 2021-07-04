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

let numbers = [3, 0, 2, 4.5, 0, 3, 1];
console.log(exerciseCalculator(numbers, 2));
