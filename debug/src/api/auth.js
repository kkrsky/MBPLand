let auth = {
  currentAuthenticatedUser(demo) {
    return new Promise(function(resolve, reject) {
      console.log("this", this);
      if (demo === "isAuth") {
        setTimeout(function() {
          resolve(demo);
        }, 1000);
      } else {
        reject("Auth is failed (demo)!");
      }
    });
  },
};

export default auth;
