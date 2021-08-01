import Auth from "../api/auth.js";

let checkAuthBeforeRoute = {
  init(router) {
    router.beforeEach((to, from, next) => {
      if (to.matched.some((record) => record.meta.requiredAuth)) {
        Auth.currentAuthenticatedUser("isAuth") // 認証済みのユーザが存在するかどうかをチェックする関数
          .then(() => {
            next();
          })
          .catch((error) => {
            console.error(error);
            next({
              path: "title",
              query: { redirect: to.fullPath },
            });
          });
      }
      next();
    });
  },
};

export default checkAuthBeforeRoute;
