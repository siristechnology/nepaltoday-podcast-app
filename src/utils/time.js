import moment from 'moment'
import { convertNos } from './dateConverter'

moment.updateLocale('en', {
	calendar: {
		lastDay: '[हिजो]',
		sameDay: '[आज]',
		nextDay: '[भोलि]',
		lastWeek: '[अन्तिम] dddd',
		nextWeek: '[Next] dddd',
		sameElse: 'L',
	},
})

moment.updateLocale('en', {
	weekdays: ['आइतवार', 'सोमबार', 'मंगलबार', 'बुधवार', 'बिहीबार', 'शुक्रवार', 'शनिबार'],
})

const addLeadingZero = (val) => {
	return '0' + val
}

export const getRelativeTime = (date) => {
	const convertedDate = Number(date)
	if (!isNaN(convertedDate) && typeof convertedDate === 'number') {
		return moment(convertedDate).calendar()
	} else {
		return moment(date).calendar()
	}
}

export const getCurrentTime = () => {
	let hours = moment().hours()
	let minutes = moment().minutes()

	if (hours < 10) {
		hours = addLeadingZero(hours)
	}
	if (minutes < 10) {
		minutes = addLeadingZero(minutes)
	}
	const currentTime = `${hours}:${minutes}`
	const currentTimeInNepali = []
	for (const letter of currentTime) {
		if (letter == ':') {
			currentTimeInNepali.push(letter)
		} else {
			currentTimeInNepali.push(convertNos(letter))
		}
	}
	return currentTimeInNepali.join('')
}

export const getFormattedDurationFromSeconds = (durationInSeconds) => {
	const hours = Math.floor(durationInSeconds / (60 * 60))
	const mins = Math.floor(durationInSeconds / 60 - hours * 60)

	return hours > 0 ? hours + 'h ' + (mins > 20 ? mins + 'm' : '') : mins + 'm'
}
