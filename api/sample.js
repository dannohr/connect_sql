const fetchNotifications = require("./fetch-notifications");
const updateNotification = require("./update-notification");
const removeNotification = require("./remove-notification");
/**
 * Provide Api for Investors (user with articles)
 **/
module.exports = ({ config, db }) => {
  api.get("/", authenticate, fetchNotifications({ config, db }));

  api.put("/:notificationId", authenticate, updateNotification({ config, db }));

  api.delete(
    "/:notificationId",
    authenticate,
    removeNotification({
      config,

      db
    })
  );

  return api;
};
