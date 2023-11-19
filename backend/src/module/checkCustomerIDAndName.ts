export const checkCustomerIDAndName = (
  arrays: string[][],
  clientId: string,
  clientName1: string
) => {
  const condition = (row: string[]) => {
    return clientId === row[0] && clientName1 === row[1];
  };

  return arrays.some(condition);
};
