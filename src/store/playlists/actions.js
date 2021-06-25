import PlaylistService from "src/services/PlaylistService";
export function setLang(context, lang) {
    context.commit("SET_LANG", lang);
  }

  export async function showAllPlaylists(context) {
    try {
      const response = await PlaylistService.showAllPlaylists();
  
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

  export async function showAllPlaylistsUserLogged(context) {
    try {
      const response = await PlaylistService.showAllPlaylistsUserLogged();
  
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

  export async function showPlaylistById(context, id) {
    try {
      const response = await PlaylistService.showPlaylistById(id);
  
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

  export async function insertPlaylist(context, payload) {
    try {
      const response = await PlaylistService.insertPlaylist(payload);
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

  export async function updatePlaylistById(context, payload) {
    try {
      const response = await CalendarServices.updatePlaylist(
        payload.id,
        payload.playlist
      );
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

  export async function deletePlaylistById(context, id) {
    try {
      const response = await PlaylistService.deletePlaylistById(id);
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

  export async function insertSongsInPlaylist(context, payload) {
    try {
      const response = await PlaylistService.insertSongsInPlaylist(
        payload.id,
        payload.song
      );
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

  export async function findSongsFromPlaylistId(context, id) {
    try {
      const response = await PlaylistService.findSongsFromPlaylistId(id);
  
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

  export async function changeSongsInPlaylists(context, payload) {
    try {
      const response = await PlaylistService.changeSongsInPlaylists(
        payload.id1,
        payload.id2
      );
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
  