
import { typeOrmConnection } from "../typeorm-connection";
import { Repository } from "typeorm";
import { StockEntity } from "../models/stock.entity";
import { IStock } from "@application/DTOs/stock";
import { StockEntityRepository } from "./stock-entity.repository";
import { EPocCategory } from "@domain/models/EPocCategory";
import { EProductCategory } from "@domain/models/EProductCategory";

jest.mock("../typeorm-connection", () => ({
  typeOrmConnection: {
    getRepository: jest.fn(),
  },
}));

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
} as unknown as Repository<StockEntity>;

const mockStock: IStock = {
  id: 1,
  poc: { id: 1, name: "PDV", description: "Test", category: EPocCategory.CAFE, createdAt: new Date(), updatedAt: new Date() },
  product: { id: 1, name: "Product", description: "Test", category: EProductCategory.DRINK, createdAt: new Date(), updatedAt: new Date() },
  quantity: 10,
  unitPrice: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("StockEntityRepository", () => {
  let repository: StockEntityRepository;

  beforeEach(() => {
    (typeOrmConnection.getRepository as jest.Mock).mockReturnValue(mockRepository);
    repository = new StockEntityRepository();
    jest.clearAllMocks();
  });

  it("when getAll is called should return all stocks", async () => {
    mockRepository.find = jest.fn().mockResolvedValue([mockStock]);
    const result = await repository.getAll();
    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual([mockStock]);
  });

  it("when getById is called with valid ID should return the stock", async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(mockStock);
    const result = await repository.getById(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockStock);
  });

  it("when getById is called with invalid ID should return null", async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(null);
    const result = await repository.getById(999);
    expect(result).toBeNull();
  });

  it("when getByPocAndProductId is called should return stock matching pocId and productId", async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(mockStock);
    const result = await repository.getByPocAndProductId(1, 1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: {
        product: { id: 1 },
        poc: { id: 1 },
      },
    });
    expect(result).toEqual(mockStock);
  });

  it("when getByPocId is called should return all stocks for the given pocId", async () => {
    mockRepository.find = jest.fn().mockResolvedValue([mockStock]);
    const result = await repository.getByPocId(1);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: {
        poc: { id: 1 },
      },
    });
    expect(result).toEqual([mockStock]);
  });

  it("when save is called should persist and return the stock", async () => {
    mockRepository.save = jest.fn().mockResolvedValue(mockStock);
    const result = await repository.save(mockStock);
    expect(mockRepository.save).toHaveBeenCalledWith(mockStock);
    expect(result).toEqual(mockStock);
  });

  it("when updateQuantity is called should update and return the stock", async () => {
    mockRepository.save = jest.fn().mockResolvedValue(mockStock);
    const result = await repository.updateQuantity(1, 20);
    expect(mockRepository.save).toHaveBeenCalledWith({ id: 1, quantity: 20 });
    expect(result).toEqual(mockStock);
  });
});
