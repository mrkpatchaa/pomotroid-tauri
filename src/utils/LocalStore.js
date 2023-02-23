import { logger } from './../utils/logger'
// const electron = require('electron')
import { exists,readTextFile, BaseDirectory, writeTextFile, createDir } from '@tauri-apps/api/fs';

export const defaults = generateSettings()
let localStore;

/**
 * Returns a default user-settings object.
 *
 * @returns {object} The default user-settings.
 */
function generateSettings() {
  return {
    alwaysOnTop: false,
    breakAlwaysOnTop: false,
    autoStartWorkTimer: true,
    autoStartBreakTimer: true,
    minToTray: false,
    minToTrayOnClose: false,
    notifications: true,
    workRounds: 4,
    theme: null,
    tickSounds: false,
    tickSoundsDuringBreak: true,
    timeLongBreak: 15,
    timeShortBreak: 5,
    timeWork: 25,
    volume: 100,
    globalShortcuts: { // If new shortcuts are added, the migrations of this should be handled
      'call-timer-toggle': 'Control+F1',
      'call-timer-reset': 'Control+F2',
      'call-timer-skip': 'Control+F3'
    }
  }
}

/**
 * Creates and returns an instance of LocalStore with defaults.
 *
 * @export
 * @returns {LocalStore} Instance of LocalStore.
 */
export function createLocalStore() {
  // copy defaults object
  if(!localStore) {
    localStore = new LocalStore('user-preferences', Object.assign({}, defaults))
  }
  return localStore;
}

/**
 * Stores user configuration on the filesystem.
 *
 * @export
 * @class LocalStore
 */
export default class LocalStore {
  /**
   *Creates an instance of LocalStore.
   * @param {string} filename - The filename to store.
   * @param {object} data - Existing data or defaults to populate the LocalStore.
   * @memberof LocalStore
   */
  constructor(filename, data) {
    this.path = filename + '.json';
    this.data = parseDataFile(this.path, data)
    logger.info(`Preferences loaded from ${this.path}`)
  }

  /**
   * Retrieve the value of a key-value pair from data.
   *
   * @param {string} key - The key to access.
   * @returns {*} The accessed value.
   * @memberof LocalStore
   */
  get(key) {
    return this.data[key]
  }

  /**
   * Set and store a key-value pair in local storage data.
   *
   * @param {string} key - The key name.
   * @param {*} val - The value of the key property.
   * @memberof LocalStore
   */
  set(key, val) {
    this.data[key] = val
    try {
      writeTextFile(this.path, JSON.stringify(this.data), { dir: BaseDirectory.AppConfig })
    } catch (error) {
      logger.error(error)
    }
  }
}

/**
 * Attempts to parse a JSON data file given a filepath,
 * or returns given defaults.
 *
 * @param {string} filePath - The filepath of the file to be read.
 * @param {*} defaults - Defaults to be returned in the event of an error.
 * @returns {object|*}
 */
function parseDataFile(filePath, defaults) {
  if (!exists(filePath, { dir: BaseDirectory.AppConfig })) {
    try{
    writeTextFile(filePath, JSON.stringify(defaults), { dir: BaseDirectory.AppConfig })
  } catch (error) {
    logger.error(error)
  }
    return defaults
  } else {
    try {
      return JSON.parse(readTextFile(filePath, { dir: BaseDirectory.AppConfig }))
    } catch (error) {
      logger.error(error)
      return defaults
    }
  }
}

/**
 * Create a directory at the given path if it doesn't exist.
 *
 * @export
 * @param {string} path - The directory path.
 */
export function initDirectory(path) {
  if (!exists(path, { dir: BaseDirectory.AppConfig })) {
    try{
      logger.info(`creating directory: ${path}`)
      createDir(path, { dir: BaseDirectory.AppConfig })
    } catch (error) {
      logger.error(error)
    }
  }
}

/**
 * Get the 'userData' directory in the current environment.
 *
 * @export
 * @returns {string} The userData path.
 */
export function userDir() {
  return BaseDirectory.AppConfig;
}
