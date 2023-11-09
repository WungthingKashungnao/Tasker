"use client";
import styled from "styled-components";
import { useGlobalState } from "../(context)/globalProvider";
import menu from "../utils/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { link } from "fs";

const Sidebar = () => {
  const { theme } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();

  // function to route to the menu link
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      {/* profile start */}
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image
            width={70}
            height={70}
            src="https://xsgames.co/randomusers/avatar.php?g=female"
            alt="profile imgae"
          />
        </div>
        <h1>
          <span>Kai</span>
          <span>Briggs</span>
        </h1>
      </div>
      {/* profile end */}

      {/* nav menu start */}
      <ul className="nav-items">
        {menu.map((item) => (
          <li
            className={`nav-item ${pathname === item.link ? "active" : ""}`}
            onClick={() => handleClick(item.link)}
          >
            {item.icon}
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
      {/* nav menu end */}

      <button></button>
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
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

  /* > h1 {
    margin-left: 1rem;
    font-size: clamp(1.2rem, 4vw, 1.4rem);
    line-height: 100%;
  } */
`;
