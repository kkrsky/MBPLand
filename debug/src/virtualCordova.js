let id = "002";
let success = function(elm) {
  console.log("success: ", elm);
};
let failed = function(elm) {
  console.error("failed: ", elm);
};
let func = (elm1, elm2, elm3) => {
  function dammy() {}
  if (elm1 === undefined && elm2 === undefined && elm3 === undefined) {
    console.log("no callback");
  } else {
    console.log(elm1);
    console.log(elm2);
    console.log(elm3);
    /*
    if (elm2 === undefined) elm2 = dammy()
    if (elm3 === undefined) elm3 = dammy()
    elm1()
    elm2()
    elm3()
    */
  }
  /*
  console.log('elm1', elm1)
  console.log('elm2', elm2)
  console.log('elm3', elm3)
  */
};
//system
function check_id(id, success_func, failed_func) {
  let origin_id = "001";
  let pass_elm = "";
  if (origin_id === id) {
    pass_elm = "success!!!";
    success_func(pass_elm);
  } else {
    pass_elm = "failed!!!";
    failed_func(pass_elm);
  }
}

let callback = "callback";
let successCallback = "successCallback";
let errorCallback = "errorCallback";
let permission = "permission";
let permissions = "permissions";
let cold = "cold";
let state = "state";
let params = "params";
let idWrapper = "success";
let passItemWrapper = true;

