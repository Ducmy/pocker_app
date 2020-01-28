const TableDetails = receivedMeg => {
  let res = receivedMeg.filter(receive => {
    return receive.message === "playerDealer";
  });
  return res;
};

const FilterPlayerDealerID = receivedMeg => {
  let res = receivedMeg.filter(receive => {
    return receive.message === "playerDealer";
  });
  return res;
};

const FilterSeatPlayerByUser = receivedMeg => {
  let res = receivedMeg
    .filter(receive => {
      return receive.message === "seatPlayer";
    })
    .filter(user => {
      return user.params[1] === "devtest1";
    });
  return res[0];
};

export { FilterPlayerDealerID, FilterSeatPlayerByUser };
