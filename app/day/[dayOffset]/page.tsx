import React from 'react'
import Cost from '../../Cost'
import DayNext from '../../DayNext'
import DayPrevious from '../../DayPrevious'
import Kwh from '../../Kwh'
import Records from '../../Records'

const _ = require('lodash')
const { DateTime } = require('luxon')

type PageProps = {
  params: {
    dayOffset: string
  }
}

let APP_BASE_URL: any = ""

if (process.env.VERCEL_URL) {
  APP_BASE_URL = `https://${process.env.VERCEL_URL}`
} else {
  APP_BASE_URL = process.env.APP_API_BASE
}

async function DailyConsumption({ params: { dayOffset } }: PageProps) {
  const res = await fetch(`${APP_BASE_URL}/api/consumption/day/${dayOffset}`)
  const resultData = await res.json()

  const totalCost: CostData[] = resultData.result

  const dataDateFrom = DateTime.fromISO(totalCost[0].interval_start)

  return (
    <>
      <div className='flex space-x-3'>
        <div className='text-3xl font-bold'>
          <DayPrevious dayOffset={(parseInt(dayOffset) + 1).toString()} />
        </div>
        <div className='font-bold text-lg'>{dataDateFrom.toFormat('EEE dd MMM yyyy')}</div>
        <div className='text-3xl font-bold'>
          <DayNext dayOffset={parseInt(dayOffset) <= 2 ? "2" : (parseInt(dayOffset) - 1).toString()} />
        </div>
      </div>
      <div className='space-x-3'>
        <Cost cost={_.sumBy(totalCost, 'cost').toFixed(2)} />
        <Kwh kwh={_.sumBy(totalCost, 'consumption').toFixed(2)} />
      </div>

      <div>30 Minute Recrods</div>
      <Records totalCost={totalCost} />
    </>
  )
}

export default DailyConsumption