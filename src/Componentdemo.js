import React, { useState, useEffect } from "react";

// Exercise 9: React Component
// Gồm: HelloWorld, AboutMe, Counter và SimpleCard (Title / Description / Image nhận props)

// ---- Các component "lá" (leaf) ----

function Title({ text }) {
  return <h5 className="card-title mb-1">{text}</h5>;
}

function Description({ text }) {
  return <p className="card-text text-muted mb-0">{text}</p>;
}

function Image({ url, alt }) {
  return <img src={url} className="card-img-top" alt={alt} />;
}

// ---- Component bao ngoài ----

function SimpleCard({ item }) {
  return (
    <div className="card h-100 shadow-sm">
      <Image url={item.imageUrl} alt={item.title} />
      <div className="card-body">
        <Title text={item.title} />
        <Description text={item.description} />
      </div>
    </div>
  );
}

// ---- Bài 1: Hello, World! ----

function HelloWorld() {
  return <h1 className="display-6">Hello, World!</h1>;
}

// ---- Bài 2: Giới thiệu bản thân ----

function AboutMe({ name, message }) {
  return (
    <div className="p-4 bg-light rounded-3">
      <h2 className="h4">Xin chào, mình là {name}</h2>
      <p className="mb-0 text-muted">{message}</p>
    </div>
  );
}

// ---- Bài 3: Counter ----

function Counter({ step = 1 }) {
  const [count, setCount] = useState(0);

  // Cập nhật tiêu đề trang mỗi khi count đổi — minh hoạ useEffect có dependency
  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h5 className="card-title">Bộ đếm</h5>
        <p className="display-4 fw-bold my-3">{count}</p>
        <div className="btn-group" role="group" aria-label="Điều khiển bộ đếm">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setCount(count - step)}
            disabled={count <= 0}
          >
            − Giảm
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setCount(0)}
          >
            Về 0
          </button>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => setCount(count + step)}
          >
            + Tăng
          </button>
        </div>
        {count === 0 && (
          <p className="form-text mt-3 mb-0">
            Bộ đếm đang ở 0, không thể giảm thêm.
          </p>
        )}
      </div>
    </div>
  );
}

// ---- Dữ liệu mẫu cho SimpleCard ----

const ITEMS = [
  {
    id: 1,
    title: "Ngày đầu học React",
    description:
      "Component là đơn vị nhỏ nhất để dựng giao diện, nhận dữ liệu qua props.",
    imageUrl: "https://picsum.photos/seed/react1/600/400",
  },
  {
    id: 2,
    title: "State và Hooks",
    description:
      "useState giữ dữ liệu thay đổi theo thời gian, useEffect xử lý side effect.",
    imageUrl: "https://picsum.photos/seed/react2/600/400",
  },
  {
    id: 3,
    title: "Kết hợp với Bootstrap",
    description:
      "Dùng class có sẵn của Bootstrap 5 để dựng giao diện responsive nhanh.",
    imageUrl: "https://picsum.photos/seed/react3/600/400",
  },
];

// ---- Component chính export ra ngoài ----

function ComponentDemo() {
  return (
    <div className="container my-5">
      <section className="mb-5">
        <HelloWorld />
      </section>

      <section className="mb-5">
        <AboutMe
          name="VNxAverr"
          message="Sinh viên Công nghệ thông tin, đang học React và Bootstrap 5."
        />
      </section>

      <section className="row mb-5">
        <div className="col-md-6 mx-auto">
          <Counter step={1} />
        </div>
      </section>

      <section>
        <h3 className="h4 mb-3">Simple Card</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {ITEMS.map((item) => (
            <div className="col" key={item.id}>
              <SimpleCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ComponentDemo;
export { HelloWorld, AboutMe, Counter, SimpleCard, Title, Description, Image };