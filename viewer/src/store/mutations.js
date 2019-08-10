export const LOAD_JSON = (state, data) => {
  state.summary = data.summary;
  state.metadata = data.metadata;
  state.files = data.files.filter((f) => f.offenses.length > 0);
};

export const ADD_OFFENSE = (state, data) => {
  let file = state.files.find((e) => e.path === data.path);
  if (!file) {
    file = {
      offenses: [],
      path: data.path,
    };
    state.files.push(file);
  }

  file.offenses.push(data.offense);
};