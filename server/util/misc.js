function hash(value) {
  let hash;
  for (let i = 0; i < value.length; i++) {
    hash = Math.imul(31, hash) + value.charCodeAt(i) | 0;
  }
  return Math.abs(hash).toString(36);
}


try {
  global.hash = hash;
} catch (e) {}
