
export function splitLabelData(data = [], labelKey='', dataKey='') {
  return data.reduce(
    (acc, item) => {
      let label = item[labelKey];
      let _data = item[dataKey];
      acc.labels.push(label);
      acc.data.push(_data);
      return acc;
    },
    {
      labels: [],
      data: [],
    }
  );
}
