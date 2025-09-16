import type { FC, ReactElement } from "react";
import NavMenu from "./NavigationMenu";
import { MainContentStyled } from "./MainContentStyled";
type Props = {
  children?: ReactElement<any, any>;
};
const MasterLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <NavMenu />
      <MainContentStyled>{children}</MainContentStyled>
    </>
  );
};

export default MasterLayout;
