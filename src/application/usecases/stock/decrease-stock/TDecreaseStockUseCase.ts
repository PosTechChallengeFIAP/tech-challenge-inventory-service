export type TDecreaseStockUseCaseRequest = {
    stockId: number;
    quantity: number;
}

export type TDecreaseStockUseCaseResponse = {
    success: boolean;
    message: string;
}