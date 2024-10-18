export class Product {
  name: string;
  basePrice: number;
  marginPercentage: number;
  tax: number;

  constructor(
    name: string,
    basePrice: number,
    marginPercentage: number,
    tax: number
  ) {
    this.name = name;
    this.basePrice = basePrice;
    this.marginPercentage = marginPercentage;
    this.tax = tax;
  }

  getPreTaxPrice(): number {
    return (
      0.01 * Math.ceil(100 * this.basePrice * (1.0 + this.marginPercentage))
    );
  }
}

export enum TaxCategories {
  NORMAL = 0.21,
  FIRST_NECESSITY = 0.1,
}
