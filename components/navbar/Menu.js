import {useState, useEffect, useCallback} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Avatar,
  MenuItem,
} from "@material-tailwind/react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {
  setToken,
  selectUserID,
  setUserID,
  setUserData,
  selectUserData,
} from "@/redux/accountSlice";
import {DOMAIN, getUserData} from "@/libs/api";
import userIcon from "../../public/favicon/userIcon.png";

export default function MenuBar() {
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState(false);
  const [avatar, setAvatar] = useState("");

  const userLogged = useSelector(selectUserID);
  const userInfo = useSelector(selectUserData);
  const userAvatar = userInfo?.[0]?.attributes?.avatar?.data?.attributes?.url;
  const userName = userInfo?.[0]?.attributes?.username;

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
    const userData = async () => {
      const userData = await getUserData(userLogged);
      dispatch(setUserData(userData));
    };
    userData();

    if (userAvatar) {
      setAvatar(DOMAIN + userAvatar);
    }
  }, [userLogged, dispatch, userAvatar]);

  const logout = useCallback(() => {
    dispatch(setUserID(null));
    dispatch(setToken(null));
  }, [dispatch]);

  const navList = (
    <ul className="mb-2 mt-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Store
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Browse
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          News
        </a>
      </Typography>
      <span className="lg:hidden">
        {userLogged ? (
          <span className="">
            <Menu placement="bottom-end">
              <MenuHandler className="cursor-pointer">
                <Avatar src={avatar || userIcon.src} alt="avatar" size="sm" />
              </MenuHandler>
              <MenuList>
                {userName && <MenuItem>{userName}</MenuItem>}
                <MenuItem onClick={logout} className="cursor-pointer">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </span>
        ) : (
          <Link href="/account/login">
            <Button variant="gradient" size="sm" className="">
              Sign in
            </Button>
          </Link>
        )}
      </span>
    </ul>
  );

  return (
    <Navbar className="max-w-[100%] lg:px-8 lg:py-4 rounded-none text-blue-gray-900">
      <div className="container mx-auto flex items-center justify-between ">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal text-lg"
        >
          <span>Minah Game Store</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="lg:space-x-4 flex items-center">
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
          {userLogged ? (
            <span className="hidden lg:block">
              <Menu placement="bottom-end">
                <MenuHandler className="cursor-pointer">
                  <Avatar src={avatar || userIcon.src} alt="avatar" size="sm" />
                </MenuHandler>
                <MenuList>
                  {userName && <MenuItem>{userName}</MenuItem>}
                  <MenuItem onClick={logout} className="cursor-pointer">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </span>
          ) : (
            <Link href="/account/login">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
}
