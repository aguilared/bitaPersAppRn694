import {useCallback, useContext, useState} from 'react';
import {BitacoraContext} from '../context/BitacoraState';

export default function UseBitacora() {
  const {bitacora, setBitacora} = useContext(BitacoraContext);

  const [state, setState] = useState({loadingBitacora: false, error: false});

  const loadBitacora = useCallback(
    bitacoratoLoad => {
      //console.log("Bitacora to load", BitacoratoLoad);
      setState({loadingBitacora: true, error: false});

      window.sessionStorage.setItem('Bitacora', bitacoratoLoad);
      //console.log(
      //'sesionstorage loadBitacora',
      //window.sessionStorage.getItem('Bitacora'),
      //);
      setState({loadingBitacora: false, error: false});
      setBitacora(bitacoratoLoad);
    },
    [setBitacora, setState],
  );

  const clearBitacora = useCallback(() => {
    //console.log("Limpiando Bitacora");
    window.sessionStorage.removeItem('bitacora');
    setBitacora(null);
  }, [setBitacora]);

  return {
    isBitacora: Boolean(bitacora),
    bitacora: bitacora,
    isBitacoraLoading: state.loadingBitacora,
    loadBitacora,
    clearBitacora,
  };
}
