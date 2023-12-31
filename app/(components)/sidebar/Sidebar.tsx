"use client";
import styled from "styled-components";
import { useGlobalState } from "../(context)/globalProvider";
import menu from "../utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useClerk, useUser } from "@clerk/nextjs"; //button to sign out from clerk
import Button from "../button/Button";
import { arrowLeft, bars, logout } from "../utils/Icons";

const Sidebar = () => {
  const { theme, collapsed, setCollpased } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  // function to route to the menu link
  const handleClick = (link: string) => {
    router.push(link);
  };

  const userData = useUser().user;

  const { firstName, lastName, imageUrl } = userData || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      {/* button to toggle sidebar start */}
      <button
        className="toggle-nav shadow-slate-600 shadow-sm"
        onClick={() => setCollpased(!collapsed)}
      >
        {collapsed ? bars : arrowLeft}
      </button>
      {/* button to toggle sidebar end */}

      {/* profile start */}
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          {/* <Image
            width={70}
            height={70}
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
            alt="profile imgae"
          /> */}
          <div className="user-btn w-full h-full flex justify-center items-center border border-emerald-500 rounded-full">
            <UserButton />
          </div>
        </div>
        <h1>
          {/* <span>First</span>
          <span>Last</span> */}
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h1>
      </div>
      {/* profile end */}

      {/* nav menu start */}
      <ul className="nav-items">
        {menu.map((item, idx) => (
          <li
            key={idx}
            className={`nav-item ${pathname === item.link ? "active" : ""}`}
            onClick={() => handleClick(item.link)}
          >
            {item.icon}
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
      {/* nav menu end */}

      <div className="sign-out relative m-6">
        <Button
          name="Sign-Out"
          type="submit"
          //@ts-ignore
          selector="btn-login"
          padding="0.4rem 0.8rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          icon={logout}
          click={() => signOut(() => router.push("/"))}
        />
      </div>
      {/* <button>
        <UserButton afterSignOutUrl="/" />
        Sign Out
      </button> */}
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};
  transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);

  transform: ${(props) =>
    props.collapsed ? "translateX(-107%)" : "translateX(0)"};

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 0;
    background: ${(props) => props.theme.colorBg3};
    transition: all 0.55s linear;
    border-radius: 1rem;
    border: 2px solid ${(props) => props.theme.borderColor2};
    opacity: 0.2;
  }
  h1 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    line-height: 1;

    margin-left: 0.8rem;
    font-size: clamp(1.2rem, 4vw, 1.4rem);
    line-height: 100%;
  }

  .image,
  h1 {
    position: relative;
    z-index: 1;
  }

  .image {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.5s ease;
    border-radius: 100%;

    width: 70px;
    height: 70px;
    img {
      border-radius: 100%;
      transition: all 0.5s ease;
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};
    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
      line-height: 1;
    }
  }

  .nav-item {
    position: relative;
    padding: 0.7rem 1rem 0.8rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
    cursor: pointer;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};
      z-index: 1;
      transition: all 0.3s ease-in-out;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    a {
      font-weight: 500;
    }
    i {
      /* display: flex;
      justify-content: center;
      align-items: center; */
      color: ${(props) => props.theme.colorIcons};
    }
    &:hover {
      &::after {
        width: 100%;
      }
      &::before {
        width: 5px;
      }
    }
  }
  .active::before {
    width: 5px;
  }

  .toggle-nav {
    display: none;
    position: absolute;
    right: -3rem;
    top: 5rem;
    padding: 1rem;

    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: ${(props) => props.theme.colorBg2};
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;
    .toggle-nav {
      display: block;
    }
  }
`;
