//FooterExpenses.jsx chứa "@2025 Personal Budget" được căn bên trái, "Built with React, Redux Toolkit & Json Server bên phải". Footer này sẽ xuất hiện ở tất cả các trang sau khi người dùng đăng nhập thành công, tạo sự nhất quán và chuyên nghiệp cho giao diện người dùng.

function FooterExpenses() {
    return (
        <footer className="bg-dark text-white py-3 mt-auto">
            <div className="container d-flex justify-content-between">  
                <span>&copy; 2025 Personal Budget</span>
            <span>Built with React, Redux Toolkit & Json Server</span>
        </div>
    </footer>
);
}
export default FooterExpenses;
