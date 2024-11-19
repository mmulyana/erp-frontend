import ExcelImg from '/public/icons/file_xls.png'
import PDFImg from '/public/icons/file_pdf.png'
import DOCImg from '/public/icons/file_doc.png'
import PPTImg from '/public/icons/file_ppt.png'

export default function FileIcon({ type }: { type: string }) {
  if (type.includes('pdf')) {
    return <img src={PDFImg} className='h-8 w-auto' />
  }
  if (type.includes('xls')) {
    return <img src={ExcelImg} className='h-8 w-auto' />
  }
  if (type.includes('ppt')) {
    return <img src={PPTImg} className='h-8 w-auto' />
  }

  return <img src={DOCImg} className='h-8 w-auto' />
}
