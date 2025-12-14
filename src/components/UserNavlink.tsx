import { FlexBox } from "@/styles/components/ui.Styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBell,
  FaChartArea,
  FaPlus,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className={active ? "active" : ""}>
      <FlexBox $gap={10}>
        {children === "Add Product" ? (
          <FaPlus />
        ) : children === "Edit Profile" ? (
          <IoIosSettings />
        ) : children === "Manage Requests" ? (
          <FaBell />
        ) : (
          <FaShoppingBag />
        )}

        {children}
      </FlexBox>
    </Link>
  );
}