let virtualCordova = {
  //npm run devで実行した時用の仮想cordova
  start() {
    //各種登録

    this.setWindow();
    this.startDeviceReady();
  },

  //各種設定
  nativeStorage: {
    setItem: function(key, obj, cal_success, cal_failed) {
      let id = "001";
      let check_id = (id, obj, success_func, failed_func) => {
        let origin_id = "001";
        let pass_elm = "";
        if (origin_id === id) {
          //success
          /////////////////////
          pass_elm = obj;
          /////////////////////
          success_func(pass_elm);
        } else {
          pass_elm = {
            code: 5,
            source: "JS",
            exception:
              "TypeError: Cannot read property 'output_true' of undefined        at getSuccess (file:android_asset…",
          };
          failed_func(pass_elm);
        }
      };
      check_id(id, obj, cal_success, cal_failed);
    },
    getItem: function(key, cal_success, cal_failed) {
      let id = "001";
      let check_id = (id, success_func, failed_func) => {
        let origin_id = "001";
        let pass_elm = "";
        if (origin_id === id) {
          //success
          /////////////////////
          pass_elm = { name: "NativeStorage", author: "GillesCallebaut" };
          /////////////////////
          success_func(pass_elm);
        } else {
          pass_elm = {
            code: 5,
            source: "JS",
            exception:
              "TypeError: Cannot read property 'output_true' of undefined        at getSuccess (file:android_asset…",
          };
          failed_func(pass_elm);
        }
      };
      check_id(id, cal_success, cal_failed);
    },
    keys: function(cal_success, cal_failed) {
      let id = "001";
      let check_id = (id, success_func, failed_func) => {
        let origin_id = "001";
        let pass_elm = "";
        if (origin_id === id) {
          //success
          /////////////////////
          pass_elm = ["reference"];
          /////////////////////
          success_func(pass_elm);
        } else {
          pass_elm = {
            code: 5,
            source: "JS",
            exception:
              "TypeError: Cannot read property 'output_true' of undefined        at getSuccess (file:android_asset…",
          };
          failed_func(pass_elm);
        }
      };
      check_id(id, cal_success, cal_failed);
    },
    remove: function(key, cal_success, cal_failed) {
      let id = "001";
      let check_id = (id, success_func, failed_func) => {
        let origin_id = "001";
        let pass_elm = "";
        if (origin_id === id) {
          //success
          /////////////////////
          pass_elm = "OK";
          /////////////////////
          success_func(pass_elm);
        } else {
          pass_elm = {
            code: 5,
            source: "JS",
            exception:
              "TypeError: Cannot read property 'output_true' of undefined        at getSuccess (file:android_asset…",
          };
          failed_func(pass_elm);
        }
      };
      check_id(id, cal_success, cal_failed);
    },
    clear: function(key, cal_success, cal_failed) {
      let id = "001";
      let check_id = (id, success_func, failed_func) => {
        let origin_id = "001";
        let pass_elm = "";
        if (origin_id === id) {
          //success
          /////////////////////
          pass_elm = "OK";
          /////////////////////
          success_func(pass_elm);
        } else {
          pass_elm = {
            code: 5,
            source: "JS",
            exception:
              "TypeError: Cannot read property 'output_true' of undefined        at getSuccess (file:android_asset…",
          };
          failed_func(pass_elm);
        }
      };
      check_id(id, cal_success, cal_failed);
    },
  },
  device_obj: {
    browser: {
      available: true,
      platform: "browser",
      version: "80.0.3987.149",
      uuid: null,
      cordova: "5.0.4",
      model: "Chrome",
      manufacturer: "unknown",
      isVirtual: false,
      serial: "unknown",
    },
    android: {
      available: true,
      platform: "Android",
      version: "9",
      uuid: "7d6543609027a117",
      cordova: "8.1.0",
      model: "A5_Pro",
      manufacturer: "UMIDIGI",
      isVirtual: false,
      serial: "unknown",
    },
  },
  diagnostic: {
    permission: {
      READ_CALENDAR: "READ_CALENDAR",
      WRITE_CALENDAR: "WRITE_CALENDAR",
      CAMERA: "CAMERA",
      READ_CONTACTS: "READ_CONTACTS",
      WRITE_CONTACTS: "WRITE_CONTACTS",
      GET_ACCOUNTS: "GET_ACCOUNTS",
      ACCESS_FINE_LOCATION: "ACCESS_FINE_LOCATION",
      ACCESS_COARSE_LOCATION: "ACCESS_COARSE_LOCATION",
      RECORD_AUDIO: "RECORD_AUDIO",
      READ_PHONE_STATE: "READ_PHONE_STATE",
      CALL_PHONE: "CALL_PHONE",
      ADD_VOICEMAIL: "ADD_VOICEMAIL",
      USE_SIP: "USE_SIP",
      PROCESS_OUTGOING_CALLS: "PROCESS_OUTGOING_CALLS",
      READ_CALL_LOG: "READ_CALL_LOG",
      WRITE_CALL_LOG: "WRITE_CALL_LOG",
      SEND_SMS: "SEND_SMS",
      RECEIVE_SMS: "RECEIVE_SMS",
      READ_SMS: "READ_SMS",
      RECEIVE_WAP_PUSH: "RECEIVE_WAP_PUSH",
      RECEIVE_MMS: "RECEIVE_MMS",
      WRITE_EXTERNAL_STORAGE: "WRITE_EXTERNAL_STORAGE",
      READ_EXTERNAL_STORAGE: "READ_EXTERNAL_STORAGE",
      BODY_SENSORS: "BODY_SENSORS",
    },
    runtimePermission: {
      READ_CALENDAR: "READ_CALENDAR",
      WRITE_CALENDAR: "WRITE_CALENDAR",
      CAMERA: "CAMERA",
      READ_CONTACTS: "READ_CONTACTS",
      WRITE_CONTACTS: "WRITE_CONTACTS",
      GET_ACCOUNTS: "GET_ACCOUNTS",
      ACCESS_FINE_LOCATION: "ACCESS_FINE_LOCATION",
      ACCESS_COARSE_LOCATION: "ACCESS_COARSE_LOCATION",
      RECORD_AUDIO: "RECORD_AUDIO",
      READ_PHONE_STATE: "READ_PHONE_STATE",
      CALL_PHONE: "CALL_PHONE",
      ADD_VOICEMAIL: "ADD_VOICEMAIL",
      USE_SIP: "USE_SIP",
      PROCESS_OUTGOING_CALLS: "PROCESS_OUTGOING_CALLS",
      READ_CALL_LOG: "READ_CALL_LOG",
      WRITE_CALL_LOG: "WRITE_CALL_LOG",
      SEND_SMS: "SEND_SMS",
      RECEIVE_SMS: "RECEIVE_SMS",
      READ_SMS: "READ_SMS",
      RECEIVE_WAP_PUSH: "RECEIVE_WAP_PUSH",
      RECEIVE_MMS: "RECEIVE_MMS",
      WRITE_EXTERNAL_STORAGE: "WRITE_EXTERNAL_STORAGE",
      READ_EXTERNAL_STORAGE: "READ_EXTERNAL_STORAGE",
      BODY_SENSORS: "BODY_SENSORS",
    },
    permissionGroups: {
      CALENDAR: ["READ_CALENDAR", "WRITE_CALENDAR"],
      CAMERA: ["CAMERA"],
      CONTACTS: ["READ_CONTACTS", "WRITE_CONTACTS", "GET_ACCOUNTS"],
      LOCATION: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
      MICROPHONE: ["RECORD_AUDIO"],
      PHONE: [
        "READ_PHONE_STATE",
        "CALL_PHONE",
        "ADD_VOICEMAIL",
        "USE_SIP",
        "PROCESS_OUTGOING_CALLS",
        "READ_CALL_LOG",
        "WRITE_CALL_LOG",
      ],
      SENSORS: ["BODY_SENSORS"],
      SMS: [
        "SEND_SMS",
        "RECEIVE_SMS",
        "READ_SMS",
        "RECEIVE_WAP_PUSH",
        "RECEIVE_MMS",
      ],
      STORAGE: ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"],
    },
    runtimePermissionGroups: {
      CALENDAR: ["READ_CALENDAR", "WRITE_CALENDAR"],
      CAMERA: ["CAMERA"],
      CONTACTS: ["READ_CONTACTS", "WRITE_CONTACTS", "GET_ACCOUNTS"],
      LOCATION: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
      MICROPHONE: ["RECORD_AUDIO"],
      PHONE: [
        "READ_PHONE_STATE",
        "CALL_PHONE",
        "ADD_VOICEMAIL",
        "USE_SIP",
        "PROCESS_OUTGOING_CALLS",
        "READ_CALL_LOG",
        "WRITE_CALL_LOG",
      ],
      SENSORS: ["BODY_SENSORS"],
      SMS: [
        "SEND_SMS",
        "RECEIVE_SMS",
        "READ_SMS",
        "RECEIVE_WAP_PUSH",
        "RECEIVE_MMS",
      ],
      STORAGE: ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"],
    },
    permissionStatus: {
      GRANTED: "GRANTED",
      DENIED_ONCE: "DENIED_ONCE",
      NOT_REQUESTED: "NOT_REQUESTED",
      DENIED_ALWAYS: "DENIED_ALWAYS",
      runtimePermissionStatus: {
        GRANTED: "GRANTED",
        DENIED_ONCE: "DENIED_ONCE",
        NOT_REQUESTED: "NOT_REQUESTED",
        DENIED_ALWAYS: "DENIED_ALWAYS",
      },
    },
    cpuArchitecture: {
      UNKNOWN: "unknown",
      ARMv6: "ARMv6",
      ARMv7: "ARMv7",
      ARMv8: "ARMv8",
      X86: "X86",
      X86_64: "X86_64",
      MIPS: "MIPS",
      MIPS_64: "MIPS_64",
    },

    _onPermissionRequestComplete: function() {},
    _onNFCStateChange: function() {
      console.log(c.cyan + "[diag start]");
    },

    _ensureBoolean: function(callback) {
      console.log(c.cyan + "[diag start]");
    },

    enableDebug: function(successCallback) {
      console.log(c.cyan + "[diag start]");
    },

    switchToSettings: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getPermissionAuthorizationStatus: function(
      successCallback,
      errorCallback,
      permission
    ) {
      console.log(c.cyan + "[diag start]");
    },

    getPermissionsAuthorizationStatus: function(
      successCallback,
      errorCallback,
      permissions
    ) {
      console.log(c.cyan + "[diag start]");
    },

    requestRuntimePermission: function(
      successCallback,
      errorCallback,
      permission
    ) {
      console.log(c.cyan + "[diag start]");
    },

    requestRuntimePermissions: function(
      successCallback,
      errorCallback,
      permissions
    ) {
      console.log(c.cyan + "[diag start]");
    },

    isRequestingPermission: function() {
      console.log(c.cyan + "[diag start]");
    },

    registerPermissionRequestCompleteHandler: function(successCallback) {
      console.log(c.cyan + "[diag start]");
    },

    switchToWirelessSettings: function() {
      console.log(c.cyan + "[diag start]");
    },

    switchToMobileDataSettings: function() {
      console.log(c.cyan + "[diag start]");
    },

    isADBModeEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isDeviceRooted: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    restart: function(errorCallback, cold) {
      console.log(c.cyan + "[diag start]");
    },

    getArchitecture: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isDataRoamingEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isLocationAvailable: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isLocationEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isGpsLocationAvailable: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isGpsLocationEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isNetworkLocationAvailable: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isNetworkLocationEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getLocationMode: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "high_accuracy"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    switchToLocationSettings: function() {
      console.log(c.cyan + "[diag start]");
    },

    requestLocationAuthorization: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getLocationAuthorizationStatus: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "NOT_REQUESTED"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isLocationAuthorized: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    registerLocationStateChangeHandler: function(successCallback) {
      console.log(c.cyan + "[diag start]");
    },

    isWifiEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isWifiAvailable: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    switchToWifiSettings: function() {
      console.log(c.cyan + "[diag start]");
    },

    setWifiState: function(successCallback, errorCallback, state) {
      console.log(c.cyan + "[diag start]");
    },

    isCameraAvailable: function(params) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper
        ? params.successCallback(passItem)
        : params.errorCallback(passItem);
    },

    isCameraPresent: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    requestCameraAuthorization: function(params) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper
        ? params.successCallback(passItem)
        : params.errorCallback(passItem);
    },

    getCameraAuthorizationStatus: function(params) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper
        ? params.successCallback(passItem)
        : params.errorCallback(passItem);
    },
    getCameraRollAuthorizationStatus: function(params) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper
        ? params.successCallback(passItem)
        : params.errorCallback(passItem);
    },
    isCameraAuthorized: function(params) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper
        ? params.successCallback(passItem)
        : params.errorCallback(passItem);
    },

    requestExternalStorageAuthorization: function(
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[diag start]");
    },

    getExternalStorageAuthorizationStatus: function(
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isExternalStorageAuthorized: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getExternalSdCardDetails: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isBluetoothAvailable: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isBluetoothEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    setBluetoothState: function(successCallback, errorCallback, state) {
      console.log(c.cyan + "[diag start]");
    },

    getBluetoothState: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    registerBluetoothStateChangeHandler: function(successCallback) {
      console.log(c.cyan + "[diag start]");
    },

    hasBluetoothSupport: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    hasBluetoothLESupport: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    hasBluetoothLEPeripheralSupport: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    switchToBluetoothSettings: function() {
      console.log(c.cyan + "[diag start]");
    },

    isRemoteNotificationsEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isMicrophoneAuthorized: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getMicrophoneAuthorizationStatus: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    requestMicrophoneAuthorization: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isContactsAuthorized: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getContactsAuthorizationStatus: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    requestContactsAuthorization: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isCalendarAuthorized: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getCalendarAuthorizationStatus: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; // passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    requestCalendarAuthorization: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    ///↓追加↓///
    getRemindersAuthorizationStatus: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getBackgroundRefreshStatus: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },
    getRemoteNotificationsAuthorizationStatus: function(
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    getExternalStorageAuthorizationStatus: function(
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = "TO_UPPER_CASE"; //passItemWrapper
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    ///↑追加↑///
    isNFCPresent: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isNFCEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    isNFCAvailable: function(successCallback, errorCallback) {
      console.log(c.cyan + "[diag start]", "");
      //////////////////////////
      let id = idWrapper;
      let passItem = passItemWrapper;
      //////////////////////////
      id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
    },

    registerNFCStateChangeHandler: function(successCallback) {
      console.log(c.cyan + "[diag start]");
    },

    switchToNFCSettings: function() {
      console.log(c.cyan + "[diag start]");
    },

    locationMode: {
      HIGH_ACCURACY: "high_accuracy",
      DEVICE_ONLY: "device_only",
      BATTERY_SAVING: "battery_saving",
      LOCATION_OFF: "location_off",
    },
    locationAuthorizationMode: {},
    location: {
      locationMode: {
        HIGH_ACCURACY: "high_accuracy",
        DEVICE_ONLY: "device_only",
        BATTERY_SAVING: "battery_saving",
        LOCATION_OFF: "location_off",
      },
      locationAuthorizationMode: {},
      _onLocationStateChange: function() {
        console.log(c.cyan + "[diag start]");
      },

      isLocationAvailable: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isLocationEnabled: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isGpsLocationAvailable: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isGpsLocationEnabled: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isNetworkLocationAvailable: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isNetworkLocationEnabled: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      getLocationMode: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = "high_accuracy"; //passItemWrapper
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      switchToLocationSettings: function() {
        console.log(c.cyan + "[diag start]");
      },

      requestLocationAuthorization: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      getLocationAuthorizationStatus: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isLocationAuthorized: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      registerLocationStateChangeHandler: function(successCallback) {
        console.log(c.cyan + "[diag start]");
      },
    },
    bluetoothState: {
      UNKNOWN: "unknown",
      POWERED_OFF: "powered_off",
      POWERED_ON: "powered_on",
      POWERING_OFF: "powering_off",
      POWERING_ON: "powering_on",
    },
    bluetooth: {
      bluetoothState: {
        UNKNOWN: "unknown",
        POWERED_OFF: "powered_off",
        POWERED_ON: "powered_on",
        POWERING_OFF: "powering_off",
        POWERING_ON: "powering_on",
      },
      _onBluetoothStateChange: function() {
        console.log(c.cyan + "[diag start]");
      },

      isBluetoothAvailable: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isBluetoothEnabled: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      setBluetoothState: function(successCallback, errorCallback, state) {
        console.log(c.cyan + "[diag start]");
      },

      getBluetoothState: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = "TO_UPPER_CASE"; //passItemWrapper
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      registerBluetoothStateChangeHandler: function(successCallback) {
        console.log(c.cyan + "[diag start]");
      },

      hasBluetoothSupport: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      hasBluetoothLESupport: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      hasBluetoothLEPeripheralSupport: function(
        successCallback,
        errorCallback
      ) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      switchToBluetoothSettings: function() {
        console.log(c.cyan + "[diag start]");
      },
    },
    wifi: {
      isWifiEnabled: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isWifiAvailable: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      switchToWifiSettings: function() {
        console.log(c.cyan + "[diag start]");
      },

      setWifiState: function(successCallback, errorCallback, state) {
        console.log(c.cyan + "[diag start]");
      },
    },
    camera: {
      isCameraAvailable: function(params) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper
          ? params.successCallback(passItem)
          : params.errorCallback(passItem);
      },

      isCameraPresent: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      requestCameraAuthorization: function(params) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper
          ? params.successCallback(passItem)
          : params.errorCallback(passItem);
      },

      getCameraAuthorizationStatus: function(params) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = "TO_UPPER_CASE"; //passItemWrapper
        //////////////////////////
        id === idWrapper
          ? params.successCallback(passItem)
          : params.errorCallback(passItem);
      },

      isCameraAuthorized: function(params) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper
          ? params.successCallback(passItem)
          : params.errorCallback(passItem);
      },
    },
    notifications: {
      isRemoteNotificationsEnabled: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },
    },
    microphone: {
      isMicrophoneAuthorized: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      getMicrophoneAuthorizationStatus: function(
        successCallback,
        errorCallback
      ) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = "TO_UPPER_CASE"; // passItemWrapper
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      requestMicrophoneAuthorization: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },
    },
    contacts: {
      isContactsAuthorized: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      getContactsAuthorizationStatus: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = "TO_UPPER_CASE"; // passItemWrapper
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      requestContactsAuthorization: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },
    },
    calendar: {
      isCalendarAuthorized: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      getCalendarAuthorizationStatus: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = "TO_UPPER_CASE"; //passItemWrapper
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      requestCalendarAuthorization: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },
    },
    NFCState: {
      UNKNOWN: "unknown",
      POWERED_OFF: "powered_off",
      POWERING_ON: "powering_on",
      POWERED_ON: "powered_on",
      POWERING_OFF: "powering_off",
    },
    nfc: {
      NFCState: {
        UNKNOWN: "unknown",
        POWERED_OFF: "powered_off",
        POWERING_ON: "powering_on",
        POWERED_ON: "powered_on",
        POWERING_OFF: "powering_off",
      },
      _onNFCStateChange: function() {
        console.log(c.cyan + "[diag start]");
      },

      isNFCPresent: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isNFCEnabled: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isNFCAvailable: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      registerNFCStateChangeHandler: function(successCallback) {
        console.log(c.cyan + "[diag start]");
      },

      switchToNFCSettings: function() {
        console.log(c.cyan + "[diag start]");
      },
    },
    external_storage: {
      requestExternalStorageAuthorization: function(
        successCallback,
        errorCallback
      ) {
        console.log(c.cyan + "[diag start]");
      },

      getExternalStorageAuthorizationStatus: function(
        successCallback,
        errorCallback
      ) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = "TO_UPPER_CASE"; //passItemWrapper
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      isExternalStorageAuthorized: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },

      getExternalSdCardDetails: function(successCallback, errorCallback) {
        console.log(c.cyan + "[diag start]", "");
        //////////////////////////
        let id = idWrapper;
        let passItem = passItemWrapper;
        //////////////////////////
        id === idWrapper ? successCallback(passItem) : errorCallback(passItem);
      },
    },
  },
  ble: {
    idWrapper: "success",
    passItemWrapper: "pass",
    elm1: "elm1",
    elm2: "elm2",
    elm3: "elm3",
    elm4: "elm4",
    elm5: "elm5",
    scan: function(elm1, elm2, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "scan");

      let device = {
        opal: {
          name: "opal_system2",
          id: "88:A9:B7:A9:0E:77",
          advertising: {
            [[Int8Array]]: {
              buffer: "arrayBuffer_test",
              byteLength: 62,
              byteOffset: 0,
              length: 62,
              0: 2,
              1: 1,
              2: 26,
              3: 2,
              4: 10,
              5: 8,
              6: 11,
              7: -1,
              8: 76,
              9: 0,
              10: 16,
              11: 6,
              12: 51,
              13: 26,
              14: -36,
              15: -32,
              16: -120,
              17: -91,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0,
              23: 0,
              24: 0,
              25: 0,
              26: 0,
              27: 0,
              28: 0,
              29: 0,
              30: 0,
              31: 0,
              32: 0,
              33: 0,
              34: 0,
              35: 0,
              36: 0,
              37: 0,
              38: 0,
              39: 0,
              40: 0,
              41: 0,
              42: 0,
              43: 0,
              44: 0,
              45: 0,
              46: 0,
              47: 0,
              48: 0,
              49: 0,
              50: 0,
              51: 0,
              52: 0,
              53: 0,
              54: 0,
              55: 0,
              56: 0,
              57: 0,
              58: 0,
              59: 0,
              60: 0,
              61: 0,
              Symbol: undefined,
            },
            [[Uint8Array]]: {
              buffer: "arrayBuffer_test",
              byteLength: 62,
              byteOffset: 0,
              length: 62,
              0: 2,
              1: 1,
              2: 26,
              3: 2,
              4: 10,
              5: 8,
              6: 11,
              7: 255,
              8: 76,
              9: 0,
              10: 16,
              11: 6,
              12: 51,
              13: 26,
              14: 220,
              15: 224,
              16: 136,
              17: 165,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0,
              23: 0,
              24: 0,
              25: 0,
              26: 0,
              27: 0,
              28: 0,
              29: 0,
              30: 0,
              31: 0,
              32: 0,
              33: 0,
              34: 0,
              35: 0,
              36: 0,
              37: 0,
              38: 0,
              39: 0,
              40: 0,
              41: 0,
              42: 0,
              43: 0,
              44: 0,
              45: 0,
              46: 0,
              47: 0,
              48: 0,
              49: 0,
              50: 0,
              51: 0,
              52: 0,
              53: 0,
              54: 0,
              55: 0,
              56: 0,
              57: 0,
              58: 0,
              59: 0,
              60: 0,
              61: 0,
              Symbol: undefined,
            },
            [[Int16Array]]: {
              buffer: "arrayBuffer_test",
              byteLength: 62,
              byteOffset: 0,
              length: 31,
              0: 258,
              1: 538,
              2: 2058,
              3: -245,
              4: 76,
              5: 1552,
              6: 6707,
              7: -7972,
              8: -23160,
              9: 0,
              10: 0,
              11: 0,
              12: 0,
              13: 0,
              14: 0,
              15: 0,
              16: 0,
              17: 0,
              18: 0,
              19: 0,
              20: 0,
              21: 0,
              22: 0,
              23: 0,
              24: 0,
              25: 0,
              26: 0,
              27: 0,
              28: 0,
              29: 0,
              30: 0,
              Symbol: undefined,
            },
            byteLength: 62,
          },
          rssi: -47,
        },
        mifit: {
          name: "Mi Smart Band 4",
          id: "C7:A0:F9:9E:CA:AF",
          advertising: {
            [[Int8Array]]: [
              2,
              1,
              6,
              27,
              -1,
              87,
              1,
              2,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              3,
              -57,
              -96,
              -7,
              -98,
              -54,
              -81,
              16,
              9,
              77,
              105,
              32,
              83,
              109,
              97,
              114,
              116,
              32,
              66,
              97,
              110,
              100,
              32,
              52,
              3,
              2,
              -32,
              -2,
              7,
              22,
              -32,
              -2,
              120,
              5,
              0,
              0,
              0,
              0,
            ],
            [[Uint8Array]]: [
              2,
              1,
              6,
              27,
              255,
              87,
              1,
              2,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              255,
              3,
              199,
              160,
              249,
              158,
              202,
              175,
              16,
              9,
              77,
              105,
              32,
              83,
              109,
              97,
              114,
              116,
              32,
              66,
              97,
              110,
              100,
              32,
              52,
              3,
              2,
              224,
              254,
              7,
              22,
              224,
              254,
              120,
              5,
              0,
              0,
              0,
              0,
            ],
            [[Int16Array]]: [
              258,
              6918,
              22527,
              513,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              -14589,
              -1632,
              -13666,
              4271,
              19721,
              8297,
              27987,
              29281,
              8308,
              24898,
              25710,
              13344,
              515,
              -288,
              5639,
              -288,
              1400,
              0,
              0,
            ],
            byteLength: 62,
          },
          rssi: -71,
        },
      };

      //////////////////////////
      let id = this.idWrapper;
      let passItem = device.opal; //this.passItemWrapper
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    startScan: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "startScan");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    stopScan: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "stopScan");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    startScanWithOptions: function(elm1, elm2, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "startScanWithOptions");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    connectedPeripheralsWithServices: function(
      elm1,
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[ble start]", "connectedPeripheralsWithServices");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    peripheralsWithIdentifiers: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "peripheralsWithIdentifiers");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    bondedDevices: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "bondedDevices");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    list: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "list");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    connect: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "connect");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    autoConnect: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "autoConnect");

      let dev = {
        succ: {
          opal6: {
            name: "opal_system6",
            id: "41:57:37:D6:2F:83",
            advertising: {
              [[Int8Array]]: {
                buffer: "arrayBuffer_test",
                byteLength: 62,
                byteOffset: 0,
                length: 62,
                0: 2,
                1: 1,
                2: 26,
                3: 2,
                4: 10,
                5: 8,
                6: 11,
                7: -1,
                8: 76,
                9: 0,
                10: 16,
                11: 6,
                12: 51,
                13: 26,
                14: -36,
                15: -32,
                16: -120,
                17: -91,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                Symbol: undefined,
              },
              [[Uint8Array]]: {
                buffer: "arrayBuffer_test",
                byteLength: 62,
                byteOffset: 0,
                length: 62,
                0: 2,
                1: 1,
                2: 26,
                3: 2,
                4: 10,
                5: 8,
                6: 11,
                7: 255,
                8: 76,
                9: 0,
                10: 16,
                11: 6,
                12: 51,
                13: 26,
                14: 220,
                15: 224,
                16: 136,
                17: 165,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                Symbol: undefined,
              },
              [[Int16Array]]: {
                buffer: "arrayBuffer_test",
                byteLength: 62,
                byteOffset: 0,
                length: 31,
                0: 258,
                1: 538,
                2: 2058,
                3: -245,
                4: 76,
                5: 1552,
                6: 6707,
                7: -7972,
                8: -23160,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                Symbol: undefined,
              },
              byteLength: 62,
            },
            rssi: -50,
            services: {
              0: "1800",
              1: "1801",
              2: "d0611e78-bbb4-4591-a5f8-487910ae4366",
              3: "9fa480e0-4967-4542-9390-d343dc5d04ae",
              4: "180f",
              5: "1805",
              6: "180a",
              7: "7905f431-b5ce-4e99-a40f-4b1e122d00d0",
              8: "89d3502b-0f36-433a-8ef4-c502ad55f8dc",
              9: "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
              length: 10,
            },

            characteristics: {
              0: {
                service: "1800",
                characteristic: "2a00",
                properties: ["Read"],
              },
              1: {
                service: "1800",
                characteristic: "2a01",
                properties: ["Read"],
              },
              2: {
                service: "1801",
                characteristic: "2a05",
                properties: ["Indicate"],
                descriptors: {
                  0: { uuid: "2902" },
                  length: 1,
                },
              },

              3: {
                service: "d0611e78-bbb4-4591-a5f8-487910ae4366",
                characteristic: "8667556c-9a37-4c91-84ed-54ee27d90049",
                properties: (3)[("Write", "Notify", "ExtendedProperties")],
                descriptors: {
                  0: { uuid: "2900" },
                  1: { uuid: "2902" },
                  length: 2,
                },
              },

              4: {
                service: "9fa480e0-4967-4542-9390-d343dc5d04ae",
                characteristic: "af0badb1-5b99-43cd-917a-a77bc549e3cc",
                properties: (3)[("Write", "Notify", "ExtendedProperties")],
                descriptors: {
                  0: { uuid: "2900" },
                  1: { uuid: "2902" },
                  length: 2,
                },
              },

              5: {
                service: "180f",
                characteristic: "2a19",
                properties: (2)[("Read", "Notify")],
                descriptors: {
                  0: { uuid: "2902" },
                  length: 1,
                },
              },
              6: {
                service: "1805",
                characteristic: "2a2b",
                properties: (2)[("Read", "Notify")],
                descriptors: {
                  0: { uuid: "2902" },
                  length: 1,
                },
              },
              7: {
                service: "1805",
                characteristic: "2a0f",
                properties: ["Read"],
              },
              8: {
                service: "180a",
                characteristic: "2a29",
                properties: ["Read"],
              },
              9: {
                service: "180a",
                characteristic: "2a24",
                properties: ["Read"],
              },
              10: {
                service: "7905f431-b5ce-4e99-a40f-4b1e122d00d0",
                characteristic: "69d1d8f3-45e1-49a8-9821-9bbdfdaad9d9",
                properties: (2)[("Write", "ExtendedProperties")],
                descriptors: {
                  0: { uuid: "2900" },
                  length: 1,
                },
              },
              11: {
                service: "7905f431-b5ce-4e99-a40f-4b1e122d00d0",
                characteristic: "9fbf120d-6301-42d9-8c58-25e699a21dbd",
                properties: ["Notify"],
                descriptors: {
                  0: { uuid: "2902" },
                  length: 1,
                },
              },

              12: {
                service: "7905f431-b5ce-4e99-a40f-4b1e122d00d0",
                characteristic: "22eac6e9-24d6-4bb5-be44-b36ace7c7bfb",
                properties: ["Notify"],
                descriptors: {
                  0: { uuid: "2902" },
                  length: 1,
                },
              },

              13: {
                service: "89d3502b-0f36-433a-8ef4-c502ad55f8dc",
                characteristic: "9b3c81d8-57b1-4a8a-b8df-0e56f7ca51c2",
                properties: (3)[("Write", "Notify", "ExtendedProperties")],
                descriptors: {
                  0: { uuid: "2900" },
                  1: { uuid: "2902" },
                  length: 2,
                },
              },

              14: {
                service: "89d3502b-0f36-433a-8ef4-c502ad55f8dc",
                characteristic: "2f7cabce-808d-411f-9a0c-bb92ba96c102",
                properties: (3)[("Write", "Notify", "ExtendedProperties")],
                descriptors: {
                  0: { uuid: "2900" },
                  1: { uuid: "2902" },
                  length: 2,
                },
              },

              15: {
                service: "89d3502b-0f36-433a-8ef4-c502ad55f8dc",
                characteristic: "c6b2f38c-23ab-46d8-a6ab-a3a870bbd5d7",
                properties: (3)[("Read", "Write", "ExtendedProperties")],
                descriptors: {
                  0: { uuid: "2900" },
                  length: 1,
                },
              },

              16: {
                service: "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
                characteristic: "beb5483e-36e1-4688-b7f5-ea07361b26a8",
                properties: {
                  0: "Read",
                  1: "Write",
                  2: "Notify",
                  3: "Indicate",
                  4: "ExtendedProperties",
                  length: 5,
                },
              },

              descriptors: {
                0: { uuid: "2900" },
                1: { uuid: "2902" },
                length: 2,
              },

              length: 17,
            },
          },
        },
      };

      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success"
        ? successCallback(dev.succ.opal6)
        : errorCallback(passItem);
    },
    disconnect: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "disconnect");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback("OK") : errorCallback(passItem);
    },
    queueCleanup: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "queueCleanup");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    requestMtu: function(elm1, elm2, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "requestMtu");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    refreshDeviceCache: function(elm1, elm2, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "refreshDeviceCache");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    read: function(elm1, elm2, elm3, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "read");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    readRSSI: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "readRSSI");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    write: function(elm1, elm2, elm3, eml4, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "write");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    writeWithoutResponse: function(
      elm1,
      elm2,
      elm3,
      eml4,
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[ble start]", "writeWithoutResponse");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    writeCommand: function(
      elm1,
      elm2,
      elm3,
      eml4,
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[ble start]", "writeCommand");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    notify: function(elm1, elm2, elm3, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "notify");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    startNotification: function(
      elm1,
      elm2,
      elm3,
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[ble start]", "startNotification");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    stopNotification: function(
      elm1,
      elm2,
      elm3,
      successCallback,
      errorCallback
    ) {
      console.log(c.cyan + "[ble start]", "stopNotification");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    isConnected: function(elm1, successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "isConnected");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    isEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "isEnabled");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    isLocationEnabled: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "isLocationEnabled");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    enable: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "enable");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    showBluetoothSettings: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "showBluetoothSettings");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    startStateNotifications: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "startStateNotifications");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    stopStateNotifications: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "stopStateNotifications");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
    withPromises: function(successCallback, errorCallback) {
      console.log(c.cyan + "[ble start]", "withPromises");
      //////////////////////////
      let id = this.idWrapper;
      let passItem = this.passItemWrapper;
      //////////////////////////
      id === "success" ? successCallback(passItem) : errorCallback(passItem);
    },
  },
  //各種登録
  startDeviceReady() {
    /**
     *
     * 仮想 deviceready
     *
     */
    console.log("-----------------------");
    console.log("virtual deviceready");
    console.log("-----------------------");

    setTimeout(() => {
      // イベントを作る
      const e = document.createEvent("Event");
      // deviceready イベントを初期化する
      e.initEvent("deviceready", true, false);
      // イベントを発火させる
      document.dispatchEvent(e);
    }, 50);
    /**
     *
     * 仮想 deviceready
     *
     */
  },

  setWindow() {
    window.c = {
      black: "\u001b[30m",
      red: "\u001b[31m",
      green: "\u001b[32m",
      yellow: "\u001b[33m",
      blue: "\u001b[34m",
      magenta: "\u001b[35m",
      cyan: "\u001b[36m",
      white: "\u001b[37m",
      reset: "\u001b[0m",
    };
    // window.NativeStorage = this.nativeStorage;
    window.device = this.device_obj.android;
    // window.ble = this.ble;
    window.cordova = {
      plugins: {
        diagnostic: this.diagnostic,
      },
    };
  },
};

export default virtualCordova;
