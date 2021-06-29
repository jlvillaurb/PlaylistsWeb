import UserServices from "src/services/UserService";
import LoginServices from "src/services/LoginService";

export async function login(context, payload) {
  try {
    const response = await LoginServices.login(payload);
    if (response.status >= 200 && response.status < 300) {
      // Show a success notification (like a toast)
      //utils.notify("positive", i18n.t("notify.success"));
      // Resolve the promise returning the status
      return Promise.resolve(response);
    }
  } catch (error) {
    //utils.notify("negative", utils.getErrorByCode(error));
  }
}

export async function insertUser(context, payload) {
  try {
    const response = await UserServices.insert(payload);
    if (response.status >= 200 && response.status < 300) {
      // Show a success notification (like a toast)
      //utils.notify("positive", i18n.t("notify.success"));
      // Resolve the promise returning the status
      return Promise.resolve(response);
    }
  } catch (error) {
    //utils.notify("negative", utils.getErrorByCode(error));
  }
}

export async function getUserByName(context, payload) {
  try {
    const response = await SongService.findUserByName(payload);
    if (response.status >= 200 && response.status < 300) {
      // IF list of sectors was returned
      if (response.data) {
        // Resolve the promise returning the status
        return Promise.resolve(response.data);
      }
    }
  } catch (error) {
    //utils.notify("negative", utils.getErrorByCode(error));
  }
}

export function setUser(context, user) {
  context.commit("SET_USER", user);
}
