import { CreateProductUseCase } from "./CreateProductUseCase";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { EProductCategory } from "@domain/models/EProductCategory";
import { IProduct } from "@application/DTOs/product";

describe("CreateProductUseCase", () => {
  let useCase: CreateProductUseCase;
  let mockProductRepository: jest.Mocked<IProductRepository>;

  const mockProduct: IProduct = {
    id: 1,
    name: "Pizza",
    description: "Delicious pizza",
    category: EProductCategory.FOOD,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockProductRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      getByCategory: jest.fn(),
      save: jest.fn(),
    };

    useCase = new CreateProductUseCase(mockProductRepository);
  });

  it("when valid request is given should create and return the product", async () => {
    const input = {
      name: "Pizza",
      description: "Delicious pizza",
      category: EProductCategory.FOOD,
    };

    mockProductRepository.save.mockResolvedValue(mockProduct);

    const result = await useCase.execute(input);

    expect(mockProductRepository.save).toHaveBeenCalledWith(input);
    expect(result).toBe(mockProduct);
  });
});
