import { drugsNames } from "./config";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    const { herbal_tea, magic_pill, fervex, dafalgan } = drugsNames;
    for (var i = 0; i < this.drugs.length; i++) {
      const currentDrug = this.drugs[i];
      const { name, benefit, expiresIn } = this.drugs[i];
      if (
        name !== herbal_tea &&
        name !== fervex &&
        name !== magic_pill &&
        benefit > 0
      ) {
        currentDrug.benefit -= 1;
        if (name === dafalgan) {
          currentDrug.benefit -= 1;
        }
      } else if (benefit < 50) {
        //Special case for Magic pill
        if (name !== magic_pill) {
          currentDrug.benefit += 1;
        }
        //Special case for Fervex and expiring at certain date
        if (name === fervex && expiresIn < 6 && benefit < 49) {
          //When it's 49 it's a special case because 50 is the maximum
          if (benefit === 49) {
            currentDrug.benefit += 1;
          } else {
            currentDrug.benefit += 2;
          }
        } else if (name === fervex && expiresIn < 11 && benefit < 50) {
          currentDrug.benefit += 1;
        }
      }
      //**** Expires handling ****
      //Any case we decrease by one the expiration
      if (name !== magic_pill) {
        currentDrug.expiresIn -= 1;
      }
      //End of expiration (we need to access it because we change it)
      if (this.drugs[i].expiresIn < 0) {
        if (name === herbal_tea && this.drugs[i].benefit < 50) {
          currentDrug.benefit += 1;
        } else if (
          name !== magic_pill &&
          name !== fervex &&
          currentDrug.benefit > 0
        ) {
          currentDrug.benefit -= 1;
          //Special case for Dafalgan to decresease twice (4 times when there is expiring date)
          if (name === dafalgan) {
            currentDrug.benefit -= 1;
          }
        } else {
          currentDrug.benefit = 0;
        }
      }
    }

    return this.drugs;
  }
}
