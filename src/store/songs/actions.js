import SongService from "src/services/SongService";
export function setLang(context, lang) {
    context.commit("SET_LANG", lang);
  }

  export async function showAllSongs(context) {
    try {
      const response = await SongService.showAllSongs();
  
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

  export async function showSongById(context, id) {
    try {
      const response = await SongService.showSongById(id);
  
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

  export async function insertSong(context, payload) {
    try {
      const response = await SongService.insertSong(payload);
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

  export async function updateSong(context, payload) {
    try {
      const response = await SongService.update(payload);
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

  export async function deleteSongById(context, id) {
    try {
      const response = await SongService.deleteSongById(id);
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

  