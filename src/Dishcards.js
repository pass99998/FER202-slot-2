import React, { useState, useEffect } from "react";

// Exercise 7: Demo about Cards Column (Bootstrap 5)

const DISH_DATA = [
  {
    id: 0,
    name: "Uthappizza",
    price: "4.99",
    category: "Mains",
    image: "https://picsum.photos/seed/uthappizza/600/400",
    description:
      "A unique combination of Indian Uthappam and Italian pizza, topped with mozzarella and olives.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    price: "1.99",
    category: "Appetizer",
    image: "https://picsum.photos/seed/zucchipakoda/600/400",
    description:
      "Deep fried Zucchini coated with mildly spiced chickpea flour batter, served with tamarind sauce.",
  },
  {
    id: 2,
    name: "Vadonut",
    price: "1.99",
    category: "Appetizer",
    image: "https://picsum.photos/seed/vadonut/600/400",
    description:
      "A quintessential ConFusion experience: the North Indian Vada meets the American Donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    price: "2.99",
    category: "Dessert",
    image: "https://picsum.photos/seed/elaicheese/600/400",
    description:
      "New York Cheese Cake with the exotic flavours of Indian cardamoms and a rose water glaze.",
  },
  {
    id: 4,
    name: "Buriito Bowl",
    price: "3.49",
    category: "Mains",
    image: "https://picsum.photos/seed/burritobowl/600/400",
    description:
      "Slow cooked black beans, brown rice, grilled corn salsa and a generous scoop of guacamole.",
  },
  {
    id: 5,
    name: "Mango Lassi",
    price: "1.49",
    category: "Dessert",
    image: "https://picsum.photos/seed/mangolassi/600/400",
    description:
      "Thick yoghurt blended with Alphonso mango pulp, finished with a pinch of roasted cumin.",
  },
];

function DishCards() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  // Giả lập gọi API để minh hoạ useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDishes(DISH_DATA);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Appetizer", "Mains", "Dessert"];

  const visibleDishes =
    filter === "All" ? dishes : dishes.filter((d) => d.category === filter);

  const selectedDish = dishes.find((d) => d.id === selectedId) || null;

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải món ăn…</span>
        </div>
        <p className="mt-3 text-muted">Đang tải danh sách món ăn…</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Thực đơn</h2>
          <p className="text-muted mb-0">
            {visibleDishes.length} món đang hiển thị
          </p>
        </div>

        <div className="btn-group mt-3 mt-sm-0" role="group" aria-label="Lọc theo nhóm món">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={
                "btn " + (filter === c ? "btn-primary" : "btn-outline-primary")
              }
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* row-cols-* thay cho card-columns của Bootstrap 4 */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {visibleDishes.map((dish) => (
          <div className="col" key={dish.id}>
            <div
              className={
                "card h-100 shadow-sm " +
                (selectedId === dish.id ? "border-primary" : "")
              }
            >
              <img
                src={dish.image}
                className="card-img-top"
                alt={dish.name}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">{dish.name}</h5>
                  <span className="badge text-bg-secondary">{dish.category}</span>
                </div>
                <p className="card-text text-muted">{dish.description}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5">${dish.price}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      setSelectedId(selectedId === dish.id ? null : dish.id)
                    }
                  >
                    {selectedId === dish.id ? "Bỏ chọn" : "Chọn món"}
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted small">
                Mã món: #{dish.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleDishes.length === 0 && (
        <div className="alert alert-light border text-center mt-4" role="alert">
          Chưa có món nào trong nhóm này. Chọn nhóm khác để xem thêm.
        </div>
      )}

      {selectedDish && (
        <div className="alert alert-success mt-4" role="alert">
          Bạn đã chọn <strong>{selectedDish.name}</strong> — giá $
          {selectedDish.price}.
        </div>
      )}
    </div>
  );
}

export default DishCards;
