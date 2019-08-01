export const cops = (state) => {
  let cops = {};
  state.files.forEach((f, file_idx) => {
    f.offenses.forEach((o, offense_idx) => {
      if (!(o.cop_name in cops)) cops[o.cop_name] = [];
      cops[o.cop_name].push({file: file_idx, offense: offense_idx});
    });
  });
  return cops;
};

export const files = (state) => state.files.map((f) => f.path);