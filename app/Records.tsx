import React from 'react'
const { DateTime } = require('luxon')

type Props = {
  totalCost:{
    interval_start: string
    interval_end: string
    consumption: number
    cost: number
    offPeak: boolean
  }[]
}

function Records(props: Props) {
  return (
    <>
    <div className='border-2 border-pink-500 rounded-md w-1/2'>
      <table width="100%">
        <tr>
          <th className='p-2' align='left'>Start</th>
          <th align='left'>End</th>
          <th align='left'>Kwh</th>
          <th align='left'>Cost</th>
          <th align='left'>Tarrif</th>
        </tr>
        {props.totalCost.reverse().map((record) => (
          <tr>
            <td className='px-2'>{DateTime.fromISO(record.interval_start).toFormat('HH:mm')}</td>
            <td>{DateTime.fromISO(record.interval_end).toFormat('HH:mm')}</td>
            <td>{record.consumption}</td>
            <td>{record.cost.toFixed(2)}</td>
            <td>{record.offPeak?'Off Peak':'On Peak'}</td>
          </tr>
        ))}
      </table>
    </div>
    </>
  )
}

export default Records