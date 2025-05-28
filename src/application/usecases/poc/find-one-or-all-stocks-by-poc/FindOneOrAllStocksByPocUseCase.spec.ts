
import { IStockRepository } from "@domain/repositories/IStockRepository";
import { FindOneOrAllStocksByPocUseCase } from "./FindOneOrAllStocksByPocUseCase";

describe("FindOneOrAllStocksByPocUseCase", () => {
  const stockRepository: jest.Mocked<IStockRepository> = {
    getByPocAndStockId: jest.fn(),
    getByPocId: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    save: jest.fn(),
    updateQuantity: jest.fn(),
    decreaseQuantity: jest.fn(),
    update: jest.fn(),
  };

  const useCase = new FindOneOrAllStocksByPocUseCase(stockRepository);

  it("when productId is provided should call getByPocAndStockId and return result", async () => {
    const mockResult: any = { id: 1 };
    stockRepository.getByPocAndStockId.mockResolvedValue(mockResult);

    const result = await useCase.execute({ pocId: 1, productId: 1 });

    expect(stockRepository.getByPocAndStockId).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockResult);
  });

  it("when productId is not provided should call getByPocId and return result", async () => {
    const mockResult: any[] = [{ id: 1 }, { id: 1 }];
    stockRepository.getByPocId.mockResolvedValue(mockResult);

    const result = await useCase.execute({ pocId: 1 });

    expect(stockRepository.getByPocId).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResult);
  });
});
