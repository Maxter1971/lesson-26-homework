import {
  getUserOrderStates,
  getOrderState,
  omit,
  filterOnlyInitialAndInWorkOrder,
} from "./task";

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
