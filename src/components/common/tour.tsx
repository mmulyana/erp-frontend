import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import type { CallBackProps, Events, Step } from 'react-joyride'
import { useEffect, useState } from 'react'
import { Triangle } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'

export type TourProps = {
  start: boolean
  onTourEnd?: (type?: 'skip' | 'end') => void
  steps: Step[]
}

type State = {
  run: boolean
  stepIndex: number
}

export default function Tour({ start, onTourEnd, steps }: TourProps) {
  const [{ run, stepIndex }, setState] = useState<State>({
    run: false,
    stepIndex: 0,
  })

  const isMobile = useIsMobile()

  useEffect(() => {
    if (start) {
      setState((prev) => ({ ...prev, run: true }))
    }
  }, [start])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type, action } = data

    if (status === STATUS.FINISHED) {
      setState({ run: false, stepIndex: 0 })
      onTourEnd?.('end')
    } else if (status === STATUS.SKIPPED) {
      setState({ run: false, stepIndex: 0 })
      onTourEnd?.('skip')
    } else if (
      ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as Events[]).includes(type)
    ) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
      setState({ run: true, stepIndex: nextStepIndex })
    }
  }

  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      stepIndex={stepIndex}
      scrollToFirstStep={true}
      hideCloseButton={false}
      disableCloseOnEsc
      showSkipButton={!isMobile}
      disableOverlayClose
      scrollOffset={80}
      styles={{
        spotlight: {
          border: '2px solid #0a45f7',
        },
        buttonNext: {
          background: '#5463E8',
          padding: '10px 12px',
          borderRadius: '50px',
          fontSize: 14,
          fontWeight: 600,
        },
        buttonSkip: {
          color: '#313951',
          fontWeight: 600,
          fontSize: 14,
        },
        buttonClose: {
          color: '#313951',
          fontWeight: 600,
        },
        buttonBack: {
          background: '#f0f0f0',
          borderRadius: '50px',
          padding: '10px 12px',
          marginRight: 12,
          fontSize: 14,
          fontWeight: 600,
        },
        options: {
          zIndex: 100,
          arrowColor: '#FFF',
          backgroundColor: '#FFF',
          textColor: '#FFFFFF',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
          primaryColor: '#5463E8',
        },
        tooltip: {
          borderRadius: '20px',
          padding: '12px 0 0',
        },
        tooltipContent: {
          textAlign: 'center',
          color: '#313951',
          padding: '16px 16px 0',
        },
        tooltipFooter: {
          padding: 8,
          marginTop: 8,
        },
        tooltipTitle: {
          padding: '0 28px',
          color: '#313951',
          fontWeight: 600,
          fontSize: 16,
        },
      }}
      locale={{
        back: (
          <div className='flex gap-2 text-dark items-center'>
            <Triangle
              size={14}
              className='-rotate-90 text-transparent'
              fill='#d4d4d4'
            />
            <p>Kembali</p>
          </div>
        ),
        last: 'Tutup',
        skip: 'Lewati',
        next: (
          <div className='flex gap-2 text-white items-center'>
            <p>Selanjutnya</p>
            <Triangle
              size={14}
              className='rotate-90 text-transparent'
              fill='#4550B9'
            />
          </div>
        ),
      }}
    />
  )
}
