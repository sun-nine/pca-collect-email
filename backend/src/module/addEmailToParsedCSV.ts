export const addEmailToParsedCSV = (
  arrays: string[][],
  clientId: string,
  email: string
) => {
  return arrays.map((row, i) => {
    if (i === 0) {
      row[4] = "メールアドレス";
      return row;
    }

    // 顧客IDが一致する行
    if (row[0] === clientId) {
      row[4] = email;
      return row;
    }

    return row;
  });
};
