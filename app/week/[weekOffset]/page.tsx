import React from 'react'
import Cost from '../../Cost'
import WeekNext from './WeekNext'
import WeekPrevious from './WeekPrevious'
import Kwh from '../../Kwh'
import Records from '../../Records'

const _ = require('lodash')
const { DateTime } = require('luxon')

type PageProps = {
  params: {
    weekOffset: string
  }
}

let APP_BASE_URL: any = ""

if (process.env.VERCEL_URL) {
  APP_BASE_URL = `https://${process.env.VERCEL_URL}`
} else {
  APP_BASE_URL = process.env.APP_API_BASE
}

async function DailyConsumption({ params: { weekOffset } }: PageProps) {
  const res = await fetch(`${APP_BASE_URL}/api/consumption/week/${weekOffset}`)
  const resultData = await res.json()

  const totalCost: CostData[] = resultData.result

  const dataDateTo = DateTime.fromISO(totalCost[0].interval_start)
  const dataDateFrom = DateTime.fromISO(totalCost.reverse()[0].interval_start)

  return (
    <>
      <div className='flex space-x-3'>
        <div className='text-3xl font-bold'>
          <WeekPrevious dayOffset={(parseInt(weekOffset) + 1).toString()} />
        </div>
        <div className='font-bold text-lg'>{dataDateFrom.toFormat('EEE dd MMM yyyy')} - {dataDateTo.toFormat('EEE dd MMM yyyy')}</div>
        <div className='text-3xl font-bold'>
          <WeekNext dayOffset={parseInt(weekOffset) <= 1 ? "1" : (parseInt(weekOffset) - 1).toString()} />
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