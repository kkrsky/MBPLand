//diagnosticとdeviceプラグインで状態をチェックする
let checkDeviceState = {
  isDiagnostic: false,
  isDevice: false,
  state: {
    location: {
      isLocationAvailable: false,
      isLocationEnabled: false,
      isLocationAuthorized: false,
      locationAuthorizationMode: "",
      locationAuthorizationStatus: "",
      registerLocationStateChangeHandler: false, //locationが使える場合はtrue(動的検知)

      //android
      android_locationMode: "",
      android_isGpsLocationAvailable: false,
      android_isGpsLocationEnabled: false,
      android_isNetworkLocationAvailable: false,
      android_isNetworkLocationEnabled: false,

      //ios
      ios_locationAccuracyAuthorization: "", //FULL or REDUCED
    },
  },
  device: { platform: "none" },
  logs: [],
  stateLogs: [],
  init() {
    //checkDeviceStateオブジェクトの初期化
    if (cordova.plugins.diagnostic) this.isDiagnostic = true;
    if (window.device) {
      this.isDevice = true;
      this.device = window.device;
      this.device.platform = this.device.platform.toLowerCase();
    }
  },
  checkState() {
    //※関数の引数で渡すとthisが使えなくなる
    this.init();
    this.location.init();
    console.log(this.state);
  },
  location: {
    init() {
      if (that.isDiagnostic && that.isDevice) {
        this.locationAuthorizationMode();
        this.isLocationAvailable();
        this.isLocationEnabled();
        this.isLocationAuthorized();
        this.getLocationAuthorizationStatus();
        this.registerLocationStateChangeHandler();
        //requestLocationAuthorization

        if (that.device.platform === "android") {
          //android
          this.getLocationMode_android();
          this.isGpsLocationAvailable_android();
          this.isGpsLocationEnabled_android();
          this.isNetworkLocationAvailable_android();
          this.isNetworkLocationEnabled_android();
          //switchToLocationSettings_android
        }
        if (that.device.platform === "ios") {
          //ios
          // this.locationAccuracyAuthorization_ios();
          this.getLocationAccuracyAuthorization_ios();
          this.registerLocationStateChangeHandler_ios();
          //requestTemporaryFullAccuracyAuthorization_ios
        }
      }
    },
    //android
    getLocationMode_android() {
      /**
       * 
       * Values
          HIGH_ACCURACY - GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
          BATTERY_SAVING - Network triangulation and Wifi network IDs (low accuracy)
          DEVICE_ONLY - GPS hardware (high accuracy)
          LOCATION_OFF - Location services disabled (no accuracy) 
       */
      let onSuccess = (locationMode) => {
        that.state.location.android_locationMode = locationMode;
        // switch (locationMode) {
        //   case cordova.plugins.diagnostic.locationMode.HIGH_ACCURACY:
        //     that.log("getLocationMode:", "High accuracy");
        //     break;
        //   case cordova.plugins.diagnostic.locationMode.BATTERY_SAVING:
        //     that.log("getLocationMode:", "Battery saving");
        //     break;
        //   case cordova.plugins.diagnostic.locationMode.DEVICE_ONLY:
        //     that.log("getLocationMode:", "Device only");
        //     break;
        //   case cordova.plugins.diagnostic.locationMode.LOCATION_OFF:
        //     that.log("getLocationMode:", "Location off");
        //     break;
        // }
      };
      cordova.plugins.diagnostic.getLocationMode(onSuccess, that.onFailed);
    },
    isGpsLocationAvailable_android() {
      /**
       * Checks if high-accuracy locations are available to the app from GPS hardware. Returns true if Location mode is enabled and is set to "Device only" or "High accuracy" AND if the app is authorised to use location.
       */

      let onSuccess = (available) => {
        // console.log(
        //   "GPS location is " + (available ? "available" : "not available")
        // );
        that.state.location.android_isGpsLocationAvailable = available;
      };
      cordova.plugins.diagnostic.isGpsLocationAvailable(
        onSuccess,
        that.onFailed
      );
    },
    isGpsLocationEnabled_android() {
      /**
       * 
       * Checks if the device location setting is set to return high-accuracy locations from GPS hardware. Returns true if Location mode is enabled and is set to either:

          Device only = GPS hardware only (high accuracy)

          High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
       */
      let onSuccess = (enabled) => {
        // console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
        that.state.location.android_isGpsLocationEnabled = enabled;
      };
      cordova.plugins.diagnostic.isGpsLocationEnabled(onSuccess, that.onFailed);
    },
    isNetworkLocationAvailable_android() {
      /**
       *
       * Checks if low-accuracy locations are available to the app from network triangulation/WiFi access points. Returns true if Location mode is enabled and is set to "Battery saving" or "High accuracy" AND if the app is authorised to use location.
       */

      let onSuccess = (available) => {
        // console.log(
        //   "Network location is " + (available ? "available" : "not available")
        // );
        that.state.location.android_isNetworkLocationAvailable = available;
      };
      cordova.plugins.diagnostic.isNetworkLocationAvailable(
        onSuccess,
        that.onFailed
      );
    },
    isNetworkLocationEnabled_android() {
      /**
       *
       *Checks if location mode is set to return low-accuracy locations from network triangulation/WiFi access points Returns true if Location mode is enabled and is set to either:

        Battery saving = network triangulation and Wifi network IDs (low accuracy)

        High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

        cordova.plugins.diagnostic.isNetworkLocationEnabled(successCallback, errorCallback);
       */

      let onSuccess = (enabled) => {
        // console.log(
        //   "Network location is " + (enabled ? "enabled" : "disabled")
        // );
        that.state.location.android_isNetworkLocationEnabled = enabled;
      };
      cordova.plugins.diagnostic.isNetworkLocationEnabled(
        onSuccess,
        that.onFailed
      );
    },
    switchToLocationSettings_android() {
      /**
       *
       *Note: On Android, you may want to consider using the Request Location Accuracy Plugin for Android to request the desired location accuracy without needing the user to manually do this on the Location Settings page.
       ※設定画面に飛ばすのではなくて、ダイアログでユーザーに許可を求めたい場合は下記のプラグインを導入すれば良い
       cordova-plugin-request-location-accuracy

       */

      let onSuccess = (available) => {};
      cordova.plugins.diagnostic.switchToLocationSettings();
    },

    //ios
    locationAccuracyAuthorization_ios() {
      /**
       * Values
        FULL - The user authorized the app to access location data with full accuracy.
        REDUCED - The user authorized the app to access location data with reduced accuracy (~1-20 km).
       */

      let onSuccess = (accuracy) => {
        // that.state.location.ios_locationAccuracyAuthorization = accuracy;
      };
      cordova.plugins.diagnostic.locationAccuracyAuthorization(
        onSuccess,
        that.onFailed
      );
    },
    getLocationAccuracyAuthorization_ios() {
      /**
       *
       *Returns the location accuracy authorization for the application on iOS 14+. Note: calling on iOS <14 will result in the errorCallback being invoked.
       * IOS14未満はエラーが呼ばれる
       */

      let onSuccess = (status) => {
        // switch (status) {
        //   case cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL:
        //     console.log("Full location accuracy is authorized");
        //     break;
        //   case cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED:
        //     console.log("Reduced location accuracy is authorized");
        //     break;
        // }
        that.state.location.ios_locationAccuracyAuthorization = status;
      };
      cordova.plugins.diagnostic.getLocationAccuracyAuthorization(
        onSuccess,
        that.onFailed
      );
    },
    requestTemporaryFullAccuracyAuthorization_ios() {
      /**
       *
       *Requests temporary access to full location accuracy for the application on iOS 14+.

        By default on iOS 14+, when a user grants location permission, the app can only receive reduced accuracy locations.

        If your app requires full (high-accuracy GPS) locations (e.g. a SatNav app), you need to call this method.

        You must specify a purpose corresponds to a key in the NSLocationTemporaryUsageDescriptionDictionary entry in your app's *-Info.plist containing a message explaining the user why your app needs their exact location. You'll need to add this entry using a <config-file> block in your config.xml, e.g.:

        【navigation】 This app requires access to your exact location in order to provide SatNav route navigation. 
        【emergency】 This app requires access to your exact location in order to report your location to emergency services.
        Should only be called on iOS 14+ - calling on iOS <14 will invoke the errorCallback.

        Should only be called if location authorization has been granted, otherwise errorCallback will be invoked.


        ※IOS14未満はエラーが呼ばれる、高精度な位置情報を利用する場合はこのメソッドを呼び、confix.xmlに使用する理由を記述
        利用目的はnavigationまたはemergencyから選択
       */

      let onSuccess = (accuracyAuthorization) => {
        switch (accuracyAuthorization) {
          case cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL:
            console.log("Full accuracy authorized");
            break;
          case cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED:
            console.log("Full accuracy denied");
            break;
        }
      };
      cordova.plugins.diagnostic.requestTemporaryFullAccuracyAuthorization(
        "navigation",
        onSuccess,
        that.onFailed
      );
    },
    registerLocationStateChangeHandler_ios() {
      /**
       *
       *Registers a function to be called when a change in location accuracy authorization occurs on iOS 14+.

        On iOS <14 this will not be called.

        This occurs when location accuracy authorization is changed.

        This can be triggered either by the user's response to a location accuracy authorization dialog,

        or by the user changing the location accuracy authorization specifically for your app in Settings.

        Pass in a falsey value to de-register the currently registered function.

        * IOS14未満は呼ばれない。
       */

      let onSuccess = (accuracyAuthorization) => {
        switch (accuracyAuthorization) {
          case cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL:
            console.log("Accuracy authorization changed to full");
            break;
          case cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED:
            console.log("Accuracy authorization changed to reduced");
            break;
        }
      };
      cordova.plugins.diagnostic.registerLocationStateChangeHandler(onSuccess);
    },

    //android & ios
    locationAuthorizationMode() {
      /**
       * Values
       * ALWAYS - Requires constant access to location in order to track position, even when the screen is off or the app is in the background.
       * WHEN_IN_USE - Requires access to location when the screen is on and the app is displayed.
       */

      let onSuccess = (status) => {
        that.state.location.locationAuthorizationMode = status;
      };
      cordova.plugins.diagnostic.requestLocationAuthorization(
        onSuccess,
        that.onFailed,
        cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS
      );
    },
    isLocationAvailable() {
      /**
       * 
       * On iOS and Windows 10 UWP this returns true if both the device setting is enabled AND the application is authorized to use location. When location is enabled, the locations returned are by a mixture GPS hardware, network triangulation and Wifi network IDs.
            
        On Android, this returns true if Location mode is enabled and any mode is selected (e.g. Battery saving, Device only, High accuracy) AND if the app is authorised to use location. When location is enabled, the locations returned are dependent on the location mode:
            
        Battery saving = network triangulation and Wifi network IDs (low accuracy)
        Device only = GPS hardware only (high accuracy)
        High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
       */
      let onSuccess = (available) => {
        // console.log(
        //   "Location is " + (available ? "available" : "not available")
        // );
        that.state.location.isLocationAvailable = available;
      };
      cordova.plugins.diagnostic.isLocationAvailable(onSuccess, that.onFailed);
    },
    isLocationEnabled() {
      let onSuccess = (enabled) => {
        // console.log(
        //   "Location setting is " + (enabled ? "enabled" : "disabled")
        // );
        that.state.location.isLocationEnabled = enabled;
      };
      cordova.plugins.diagnostic.isLocationEnabled(onSuccess, that.onFailed);
    },
    isLocationAuthorized() {
      /**
       *
       *Notes for Android:
            
        This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
       */

      let onSuccess = (authorized) => {
        // console.log(
        //   "Location is " + (authorized ? "authorized" : "unauthorized")
        // );
        that.state.location.isLocationAuthorized = authorized;
      };
      cordova.plugins.diagnostic.isLocationAuthorized(onSuccess, that.onFailed);
    },
    getLocationAuthorizationStatus() {
      /**
       *
       *Note for Android: this is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
       */

      let onSuccess_ios = (status) => {
        that.state.location.locationAuthorizationStatus = status;
        // switch (status) {
        //   case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
        //     console.log("Permission not requested");
        //     break;
        //   case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
        //     console.log("Permission denied");
        //     break;
        //   case cordova.plugins.diagnostic.permissionStatus.GRANTED:
        //     console.log("Permission granted always");
        //     break;
        //   case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
        //     console.log("Permission granted only when in use");
        //     break;
        // }
      };

      let onSuccess_android = (status) => {
        that.state.location.locationAuthorizationStatus = status;

        // switch (status) {
        //   case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
        //     console.log("Permission not requested");
        //     break;
        //   case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
        //     console.log("Permission denied");
        //     break;
        //   case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
        //     console.log("Permission permanently denied");
        //     break;
        //   case cordova.plugins.diagnostic.permissionStatus.GRANTED:
        //     console.log("Permission granted always");
        //     break;
        //   case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
        //     console.log("Permission granted only when in use (Android >= 10)");
        //     break;
        // }
      };

      if (that.device.platform === "android") {
        cordova.plugins.diagnostic.getLocationAuthorizationStatus(
          onSuccess_android,
          that.onFailed
        );
      } else if (that.device.platform === "ios") {
        cordova.plugins.diagnostic.getLocationAuthorizationStatus(
          onSuccess_ios,
          that.onFailed
        );
      }
    },
    requestLocationAuthorization() {
      /**
       *
       *Notes for iOS:

        Authorization can be requested to use location either "when in use" (only in foreground) or "always" (foreground and background).
        This should only be called if authorization status is NOT_DETERMINED - calling it when in any other state will have no effect.
        When calling this function, the messages contained in the NSLocationWhenInUseUsageDescription and NSLocationAlwaysAndWhenInUseUsageDescription (iOS 11+) / NSLocationAlwaysUsageDescription (iOS 10) .plist keys are displayed to the user when requesting to use location always or when in use, respectively; this plugin provides default messages, but you should override them with your specific reason for requesting access - see the iOS usage description messages section for how to customise them.
        
        Notes for Android:

        This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.

        The successCallback is invoked in response to the user's choice in the permission dialog and is passed the resulting authorization status.

        When the plugin is running in an app built with the Android 10 / API 29 or above (and running on similar device) you can request background location permission by specifying the mode argument as cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS.

        If the build SDK/device version is <= Android 9 / API 28, granting location permission implicitly grants background location permission.
       */

      let onSuccess = (status) => {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            console.log("Permission not requested");
            break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            console.log("Permission denied");
            break;
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            console.log("Permission granted always");
            break;
          case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            console.log("Permission granted only when in use");
            break;
        }
      };
      cordova.plugins.diagnostic.requestLocationAuthorization(
        onSuccess,
        that.onFailed,
        cordova.plugins.diagnostic.locationAuthorizationMode.ALWAY
      );
    },
    registerLocationStateChangeHandler() {
      /**
       *
       *Registers a function to be called when a change in Location state occurs. Pass in a falsey value to de-register the currently registered function.
            
        This is triggered when Location state changes so is useful for detecting changes made in quick settings which would not result in pause/resume events being fired.
            
        On Android, this occurs when the Location Mode is changed.
            
        On iOS, this occurs when location authorization status is changed. This can be triggered either by the user's response to a location permission authorization dialog, by the user turning on/off Location Services, or by the user changing the Location authorization state specifically for your app.
       */

      let onSuccess = (state) => {
        if (
          (that.device.platform === "android" &&
            state !== cordova.plugins.diagnostic.locationMode.LOCATION_OFF) ||
          (that.device.platform === "ios" &&
            (state === cordova.plugins.diagnostic.permissionStatus.GRANTED ||
              state ===
                cordova.plugins.diagnostic.permissionStatus
                  .GRANTED_WHEN_IN_USE))
        ) {
          // console.log(
          //   "Location is available (registerLocationStateChangeHandler)"
          // );
          that.state.location.registerLocationStateChangeHandler = true;
        } else {
          // console.log(
          //   "Location is not available (registerLocationStateChangeHandler)"
          // );
          that.state.location.registerLocationStateChangeHandler = false;
        }
      };
      cordova.plugins.diagnostic.registerLocationStateChangeHandler(onSuccess);
    },
  },

  //utils
  log(name, obj, ...logArry) {
    //任意のログを表示
    let item = ["【LOG】"];
    if (logArry.length <= 0 && obj === undefined) {
      console.log(name);
      item.push(name);
    } else if (logArry.length <= 0) {
      console.log(name, obj);
      item.push(name, obj);
    } else {
      console.log(name, obj, logArry);
      item.push(name, obj, logArry);
    }
    this.addLogs(item);
  },

  loggo(name, ...logArry) {
    //任意のログを表示
    console.group(name);
    logArry.forEach((log) => {
      console.log(log);
    });
    console.trace();
    console.groupEnd();

    logArry.unshift(name);
    this.addLogs(logArry);
  },
  logg(name, ...logArry) {
    //任意のログを表示
    console.groupCollapsed(name);
    logArry.forEach((log) => {
      console.log(log);
    });
    console.trace();
    console.groupEnd();

    logArry.unshift(name);
    this.addLogs(logArry);
  },
  addLogs(item) {
    //このオブジェクトにログを保存
    this.logs.push(item);
  },
  showLogs() {
    //logsに保存されている全てのログを出力

    console.groupCollapsed("【ALl LOG】");
    this.logs.forEach((log) => {
      console.log(log);
    });

    console.groupEnd();
    // this.logs.forEach((log) => {

    // });
  },
  onFailed(item1, item2, ...other) {
    //失敗時の汎用関数
    let item = ["【failed】"];
    if (other.length <= 0 && item2 === undefined) {
      console.log(item1);
      item.push(item1);
    } else if (other.length <= 0) {
      console.log(item1, item2);
      item.push(item1, item2);
    } else {
      console.log(item1, item2, other);
      item.push(item1, item2, other);
    }

    that.addLogs(item);
  },
  onSuccess(item1, item2, ...other) {
    //成功時の汎用関数
    let item = ["【success】"];
    if (other.length <= 0 && item2 === undefined) {
      console.log(item1);
      item.push(item1);
    } else if (other.length <= 0) {
      console.log(item1, item2);
      item.push(item1, item2);
    } else {
      console.log(item1, item2, other);
      item.push(item1, item2, other);
    }

    that.addLogs(item);
  },
};
let that = checkDeviceState;

export default checkDeviceState;
