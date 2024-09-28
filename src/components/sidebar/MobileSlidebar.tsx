import { useState } from "react";
import { Drawer, Button } from "rizzui";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
function MobileSlidebar() {
  const [drawerState, setDrawerState] = useState(false);
  return (
    <>
      <Button
        color="secondary"
        className=" lg:hidden"
        onClick={() => setDrawerState(true)}
      >
        <GiHamburgerMenu />
      </Button>
      <Drawer
        size={"sm"}
        isOpen={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <div className="py-4 px-5">
          <Button color="danger" onClick={() => setDrawerState(false)}>
            <VscChromeClose />
          </Button>
          <Sidebar />
        </div>
      </Drawer>
    </>
  );
}

export default MobileSlidebar;
