export function useMoney() {
    const money = (ref: any) => {
        return parseFloat(ref || 0).toLocaleString('ru', {
            style: 'currency',
            currency: 'RUB'
        })
    }

    return { money }
}