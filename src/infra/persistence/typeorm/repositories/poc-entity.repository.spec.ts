
import { PocEntity } from "../models/poc.entity";
import { Repository } from "typeorm";
import { typeOrmConnection } from "../typeorm-connection";
import { IPoc } from "@application/DTOs/poc";
import { PocEntityRepository } from "./poc-entity.repository";
import { EPocCategory } from "@domain/models/EPocCategory";

jest.mock("../typeorm-connection", () => ({
  typeOrmConnection: {
    getRepository: jest.fn(),
  },
}));

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
} as unknown as Repository<PocEntity>;

const mockPoc: IPoc = {
  id: 1,
  name: "Poc Test",
  description: "Description",
  category: EPocCategory.BAR,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("PocEntityRepository", () => {
  let repository: PocEntityRepository;

  beforeEach(() => {
    (typeOrmConnection.getRepository as jest.Mock).mockReturnValue(mockRepository);
    repository = new PocEntityRepository();
    jest.clearAllMocks();
  });

  it("when getAll is called should return all POCs", async () => {
    mockRepository.find = jest.fn().mockResolvedValue([mockPoc]);
    const result = await repository.getAll();
    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual([mockPoc]);
  });

  it("when getById is called with valid ID should return the matching POC", async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(mockPoc);
    const result = await repository.getById(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockPoc);
  });

  it("when getById is called with invalid ID should return null", async () => {
    mockRepository.findOne = jest.fn().mockResolvedValue(null);
    const result = await repository.getById(999);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    expect(result).toBeNull();
  });

  it("when save is called should persist and return the saved POC", async () => {
    mockRepository.save = jest.fn().mockResolvedValue(mockPoc);
    const result = await repository.save(mockPoc);
    expect(mockRepository.save).toHaveBeenCalledWith(mockPoc);
    expect(result).toEqual(mockPoc);
  });
});
