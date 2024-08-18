import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import FormList from '../../components/FormsList';
import './main.css';
import { useLocation } from 'react-router-dom';
import { Controll } from '../../types&interfaces/enums';

export default function Main() {
  const forms = useSelector((state: RootState) => state.form);
  const { state } = useLocation();

  return (
    <>
      <h2 className="page__title">Main Page Form</h2>
      <div className="page__wrap">
        <FormList
          formsArray={forms.formDataUncontroled}
          title="Uncontroled"
          isLast={state?.from === Controll.uncontrolled}
        />
        <FormList
          formsArray={forms.formDataControled}
          title="Controled"
          isLast={state?.from === Controll.controlled}
        />
      </div>
    </>
  );
}
