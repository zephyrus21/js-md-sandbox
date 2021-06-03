import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  //! to execute all code cell as one
  return useTypedSelector((state) => {
    // @ts-ignore
    const { data, order } = state.cell;
    // @ts-ignore
    const orderCells = order.map((id) => data[id]);

    const showFunc = `
      var show = (value) => {
        const roote = document.querySelector('#root');
  
        if(typeof value === 'object') {
          if(value.$$typeof && value.props){
            ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      }
    `;

    const showFuncNo = `var show = () => {}`;

    const cumulativeCodeArray = [];

    for (let c of orderCells) {
      if (c.type === 'code') {
        if (c.id === cellId) cumulativeCodeArray.push(showFunc);
        else cumulativeCodeArray.push(showFuncNo);
        cumulativeCodeArray.push(c.content);
      }
      if (c.id === cellId) break;
    }

    return cumulativeCodeArray;
  }).join('\n');
};
