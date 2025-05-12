import { UpdateStockUseCase } from "./UpdateStockUseCase";
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { IStock } from "@application/DTOs/stock";
import { EProductCategory } from "@domain/models/EProductCategory";
import { EPocCategory } from "@domain/models/EPocCategory";
import { IProduct } from "@application/DTOs/product";
import { IPoc } from "@application/DTOs/poc";

describe("UpdateStockUseCase", () => {
  let stockRepository: jest.Mocked<IStockRepository>;
  let updateStockUseCase: UpdateStockUseCase;

  beforeEach(() => {
    stockRepository = {
      getById: jest.fn(),
      update: jest.fn(),
    } as any;

    updateStockUseCase = new UpdateStockUseCase(stockRepository);
  });

  it("when stock exists should update quantity and unitPrice", async () => {
    const existingStock: IStock = {
      id: 1,
      quantity: 10,
      unitPrice: 5,
      product: { id: 1, name: "Product", description: "", category: EProductCategory.FOOD } as IProduct,
      poc: { id: 1, name: "POC", description: "", category: EPocCategory.BAR } as IPoc,
    } as IStock;

    stockRepository.getById.mockResolvedValue(existingStock);
    stockRepository.update.mockResolvedValue({ ...existingStock, quantity: 20, unitPrice: 8 });

    const result = await updateStockUseCase.execute({
      stockId: 1,
      quantity: 20,
      unitPrice: 8,
    });

    expect(stockRepository.getById).toHaveBeenCalledWith(1);
    expect(stockRepository.update).toHaveBeenCalledWith({
      ...existingStock,
      quantity: 20,
      unitPrice: 8,
    });
    expect(result.quantity).toBe(20);
    expect(result.unitPrice).toBe(8);
  });

  it("when stock does not exist should throw error", async () => {
    stockRepository.getById.mockResolvedValue(null);

    await expect(
      updateStockUseCase.execute({
        stockId: 99,
        quantity: 5,
        unitPrice: 3,
      })
    ).rejects.toThrow("Stock not found");

    expect(stockRepository.getById).toHaveBeenCalledWith(99);
    expect(stockRepository.update).not.toHaveBeenCalled();
  });
});
