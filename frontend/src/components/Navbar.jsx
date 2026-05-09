// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-5">
//       <div className="mb-10">
//         <h1 className="text-3xl font-bold text-cyan-600">FinTrack</h1>
//       </div>

//       <nav className="space-y-3">
//         <Link
//           to="/dashboard"
//           className="block rounded-xl bg-cyan-100 px-4 py-3 font-medium text-cyan-700"
//         >
//           Dashboard
//         </Link>

//         <Link
//           to="/income"
//           className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
//         >
//           Income
//         </Link>

//         <Link
//           to="/expense"
//           className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
//         >
//            Expense
//         </Link>

//         <Link
//           to="/reports"
//           className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
//         >
//           Reports
//         </Link>

//         <Link
//           to="/categories"
//           className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
//         >
//           Categories
//         </Link>

//         <button
//           onClick={handleLogout}
//           className="absolute bottom-6 left-5 w-[215px] rounded-xl px-4 py-3 text-left font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
//         >
//           Logout
//         </button>
//       </nav>
//     </aside>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 md:hidden">
        <h1 className="text-2xl font-bold text-cyan-600">FinTrack</h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 border-r border-gray-200 bg-white p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <h1 className="text-3xl font-bold text-cyan-600">FinTrack</h1>

          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="mb-10 hidden md:block">
          <h1 className="text-3xl font-bold text-cyan-600">FinTrack</h1>
        </div>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="block rounded-xl bg-cyan-100 px-4 py-3 font-medium text-cyan-700"
          >
            Dashboard
          </Link>

          <Link
            to="/income"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            Income
          </Link>

          <Link
            to="/expense"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            Expense
          </Link>

          <Link
            to="/reports"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            Reports
          </Link>

          <Link
            to="/categories"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            Categories
          </Link>

          <button
            onClick={handleLogout}
            className="absolute bottom-6 left-5 w-[215px] rounded-xl px-4 py-3 text-left font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;