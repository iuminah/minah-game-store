// import {useState, useEffect, useCallback} from "react";
// import {
//   Navbar,
//   MobileNav,
//   Button,
//   IconButton,
//   Menu,
//   MenuHandler,
//   MenuList,
//   Avatar,
//   MenuItem,
// } from "@material-tailwind/react";
// import Link from "next/link";
// import {useDispatch, useSelector} from "react-redux";
// import {
//   setToken,
//   selectUserID,
//   setUserID,
//   setUserData,
//   selectUserData,
// } from "@/redux/accountSlice";
// import {DOMAIN, getUserData} from "@/libs/api";
// import userIcon from "../../public/favicon/userIcon.png";
// import {useRouter} from "next/router";
// import Image from "next/image";

// export default function MenuBar() {
//   const dispatch = useDispatch();
//   const [openNav, setOpenNav] = useState(false);
//   const [avatar, setAvatar] = useState("");
//   const [buttonLogin, setButtonLogin] = useState();

//   const router = useRouter();
//   const pathname = router.pathname;

//   const userLogged = useSelector(selectUserID);
//   const userInfo = useSelector(selectUserData);
//   const userAvatar = userInfo?.attributes?.avatar?.data?.attributes?.url;
//   const userName = userInfo?.attributes?.username;

//   const handleCloseMenu = useCallback(() => {
//     setOpenNav(false);
//   }, [setOpenNav]);

//   useEffect(() => {
//     if (pathname === "/account/login") {
//       setButtonLogin(false);
//     } else {
//       setButtonLogin(true);
//     }
//   }, [pathname]);

//   useEffect(() => {
//     const userData = async () => {
//       const userData = await getUserData(userLogged);
//       dispatch(setUserData(userData));
//     };
//     userData();

//     if (userAvatar) {
//       setAvatar(DOMAIN + userAvatar);
//     }
//   }, [userLogged, dispatch, userAvatar]);

//   useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false),
//     );
//   }, []);

//   const logout = useCallback(() => {
//     dispatch(setUserID(null));
//     dispatch(setToken(null));
//   }, [dispatch]);

//   const navList = (
//     <ul className="navlist">
//       <div className="lg:flex my-4 lg:my-0 space-y-4 lg:space-y-0 lg:space-x-6">
//         <Link href="/" className="flex items-center hover-effect">
//           Store
//         </Link>
//         <Link href="/discover" className="flex items-center hover-effect">
//           Discover
//         </Link>
//         <Link href="/news" className="flex items-center hover-effect">
//           News
//         </Link>
//       </div>

//       <span className="lg:hidden">
//         {userLogged ? (
//           <span className="">
//             <Menu placement="bottom-end">
//               <MenuHandler className="cursor-pointer">
//                 <Avatar src={avatar || userIcon.src} alt="avatar" size="sm" />
//               </MenuHandler>
//               <MenuList>
//                 {userName && (
//                   <Link href="/account/profile" className="outline-none">
//                     <MenuItem>{userName}</MenuItem>
//                   </Link>
//                 )}
//                 <MenuItem onClick={logout} className="cursor-pointer">
//                   Logout
//                 </MenuItem>
//               </MenuList>
//             </Menu>
//           </span>
//         ) : buttonLogin ? (
//           <Link href="/account/login">
//             <Button
//               variant="gradient"
//               size="sm"
//               className="w-full lg:w-auto"
//               onClick={handleCloseMenu}
//             >
//               Sign in
//             </Button>
//           </Link>
//         ) : null}
//       </span>
//     </ul>
//   );

