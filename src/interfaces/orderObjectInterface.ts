export interface orderObjectInterface {
    userID : string | undefined,
    date:string,
    meals:{mealID:string, name:string, price:number, quantity:number }[],
    totalPrice:number,
    orderID:string
}

export interface orderFromFetchInterface {
    date:string,
    meals:{mealID:string,
    name:string,
    price:number,
    quantity:number}[],
    orderID:string,
    totalPrice:number,
    userID:string
}

export interface orderCartInterface {
    mealID:string,
    name:string,
    price:number,
    quantity:number,
}
