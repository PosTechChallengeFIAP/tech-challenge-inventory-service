import { DecreaseStockUseCase } from "./DecreaseStockUseCase";
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { IStock } from "@application/DTOs/stock";

describe("DecreaseStockUseCase", () => {
  let useCase: DecreaseStockUseCase;
  let mockStockRepository: jest.Mocked<IStockRepository>;

  const mockStock: IStock = {
    id: 1,
    product: {} as any,
    poc: {} as any,
    quantity: 20,
    unitPrice: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockStockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      getByPocAndProductId: jest.fn(),
      getByPocId: jest.fn(),
      save: jest.fn(),
      updateQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    };

    useCase = new DecreaseStockUseCase(mockStockRepository);
  });

  it("when stock does not exist should throw error", async () => {
    mockStockRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute({ stockId: 1, quantity: 5 }))
      .rejects.toThrow("Stock not found");
  });

  it("when decrease fails should throw error", async () => {
    mockStockRepository.getById.mockResolvedValue(mockStock);
    mockStockRepository.decreaseQuantity.mockResolvedValue(false);

    await expect(useCase.execute({ stockId: 1, quantity: 5 }))
      .rejects.toThrow("Failed to decrease stock quantity");
  });

  it("when stock exists and decrease succeeds should return success message", async () => {
    mockStockRepository.getById.mockResolvedValue(mockStock);
    mockStockRepository.decreaseQuantity.mockResolvedValue(true);

    const result = await useCase.execute({ stockId: 1, quantity: 5 });

    expect(result).toEqual({
      success: true,
      message: "Stock quantity decreased successfully",
    });
  });
});
