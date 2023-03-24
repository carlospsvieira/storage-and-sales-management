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

  describe("createNewProduct", () => {
    it("inserts a new product into the database", async () => {
      const newProduct = { id: 1, name: "Martelo de Thor" };
      executeStub.resolves([[], []]);

      const result = await productsModel.createNewProduct(newProduct);

      expect(
        executeStub.calledOnceWith(
          "INSERT INTO StoreManager.products (id, name) VALUES (?, ?)",
          [newProduct.id, newProduct.name]
        )
      ).to.be.true;
      expect(result).to.deep.equal(newProduct);
    });

    it("throws an error if the database insert fails", async () => {
      const newProduct = { id: 1, name: "Martelo de Thor" };
      const errorMessage = "Database error";
      executeStub.rejects(new Error(errorMessage));

      try {
        await productsModel.createNewProduct(newProduct);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
    });
  });
});
