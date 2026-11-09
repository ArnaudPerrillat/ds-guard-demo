// Fictional data. Names, places and medicines are generic placeholders.
export const appointments = [
  { id: 'a1', with: 'General practitioner', place: 'Riverside clinic, room 4', when: 'Tue 18 Nov, 09:30', status: 'confirmed' as const },
  { id: 'a2', with: 'Physiotherapist', place: 'Riverside clinic, room 12', when: 'Thu 27 Nov, 17:00', status: 'pending' as const },
  { id: 'a3', with: 'Dermatologist', place: 'Video call', when: 'Mon 8 Dec, 11:15', status: 'confirmed' as const },
]

export const prescriptions = [
  { id: 'p1', name: 'Medicine A, 500 mg', dosage: 'Twice a day, with food', renewBy: '30 Nov', refillsLeft: 2 },
  { id: 'p2', name: 'Medicine B, 10 mg', dosage: 'Once a day, morning', renewBy: '12 Dec', refillsLeft: 0 },
]

export const messages = [
  { id: 'm1', from: 'Care team', subject: 'Your test results are available', received: 'Today', unread: true },
  { id: 'm2', from: 'Front desk', subject: 'Appointment confirmed for 18 Nov', received: 'Yesterday', unread: false },
]

export const invoices = [
  { id: 'INV-2026-0412', date: '2 Oct 2026', amount: '€25.00', status: 'paid' },
  { id: 'INV-2026-0517', date: '4 Nov 2026', amount: '€60.00', status: 'due' },
]
