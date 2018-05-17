'use strict';
import BOX_CONSTANTS from '../config/box-constants';
import VerifyRequiredValues from '../util/verify-required-values';
import NormalizeObjectKeys from '../util/normalize-object-keys';
import Manager from './manager';

const BASE_PATH = '/users';
const MODEL_VALUES = {}

export default class Users extends Manager {
  constructor(client) {
    super(client, MODEL_VALUES);
  }
  // added function to get user id from options
  _getUserId(options) {
    let id = super._getId(options);
    if (options.userId || options.user_id) {
      id = options.userId || options.user_id;
      (options.userId) ? delete options.userId : delete options.user_id;
    } else if (options.user && options.user.id) {
      id = options.user.id;
    }
    super._testForMissingId(id);
    return id;
  }
  
  getCurrentUser(options) {
    options = options || {};
    let apiPath = `${BASE_PATH}/me`;
    options.method = BOX_CONSTANTS.HTTP_VERBS.GET;
    return this.client.makeRequest(apiPath, options);
  }
//updated function with user id
  getGroupMemberships(options) {
    options = options || {};
    let userId = this._getUserId(options);
    let offset = options.offset || "0";
    let limit = options.limit || "100";
    let apiPath = `${BASE_PATH}/${userId}/memberships?limit=${limit}&offset=${offset}`;
    options.method = BOX_CONSTANTS.HTTP_VERBS.GET;
    return this.client.makeRequest(apiPath, options);
  }

  getEnterpriseUsers(options)
  {
    options = options || {};
    let apiPath = `${BASE_PATH}`;
    options.method = BOX_CONSTANTS.HTTP_VERBS.GET;
    return this.client.makeRequest(apiPath, options);
  }
}