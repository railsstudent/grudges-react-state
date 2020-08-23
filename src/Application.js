import React from 'react';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

// React.memo
// React.useCallback
// React.useMemo

const Application = () => {
  return (
    <div className="Application">
      <NewGrudge />
      <Grudges />
    </div>
  );
};

export default Application;
