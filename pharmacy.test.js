import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 2)]);
  });
  it("Herbal Tea should actually increases in benefit the older it gets.", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 4)]);
  });
  it("Herbal tea should increases benefit twice as fast after the expiration date.", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", -1, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -2, 5)]);
  });
  it("The Benefit of an item is never more than 50.", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 50)]);
  });
  it("Magic Pill never expires nor decreases in Benefit.", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 20, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 20, 30)]);
  });
  it("Fervex increases in Benefit as its expiration date approaches.", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 20, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 19, 31)]);
  });
  it("Fervex benefit increases by 2 when there are 10 days or less", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 9, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 8, 32)]);
  });
  it("Fervex benefit increases by 3 when there are 5 days or less", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 4, 33)]);
  });
  it("Fervex drops benefit at 0 after expiring date", () => {
    expect(
      new Pharmacy([new Drug("Fervex", -1, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -2, 0)]);
  });
  it("Dafalgan decreseases twice as fast in benefit as normal drug", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 10, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 9, 28)]);
  });
  it("Dafalgan decreseases twice as fast in benefit as normal drug", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", -1, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", -2, 26)]);
  });
});
