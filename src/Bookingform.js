import React, { useState, useEffect } from "react";

// Exercise 8: Demo about Form Control (React controlled components + Bootstrap 5)
// Lưu ý Bootstrap 5:
//  - .form-group  ->  .mb-3
//  - <label className="form-label">
//  - <select className="form-select"> (thay cho .custom-select)
//  - input-group không cần .input-group-prepend / .input-group-append nữa
//  - .is-invalid + .invalid-feedback vẫn giữ nguyên

const INITIAL_VALUES = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  guests: "1",
  date: "",
  smoking: false,
  contactType: "Tel.",
  message: "",
  agree: false,
};

function BookingForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Tự ẩn thông báo thành công sau 4 giây
  useEffect(() => {
    if (!showAlert) return;
    const timer = setTimeout(() => setShowAlert(false), 4000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = (v) => {
    const errors = {};

    if (!v.firstname.trim()) errors.firstname = "Vui lòng nhập họ.";
    else if (v.firstname.trim().length < 2)
      errors.firstname = "Họ phải có ít nhất 2 ký tự.";

    if (!v.lastname.trim()) errors.lastname = "Vui lòng nhập tên.";
    else if (v.lastname.trim().length < 2)
      errors.lastname = "Tên phải có ít nhất 2 ký tự.";

    if (!v.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[0-9]{9,11}$/.test(v.phone.trim()))
      errors.phone = "Số điện thoại chỉ gồm 9–11 chữ số.";

    if (!v.email.trim()) errors.email = "Vui lòng nhập email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
      errors.email = "Email không đúng định dạng.";

    if (!v.date) errors.date = "Vui lòng chọn ngày đặt bàn.";

    if (!v.agree) errors.agree = "Bạn cần đồng ý với điều khoản đặt bàn.";

    return errors;
  };

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  // Chỉ bôi đỏ khi người dùng đã chạm vào ô đó hoặc đã bấm nút đặt bàn
  const invalidClass = (field) =>
    (touched[field] || submitted) && errors[field] ? " is-invalid" : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    console.log("Booking:", values);
    setShowAlert(true);
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmitted(false);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmitted(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Đặt bàn</h4>
            </div>

            <div className="card-body">
              {showAlert && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  Đặt bàn thành công. Nhà hàng sẽ liên hệ bạn để xác nhận.
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Đóng"
                    onClick={() => setShowAlert(false)}
                  ></button>
                </div>
              )}

              <form noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstname" className="form-label">
                      Họ
                    </label>
                    <input
                      type="text"
                      className={"form-control" + invalidClass("firstname")}
                      id="firstname"
                      name="firstname"
                      placeholder="Nguyễn"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">{errors.firstname}</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Tên
                    </label>
                    <input
                      type="text"
                      className={"form-control" + invalidClass("lastname")}
                      id="lastname"
                      name="lastname"
                      placeholder="An"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">{errors.lastname}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+84</span>
                    <input
                      type="tel"
                      className={"form-control" + invalidClass("phone")}
                      id="phone"
                      name="phone"
                      placeholder="912345678"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">{errors.phone}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">@</span>
                    <input
                      type="email"
                      className={"form-control" + invalidClass("email")}
                      id="email"
                      name="email"
                      placeholder="ban@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="guests" className="form-label">
                      Số khách
                    </label>
                    <select
                      className="form-select"
                      id="guests"
                      name="guests"
                      value={values.guests}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="date" className="form-label">
                      Ngày & giờ
                    </label>
                    <input
                      type="datetime-local"
                      className={"form-control" + invalidClass("date")}
                      id="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">{errors.date}</div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="contactType" className="form-label">
                      Liên hệ qua
                    </label>
                    <select
                      className="form-select"
                      id="contactType"
                      name="contactType"
                      value={values.contactType}
                      onChange={handleChange}
                    >
                      <option>Tel.</option>
                      <option>Email</option>
                    </select>
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="smoking"
                    name="smoking"
                    checked={values.smoking}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="smoking">
                    Ngồi khu vực hút thuốc
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Ghi chú
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Dị ứng thực phẩm, dịp kỷ niệm, vị trí bàn mong muốn…"
                    value={values.message}
                    onChange={handleChange}
                  ></textarea>
                  <div className="form-text">
                    {values.message.length}/300 ký tự
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    className={"form-check-input" + invalidClass("agree")}
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={values.agree}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="form-check-label" htmlFor="agree">
                    Tôi đồng ý với điều khoản đặt bàn
                  </label>
                  <div className="invalid-feedback">{errors.agree}</div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Đặt bàn
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                  >
                    Nhập lại
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;