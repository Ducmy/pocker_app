const fillterMessage = (receivedMeg, messgeFilterred) => {
  let res = receivedMeg.filter(receive => {
    return receive.message === messgeFilterred;
  });
  return res;
};

const fillterParas = (receivedMeg, messgeFilterred) => {
  let res = receivedMeg.filter(receive => {
    return receive.params[0] === messgeFilterred;
  });
  return res;
};

export { fillterMessage, fillterParas };
