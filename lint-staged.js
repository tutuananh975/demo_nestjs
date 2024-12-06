module.exports = {
    '*.{ts}': ['eslint --max-warnings=0', () => 'tsc-files --noEmit'],
    '*.{ts,json}': ['prettier --write'],
};
