// Legacy billing screen, written before the design system. Scheduled for a rewrite.
import { invoices } from '../../data'
import './billing.css'

export function Billing() {
  return (
    <div className="billing">
      <h1 className="billing__title">Billing</h1>
      <table className="billing__table">
        <thead>
          <tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th></tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.date}</td>
              <td>{i.amount}</td>
              <td style={{ color: i.status === 'due' ? '#b42318' : '#1d7a45' }}>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