//   return (
//     <div className="bg-gray w-full flex items-center justify-center fixed z-50">
//       <Navbar className="rounded-none bg-gray border-none navbar">
//         <div className="container mx-auto px-4 md:px-6 lg:px-4 flex items-center justify-between">
//           <div className="relative">
//             <Link href="/">
//               <div className="absolute -top-[18px] lg:-top-[18px] w-[35px] h-[35px] ">
//                 <Image
//                   alt="logo"
//                   src={MinahLogoPNG}
//                   fill
//                   className="object-cover"
//                   draggable="false"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
//                 />
//               </div>
//             </Link>
//           </div>
//           <div className="hidden lg:block">{navList}</div>
//           <div className="flex items-center">
//             <IconButton
//               variant="text"
//               className="ml-auto h-6 w-6 lg:hidden"
//               onClick={() => setOpenNav(!openNav)}
//             >
//               {openNav ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </IconButton>
//             {userLogged ? (
//               <span className="hidden lg:block">
//                 <Menu placement="bottom-end">
//                   <MenuHandler className="cursor-pointer">
//                     <Avatar
//                       src={avatar || userIcon.src}
//                       alt="avatar"
//                       size="sm"
//                     />
//                   </MenuHandler>
//                   <MenuList>
//                     {userName && (
//                       <Link href="/account/profile" className="outline-none">
//                         <MenuItem>{userName} a</MenuItem>
//                       </Link>
//                     )}
//                     <MenuItem onClick={logout} className="cursor-pointer">
//                       Logout
//                     </MenuItem>
//                   </MenuList>
//                 </Menu>
//               </span>
//             ) : buttonLogin ? (
//               <Link href="/account/login">
//                 <Button
//                   variant="gradient"
//                   size="sm"
//                   className="hidden lg:inline-block"
//                 >
//                   Sign in
//                 </Button>
//               </Link>
//             ) : null}
//           </div>
//         </div>
//         <MobileNav open={openNav}>{navList}</MobileNav>
//       </Navbar>
//     </div>
//   );
// }
import React, {useCallback} from "react";
import Image from "next/image";
import MinahLogoPNG from "../../assets/icons/MinahLogo.png";
import Link from "next/link";
import UserProfile from "./UserProfile";
import MenuButton from "../../assets/icons/menu-button.svg";
import CloseIcon from "../../assets/icons/close-icon.svg";
import {Button} from "antd";
import {useState} from "react";
import {useEffect} from "react";
import NavbarMobile from "./NavbarMobile";
import {useRouter} from "next/router";

export const MenuItem = ({handleCloseMenu}) => {
  return (
    <>
      <Link href="/" onClick={handleCloseMenu} className="hover-effect">
        <button>STORE</button>
      </Link>
      <Link href="/discover" onClick={handleCloseMenu} className="hover-effect">
        DISCOVER
      </Link>
      <Link href="/news" onClick={handleCloseMenu} className="hover-effect">
        NEWS
      </Link>
    </>
  );
};

const Navbar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [buttonLogin, setButtonLogin] = useState();
  const [openSlideMenu, setOpenSlideMenu] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 1024 && setOpenSlideMenu(false),
    );
  }, []);

  useEffect(() => {
    if (pathname === "/account/login") {
      setButtonLogin(false);
    } else {
      setButtonLogin(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (openSlideMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openSlideMenu]);

  const handleToggleSlideMenu = useCallback(() => {
    setOpenSlideMenu((pre) => !pre);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenSlideMenu(false);
  }, []);

  return (
    <div className={`${openSlideMenu ? "overflow-hidden" : "overflow-auto"}`}>
      <div className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <Link href="/" onClick={handleCloseMenu}>
              <div className="relative w-[40px] h-[40px]">
                <Image
                  alt="logo"
                  src={MinahLogoPNG}
                  fill
                  className="object-cover"
                  draggable="false"
                  priority="false"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </div>
            </Link>
          </div>
          <div className="navlink hidden lg:block space-x-6 ">
            <MenuItem />
          </div>
          {buttonLogin ? (
            <div className="avatar hidden lg:block">
              <UserProfile />
            </div>
          ) : (
            <div></div>
          )}

          {/* Menu Mobile Button */}
          <div className="block lg:hidden">
            <Button type="text" onClick={handleToggleSlideMenu}>
              {openSlideMenu ? (
                <CloseIcon className="fill-text-primary w-4" />
              ) : (
                <MenuButton className="fill-text-primary w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className={`navbar-mobile ${openSlideMenu ? "w-full" : "w-0"}`}>
        <NavbarMobile
          openSlideMenu={openSlideMenu}
          handleCloseMenu={handleCloseMenu}
        />
      </div>
    </div>
  );
};
export default Navbar;