"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./container";
import { useCartContext } from "@/context/cartContext";

function Navbar() {
  const pathName = usePathname();
  const { cartTotalQuantity } = useCartContext();

  const navLinks = [
    {
      href: "/",
      title: "خانه ",
    },
    {
      href: "/store",
      title: "فروشگاه ",
    },
    {
      href: "/dashboard",
      title: " پنل ",
    },
    {
      href: "/about",
      title: " درباره ما ",
    },
    {
      href: "/contact",
      title: "ارتباط با ما ",
    },
  ];

  return (
    <nav className="shadow p-4">
      <Container>
        <div className="flex justify-between flex-row-reverse">
          <div>
            {navLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={`mr-4 ${pathName === item.href ? "text-sky-500" : ""}`}
                  href={item.href}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
          <div>
            <span className="px-2 py-1 bg-sky-500 text-white rounded-full">
              {cartTotalQuantity}
            </span>
            <Link
              href={"/cart"}
              className={`mr-4 ${pathName === "/cart" ? "text-sky-500" : ""}`}
            >
              سبد خرید
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
