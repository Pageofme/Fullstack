import { useState } from "react"
import { Container, Row, Col, Table, Button, Form, Pagination, Card, Modal, Alert } from "react-bootstrap"
import { Camera, Circle, Wifi, Lamp, Edit, Trash2, Plus } from "lucide-react"

const facilitiesData = [
  {
    id: "1101",
    type: "Aroma",
    name: "Cairo Tate",
    icon: <Camera size={40} className="text-dark" />,
  },
  {
    id: "1102",
    type: "Cleanliness",
    name: "Ryan Rodgers",
    icon: <Circle size={40} className="text-dark" />,
  },
  {
    id: "1103",
    type: "Internet",
    name: "Wifi",
    icon: <Wifi size={40} className="text-dark" />,
  },
  {
    id: "1104",
    type: "Lighting",
    name: "Auto Mation",
    icon: <Lamp size={40} className="text-dark" />,
  },
]

export default function FacilitiesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [facilities, setFacilities] = useState(facilitiesData)
  const [currentFacility, setCurrentFacility] = useState(null)
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    image: null,
  })

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.id.includes(searchTerm),
  )

  const totalEntries = filteredFacilities.length
  const startEntry = (currentPage - 1) * entriesPerPage + 1
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries)

  const handleAddFacility = () => {
    setFormData({ type: "", name: "", image: null })
    setShowAddModal(true)
  }

  const handleEdit = (facility) => {
    setCurrentFacility(facility)
    setFormData({
      type: facility.type,
      name: facility.name,
      image: null,
    })
    setShowEditModal(true)
  }

  const handleDelete = (facility) => {
    setCurrentFacility(facility)
    setShowDeleteAlert(true)
  }

  const handleSave = () => {
    if (!formData.type || !formData.name) return

    const newId = Math.max(...facilities.map((f) => Number.parseInt(f.id))) + 1
    const iconMap = {
      Aroma: <Camera size={40} className="text-dark" />,
      Cleanliness: <Circle size={40} className="text-dark" />,
      Internet: <Wifi size={40} className="text-dark" />,
      Lighting: <Lamp size={40} className="text-dark" />,
    }

    const newFacility = {
      id: newId.toString(),
      type: formData.type,
      name: formData.name,
      icon: iconMap[formData.type] || <Camera size={40} className="text-dark" />,
    }

    setFacilities([...facilities, newFacility])
    setShowAddModal(false)
    setFormData({ type: "", name: "", image: null })
  }

  const handleUpdate = () => {
    if (!formData.type || !formData.name) return

    const iconMap = {
      Aroma: <Camera size={40} className="text-dark" />,
      Cleanliness: <Circle size={40} className="text-dark" />,
      Internet: <Wifi size={40} className="text-dark" />,
      Lighting: <Lamp size={40} className="text-dark" />,
    }

    const updatedFacilities = facilities.map((facility) =>
      facility.id === currentFacility.id
        ? {
            ...facility,
            type: formData.type,
            name: formData.name,
            icon: iconMap[formData.type] || facility.icon,
          }
        : facility,
    )

    setFacilities(updatedFacilities)
    setShowEditModal(false)
    setCurrentFacility(null)
  }

  const confirmDelete = () => {
    const updatedFacilities = facilities.filter((facility) => facility.id !== currentFacility.id)
    setFacilities(updatedFacilities)
    setShowDeleteAlert(false)
    setCurrentFacility(null)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Body>
          {/* Header */}
          <Row className="mb-4 align-items-center">
            <Col>
              <h4 className="mb-0 fw-bold">Facilites Details List</h4>
            </Col>
            <Col xs="auto">
              <Button variant="dark" onClick={handleAddFacility} className="d-flex align-items-center gap-2">
                <Plus size={16} />
                Add Facilites
              </Button>
            </Col>
          </Row>

          {/* Controls */}
          <Row className="mb-3 align-items-center">
            <Col xs="auto">
              <div className="d-flex align-items-center gap-2">
                <span>Show</span>
                <Form.Select
                  size="sm"
                  style={{ width: "auto" }}
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Select>
                <span>entries</span>
              </div>
            </Col>
            <Col></Col>
            <Col xs="auto">
              <div className="d-flex align-items-center gap-2">
                <span>Search:</span>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
          </Row>

          {/* Table */}
          <Table responsive className="mb-4">
            <thead className="table-light">
              <tr>
                <th className="fw-semibold">
                  Amentity ID
                  <span className="ms-1">↕</span>
                </th>
                <th className="fw-semibold">
                  Amentity TYPE
                  <span className="ms-1">↕</span>
                </th>
                <th className="fw-semibold">
                  Amentity NAME
                  <span className="ms-1">↕</span>
                </th>
                <th className="fw-semibold">
                  Amentity IMAGE
                  <span className="ms-1">↕</span>
                </th>
                <th className="fw-semibold">
                  ACTIONS
                  <span className="ms-1">↕</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilities.map((facility) => (
                <tr key={facility.id}>
                  <td className="align-middle">{facility.id}</td>
                  <td className="align-middle">{facility.type}</td>
                  <td className="align-middle">{facility.name}</td>
                  <td className="align-middle text-center">
                    <div className="d-flex justify-content-center">{facility.icon}</div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(facility)}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(facility)}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Footer */}
          <Row className="align-items-center">
            <Col>
              <span className="text-muted">
                Showing {startEntry} to {endEntry} of {totalEntries} entries
              </span>
            </Col>
            <Col xs="auto">
              <Pagination className="mb-0">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </Pagination.Prev>
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next disabled={endEntry >= totalEntries} onClick={() => setCurrentPage((prev) => prev + 1)}>
                  Next
                </Pagination.Next>
              </Pagination>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Add Facility Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Add Facility Type <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select value={formData.type} onChange={(e) => handleInputChange("type", e.target.value)}>
                <option value="">Choose Room Type</option>
                <option value="Aroma">Aroma</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Internet">Internet</option>
                <option value="Lighting">Lighting</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Facility Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add Facility Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Facility Image</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Button variant="outline-secondary" size="sm">
                  Chọn tệp
                </Button>
                <span className="text-muted">Không có tệp nào được chọn</span>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!formData.type || !formData.name}
            style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Facility Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Add Facility Type <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select value={formData.type} onChange={(e) => handleInputChange("type", e.target.value)}>
                <option value="">Choose Room Type</option>
                <option value="Aroma">Aroma</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Internet">Internet</option>
                <option value="Lighting">Lighting</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Facility Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add Facility Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Facility Image</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Button variant="outline-secondary" size="sm">
                  Chọn tệp
                </Button>
                <span className="text-muted">Không có tệp nào được chọn</span>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={!formData.type || !formData.name}
            style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}
          >
            Update changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteAlert} onHide={() => setShowDeleteAlert(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this facility?</p>
          {currentFacility && (
            <Alert variant="warning">
              <strong>Facility:</strong> {currentFacility.type} - {currentFacility.name}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteAlert(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}