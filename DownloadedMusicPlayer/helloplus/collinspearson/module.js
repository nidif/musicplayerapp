var data = {};

exports.set = function(key, value){
    data[key] = JSON.stringify(value);
}

exports.get = function(key){
    return data[key];
};