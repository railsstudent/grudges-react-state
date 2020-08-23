import React, { useContext, useEffect } from 'react';
import Grudge from './Grudge';

import { GrudgeContext } from './GrudgeContext';

const Grudges = () => {
  const { grudges } = useContext(GrudgeContext);
  const forgivenCount = grudges.filter(g => g.forgiven).length;

  useEffect(() => {
    document.title = `${forgivenCount}`;
  }, [forgivenCount]);

  console.log('Render grudges');
  return (
    <section className="Grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map(grudge => (<Grudge key={grudge.id} grudge={grudge} />))}
    </section>
  );
};

export default Grudges;
