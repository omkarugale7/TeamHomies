import React from 'react'
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import './NavbarAdmin.css';
import NavigationAdmin from './NavigationAdmin';
import MenuToggleAdmin from './MenuToggleAdmin';
import { useDimensions } from './UseDimension.js';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed:() =>({
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  })
};
function NavbarAdmin() {
    
      const [isOpen, toggleOpen] = useCycle(false, true);
      const containerRef = useRef(null);
      const { height } = useDimensions(containerRef);
  return (
    <div >
      <motion.nav
      className='admin-nav'
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      >
        <motion.div className="background-nav" variants={sidebar} />
        <NavigationAdmin/>
        <MenuToggleAdmin toggle={() => toggleOpen()} />
      </motion.nav>
      
    </div>
  )
}

export default NavbarAdmin;