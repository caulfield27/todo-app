"use client";

import PagesContainer from "@/layouts/pagesContainer/pagesContainer";
import Wrapper from "@/layouts/wrappepr/wrapper";
import { useState } from "react";

const Upcoming = () => {
  const [state, setState] = useState({
    isOpen: false,
    isSelected: false,
  });

  
  
  return (
    <PagesContainer>
      <Wrapper>
        <h1>Upcoming</h1>
        <button
          onClick={() => setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
          style={{ marginRight: "20px" }}
        >
          {state.isOpen ? "close me" : "open me"}
        </button>
        {state.isOpen ? <span>I am open</span> : <span>I am not open at all</span>}
      </Wrapper>
    </PagesContainer>
  );
};

export default Upcoming;
