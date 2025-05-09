import { FindOneOrAllProductsUseCase } from "./FindOneOrAllProductsUseCase";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { EProductCategory } from "@domain/models/EProductCategory";
import { IProduct } from "@application/DTOs/product";

describe("FindOneOrAllProductsUseCase", () => {
  let useCase: FindOneOrAllProductsUseCase;
  let mockProductRepository: jest.Mocked<IProductRepository>;

  const mockProduct: IProduct = {
    id: 1,
    name: "Burger",
    description: "Juicy burger",
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

    useCase = new FindOneOrAllProductsUseCase(mockProductRepository);
  });

  it("when id is provided should return the product by id", async () => {
    mockProductRepository.getById.mockResolvedValue(mockProduct);

    const result = await useCase.execute({ id: 1 });

    expect(mockProductRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toBe(mockProduct);
  });

  it("when category is provided should return products by category", async () => {
    const products = [mockProduct];
    mockProductRepository.getByCategory.mockResolvedValue(products);

    const result = await useCase.execute({ category: EProductCategory.FOOD });

    expect(mockProductRepository.getByCategory).toHaveBeenCalledWith(EProductCategory.FOOD);
    expect(result).toBe(products);
  });

  it("when neither id nor category is provided should return all products", async () => {
    const allProducts = [mockProduct];
    mockProductRepository.getAll.mockResolvedValue(allProducts);

    const result = await useCase.execute({});

    expect(mockProductRepository.getAll).toHaveBeenCalled();
    expect(result).toBe(allProducts);
  });
});
