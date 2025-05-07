import { Poc } from "./poc";
import { EPocCategory } from "./EPocCategory";

describe("Poc", () => {
  it("when constructor is called should assign all properties correctly", () => {
    const id = 1;
    const name = "Test POC";
    const description = "This is a test";
    const category = EPocCategory.BAR;
    const createdAt = new Date("2024-01-01T00:00:00Z");
    const updatedAt = new Date("2024-01-02T00:00:00Z");

    const poc = new Poc(id, name, description, category, createdAt, updatedAt);

    expect(poc.id).toBe(id);
    expect(poc.name).toBe(name);
    expect(poc.description).toBe(description);
    expect(poc.category).toBe(category);
    expect(poc.createdAt).toBe(createdAt);
    expect(poc.updatedAt).toBe(updatedAt);
  });
});
