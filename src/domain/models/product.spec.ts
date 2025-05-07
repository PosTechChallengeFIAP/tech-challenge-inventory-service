import { Product } from "./product";
import { EProductCategory } from "./EProductCategory";

describe("Product", () => {
  it("when instantiated should correctly assign all properties", () => {
    const id = 1;
    const name = "Sample Product";
    const description = "This is a sample product.";
    const category = EProductCategory.FOOD;
    const createdAt = new Date("2024-01-01T00:00:00Z");
    const updatedAt = new Date("2024-01-02T00:00:00Z");

    const product = new Product(id, name, description, category, createdAt, updatedAt);

    expect(product.id).toBe(id);
    expect(product.name).toBe(name);
    expect(product.description).toBe(description);
    expect(product.category).toBe(category);
    expect(product.createdAt).toBe(createdAt);
    expect(product.updatedAt).toBe(updatedAt);
  });
});
