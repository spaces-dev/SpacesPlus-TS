import {
    extend,
    logger,
    getCookie,
    setCookie
} from './index'

import { _SETTINGS } from '../settings'

/**
 * Используется для инициализации настроек скрипта
 */
export const readSettings = () => {
    let settings = getCookie('SP_PLUS_SET')

    try {
        if (settings) {
            extend(_SETTINGS, JSON.parse(settings))
        } else {
            setCookie('SP_PLUS_SET', JSON.stringify(_SETTINGS))
        }
    } catch (e) {
        logger.error('readSettings', e)
    }
}

/**
 * Используется для изменения настроек
 */
export const setSettings = (key: string, value: string | number | boolean) => {
    try {

        if (key.indexOf('.') !== -1) {

            let i = key.split('.')

            _SETTINGS[i[0]][i[1]] = value
        } else {
            _SETTINGS[key] = value
        }

        setCookie('SP_PLUS_SET', JSON.stringify(_SETTINGS))
    } catch (e) {
        logger.error('setSettings', e)
    }
}