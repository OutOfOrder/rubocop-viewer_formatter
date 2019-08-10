//region by issue
export const indexByIssue = (state) => {
  let issues = {};
  state.files.forEach((f, file_idx) => {
    f.offenses.forEach((o, offense_idx) => {
      if (!(o.cop_name in issues)) issues[o.cop_name] = {key: o.cop_name, label: o.cop_name, offenses: []};
      issues[o.cop_name].offenses.push({file: file_idx, offense: offense_idx});
    });
  });
  return issues;
};

export const issues = (state, getters) => {
  return Object.values(getters.indexByIssue)
      .map((a) => ({key: a.key, label: a.label}))
      .sort((a, b) => a.label > b.label);
};

export const issueById = (state, getters) => (issue_id) => {
  const issue = getters.indexByIssue[issue_id];
  if (issue) {
    return {cop: issue.label};
  } else {
    return {};
  }
};

export const offensesByIssue = (state, getters) => (issue_id) => {
  const issue = getters.indexByIssue[issue_id];
  if (issue) {
    return issue.offenses.map((o) => {
      const file = state.files[o.file];
      return {path: file.path, ...file.offenses[o.offense]};
    });
  } else {
    return [];
  }
};
//endregion

//region by file
export const indexByFile = (state) => {
  let files = {};
  state.files.forEach((f, file_idx) => {
    const key = file_idx.toString();
    files[key] = {key: key, label: f.path, offenses: []};
    f.offenses.forEach((o, offense_idx) => {
      files[key].offenses.push({file: file_idx, offense: offense_idx});
    });
  });
  return files;
};

export const files = (state, getters) => {
  return Object.values(getters.indexByFile)
      .map((a) => ({key: a.key, label: a.label}))
      .sort((a, b) => a.label > b.label);
};

export const fileById = (state, getters) => (file_id) => {
  const file = getters.indexByFile[file_id];
  if (file) {
    return {path: file.label};
  } else {
    return {};
  }
};

export const offensesByFile = (state, getters) => (file_id) => {
  const file = getters.indexByFile[file_id];
  if (file) {
    return file.offenses.map((o) => state.files[o.file].offenses[o.offense]);
  } else {
    return [];
  }
};
//endregion