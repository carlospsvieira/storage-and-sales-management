const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productsModel = require("../../../src/models/products.model");

describe("Testing produccts inside Models", () => {
  let executeStub;

  beforeEach(() => {
    executeStub = sinon.stub(connection, "execute");
  });

  afterEach(() => {
    executeStub.restore();
  });

  describe("findAllProducts", () => {
    it("should return all products", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];
      executeStub.resolves([mockProducts]);

      const result = await productsModel.findAllProducts();

      expect(result).to.deep.equal(mockProducts);
      expect(executeStub.calledOnceWith("SELECT * FROM StoreManager.products"))
        .to.be.true;
    });
  });

  describe("findProductsById", () => {
    it("should return a product by id", async () => {
      const mockProduct = { id: 1, name: "Martelo de Thor" };
      executeStub.resolves([[mockProduct]]);

      const result = await productsModel.findProductsById(1);

      expect(result).to.deep.equal(mockProduct);
      expect(
        executeStub.calledOnceWith(
          "SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC",
          [1]
        )
      ).to.be.true;
    });

    it("should return undefined if product is not found", async () => {
      executeStub.resolves([[]]);

      const result = await productsModel.findProductsById(1);

      expect(result).to.be.undefined;
      expect(
        executeStub.calledOnceWith(
          "SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC",
          [1]
        )
      ).to.be.true;
    });
  });
});
