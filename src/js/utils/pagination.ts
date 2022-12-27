import { DataType } from "../types/types";

export function getPaginatedData(cartItems: DataType[], urlAmount: string, urlPage: string) {
    const amountPages = Math.ceil(cartItems.length / (Number(urlAmount) || 5));
    const start = (Number(urlPage || 1) - 1) * Number(urlAmount || 5);
    const last = start + Number(urlAmount || 5);
    const paginatedData = cartItems.slice(start, last);
    return { amountPages, paginatedData }
}