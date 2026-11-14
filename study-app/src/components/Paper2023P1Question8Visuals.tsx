export function TicketPrices2023Table() {
  return <div className="study-table-wrap">
    <table className="study-data-table">
      <caption>Ticket prices and percentage of sales</caption>
      <thead><tr><th scope="col">Type</th><th scope="col">Child</th><th scope="col">Student</th><th scope="col">Adult</th></tr></thead>
      <tbody>
        <tr><th scope="row">Price</th><td>€11</td><td>€5 less than adult</td><td>€x</td></tr>
        <tr><th scope="row">Tickets sold</th><td>52%</td><td>15%</td><td>33%</td></tr>
      </tbody>
    </table>
    <p>The expected ticket price is €13.85.</p>
  </div>;
}
