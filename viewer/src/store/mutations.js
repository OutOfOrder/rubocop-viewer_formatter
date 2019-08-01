export const LOAD_JSON = (state, data) => {
  state.summary = data.summary;
  state.metadata = data.metadata;
  state.files = data.files.filter((f) => f.offenses.length > 0);
};