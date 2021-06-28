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
