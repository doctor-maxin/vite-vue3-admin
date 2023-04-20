import { MDocument } from "@/types";

export interface IPaymentType extends MDocument {
	code: PaymentTypes;
	isActive: boolean;
	title: string;
}

export enum PaymentTypes {
    SBER = 'sber',
    SBP = 'sbp',
}

export type IPaymentTypePayload = Omit<IPaymentType, keyof MDocument>