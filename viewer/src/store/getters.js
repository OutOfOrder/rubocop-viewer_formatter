// region by issue
export const indexByIssue = (state) => {
  const issues = {};
  state.files.forEach((f, fileIdx) => {
    f.offenses.forEach((o, offenseIdx) => {
      if (!(o.cop_name in issues)) {
        const category = o.cop_name.split('/')[0];
        issues[o.cop_name] = { key: o.cop_name, category: category, label: o.cop_name, offenses: [] };
      }
      issues[o.cop_name].offenses.push({ file: fileIdx, offense: offenseIdx });
    });
  });
  return issues;
};

export const issuesByCategory = (state, getters) => {
  const categories = {};
  for (const issue in getters.indexByIssue) {
    const o = getters.indexByIssue[issue];
    if (!(o.category in categories)) {
      categories[o.category] = [];
    }
    categories[o.category].push(o.key);
  }
  return categories;
};

export const categories = (state, getters) => {
  return Object.keys(getters.issuesByCategory)
    .map((a) => ({ key: a, label: a }))
    .sort((a, b) => a.label > b.label);
};

export const issues = (state, getters) => {
  const issues = [];
  for (const issue in getters.indexByIssue) {
    const o = getters.indexByIssue[issue];
    issues.push({ key: o.key, label: o.label });
  }
  return issues.sort((a, b) => a.label > b.label);
};

export const issueById = (state, getters) => (issueId) => {
  const issue = getters.indexByIssue[issueId];
  if (issue) {
    return { cop: issue.label };
  } else {
    return {};
  }
};

export const offensesByIssue = (state, getters) => (issueId) => {
  const issue = getters.indexByIssue[issueId];
  if (issue) {
    return issue.offenses.map((o) => {
      const file = state.files[o.file];
      return { path: file.path, ...file.offenses[o.offense] };
    });
  } else {
    return [];
  }
};
// endregion

// region by file
export const indexByFile = (state) => {
  const files = {};
  state.files.forEach((f, fileIdx) => {
    const key = fileIdx.toString();
    files[key] = { key: key, label: f.path, offenses: [] };
    f.offenses.forEach((o, offenseIdx) => {
      files[key].offenses.push({ file: fileIdx, offense: offenseIdx });
    });
  });
  return files;
};

export const files = (state, getters) => {
  return Object.values(getters.indexByFile)
    .map((a) => ({ key: a.key, label: a.label }))
    .sort((a, b) => a.label > b.label);
};

export const fileById = (state, getters) => (fileId) => {
  const file = getters.indexByFile[fileId];
  if (file) {
    return { path: file.label };
  } else {
    return {};
  }
};

export const offensesByFile = (state, getters) => (fileId) => {
  const file = getters.indexByFile[fileId];
  if (file) {
    return file.offenses.map((o) => state.files[o.file].offenses[o.offense]);
  } else {
    return [];
  }
};
// endregion
