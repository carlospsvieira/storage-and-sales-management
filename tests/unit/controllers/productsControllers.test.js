const { expect } = require("chai");
const sinon = require("sinon");
const productsService = require("../../../src/services/products.services");
const productsController = require("../../../src/controllers/products.controllers");

describe("products.controllers.js", () => {
  it("calls findAllProducts method of productsService and return a response with status 200 and the result", async () => {
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
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(mockProducts),
    };
    const next = sinon.stub();
    sinon.stub(productsService, "findAllProducts").resolves(mockProducts);
    await productsController.findAllProducts(req, res, next);
    expect(productsService.findAllProducts.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(mockProducts)).to.be.true;
    expect(next.notCalled).to.be.true;
    productsService.findAllProducts.restore();
  });

  it("calls next with the error if there is an error in productsService", async () => {
    const mockError = new Error("Error");
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    sinon.stub(productsService, "findAllProducts").rejects(mockError);
    await productsController.findAllProducts(req, res, next);
    expect(productsService.findAllProducts.calledOnce).to.be.true;
    expect(res.status.notCalled).to.be.true;
    expect(res.json.notCalled).to.be.true;
    expect(next.calledWith(mockError)).to.be.true;
    productsService.findAllProducts.restore();
  });
});

it("calls findProductsById method of productsService with the given id and return a response with status 200 and the result if product exists", async () => {
  const mockProduct = { id: 1, name: "Martelo de Thor" };
  const req = {
    params: { id: 1 },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub().returns(mockProduct),
  };
  sinon.stub(productsService, "findProductsById").resolves(mockProduct);
  await productsController.findProductsById(req, res);
  expect(productsService.findProductsById.calledOnceWith(req.params.id)).to.be
    .true;
  expect(res.status.calledWith(200)).to.be.true;
  expect(res.json.calledWith(mockProduct)).to.be.true;
  productsService.findProductsById.restore();
});

it("returns a response with status 404 and an error message if product does not exist", async () => {
  const req = {
    params: { id: 1 },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub().returns({ error: { message: "Product not found" } }),
  };
  sinon
    .stub(productsService, "findProductsById")
    .resolves({ error: { message: "Product not found" } });
  await productsController.findProductsById(req, res);
  expect(productsService.findProductsById.calledOnceWith(req.params.id)).to.be
    .true;
  expect(res.status.calledWith(404)).to.be.true;
  expect(res.json.calledWith({ error: { message: "Product not found" } })).to.be
    .true;
  productsService.findProductsById.restore();
});
