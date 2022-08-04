module.exports = {

    ifeq: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    ifeq2num: function (a, b, options) {
        if (a === parseInt(b)) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

    ifgt: function (a, b, options) {
        if (a.length > b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

    ifst: function (a, b, options) {
        if (a.length < b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

    ifgeqt: function (a, b, options) {
        if (a.length >= b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

    ifseqt: function (a, b, options) {
        if (a.length <= b) {
            return options.fn(this);
        }
        return options.inverse(this);
    }

};

