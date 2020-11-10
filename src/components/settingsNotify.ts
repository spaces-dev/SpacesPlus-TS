import {
    ce,
    trim,
    error,
    playSound,
    setCookie,
    messageBox,
    isValidUrl,
    insertAfter
} from '../utils'

import { BASE_URL } from '../strings'
import { _SETTINGS } from '../settings'

export const settingsNotify = (e: any) => {
    try {

        if (!('Notification' in window)) {
            messageBox('Внимание!', 'Ваш браузер не поддерживает уведомления', true, 5)
        } else if (Notification.permission.toLowerCase() !== 'denied') {
            Notification.requestPermission((permission) => {
                if (permission.toLowerCase() !== 'granted') {
                    messageBox('Внимание!', `Разрешите браузеру показывать уведомления с сайта ${BASE_URL}, чтобы пользоваться функцией`, true, 5)
                }
            })
        } else {
            messageBox('Внимание!', `Вы запретили показывать уведомления для сайта ${BASE_URL}`, true, 5)
        }

        let eventsWrap = ce('div', { id: 'SP_PLUS_EVENTS' })

        let descInp = ce('label', {
            html: 'Ссылка на аудиофайл:<div class="label__desc">.ogg или .wav</div>',
            style: 'margin-right: -17px',
            class: 'label'
        })

        let descRange = ce('label', { html: 'Громкость:', class: 'label' })

        let divInp = ce('div', { class: 'text-input__wrap', style: 'margin: 15px' })

        let div = ce('div', { style: 'margin: 15px' })

        let label1 = ce('label', { class: 'stnd-link sp_noborder' })

        let label2 = ce('label', { class: 'stnd-link sp_noborder' })

        let label3 = ce('label', { class: 'stnd-link sp_noborder' })

        let eventsUrl = ce('input', {
            type: 'text',
            value: _SETTINGS.notifySet.url,
            class: 'text-input'
        })

        eventsUrl.addEventListener('change', (e: any) => {
            if ((isValidUrl(e.target.value) && /\.(ogg|mp3|wav)$/i.test(e.target.value)) || trim(e.target.value) !== '') {
                _SETTINGS.notifySet.url = trim(e.target.value)
                setCookie('SP_PLUS_SET', JSON.stringify(_SETTINGS))
                eventsUrl.className = 'text-input'
            } else {
                eventsUrl.className = 'text-input sp-input-error'
            }
        })

        let testPlay = ce('span', {
            class: 'text-input__btn',
            html: '<span class="sp sp-play-green"></span>',
            style: 'top: 23px',
            title: 'Прослушать',
            onclick: () => {
                playSound(_SETTINGS.notifySet.url, _SETTINGS.notifySet.volume)
                return false
            }
        })

        let volume = ce('div', {
            class: 'label__desc',
            html: _SETTINGS.notifySet.volume + '%'
        })

        let volRange = ce('input', {
            type: 'range',
            min: 0,
            max: 100,
            step: 1,
            value: _SETTINGS.notifySet.volume
        })

        volRange.onchange = volRange.oninput = (e: any) => {
            if (!isNaN(e.target.value)) {
                let setVol = parseInt(e.target.value, 10)
                if (setVol < 0 || setVol > 100) setVol = 70
                volume.innerHTML = setVol + '%'
                _SETTINGS.notifySet.volume = setVol
                setCookie('SP_PLUS_SET', JSON.stringify(_SETTINGS))
            }
        }

        let mailEvent = ce('input', {
            type: 'checkbox',
            id: 'sp_event_mail',
            class: 'sp-checkbox-square',
            checked: _SETTINGS.notifySet.mail,
            onclick: (e: any) => {
                _SETTINGS.notifySet.mail = e.target.checked
                setCookie('SP_PLUS_SET', JSON.stringify(_SETTINGS))
            }
        })

        let mailEventLbl = ce('label', {
            attr: { 'for': 'sp_event_mail' },
            html: 'Уведомлять о почте'
        })

        let jourEvent = ce('input', {
            type: 'checkbox',
            id: 'sp_event_journal',
            class: 'sp-checkbox-square',
            checked: _SETTINGS.notifySet.journal,
            onclick: (e: any) => {
                _SETTINGS.notifySet.journal = e.target.checked
                setCookie('SP_PLUS_SET', JSON.stringify(_SETTINGS))
            }
        })

        let jourEventLbl = ce('label', {
            attr: { 'for': 'sp_event_journal' },
            html: 'Уведомлять о журнале'
        })

        let feedEvent = ce('input', {
            type: 'checkbox',
            id: 'sp_event_feed',
            class: 'sp-checkbox-square',
            checked: _SETTINGS.notifySet.feed,
            onclick: (e: any) => {
                _SETTINGS.notifySet.feed = e.target.checked
                setCookie('SP_PLUS_SET', JSON.stringify(_SETTINGS))
            }
        })

        let feedEventLbl = ce('label', {
            attr: { 'for': 'sp_event_feed' },
            html: 'Уведомлять о ленте'
        })

        divInp.appendChild(descInp)
        divInp.appendChild(eventsUrl)
        divInp.appendChild(testPlay)
        descRange.appendChild(volume)
        div.appendChild(descRange)
        div.appendChild(volRange)
        eventsWrap.appendChild(divInp)
        eventsWrap.appendChild(div)
        label1.appendChild(mailEvent)
        label1.appendChild(mailEventLbl)
        label2.appendChild(jourEvent)
        label2.appendChild(jourEventLbl)
        label3.appendChild(feedEvent)
        label3.appendChild(feedEventLbl)
        eventsWrap.appendChild(label1)
        eventsWrap.appendChild(label2)
        eventsWrap.appendChild(label3)
        insertAfter(eventsWrap, e.parentNode)
    } catch (e) {
        error('Ошибка (settingsEvents.ts): ' + e)
    }
}