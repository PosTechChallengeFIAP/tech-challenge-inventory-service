
import { Repository } from "typeorm";
import { StockEntityRepository } from "./stock-entity.repository";
import { StockEntity } from "../models/stock.entity";
import { typeOrmConnection } from "../typeorm-connection";

jest.mock("../typeorm-connection", () => ({
  typeOrmConnection: {
    getRepository: jest.fn(),
  },
}));

describe("StockEntityRepository", () => {
  let repository: jest.Mocked<Repository<StockEntity>>;
  let stockRepository: StockEntityRepository;

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      manager: {
        connection: {
          createQueryRunner: jest.fn(),
        },
      },
    } as any;

    (typeOrmConnection.getRepository as jest.Mock).mockReturnValue(repository);
    stockRepository = new StockEntityRepository();
  });

  it("when getAll is called should return all stocks", async () => {
    const mockStocks = [{ id: 1 }, { id: 2 }] as StockEntity[];
    repository.find.mockResolvedValue(mockStocks);

    const result = await stockRepository.getAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockStocks);
  });

  it("when getById is called with existing id should return stock", async () => {
    const mockStock = { id: 1 } as StockEntity;
    repository.findOne.mockResolvedValue(mockStock);

    const result = await stockRepository.getById(1);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ["product", "poc"] });
    expect(result).toEqual(mockStock);
  });

  it("when getByPocAndProductId is called with valid IDs should return stock", async () => {
    const mockStock = { id: 1 } as StockEntity;
    repository.findOne.mockResolvedValue(mockStock);

    const result = await stockRepository.getByPocAndProductId(1, 2);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: {
        product: { id: 2 },
        poc: { id: 1 },
      },
      relations: ["product", "poc"],
    });
    expect(result).toEqual(mockStock);
  });

  it("when getByPocId is called should return matching stocks", async () => {
    const mockStocks = [{ id: 1 }] as StockEntity[];
    repository.find.mockResolvedValue(mockStocks);

    const result = await stockRepository.getByPocId(3);

    expect(repository.find).toHaveBeenCalledWith({ where: { poc: { id: 3 } }, relations: ["product", "poc"] });
    expect(result).toEqual(mockStocks);
  });

  it("when save is called should persist stock", async () => {
    const stock = { id: 1 } as StockEntity;
    repository.save.mockResolvedValue(stock);

    const result = await stockRepository.save(stock);

    expect(repository.save).toHaveBeenCalledWith(stock);
    expect(result).toEqual(stock);
  });

  it("when update is called should update stock", async () => {
    const stock = { id: 1 } as StockEntity;
    repository.save.mockResolvedValue(stock);

    const result = await stockRepository.update(stock);

    expect(repository.save).toHaveBeenCalledWith(stock);
    expect(result).toEqual(stock);
  });

  it("when updateQuantity is called with valid id should update and return updated stock", async () => {
    const stock = { id: 1, quantity: 10 } as StockEntity;
    jest.spyOn(stockRepository, "getById").mockResolvedValue(stock);
    jest.spyOn(stockRepository, "save").mockResolvedValue({ ...stock, quantity: 5 });

    const result = await stockRepository.updateQuantity(1, 5);

    expect(result?.quantity).toBe(5);
  });

  it("when updateQuantity is called with invalid id should return null", async () => {
    jest.spyOn(stockRepository, "getById").mockResolvedValue(null);

    const result = await stockRepository.updateQuantity(999, 5);

    expect(result).toBeNull();
  });

  describe("decreaseQuantity", () => {
    let mockQueryRunner: any;
  
    beforeEach(() => {
      mockQueryRunner = {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager: {
          findOne: jest.fn(),
          save: jest.fn(),
        },
      };
  
      repository.manager.connection.createQueryRunner = jest.fn().mockReturnValue(mockQueryRunner);
    });
  
    it("when decreaseQuantity is called with valid stock should decrease quantity and commit", async () => {
      const stock = { id: 1, quantity: 10 };
  
      mockQueryRunner.manager.findOne.mockResolvedValue(stock);
      mockQueryRunner.manager.save.mockResolvedValue({ ...stock, quantity: 7 });
  
      const result = await stockRepository.decreaseQuantity(1, 3);
  
      expect(mockQueryRunner.connect).toHaveBeenCalled();
      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.manager.findOne).toHaveBeenCalledWith(StockEntity, {
        where: { id: 1 },
        lock: { mode: 'pessimistic_write' },
      });
      expect(mockQueryRunner.manager.save).toHaveBeenCalledWith({ id: 1, quantity: 7 });
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  
    it("when stock is not found should rollback and return false", async () => {
      mockQueryRunner.manager.findOne.mockResolvedValue(null);
  
      const result = await stockRepository.decreaseQuantity(999, 3);
  
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  
    it("when stock quantity is less than requested should rollback and return false", async () => {
      const stock = { id: 1, quantity: 2 };
      mockQueryRunner.manager.findOne.mockResolvedValue(stock);
  
      const result = await stockRepository.decreaseQuantity(1, 5);
  
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  
    it("when error is thrown should rollback and rethrow", async () => {
      mockQueryRunner.manager.findOne.mockRejectedValue(new Error("DB error"));
  
      await expect(stockRepository.decreaseQuantity(1, 1)).rejects.toThrow("DB error");
  
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });  
});
