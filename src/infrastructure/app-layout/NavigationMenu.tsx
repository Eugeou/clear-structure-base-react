import { type FC, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { routePaths } from "../../routes/route-path";
interface NavigationLink {
  label: string;
  href: string;
  ref?: string;
}

const navigationLinks: Array<NavigationLink> = [
  {
    label: "Home",
    href: routePaths.home,
  },
  {
    label: "Pricing",
    href: routePaths.pricing,
  },
  {
    label: "About Us",
    href: routePaths.aboutUs,
  },
];

const Navbar: FC = () => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState<string>("");
  const [isChangeRoute, setIsChangeRoute] = useState<boolean>(false);
  const menuMarkup = useMemo(() => {
    return (
      <>
        {navigationLinks.map((link) => {
          return (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          );
        })}
      </>
    );
  }, []);
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    // when change route with different path rerender menu to update active navbar in shopify admin
    if (prevPath !== location.pathname) {
      setPrevPath(location.pathname);
      setIsChangeRoute(true);
      timeout = setTimeout(() => {
        setIsChangeRoute(false);
      }, 0);
    } else {
      setIsChangeRoute(false);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [location.pathname, prevPath]);
  return <>{!isChangeRoute && menuMarkup}</>;
};

export default Navbar;
