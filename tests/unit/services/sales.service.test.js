const {expect} = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const salesModel = require("../../../src/models/sales.models");
const salesService = require("../../../src/services/sales.services");

describe("Test in Sales Service", () => {
  it("return all sales", async () => {
    const expectedResult = [
      { id: 1, date: "2023-01-01" },
      { id: 2, date: "2023-01-02" },
    ];
    const findAllSalesStub = sinon
      .stub(salesModel, "findAllSales")
      .resolves(expectedResult);

    const result = await salesService.findAllSales();

    expect(result).to.deep.equal(expectedResult);
    expect(findAllSalesStub).to.have.been.calledOnce;

    findAllSalesStub.restore();
  });

  it("return empty array if there are no sales", async () => {
    const expectedResult = [];
    const findAllSalesStub = sinon
      .stub(salesModel, "findAllSales")
      .resolves(expectedResult);

    const result = await salesService.findAllSales();

    expect(result).to.deep.equal(expectedResult);
    expect(findAllSalesStub).to.have.been.calledOnce;

    findAllSalesStub.restore();
  });
});

it("return a sale by id", async () => {
  const expectedResult = {
    id: 1,
    date: "2023-01-01",
    items: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ],
  };
  const findSalesByIdStub = sinon
    .stub(salesModel, "findSalesById")
    .resolves(expectedResult);

  const result = await salesService.findSalesById(1);

  expect(result).to.deep.equal(expectedResult);
  expect(findSalesByIdStub).to.have.been.calledOnceWith(1);

  findSalesByIdStub.restore();
});
