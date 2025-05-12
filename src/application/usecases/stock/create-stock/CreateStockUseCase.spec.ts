import { CreateStockUseCase } from "./CreateStockUseCase";
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { IPocRepository } from "@domain/repositories/IPocRepository";
import { EProductCategory } from "@domain/models/EProductCategory";
import { EPocCategory } from "@domain/models/EPocCategory";
import { IProduct } from "@application/DTOs/product";
import { IPoc } from "@application/DTOs/poc";
import { IStock } from "@application/DTOs/stock";

describe("CreateStockUseCase", () => {
  let useCase: CreateStockUseCase;
  let mockStockRepository: jest.Mocked<IStockRepository>;
  let mockProductRepository: jest.Mocked<IProductRepository>;
  let mockPocRepository: jest.Mocked<IPocRepository>;

  const mockProduct: IProduct = {
    id: 1,
    name: "Product",
    description: "Desc",
    category: EProductCategory.FOOD,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPoc: IPoc = {
    id: 1,
    name: "POC",
    description: "Point of Contact",
    category: EPocCategory.RESTAURANT,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockStock: IStock = {
    id: 1,
    product: mockProduct,
    poc: mockPoc,
    quantity: 10,
    unitPrice: 15.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockStockRepository = { 
      save: jest.fn(), 
      getAll: jest.fn(), 
      getById: jest.fn(), 
      getByPocId: jest.fn(), 
      getByPocAndProductId: jest.fn(), 
      updateQuantity: jest.fn(), 
      decreaseQuantity: jest.fn(), 
      update: jest.fn() 
    };
    mockProductRepository = { getAll: jest.fn(), getByCategory: jest.fn(), getById: jest.fn(), save: jest.fn() };
    mockPocRepository = { getAll: jest.fn(), getById: jest.fn(), save: jest.fn() };

    useCase = new CreateStockUseCase(
      mockStockRepository,
      mockProductRepository,
      mockPocRepository,
    );
  });

  it("when product is not found should throw error", async () => {
    mockProductRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute({ productId: 1, pocId: 1, quantity: 10, unitPrice: 5 }))
      .rejects.toThrow("Product not found");
  });

  it("when poc is not found should throw error", async () => {
    mockProductRepository.getById.mockResolvedValue(mockProduct);
    mockPocRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute({ productId: 1, pocId: 1, quantity: 10, unitPrice: 5 }))
      .rejects.toThrow("Poc not found");
  });

  it("when product and poc exist should save and return stock", async () => {
    mockProductRepository.getById.mockResolvedValue(mockProduct);
    mockPocRepository.getById.mockResolvedValue(mockPoc);
    mockStockRepository.save.mockResolvedValue(mockStock);

    const result = await useCase.execute({ productId: 1, pocId: 1, quantity: 10, unitPrice: 15.5 });

    expect(mockStockRepository.save).toHaveBeenCalledWith({
      product: mockProduct,
      poc: mockPoc,
      quantity: 10,
      unitPrice: 15.5,
    });

    expect(result).toBe(mockStock);
  });
});
