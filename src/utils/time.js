import moment from 'moment'
import { convertNos } from './dateConverter'

const addLeadingZero = (val) => {
	return '0' + val
}

export const getRelativeTime = (date) => {
	const convertedDate = Number(date)
	if (!isNaN(convertedDate) && typeof convertedDate === 'number') {
		return formatRelativeTime(moment(convertedDate).startOf('hour').fromNow())
	} else {
		return formatRelativeTime(moment(date).startOf('hour').fromNow())
	}
}

function formatRelativeTime(relativeTime) {
	return relativeTime.replace(' minutes', 'm').replace('an hour', '1h').replace(' hours', 'h').replace('a day', '1d').replace(' days', 'd')
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

	return hours > 0 ? hours + 'h ' + mins + ' m' : mins + 'm'
}
