import {useState, useEffect, useCallback} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";

export default function Menu() {
  const [openNav, setOpenNav] = useState(false);
  const [userLogged, setUserLogged] = useState(null);
  console.log("userLogged :", userLogged);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
    setUserLogged(localStorage.getItem("username"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="max-w-[100%] lg:px-8 lg:py-4 rounded-none ">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal text-lg"
        >
          <span>Minah Game Store</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {userLogged ? (
          <p className="hidden lg:block cursor-pointer" onClick={logout}>
            Hello <span className="text-amber-500">{userLogged}</span> !
          </p>
        ) : (
          <Link href="/account/login">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              Login
            </Button>
          </Link>
        )}

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
      </div>
      <MobileNav open={openNav}>
        {navList}
        {userLogged ? (
          <p className="block lg:hidden text-black px-1" onClick={logout}>
            Hello <span className="text-amber-500">{userLogged}</span> !
          </p>
        ) : (
          <Link href="/account/login">
            <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Login</span>
            </Button>
          </Link>
        )}
      </MobileNav>
    </Navbar>
  );
}
