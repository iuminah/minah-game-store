import {Avatar, Button, Dropdown} from "antd";
import Link from "next/link";
import React, {useEffect, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  selectUserData,
  selectUserID,
  setToken,
  setUserData,
  setUserID,
} from "@/redux/accountSlice";
import {getUserData} from "@/libs/api";
import {getImageUrl} from "@/libs/ultis";
import {useRouter} from "next/router";
import defaultAvatar from "../../assets/icons/userIcon.png";

function UserProfile() {
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

  const items = [
    {
      key: "1",
      label: <Link href="/account/profile">{userName}</Link>,
    },
    {
      key: "2",
      label: <button onClick={logout}>Logout</button>,
    },
  ];

  return (
    <div>
      {userData ? (
        <Dropdown
          menu={{
            items,
            style: {width: "100px", textAlign: "center"},
          }}
          trigger={["click"]}
          placement="bottomRight"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Avatar
            shape="square"
            size={40}
            src={avatar || defaultAvatar.src}
            className="hover:cursor-pointer"
          />
        </Dropdown>
      ) : (
        <Link href="/account/login">
          <Button className="text-text-primary">LOGIN</Button>
        </Link>
      )}
    </div>
  );
}

export default UserProfile;
