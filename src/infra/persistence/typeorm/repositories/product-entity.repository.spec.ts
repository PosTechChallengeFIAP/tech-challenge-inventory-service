
import { typeOrmConnection } from "../typeorm-connection";
import { Repository } from "typeorm";
import { ProductEntity } from "../models/product.entity";
import { IProduct } from "@application/DTOs/product";
import { EProductCategory } from "@domain/models/EProductCategory";
import { ProductEntityRepository } from "./product-entity.repository";

jest.mock("../typeorm-connection", () => ({
  typeOrmConnection: {
    getRepository: jest.fn(),
  },
}));

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
} as unknown as Repository<ProductEntity>;

const mockProduct: IProduct = {
  id: 1,
  name: "Product A",
  description: "Some description",
  category: EProductCategory.FOOD,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("ProductEntityRepository", () => {
  let repository: ProductEntityRepository;

  beforeEach(() => {
    (typeOrmConnection.getRepository as jest.Mock).mockReturnValue(mockRepository);
    repository = new ProductEntityRepository();
    jest.clearAllMocks();
  });

  it("when getAll is called should return all products", async () => {
    mockRepository.find = jest.fn().mockResolvedValue([mockProduct]);
    const result = await repository.getAll();
    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual([mockProduct]);
  });

  it("when getByCategory is called should return products in the category", async () => {
    mockRepository.find = jest.fn().mockResolvedValue([mockProduct]);
    const result = await repository.getByCategory(EProductCategory.FOOD);
    expect(mockRepository.find).toHaveBeenCalledWith({ where: { category: EProductCategory.FOOD } });
    expect(result).toEqual([mockProduct]);
  });

  it("when getById is called with valid ID should return the product", async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(mockProduct);
    const result = await repository.getById(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockProduct);
  });

  it("when getById is called with invalid ID should return null", async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(null);
    const result = await repository.getById(999);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    expect(result).toBeNull();
  });

  it("when save is called should persist and return the product", async () => {
    mockRepository.save = jest.fn().mockResolvedValue(mockProduct);
    const result = await repository.save(mockProduct);
    expect(mockRepository.save).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });
});
