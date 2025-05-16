import { IStock } from "@application/DTOs/stock";
import { UpdateStockUseCase } from "@application/usecases/stock/update-stock/UpdateStockUseCase";
import { EPocCategory } from "@domain/models/EPocCategory";
import { EProductCategory } from "@domain/models/EProductCategory";
import { IStockRepository } from "@domain/repositories/IStockRepository";

describe("UpdateStockUseCase", () => {
  const mockStock: IStock = {
    id: 1,
    poc: {
      id: 1,
      name: "Test Poc",
      category: EPocCategory.BAR,
      description: "Test description",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z")
    },
    product: {
      id: 1,
      name: "Test Product",
      category: EProductCategory.FOOD,
      description: "Test product description",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z")
    },
    quantity: 10,
    unitPrice: 100,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z")
  };

  const stockRepository: jest.Mocked<IStockRepository> = {
    getById: jest.fn(),
    update: jest.fn(),
    getAll: jest.fn(),
    getByPocAndProductId: jest.fn(),
    getByPocId: jest.fn(),
    save: jest.fn(),
    decreaseQuantity: jest.fn(),
    updateQuantity: jest.fn()
  };

  const useCase = new UpdateStockUseCase(stockRepository);

  it("when stock does not exist should throw an error", async () => {
    stockRepository.getById.mockResolvedValue(null);

    await expect(
      useCase.execute({ stockId: 1, quantity: 5, unitPrice: 50 })
    ).rejects.toThrow("Stock not found");
  });

  it("when both quantity and unitPrice are provided should update both fields", async () => {
    stockRepository.getById.mockResolvedValue({ ...mockStock });
    stockRepository.update.mockImplementation(async (stock: any) => stock);

    const result = await useCase.execute({
      stockId: 1,
      quantity: 20,
      unitPrice: 150
    });

    expect(result.quantity).toBe(20);
    expect(result.unitPrice).toBe(150);
    expect(stockRepository.update).toHaveBeenCalledWith(result);
  });

  it("when only quantity is provided should update only quantity", async () => {
    stockRepository.getById.mockResolvedValue({ ...mockStock });
    stockRepository.update.mockImplementation(async (stock: any) => stock);

    const result = await useCase.execute({
      stockId: 1,
      quantity: 50
    });

    expect(result.quantity).toBe(50);
    expect(result.unitPrice).toBe(mockStock.unitPrice);
    expect(stockRepository.update).toHaveBeenCalledWith(result);
  });

  it("when only unitPrice is provided should update only unitPrice", async () => {
    stockRepository.getById.mockResolvedValue({ ...mockStock });
    stockRepository.update.mockImplementation(async (stock: any) => stock);

    const result = await useCase.execute({
      stockId: 1,
      unitPrice: 200
    });

    expect(result.quantity).toBe(mockStock.quantity);
    expect(result.unitPrice).toBe(200);
    expect(stockRepository.update).toHaveBeenCalledWith(result);
  });

  it("when neither quantity nor unitPrice is provided should keep original values", async () => {
    stockRepository.getById.mockResolvedValue({ ...mockStock });
    stockRepository.update.mockImplementation(async (stock: any) => stock);

    const result = await useCase.execute({
      stockId: 1
    });

    expect(result.quantity).toBe(mockStock.quantity);
    expect(result.unitPrice).toBe(mockStock.unitPrice);
    expect(stockRepository.update).toHaveBeenCalledWith(result);
  });
});
