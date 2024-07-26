import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useTheme } from '../../hooks/useTheme';
import styleTheme from '../../utils/styleTheme';
import UnselectButton from './UnselectButton';
import DownloadButton from './DownloadButton';

import './flyOut.css';

export default function FlyOut() {
  const num = useSelector(
    (state: RootState) => state.cards.selectedCards.length
  );
  const [theme] = useTheme();
  const themeStyles = styleTheme(theme);

  return (
    <div style={themeStyles} className={num ? 'fly show' : 'fly'}>
      <UnselectButton />
      <p>{num} items are selected</p>
      <DownloadButton />
    </div>
  );
}
