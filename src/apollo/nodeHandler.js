function getNodeType(operationName) {
  switch (operationName) {
    case 'addFunds':
      return 'maker-seller';

    case 'withdrawFunds':
      return 'maker-buyer';

    default:
      return null;
  }
}

export default getNodeType;
