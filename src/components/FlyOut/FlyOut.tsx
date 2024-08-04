import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import UnselectButton from './UnselectButton';
import DownloadButton from './DownloadButton';

export default function FlyOut() {
  const num = useSelector(
    (state: RootState) => state.cards.selectedCards.length
  );

  return (
    <div className={num ? 'fly show' : 'fly'}>
      <UnselectButton />
      <p>{num} items are selected</p>
      <DownloadButton />
    </div>
  );
}
