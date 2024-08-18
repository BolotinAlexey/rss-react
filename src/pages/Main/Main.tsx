import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import FormList from '../../components/FormsList';
import './main.css';

export default function Main() {
  const forms = useSelector((state: RootState) => state.form);
  return (
    <>
      <h2 className="page__title">Main Page Form</h2>
      <div className="page__wrap">
        <FormList formsArray={forms.formDataUncontroled} title="Uncontroled" />
        <FormList formsArray={forms.formDataControled} title="Controled" />
      </div>
    </>
  );
}
