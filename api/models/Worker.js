/**
* Worker.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    dni: { 
      type: 'integer',
      maxLength: 8,
      required: true
    },
    birthday: { type: 'string'},
    address: { type: 'string'},
    department: { type: 'string'}
  }
};

