function expectWithDebug(value, assertionsFn, label = "Value") {
    try {
        assertionsFn(value);
    } catch (err) {
        console.error(`❌ Test failed. ${label}:`);
        console.dir(value, { depth: null });
        throw err;
    }
}

module.exports = { expectWithDebug };