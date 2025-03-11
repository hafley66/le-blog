/** @jsxImportSource ../rxjs-vhtml */
/** @jsxImportSourceTypes ../rxjs-vhtml */

import {jsx} from '../rxjs-vhtml/jsx-runtime';
const Derp = (props :{value: string}) => {
  console.log({props});
  return <div>Fuck</div>
};

// (<Derp value="derp"/>).subscribe(a => console.log({a}));
(Derp({value: "darp"})).subscribe(b => console.log({b}));
// (jsx(Derp, {value: "darp"})).subscribe(c => console.log({c}))
