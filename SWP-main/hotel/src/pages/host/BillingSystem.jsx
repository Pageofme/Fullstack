import { Card, Badge, Button } from "react-bootstrap";
import { CreditCard, DollarSign, Clock, MoreHorizontal } from "lucide-react";

export default function BillingSystem() {
  const invoices = [
    { id: "INV-2023-001", guest: "Ram Kailash", date: "26 Jul 2023", amount: "Rs.1500", status: "Paid" },
    { id: "INV-2023-002", guest: "Samira Karki", date: "25 Jul 2023", amount: "Rs.5500", status: "Paid" },
    { id: "INV-2023-003", guest: "Jeevan Rai", date: "24 Jul 2023", amount: "Rs.2500", status: "Pending" },
  ];

  return (
    <div className="container py-4">
      
      <div className="row mb-4">
        {[{
          icon: <CreditCard className="text-primary" />,
          label: "Total Revenue",
          value: "Rs.125,000",
          change: "+12% from last month",
        }, {
          icon: <DollarSign className="text-success" />,
          label: "Paid Invoices",
          value: "Rs.98,500",
          change: "78% of total",
        }, {
          icon: <Clock className="text-warning" />,
          label: "Pending Payments",
          value: "Rs.26,500",
          change: "22% of total",
        }].map((item, idx) => (
          <div className="col-md-4" key={idx}>
            <Card className="text-center">
              <Card.Body>
                <div className="mb-3">{item.icon}</div>
                <div className="text-muted">{item.label}</div>
                <h4>{item.value}</h4>
                <div className="text-success">{item.change}</div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Card>
        <Card.Body>
          <h5 className="mb-3">Recent Invoices</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>INVOICE ID</th>
                  <th>GUEST</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice.id}</td>
                    <td>{invoice.guest}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <Badge bg={invoice.status === "Paid" ? "success" : "warning"}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-secondary" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
