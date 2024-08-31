import { StepperItem, StepperWrapper } from './component'

export default function Create() {
  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <StepperWrapper onSubmit={() => console.log('submit')}>
        <StepperItem title='Info umum'>
          <p>Info</p>
        </StepperItem>
        <StepperItem title='Jabatan'>
          <p>Jabatan</p>
        </StepperItem>
        <StepperItem title='Kompetensi'>
          <p>Kompetensi</p>
        </StepperItem>
        <StepperItem title='Review'>
          <p>Review</p>
        </StepperItem>
      </StepperWrapper>
    </div>
  )
}
