/**
 * @formatDate
 */
export function formatDate(date = new Date(), dateSeparator = '-', timeSeparator = ':'){
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  
  const h = date.getHours()
  const mn = date.getMinutes()
  const s = date.getSeconds()

  const _date = [y, m, d].join(dateSeparator)
  const _time = [h, mn, s].join(timeSeparator)

  return {
    allDate: `${_date} ${_time}`,
    date: _date,
    time: _time
  } 
}

// export function