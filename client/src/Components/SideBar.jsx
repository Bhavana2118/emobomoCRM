import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import {
  FaAlignJustify,
  FaUsers,
  FaUserTie,
  FaIndustry,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { RiUserShared2Fill } from "react-icons/ri";
import { BsCalendarWeekFill, BsDatabaseFillAdd } from "react-icons/bs";
import { AiOutlineAreaChart, AiOutlineAudit } from "react-icons/ai";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import "../ComponentsCSS/Sidebar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [collapse, setCollapse] = useState(false);
  const [display, setDisplay] = useState("");
  const [breakPoint, setBreakPoint] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWidth(windowWidth);
      console.log(windowWidth);
      if (windowWidth < 600) {
        setCollapse(true);
        setDisplay("");
        setBreakPoint(true);
      } else {
        setCollapse(false);
        setDisplay("display");
        setBreakPoint(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCollapse = () => {
    setCollapse(!collapse);
    setBreakPoint(!collapse);
    // Toggle breakPoint state opposite to collapse state
  };

  return (
    <div className="sidebar">
      <Sidebar
        collapsed={collapse}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#00056b",
            height: "100vh",
            paddingTop: "40px",
            position: "relative",
            bottom: "65px",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, disabled }) => ({
              color: disabled ? "white" : "white",
              "&:hover": {
                backgroundColor: "#8a8dc5",
              },
            }),
          }}
        >
          <h3 className="Admin"> Admin </h3>
          <Link to="/Dashboard">
            <MenuItem icon={<FaChartSimple />}> DashBoard </MenuItem>
          </Link>
          <SubMenu icon={<FaUsers />} className="Sub-Menu" label="HRMS">
            <MenuItem icon={<FaUserTie />}> Employees </MenuItem>
            <MenuItem icon={<BiSolidSpreadsheet />}> Attendance </MenuItem>
            <MenuItem icon={<RiUserShared2Fill />}> Leaves </MenuItem>
            <MenuItem icon={<BsCalendarWeekFill />}> Holiday List </MenuItem>
          </SubMenu>
          <MenuItem icon={<AiOutlineAudit />}> Performance </MenuItem>
          <MenuItem icon={<AiOutlineAreaChart />}> Reports </MenuItem>
          <SubMenu
            className="Sub-Menu"
            icon={<MdOutlineCrisisAlert />}
            label="Sales"
          >
            <Link to="/dsr">
              <MenuItem icon={<BsDatabaseFillAdd />}> DSR </MenuItem>
            </Link>
            <Link to="/dsrTable">
              <MenuItem icon={<BsDatabaseFillAdd />}> Manage DSR </MenuItem>
            </Link>
            <Link to="/">
              <MenuItem icon={<GoProjectSymlink />}> Projects </MenuItem>
            </Link>
            <MenuItem icon={<FaIndustry />}> Company </MenuItem>
          </SubMenu>
          <MenuItem icon={<MdAccountCircle />}> Employee Accounts </MenuItem>
        </Menu>
      </Sidebar>
      <div
        className={`toggle-button ${display ? "" : "hidden"}`}
        onClick={toggleCollapse}
      >
        {collapse ? (
          <FaToggleOn className="toggle-icon" />
        ) : (
          <FaToggleOff className="toggle-icon" />
        )}
      </div>
    </div>
  );
};

export default SideBar;
