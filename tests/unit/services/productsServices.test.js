const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.model");
const { findAllProducts, findProductsById } = require("../../../src/services/products.services");

describe("Testing products inside services", () => {
  it("calls findAllProducts method of productsModel", async () => {
    const stub = sinon.stub(productsModel, "findAllProducts").resolves([]);
    await findAllProducts();
    expect(stub.calledOnce).to.be.true;
    stub.restore();
  });

  it("returns the result of findAllProducts method of productsModel", async () => {
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
    sinon.stub(productsModel, "findAllProducts").resolves(mockProducts);
    const result = await findAllProducts();
    expect(result).to.deep.equal(mockProducts);
    productsModel.findAllProducts.restore();
  });
});

it("calls findProductsById method of productsModel with the given productId", async () => {
  const productId = 1;
  const stub = sinon.stub(productsModel, "findProductsById").resolves({});
  await findProductsById(productId);
  expect(stub.calledOnceWith(productId)).to.be.true;
  stub.restore();
});

it("returns the result of findProductsById method of productsModel if product exists", async () => {
  const productId = 1;
  const mockProduct = {
    id: 1,
    name: "Martelo de Thor",
  };
  sinon.stub(productsModel, "findProductsById").resolves(mockProduct);
  const result = await findProductsById(productId);
  expect(result).to.deep.equal(mockProduct);
  productsModel.findProductsById.restore();
});

it("returns an error message if product does not exist", async () => {
  const productId = 1;
  sinon.stub(productsModel, "findProductsById").resolves(null);
  const result = await findProductsById(productId);
  expect(result).to.deep.equal({ error: { message: "Product not found" } });
  productsModel.findProductsById.restore();
});
