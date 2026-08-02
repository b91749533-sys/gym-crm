/**
 * Export data array to downloadable CSV file
 */
export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers
        .map(fieldName => {
          const val = row[fieldName] ?? '';
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generate printable / PDF HTML preview for invoices
 */
export function printInvoice(payment: any) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice #${payment.invoiceNumber}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #18181b; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e4e4e7; padding-bottom: 20px; }
          .logo { font-size: 24px; font-weight: 800; color: #06b6d4; letter-spacing: -1px; }
          .details { margin-top: 30px; display: flex; justify-content: space-between; }
          .table { width: 100%; margin-top: 30px; border-collapse: collapse; }
          .table th, .table td { border: 1px solid #e4e4e7; padding: 12px; text-align: left; }
          .table th { background: #f4f4f5; }
          .total { margin-top: 20px; text-align: right; font-size: 18px; font-weight: bold; }
          .footer { margin-top: 50px; font-size: 12px; color: #71717a; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">APEX FITNESS CLUB</div>
          <div>
            <h3>INVOICE</h3>
            <p>#${payment.invoiceNumber}</p>
          </div>
        </div>
        <div class="details">
          <div>
            <strong>Billed To:</strong><br/>
            ${payment.userName}<br/>
            ${payment.userEmail}
          </div>
          <div>
            <strong>Date:</strong> ${payment.date}<br/>
            <strong>Payment Method:</strong> ${payment.paymentMethod}<br/>
            <strong>Status:</strong> ${payment.status}
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${payment.description || payment.membershipPlanName || 'Gym Membership'}</td>
              <td>1</td>
              <td>$${payment.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          Total Paid: $${payment.amount.toFixed(2)}
        </div>
        <div class="footer">
          Thank you for training with Apex Fitness Club! For billing support contact billing@apexfitness.com
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;
  printWindow.document.write(html);
  printWindow.document.close();
}
