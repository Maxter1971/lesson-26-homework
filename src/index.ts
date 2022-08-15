import { getUserOrderStates } from "./1";
import { getOrderState } from "./2";

import { omit } from "./3";

import { filterOnlyInitialAndInWorkOrder } from "./4";

console.log(getUserOrderStates(["initial", "inWork", "buyingSupplies"]));
console.log(
  getOrderState({
    state: "buyingSupplies",
    sum: 5,
    workerId: 12,
    suppliesSum: 100,
  })
);

console.log(
  omit(
    {
      state: "buyingSupplies",
      sum: 5,
      workerId: 12,
      suppliesSum: 100,
    },
    "state"
  )
);

console.log(
  filterOnlyInitialAndInWorkOrder({
    state: "inWork",
    sum: 5,
    workerId: 6,
  })
);
