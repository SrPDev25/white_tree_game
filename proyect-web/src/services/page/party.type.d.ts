import { PricePolicyAmountTypeEnum, PricePolicyPolicyEnum } from "@/redux/api/pricing/pricingSlice.enum";

/**
 * Shipping information
 */
export type IShipping={
    address1:string,
    city:string,
    country:string,
    firstName:string,
    lastName:string,
    //Back only use phone as extension+phone format (+34666666666)
    phone:string,
    postcode:string,
    state:string
}
/**
 * Billing information
 */
export type IBilling = IShipping & {
	email:string,
    identityDoc:string
};

/**Order product info
 * This information is used to: Calculate the price, show product's basic info and limit the rent options and dates
 */
export interface IOrderProductInfo {
	/** Product SKU */
	sku: string,
	/** Product name */
	name: string,
	/** Product brand */
	brand: string,
	/** Product price */
	category: string,
	/** Product price */	
	pvp: number,
	/** */
	pricing: IPricing
	/**Locations can be send the product and the shipping cost */
	shippingCost: IShippingCost[]
}

export interface IShippingCost {
	cost: number;
	enabled: boolean;
	country: string;
	states: IStatesCost[];
}

export interface IStatesCost {
	_id: string;
	cost: number;
	state: string;
	/**Available province */
	enabled: boolean;
	name: string;
}

export interface IPricing {
	basePrice: number,
	/** Price and calendar configuration as catchall */
	config: IPricingConfig;
	/** Ranges of prices config */
	prices: {
		/** Subscription price config
		 * rent period of rent by months
		 * @format Record<PricingConfig['subscriptionPeriod']['name'], PricePolicy>
		 */
		subscription?: Record<string, IPricingRent>;
		/** Rent price config
		 * @format (firstDate-endDate) as days range
		 */
		rent?: Record<string, IPricingRent>;
	};
    /** Disabled days to rent */
	holidays?: IPricingHolidays;
}

export interface IPricingHolidays {
	/** Days of the week */
	weekDays?: number[];
	/** Specific days */
	specificDays?: IPricingHolidaysSpecificDays[];//['2024-05-18T12:12:00.000Z']
}

export interface IPricingHolidaysSpecificDays {
	date: string;//2024-05-18T12:12:00.000Z
	repeatEveryYear: boolean;
}


export interface IPricingRent {
	/** Relationship between basePrice and modified amount */
	policy: PricePolicyPolicyEnum;
	/** How to modify amount */
	amountType: PricePolicyAmountTypeEnum;
	/** Number to calculate the amount */
	amount: number;
}

export interface ISubscriptionPeriod {
	/** Period's name */
	name: string;//2 mesinos
	/** Number of months of the period */
	months: number;
}

export interface IPricingConfig {
	/** Fist day can be rented (today + firstDate) */
	firstDate: number;
	//Rent, block system
	/** Number of days by block */
	blockUnit: number;//8
	/** Min amount of blocks */
	minBlock: number;//1
	/** Max amount of blocks */
	maxBlock: number;//1

	//Calc
	/** Months periods */
	subscriptionPeriod?: ISubscriptionPeriod[];

	// Enable rent types
	/** TBB */
	enableTbb: boolean;
	/** Rent */
	enableRent: boolean;
	/** Subscription */
	enableSubscription: boolean;
}

export type IStockDates = [string, string];
