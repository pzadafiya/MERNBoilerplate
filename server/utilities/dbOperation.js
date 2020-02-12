"use strict";

// get data based on criteria from specific model.
const getData = (Models, criteria) =>
    new Promise((resolve, reject) => {
        Models.find(criteria)
            .then(client => {
                resolve(client)
            })
            .catch(err => reject(err));
    });

// save objdata to specific model.
const createData = (Models, objToSave) =>
    new Promise((resolve, reject) => {
        new Models(objToSave)
            .save()
            .then(client => resolve(client))
            .catch(err => {
                reject(err);
            });
    });

//update specific model based on criteria
const updateData = (Models, criteria, dataToSet, options = {}) =>
    new Promise((resolve, reject) => {
        options.lean = true;
        options.new = true;
        options.useFindAndModify;
        Models.findOneAndUpdate(criteria, dataToSet, options)
            .then(client => {
                resolve(client)
            })
            .catch(err => {
                reject(err)
            });
    });

//update specific model based on criteria
const updateDataWithoutFetchNew = (Models, criteria, dataToSet) =>
    new Promise((resolve, reject) => {
        Models.findOneAndUpdate(criteria, dataToSet)
            .then(client => {
                resolve(client)
            })
            .catch(err => {
                reject(err)
            });
    });
//delete data from specific mdoels based on criteria
const deleteData = (Models, criteria) =>
    new Promise((resolve, reject) => {
        Models.findOneAndRemove(criteria)
            .exec()
            .then(client => resolve(client))
            .catch(err => reject(err));
    });


module.exports = {
    getData: getData,
    createData: createData,
    updateData: updateData,
    deleteData: deleteData,
    updateDataWithoutFetchNew: updateDataWithoutFetchNew
};