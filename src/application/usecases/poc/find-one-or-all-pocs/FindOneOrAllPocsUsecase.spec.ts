import { FindOneOrAllPocsUsecase } from "./FindOneOrAllPocsUsecase";
import { IPocRepository } from "@domain/repositories/IPocRepository";
import { EPocCategory } from "@domain/models/EPocCategory";
import { IPoc } from "@application/DTOs/poc";

describe("FindOneOrAllPocsUsecase", () => {
  let usecase: FindOneOrAllPocsUsecase;
  let mockPocRepository: jest.Mocked<IPocRepository>;

  const mockPoc: IPoc = {
    id: 1,
    name: "PDV Teste",
    description: "Descrição",
    category: EPocCategory.BAR,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockPocRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      save: jest.fn(),
    };

    usecase = new FindOneOrAllPocsUsecase(mockPocRepository);
  });

  it("when id is provided should return one poc", async () => {
    mockPocRepository.getById.mockResolvedValue(mockPoc);

    const result = await usecase.execute({ id: 1 });

    expect(mockPocRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toBe(mockPoc);
  });

  it("when id is not provided should return all pocs", async () => {
    mockPocRepository.getAll.mockResolvedValue([mockPoc]);

    const result = await usecase.execute({});

    expect(mockPocRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([mockPoc]);
  });
});
