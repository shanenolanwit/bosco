/**
 * Allow for safe, deep access of object keys.
 *
 * For example:
 * Performing a.b.c[0].d on {} will yield undefined instead of an error
 *
 * @param {Array} path
 * @param {object} obj
 */
module.exports = (path, obj) => path.reduce((xs, x) => ((xs && xs[x]) ? xs[x] : null), obj);
