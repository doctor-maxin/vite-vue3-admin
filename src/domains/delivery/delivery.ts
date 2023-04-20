import { MDocument } from "@/types";

export interface IDeliveryRule extends MDocument {
	amount: number;
	amountFrom?: number;
	amountTo?: number;
	address: any;
	order: number;
}

export type IDeliveryRulePayload = Omit<IDeliveryRule, keyof MDocument>