import {useState, useCallback, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import {Box, Divider, Drawer, IconButton} from "@mui/material";
import MinahLogoPNG from "../../assets/icons/MinahLogo.png";
import {useDispatch, useSelector} from "react-redux";
import {
  selectUserData,
  setToken,
  setUserData,
  setUserID,
} from "@/redux/accountSlice";
import {getImageUrl} from "@/libs/ultis";
import {useTranslation} from "react-i18next";
import LanguageButton from "../language/LanguageButton";
import {useRouter} from "next/router";

const ItemMenu = ({store, discover, news, pathname}) => {
  return (
    <>
      <Link
        href="/"
        className={`hover-effect ${pathname === "/" ? "text-primary" : ""}`}
      >
        {store}
      </Link>
      <Link href="/discover" className="hover-effect">
        {discover}
      </Link>
      <Link href="/" className="hover-effect">
        {news}
      </Link>
    </>
  );
};

function Navbar() {
  const {t} = useTranslation();
  const router = useRouter();
  const {pathname} = router;
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const {username, avatar} = userData?.attributes ?? {};

  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);

  const openUserMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const CloseUserMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = useCallback(() => {
    setDrawer((pre) => !pre);
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 1024 && setDrawer(false),
    );
  }, []);

  const handleLogOut = useCallback(() => {
    CloseUserMenu();
    dispatch(setToken(null));
    dispatch(setUserID(null));
    dispatch(setUserData(null));
  }, [dispatch, CloseUserMenu]);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navbar">
          <div className="lg:w-full">
            <div className="relative w-[35px] h-[35px] lg:w-[40px] lg:h-[40px]">
              <Link href="/">
                <Image
                  alt="logo"
                  src={MinahLogoPNG}
                  fill
                  className="object-cover"
                  draggable="false"
                  priority="false"
                  sizes="100vw"
                />
              </Link>
            </div>
          </div>
          <div className="menu">
            <ItemMenu
              store={t("store")}
              discover={t("discover")}
              news={t("news")}
              locale={pathname}
            />
          </div>
          <div className="hidden lg:flex items-center justify-end space-x-4 w-full ">
            <LanguageButton />
            {userData ? (
              <div className="">
                <Avatar
                  sx={{cursor: "pointer"}}
                  variant="rounded"
                  alt="Avatar"
                  onClick={openUserMenu}
                  src={getImageUrl(avatar)}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={openAnchor}
                  onClose={CloseUserMenu}
                  className="mt-1"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{sx: {width: "fit"}}}
                >
                  <Typography
                    onClick={CloseUserMenu}
                    className="text-center pb-1.5"
                  >
                    {username}
                  </Typography>
                  <Divider />
                  <div className="mt-1.5">
                    <Link href="/account/profile">
                      <MenuItem onClick={CloseUserMenu}>
                        {t("profile")}
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
                  </div>
                </Menu>
              </div>
            ) : (
              <Link href="/account/login" className="hidden lg:block">
                <Button variant="contained">{t("login")}</Button>
              </Link>
            )}
          </div>

          <div className="flex items-center lg:hidden space-x-3">
            <IconButton aria-label="Menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"right"}
              open={drawer}
              PaperProps={{sx: {width: "70%"}}}
              onClose={toggleDrawer}
            >
              <div className="h-16 flex justify-between items-center px-1">
                <LanguageButton />

                <IconButton onClick={toggleDrawer}>
                  <ClearIcon />
                </IconButton>
              </div>
              <Box
                role="presentation"
                onClick={toggleDrawer}
                className="menu-mobile"
              >
                <div className="flex flex-col items-center space-y-6 uppercase">
                  <ItemMenu
                    store={t("store")}
                    discover={t("discover")}
                    news={t("news")}
                  />
                </div>

                <div className="w-full">
                  {userData ? (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <Link href="/account/profile">
                          <Avatar
                            variant="rounded"
                            alt="Avatar"
                            src={getImageUrl(avatar)}
                          />
                        </Link>
                        <Link href="/account/profile">
                          <Typography>{username}</Typography>
                        </Link>
                      </div>
                      <Button
                        variant="contained"
                        sx={{px: 0, width: "100%"}}
                        onClick={handleLogOut}
                      >
                        {t("logout")}
                      </Button>
                    </div>
                  ) : (
                    <Link href="/account/login">
                      <Button variant="contained" sx={{width: "100%"}}>
                        {t("login")}
                      </Button>
                    </Link>
                  )}
                </div>
              </Box>
            </Drawer>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
