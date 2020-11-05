import { qsa, http, getPath, info, error } from '../utils'

import { IUserAnketa } from '../interfaces/UserAnketa'

import { SPACES, OVERRIDE } from '../strings'

export const userOnline = () => {
    let path = getPath()
    let nick = getPath(3)
    let target = `/anketa/index/${nick}/`

    if (path !== target) OVERRIDE.ONLINE = null

    if (path === target && OVERRIDE.ONLINE !== nick) {
        try {
            let onBlock = Array.from(qsa('div.info-item__title')).filter(e => e.textContent === 'Время онлайн:')

            if (nick && onBlock) {
                OVERRIDE.ONLINE = nick

                http<IUserAnketa>('GET', `${SPACES}/anketa/index/${nick}/`, true).then(e => {
                    const response = e.parsedBody?.user_widget?.online_time

                    if (response) {
                        let str: any = (response / 3600).toFixed(2).split('.')
                        let online = str[0] > 0 ? `${str[0]} ч, ${Math.trunc(str[1] / (100 / 60))} мин` : `${Math.trunc(str[1] / (100 / 60))} мин`
                        // @ts-ignore Костыль!
                        onBlock[0].nextElementSibling.textContent = online
                        info('Время онлайн: ' + online)
                    }
                })
            }
        } catch (e) {
            error('Ошибка (userOnline.ts): ' + e)
        }
    }
}