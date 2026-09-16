import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";

// Exercise 10: Demo about React-Bootstrap


const MENU = [
  {
    id: 1,
    name: "Uthappizza",
    price: 4.99,
    category: "Mains",
    image: "https://picsum.photos/seed/rb1/600/400",
    description: "Uthappam kiểu Ấn kết hợp pizza Ý, phủ mozzarella và ô liu.",
  },
  {
    id: 2,
    name: "Zucchipakoda",
    price: 1.99,
    category: "Appetizer",
    image: "https://picsum.photos/seed/rb2/600/400",
    description: "Bí ngòi chiên giòn với bột đậu gà, ăn kèm sốt me.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    price: 2.99,
    category: "Dessert",
    image: "https://picsum.photos/seed/rb3/600/400",
    description: "Cheesecake New York với hương bạch đậu khấu và sốt nước hoa hồng.",
  },
];

function ReactBootstrapSite() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeDish, setActiveDish] = useState(null);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMenu(MENU);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const openDish = (dish) => {
    setActiveDish(dish);
    setShowModal(true);
  };

  const addToCart = (dish) => {
    setCart((prev) => [...prev, dish]);
    setShowModal(false);
  };

  const total = cart.reduce((sum, d) => sum + d.price, 0);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const nameValid = name.trim().length >= 2;

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!nameValid || !emailValid) return;
    setSent(true);
    setName("");
    setEmail("");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">ConFusion</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Trang chủ</Nav.Link>
              <Nav.Link href="#menu">Thực đơn</Nav.Link>
              <Nav.Link href="#contact">Liên hệ</Nav.Link>
            </Nav>
            <Navbar.Text className="text-white">
              Giỏ hàng <Badge bg="primary">{cart.length}</Badge>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero */}
      <div id="home" className="bg-light py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={7}>
              <h1 className="display-5">Ẩm thực giao thoa Ấn – Âu</h1>
              <p className="lead text-muted">
                Thực đơn thay đổi theo mùa, nguyên liệu lấy trong ngày, nấu bởi
                bếp trưởng Peter Pan.
              </p>
              <Button variant="primary" size="lg" href="#menu">
                Xem thực đơn
              </Button>
            </Col>
            <Col md={5}>
              <img
                src="https://picsum.photos/seed/rbhero/800/600"
                alt="Không gian nhà hàng"
                className="img-fluid rounded-3 shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Menu */}
      <Container id="menu" className="my-5">
        <h2 className="h3 mb-4">Thực đơn nổi bật</h2>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3 mb-0">Đang tải thực đơn…</p>
          </div>
        ) : (
          <Row xs={1} md={3} className="g-4">
            {menu.map((dish) => (
              <Col key={dish.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={dish.image} alt={dish.name} />
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start">
                      <Card.Title>{dish.name}</Card.Title>
                      <Badge bg="secondary">{dish.category}</Badge>
                    </div>
                    <Card.Text className="text-muted">
                      {dish.description}
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-bold fs-5">
                        ${dish.price.toFixed(2)}
                      </span>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => openDish(dish)}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {cart.length > 0 && (
          <Alert variant="success" className="mt-4">
            Giỏ hàng có {cart.length} món, tổng ${total.toFixed(2)}.
          </Alert>
        )}
      </Container>

      {/* Liên hệ */}
      <div id="contact" className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={7}>
              <h2 className="h3 mb-3">Nhận thực đơn mới qua email</h2>

              {sent && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setSent(false)}
                >
                  Đã đăng ký. Thực đơn mới sẽ được gửi vào thứ Hai hàng tuần.
                </Alert>
              )}

              <Form noValidate onSubmit={handleSubscribe}>
                <Form.Group className="mb-3" controlId="subName">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nguyễn Văn An"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={name.length > 0 && !nameValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Tên phải có ít nhất 2 ký tự.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="subEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ban@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={email.length > 0 && !emailValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Email không đúng định dạng.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={!nameValid || !emailValid}
                >
                  Đăng ký
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="bg-dark text-white-50 py-4">
        <Container className="d-flex flex-wrap justify-content-between">
          <span>© 2026 ConFusion</span>
          <span>121, Clear Water Bay Road, Hong Kong</span>
        </Container>
      </footer>

      {/* Modal chi tiết món */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{activeDish && activeDish.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeDish && (
            <>
              <img
                src={activeDish.image}
                alt={activeDish.name}
                className="img-fluid rounded mb-3"
              />
              <p>{activeDish.description}</p>
              <p className="fw-bold mb-0">
                Giá: ${activeDish.price.toFixed(2)}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => addToCart(activeDish)}>
            Thêm vào giỏ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReactBootstrapSite;
