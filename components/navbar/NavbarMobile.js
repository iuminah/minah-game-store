import React, {useEffect, useCallback} from "react";
import {getImageUrl} from "@/libs/ultis";
import {useRouter} from "next/router";
import {
  selectUserData,
  selectUserID,
  setToken,
  setUserData,
  setUserID,
} from "@/redux/accountSlice";
import {useDispatch, useSelector} from "react-redux";
import {MenuItem} from "./Navbar";
import {getUserData} from "@/libs/api";
import {Avatar, Button} from "antd";
import Link from "next/link";
import defaultAvatar from "../../assets/icons/userIcon.png";

function NavbarMobile({openSlideMenu, handleCloseMenu}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userLogged = useSelector(selectUserID);
  const userData = useSelector(selectUserData);

  const userName = userData?.attributes.username;
  const avatar = getImageUrl(userData?.attributes?.avatar);

  useEffect(() => {
    (async function userData() {
      const data = await getUserData(userLogged);
      dispatch(setUserData(data));
    })();
  }, [userLogged]);

  const logout = useCallback(() => {
    router.push("/");
    dispatch(setUserID(null));
    dispatch(setToken(null));
  }, []);

  return (
    <div className={`container h-full ${openSlideMenu ? "block" : "hidden"}`}>
      <div className="navbar-mobile-content">
        <div className="navlink-mobile">
          <MenuItem handleCloseMenu={handleCloseMenu} />
        </div>
        <div className="avatar-mobile">
          {userLogged ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link href="/account/profile" onClick={handleCloseMenu}>
                  <Avatar
                    shape="square"
                    size={40}
                    src={avatar || defaultAvatar.src}
                    className="hover:cursor-pointer"
                  />
                </Link>
                <Link href="/account/profile" onClick={handleCloseMenu}>
                  <p className="font-bold">{userName}</p>
                </Link>
              </div>
              <p onClick={logout} className="font-bold">
                Logout
              </p>
            </div>
          ) : (
            <Link href="/account/login" onClick={handleCloseMenu}>
              <Button size="large" className="w-full text-text-primary">
                LOGIN
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarMobile;
