const fs = require('fs');

const filter = module.exports = {};

filter.file = function (filePath, filterObj, cb) {
    fs.stat(filePath, function (err, stats) {
        // lets just let it pass through in err state
        if (err) {
            cb(filePath, true);
            return;
        }

        var submitTime = stats.birthtime.getTime();

        if (typeof filterObj.submitTimeStart === 'string' && typeof filterObj.submitTimeEnd === 'string') {
            var submitTimeStart = new Date(filterObj.submitTimeStart).getTime();
            var submitTimeEnd = new Date(filterObj.submitTimeEnd).getTime();
            // if invalid start time
            if (isNaN(submitTimeStart)) {
                cb(filePath, false);
                return;
            }
            // if invalid end time
            if (isNaN(submitTimeEnd)) {
                cb(filePath, false);
                return;
            }
            if (submitTime >= submitTimeStart && submitTime <= submitTimeEnd) {
                cb(filePath, true);
                return;
            }
            cb(filePath, false);
            return;
        }

        if (typeof filterObj.submitTimeStart === 'string') {
            var submitTimeStart = new Date(filterObj.submitTimeStart).getTime();
            // if invalid start time
            if (isNaN(submitTimeStart)) {
                cb(filePath, false);
                return;
            }
            if (submitTime >= submitTimeStart) {
                cb(filePath, true);
                return;
            }
            cb(filePath, false);
            return;
        }

        if (typeof filterObj.submitTimeEnd === 'string') {
            var submitTimeEnd = new Date(filterObj.submitTimeEnd).getTime();
            // if invalid end time
            if (isNaN(submitTimeEnd)) {
                cb(filePath, false);
                return;
            }
            if (submitTime <= submitTimeEnd) {
                cb(filePath, true);
                return;
            }
            cb(filePath, false);
            return;
        }

        // No submission time filter, pass through
        cb(filePath, true);

    });
};

filter.user = function () {

};
