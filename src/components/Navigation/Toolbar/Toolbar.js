import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle click={props.drawerToggleClicked}>Menu</DrawerToggle>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DekstopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
