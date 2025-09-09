import { useAuth } from "../hooks/useAuth";
const Topbar = () => {
  const { logout } = useAuth();
  return (
    <header className="w-full bg-white shadow p-4 flex justify-end">
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">User</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default Topbar;
