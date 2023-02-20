import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {selectUserData} from "@/redux/accountSlice";
import Image from "next/image";
import {getBase64, getImageUrl} from "@/libs/ultis";
import {useForm} from "react-hook-form";
import {uploadAvatar} from "@/libs/api";
import defaultAvatar from "../../assets/icons/userIcon.png";
// import ImgCrop from "antd-img-crop";

function ProfilePage() {
  const {register, handleSubmit} = useForm();
  const userData = useSelector(selectUserData);
  console.log("userData :", userData);
  // if (!userData) return null;

  const {username, email, avatar} = userData?.attributes ?? {};

  const onSubmit = async (data) => {
    const {avatar} = data;

    const res = await uploadAvatar(avatar[0]);
    console.log("res :", res);
  };

  if (userData) {
    return (
      <div>
        <div className="relative w-[100px] h-[100px]">
          <Image
            alt="avatar"
            src={getImageUrl(avatar) || defaultAvatar.src}
            fill
            className="object-cover"
            draggable="false"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>
        <div>User Name : {username}</div>
        <div>Email : {email}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" {...register("avatar")} />
          <input type="submit" />
        </form>
      </div>
    );
  } else return null;
}

ProfilePage.propTypes = {};

export default ProfilePage;
