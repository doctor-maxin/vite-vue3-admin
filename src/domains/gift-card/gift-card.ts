export interface IGiftCard {
    _id: string;
    updatedAt: string;
    createdAt: string;
    balance: number;
    email?: string;
    code: string;
    nominal: number;
    expiredDate: Date | string;
    isActive: boolean;
}
export type IGiftCardPayload = Omit<IGiftCard, '_id' | 'updatedAt' | 'createdAt'>