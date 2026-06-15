import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportFeedbackPDF(elementId: string, filename = 'feedback.pdf') {
  const el = document.getElementById(elementId)
  if (!el) return

  // Scroll to top so nothing is clipped
  window.scrollTo(0, 0)
  await new Promise((r) => setTimeout(r, 100)) // let paint settle

  const canvas = await html2canvas(el, {
    backgroundColor: '#030712',
    scale: 1.5,
    useCORS: true,
    logging: false,
    windowWidth: 1200,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const pdfW = 210 // A4 mm
  const pdfH = 297
  const imgH = (canvas.height * pdfW) / canvas.width

  let heightLeft = imgH
  let pos = 0

  pdf.addImage(imgData, 'PNG', 0, pos, pdfW, imgH)
  heightLeft -= pdfH

  while (heightLeft > 0) {
    pos -= pdfH
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, pos, pdfW, imgH)
    heightLeft -= pdfH
  }

  pdf.save(filename)
}
