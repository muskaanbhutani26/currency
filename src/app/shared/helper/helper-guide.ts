export const filterExchangeRatesValueByEur = (rates: any , filterBy: string) => {
    console.log(rates)
    return Object.values(rates).filter(key => key == filterBy);
}