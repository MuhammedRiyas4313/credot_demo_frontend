import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { TrashIcon, UserIcon } from "@heroicons/react/16/solid";
import { useAuth } from "../../providers/context/AuthContext";
import { toastError } from "../../utils/toast";
import { AUTH_TOKEN } from "../../common/constant_frontend.common";
import { useNavigate } from "react-router-dom";

export default function DropDown() {
  //IMPORTS
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  if (auth) {
    console.log("LOGED IN ");
  }

  //HANDLERS
  const handleLogOut = () => {
    try {
      if (!window.confirm("Are you sure you want to exit ? ")) {
        return;
      }

      setAuth(null);
      localStorage.removeItem(AUTH_TOKEN);
      navigate("/");
    } catch (error) {
      toastError(error);
    }
  };
  const handleSeeOrders = () => {
    navigate("/orders");
  };

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none ">
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E8E8E84A] hover:bg-gray-300 transition-colors duration-200">
          <UserIcon className="md:size-5 size-3 fill-black" />
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 z-10 origin-top-right rounded-xl border border-gray-300 bg-white p-1 text-sm/6 text-gray-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={handleSeeOrders}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100 focus:bg-gray-200"
          >
            <UserIcon className="size-4 fill-gray-600" />
            My Orders
            <kbd className="ml-auto hidden font-sans text-xs text-gray-500 group-data-[focus]:inline">
              ⌘E
            </kbd>
          </button>
        </MenuItem>

        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100 focus:bg-gray-200"
            onClick={handleLogOut}
          >
            <TrashIcon className="size-4 fill-gray-600" />
            Logout
            <kbd className="ml-auto hidden font-sans text-xs text-gray-500 group-data-[focus]:inline">
              ⌘D
            </kbd>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
