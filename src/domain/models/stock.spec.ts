import { Stock } from "./stock";
import { IPoc } from "@application/DTOs/poc";
import { IProduct } from "@application/DTOs/product";
import { EPocCategory } from "./EPocCategory";
import { EProductCategory } from "./EProductCategory";

const mockPoc: IPoc = {
  id: 1,
  name: "Poc A",
  description: "Description",
  category: EPocCategory.BAR,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProduct: IProduct = {
  id: 1,
  name: "Product A",
  description: "Product description",
  category: EProductCategory.FOOD,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Stock", () => {
  it("when instantiated with valid values should assign all properties correctly", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 10, 5, new Date("2024-01-01"), new Date("2024-01-02"));

    expect(stock.id).toBe(1);
    expect(stock.poc).toBe(mockPoc);
    expect(stock.product).toBe(mockProduct);
    expect(stock.quantity).toBe(10);
    expect(stock.unitPrice).toBe(5);
    expect(stock.createdAt.toISOString()).toBe("2024-01-01T00:00:00.000Z");
    expect(stock.updatedAt.toISOString()).toBe("2024-01-02T00:00:00.000Z");
  });

  it("when instantiated with negative quantity should throw error", () => {
    expect(() => new Stock(1, mockPoc, mockProduct, -1, 5, new Date(), new Date()))
      .toThrow("Quantity cannot be negative");
  });

  it("when instantiated with negative unitPrice should throw error", () => {
    expect(() => new Stock(1, mockPoc, mockProduct, 1, -5, new Date(), new Date()))
      .toThrow("Unit price cannot be negative");
  });

  it("when setQuantity with valid value should update quantity", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 10, 5, new Date(), new Date());
    stock.setQuantity(20);
    expect(stock.quantity).toBe(20);
  });

  it("when setQuantity with negative value should throw error", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 10, 5, new Date(), new Date());
    expect(() => stock.setQuantity(-1)).toThrow("Quantity cannot be negative");
  });

  it("when setUnitPrice with valid value should update unitPrice", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 10, 5, new Date(), new Date());
    stock.setUnitPrice(8);
    expect(stock.unitPrice).toBe(8);
  });

  it("when setUnitPrice with negative value should throw error", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 10, 5, new Date(), new Date());
    expect(() => stock.setUnitPrice(-1)).toThrow("Unit price cannot be negative");
  });

  it("when subtractQuantity with valid value should decrease quantity", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 10, 5, new Date(), new Date());
    stock.subtractQuantity(5);
    expect(stock.quantity).toBe(5);
  });

  it("when subtractQuantity with value greater than quantity should throw error", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 5, 5, new Date(), new Date());
    expect(() => stock.subtractQuantity(10)).toThrow("Insufficient stock");
  });

  it("when subtractQuantity with negative value should throw error", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 5, 5, new Date(), new Date());
    expect(() => stock.subtractQuantity(-1)).toThrow("Quantity cannot be negative");
  });

  it("when addQuantity with valid value should increase quantity", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 5, 5, new Date(), new Date());
    stock.addQuantity(3);
    expect(stock.quantity).toBe(8);
  });

  it("when addQuantity with negative value should throw error", () => {
    const stock = new Stock(1, mockPoc, mockProduct, 5, 5, new Date(), new Date());
    expect(() => stock.addQuantity(-2)).toThrow("Quantity cannot be negative");
  });
});
